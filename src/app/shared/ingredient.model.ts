// ingredient.model.ts

// ───────────────────────────────────────────────────────────────────────────────
// Units
// ───────────────────────────────────────────────────────────────────────────────

export type Unit =
  | "g"
  | "kg"
  | "ml"
  | "dl"
  | "l"
  | "EL"
  | "TL"
  | "Stk"
  | "Bund"
  | "Zweig"
  | "Prise"
  | "n. B.";

// ───────────────────────────────────────────────────────────────────────────────
// Quantities (for recipes)
// ───────────────────────────────────────────────────────────────────────────────

export type Quantity =
  | { kind: "exact"; value: number; unit?: Unit }
  | { kind: "range"; min: number; max: number; unit?: Unit }
  | { kind: "count"; value: number; unit?: Unit }
  | { kind: "unspecified"; note?: string; unit?: Unit }
  | { kind: "toTaste"; note?: string; unit?: Unit };

// Scales a Quantity by a numeric factor (e.g., servings multiplier).
export function scaleQuantity(q: Quantity, factor: number): Quantity {
  switch (q.kind) {
    case "exact":
      return { ...q, value: round2(q.value * factor) };
    case "range":
      return {
        ...q,
        min: round2(q.min * factor),
        max: round2(q.max * factor),
      };
    case "count":
      // Countable items usually make sense as integers (min 1)
      return { ...q, value: Math.max(1, Math.round(q.value * factor)) };
    case "unspecified":
    case "toTaste":
      return q;
  }
}

export function isQuantity(v: unknown): v is Quantity {
  return !!v && typeof v === "object" && "kind" in (v as any);
}

// ───────────────────────────────────────────────────────────────────────────────
// Nutrition
// ───────────────────────────────────────────────────────────────────────────────

export interface NutritionFacts {
  calories?: number; // kcal per 100g
  protein?: number;  // g per 100g
  fat?: number;      // g per 100g
  carbs?: number;    // g per 100g
  fiber?: number;    // g per 100g
  sugar?: number;    // g per 100g
  salt?: number;     // g per 100g
}

// ───────────────────────────────────────────────────────────────────────────────
// Base Ingredient (used in shopping list, inventory, etc.)
// Amount/unit are simple here to keep the shopping list uniform.
// `note` can keep original info like "1–2" or "nach Belieben".
// ───────────────────────────────────────────────────────────────────────────────

export interface Ingredient {
  id: string;
  name: string; // "Schnittlauch", "Mehl", "Eier"
  category?: string; // "Herbs", "Vegetables"
  nutritionPer100g?: NutritionFacts;
  amount?: number;   // numeric amount when known (e.g., 250)
  unit?: Unit;       // unit for the numeric amount
  note?: string;     // optional display note (e.g., "1–2", "n. B.")
  // optional: density g/ml, defaultUnit, brand/product links, etc.
  // density?: number;
  // defaultUnit?: Unit;
  // brand?: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Recipe Ingredient (rich amount semantics used within a recipe)
// ───────────────────────────────────────────────────────────────────────────────

export type IngredientRole = "base" | "optional" | "garnish" | "toTaste";

export interface RecipeIngredient {
  ingredientId: string;              // reference to Ingredient.id if known
  name: string;                      // fallback name if not resolving by id
  quantity: Quantity;                // rich quantity type
  preparation?: string;              // e.g., "gehackt", "geschmolzen"
  alternatives?: string[];           // e.g., ["Frühlingszwiebel"]
  role?: IngredientRole;             // how important it is
  section?: string;                  // e.g., "Teig", "Füllung"
  scalable?: boolean;                // can this line be scaled?
  notes?: string;                    // free-form notes
  nutritionPer100g?: NutritionFacts; // line-specific override if needed
}

// ───────────────────────────────────────────────────────────────────────────────
/** Utilities for mapping recipe lines → shopping items and displaying values */
// ───────────────────────────────────────────────────────────────────────────────

// Convert a single RecipeIngredient into a plain shopping-list Ingredient.
// Rule of thumb:
//  - exact/count  → numeric amount
//  - range        → use max (safer for shopping), keep "min–max" in note
//  - unspecified/toTaste → no numeric amount; carry note if present
export function toShoppingIngredient(src: RecipeIngredient): Ingredient {
  const q = src.quantity;

  switch (q.kind) {
    case "exact":
    case "count":
      return {
        id: src.ingredientId,
        name: src.name,
        amount: q.value,
        unit: q.unit,
      };

    case "range":
      return {
        id: src.ingredientId,
        name: src.name,
        amount: q.max,                   // pick the upper bound
        unit: q.unit,
        note: `${trim0(q.min)}–${trim0(q.max)}`,
      };

    case "unspecified":
    case "toTaste":
      return {
        id: src.ingredientId,
        name: src.name,
        // numeric amount intentionally omitted
        unit: q.unit,                    // keep unit only if you like; often omitted
        note: q.note ?? "n. B.",
      };
  }
}

// Bulk convert a set of RecipeIngredients into shopping Ingredients.
export function recipeToShoppingItems(recipe: { ingredients: RecipeIngredient[] }): Ingredient[] {
  return recipe.ingredients.map(toShoppingIngredient);
}

// Merge same-name+unit items by summing amounts, preserving a helpful note.
export function mergeSameItems(items: Ingredient[]): Ingredient[] {
  const keyOf = (i: Ingredient) => `${i.name}|${i.unit ?? ""}`.toLowerCase();
  const map = new Map<string, Ingredient>();

  for (const i of items) {
    const k = keyOf(i);
    const cur = map.get(k);
    if (!cur) {
      map.set(k, { ...i });
      continue;
    }

    const amount =
      cur.amount != null && i.amount != null
        ? cur.amount + i.amount
        : cur.amount ?? i.amount;

    // Combine notes without duplication
    const notes = [cur.note, i.note].filter(Boolean) as string[];
    const note =
      notes.length
        ? Array.from(new Set(notes)).join(", ")
        : undefined;

    map.set(k, { ...cur, amount, note });
  }
  return [...map.values()];
}

// Simple display helpers for shopping-list rows.

export function qtyValue(line: Ingredient): string {
  if (line.amount == null) return line.note ?? "";
  return trim0(line.amount);
}

export function unitValue(line: Ingredient): string {
  return line.amount == null ? "" : (line.unit ?? "");
}

// ───────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ───────────────────────────────────────────────────────────────────────────────

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Trim trailing ".0" for prettier rendering, keep up to 2 decimals. */
function trim0(n: number): string {
  const s = round2(n).toString();
  return s.replace(/\.00?$/, "");
}

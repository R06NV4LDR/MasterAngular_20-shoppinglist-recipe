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

export type Quantity =
  | { kind: "exact"; value: number; unit?: Unit }
  | { kind: "range"; min: number; max: number; unit?: Unit }
  | { kind: "count"; value: number; unit?: Unit }
  | { kind: "unspecified"; note?: string; unit?: Unit }
  | { kind: "toTaste"; note?: string; unit?: Unit };

export interface NutritionFacts {
  calories?: number; //kcal per 100g
  protein?: number;
  fat?: number;
  carbs?: number;
  fiber?: number;
  sugar?: number;
  salt?: number;
}

export interface Ingredient {
  id: string;
  name: string; // "Schnittlauch", "Mehl", "Eier"
  category?: string; // "Herbs", "Vegetables"
  nutritionPer100g?: NutritionFacts;
  amount?: number;
  unit?: Unit;
  // optional: density g/ml, defaultUnit, brand/product links, etc.
  //   density?: number;
  //   defaultUnit?: string;
  //   brand?: string;
}

export type IngredientRole = "base" | "optional" | "garnish" | "toTaste";

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  quantity: Quantity;
  preparation?: string;
  alternatives?: string[];
  role?: IngredientRole;
  section?: string;
  scalable?: boolean;
  notes?: string;
  nutritionPer100g?: NutritionFacts;
}

export function scaleQuantity(q: Quantity, factor: number): Quantity {
  switch (q.kind) {
    case "exact":
      return { ...q, value: +(q.value * factor).toFixed(2) };
    case "range":
      return {
        ...q,
        min: +(q.min * factor).toFixed(2),
        max: +(q.max * factor).toFixed(2),
      };
    case "count":
      return { ...q, value: Math.max(1, Math.round(q.value * factor)) };
    case "unspecified":
    case "toTaste":
      return q;
  }
}

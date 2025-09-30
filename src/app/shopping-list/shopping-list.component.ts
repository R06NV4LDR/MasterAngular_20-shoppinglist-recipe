import { Component, OnInit } from "@angular/core";
import {
  Ingredient,
  IngredientRole,
  Quantity,
  RecipeIngredient,
  Unit,
  // helpers from ingredient.model.ts:
  toShoppingIngredient,
  mergeSameItems,
  qtyValue as qtyFromIngredient,
  unitValue as unitFromIngredient,
} from "../shared/ingredient.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  // shopping list holds plain, unified Ingredient objects
  ingredients: Ingredient[] = [];

  // child component calls this when a single Ingredient is added via the form
  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients = mergeSameItems([...this.ingredients, ingredient]);
  }

  // your recipe with Quantity on each line
  recipeIngredients: RecipeIngredient[] = [
    {
      ingredientId: "ing_bacon",
      name: "Südtiroler Speck",
      quantity: { kind: "exact", value: 100, unit: "g" },
      preparation: "in Würfel geschnitten",
      section: "Knödel",
    },
    {
      ingredientId: "ing_bread",
      name: "Weissbrot",
      quantity: { kind: "exact", value: 200, unit: "g" },
      preparation: "in Würfel geschnitten",
      section: "Knödel",
    },
    {
      ingredientId: "ing_flour",
      name: "Mehl",
      quantity: { kind: "exact", value: 40, unit: "g" },
      section: "Knödel",
    },
    {
      ingredientId: "ing_onion",
      name: "geschmorte Zwiebeln",
      quantity: { kind: "exact", value: 50, unit: "g" },
      section: "Knödel",
    },
    {
      ingredientId: "ing_chives",
      name: "Schnittlauch",
      quantity: { kind: "exact", value: 1, unit: "EL" }, // ½ EL if you later support fractions
      alternatives: ["Petersilie"],
      preparation: "fein geschnitten",
      section: "Knödel",
    },
    {
      ingredientId: "ing_egg",
      name: "Eier",
      quantity: { kind: "exact", value: 3, unit: "Stk" },
      section: "Knödel",
    },
    {
      ingredientId: "ing_milk",
      name: "Milch",
      quantity: { kind: "unspecified" }, // amount not given
      role: "toTaste",
      section: "Knödel",
    },
    {
      ingredientId: "ing_salt",
      name: "Salz",
      quantity: { kind: "toTaste", unit: "Prise" },
      role: "toTaste",
      section: "Knödel",
    },
  ];

  /** Add all recipe ingredients to shopping list (mapped + merged). */
  addRecipeToShoppingList(): void {
    const mapped: Ingredient[] = this.recipeIngredients.map(toShoppingIngredient);
    this.ingredients = mergeSameItems([...this.ingredients, ...mapped]);
  }

  /** UI helper: format a Quantity for previewing the recipe (not the shopping list). */
  formatQuantity(q: Quantity | undefined, role?: IngredientRole): string {
    if (!q) return "";
    switch (q.kind) {
      case "exact":
        return `${trim0(q.value)} ${q.unit ?? ""}`.trim();
      case "range":
        return `${trim0(q.min)}–${trim0(q.max)} ${q.unit ?? ""}`.trim();
      case "count":
        return `${trim0(q.value)} ${q.unit ?? ""}`.trim();
      case "unspecified":
        return role === "toTaste" ? "" : "n. B.";
      case "toTaste":
        return "";
    }
  }

  /** Shopping-list display helpers (work with plain Ingredient). */
  qtyValue(line: Ingredient): string {
    return qtyFromIngredient(line); // from your model helpers
  }
  unitValue(line: Ingredient): string {
    return unitFromIngredient(line); // from your model helpers
  }
}

/** local tiny helper to pretty-print numbers */
function trim0(n: number): string {
  const s = (Math.round(n * 100) / 100).toString();
  return s.replace(/\.00?$/, "");
}

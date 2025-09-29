import { Component, OnInit } from "@angular/core";
import { Ingredient, IngredientRole, Quantity, RecipeIngredient, Unit } from "../shared/ingredient.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {

ingredients: Ingredient[] = [

]

  recipeIngredients: RecipeIngredient[] = [
    {
      ingredientId: "ing_bacon",
      name: "Südtiroler Speck",
      quantity: { kind: "exact", value: 100, unit: "g" },
      preparation: "in Würfel geschnitten",
      section: "Knödel", // optional
    },
    {ingredientId: "ing_bread",
      name: "Weissbrot",
      quantity: { kind: "exact", value: 200, unit: "g" },
      preparation: "in Würfel geschnitten",
      section: "Knödel",
    },
    {ingredientId: "ing_flour",
      name: "Mehl",
      quantity: { kind: "exact", value: 40, unit: "g" },
      section: "Knödel",
    },
    {ingredientId: "ing_onion",
      name: "geschmorte Zwiebeln",
      quantity: { kind: "exact", value: 50, unit: "g" },
      section: "Knödel",
    },
    {ingredientId: "ing_chives",
      name: "Schnittlauch",
      quantity: { kind: "exact", value: 1, unit: "EL" }, // ½ EL
      alternatives: ["Petersilie"],
      preparation: "fein geschnitten",
      section: "Knödel",
    },
    {ingredientId: "ing_egg",
      name: "Eier",
      quantity: { kind: "exact", value: 3, unit: "Stk" },
      section: "Knödel",
    },
    {ingredientId: "ing_milk",
      name: "Milch",
      quantity: { kind: "unspecified" }, // amount not given
      role: "toTaste",
      section: "Knödel",
    },
    {ingredientId: "ing_salt",
      name: "Salz",
      quantity: { kind: "toTaste", unit: "Prise" },
      role: "toTaste",
      section: "Knödel",
    },
  ];

  constructor() {}
  ngOnInit(): void {}

  formatQuantity(q: Quantity | undefined, role?: IngredientRole): string {
    if (!q) return "";

    switch (q.kind) {
      case "exact":
        return `${q.value} ${q.unit ?? ""}`.trim();
      case "range":
        return `${q.min}–${q.max} ${q.unit ?? ""}`.trim();
      case "count":
        return `${q.value} ${q.unit ?? ""}`.trim();
      case "unspecified":
        return role === "toTaste" ? "" : "";
      case "toTaste":
        return "";
    }
  }

  qtyValue(line: RecipeIngredient): string {
  const q = line.quantity;
  if (!q) return '';
  switch (q.kind) {
    case 'exact':  return String(q.value);                    // e.g. 100
    case 'count':  return String(q.value);                    // e.g. 3
    case 'range':  return `${q.min}–${q.max}`;                // e.g. 1–2
    case 'unspecified':
    case 'toTaste':
      return 'etwas';                                            // keep column occupied
  }
}

unitValue(line: RecipeIngredient): string {
  const q = line.quantity;
  if (!q) return '';
  // show unit only when it makes sense
  switch (q.kind) {
    case 'exact':
    case 'count':
    case 'range':
      return q.unit ?? '';
    case 'unspecified':
    case 'toTaste':
      return '';                                             // no unit
  }
}
}

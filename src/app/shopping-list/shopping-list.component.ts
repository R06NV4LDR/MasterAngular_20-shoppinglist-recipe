import { Component, OnInit } from "@angular/core";
import { Ingredient, Unit } from "../shared/ingredient.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrl: "./shopping-list.component.css",
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    {
      name: "Südtiroler Speck g.g.A.",
      quantity: { kind: "exact", value: 50, unit: "g" },
      preparation: "in Würfel geschnitten",
      section: "Knödel", // optional
    },
    {
      name: "Weissbrot für Knödelteig",
      quantity: { kind: "exact", value: 100, unit: "g" },
      preparation: "in Würfel geschnitten",
      section: "Knödel",
    },
    {
      name: "Mehl",
      quantity: { kind: "exact", value: 20, unit: "g" },
      section: "Knödel",
    },
    {
      name: "geschmorte Zwiebeln",
      quantity: { kind: "exact", value: 25, unit: "g" },
      section: "Knödel",
    },
    {
      name: "Schnittlauch",
      quantity: { kind: "exact", value: 0.5, unit: "EL" }, // ½ EL
      alternatives: ["Petersilie"],
      preparation: "fein geschnitten",
      section: "Knödel",
    },
    {
      name: "Eier",
      quantity: { kind: "range", min: 1, max: 2, unit: "Stk" },
      section: "Knödel",
    },
    {
      name: "Milch",
      quantity: { kind: "unspecified" }, // amount not given
      section: "Knödel",
    },
    {
      name: "Salz",
      quantity: { kind: "toTaste", unit: "Prise" },
      role: "toTaste",
      section: "Knödel",
    },
  ];

  constructor() {}
  ngOnInit(): void {}
}

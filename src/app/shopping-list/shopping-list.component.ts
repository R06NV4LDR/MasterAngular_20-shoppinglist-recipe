import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  Ingredient,
  IngredientRole,
  Quantity,
  RecipeIngredient,
  toShoppingIngredient,
  mergeSameItems,
  qtyValue as qtyFromIngredient,
  unitValue as unitFromIngredient,
} from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  recipeIngredients: RecipeIngredient[] = [
    // ...your data unchanged
  ];

  addRecipeToShoppingList(): void {
    const mapped: Ingredient[] =
      this.recipeIngredients.map(toShoppingIngredient);
    this.ingredients = mergeSameItems([...this.ingredients, ...mapped]);
  }

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

  qtyValue(i: Ingredient): string {
    return qtyFromIngredient(i);
  }
  unitValue(i: Ingredient): string {
    return unitFromIngredient(i);
  }
}

function trim0(n: number): string {
  const s = (Math.round(n * 100) / 100).toString();
  return s.replace(/\.00?$/, "");
}

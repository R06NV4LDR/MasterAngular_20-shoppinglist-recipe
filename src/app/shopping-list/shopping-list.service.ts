import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }


  // Add a single ingredient and check if this ingredient is already in the shopping list.
  // if yes they will get merged into one (amount is added) 
  addIngredient(ingredient: Ingredient) {
    const nameKey = this.normalize(ingredient.name);
    const unitKey = ingredient.unit ?? "";

    const idx = this.ingredients.findIndex(
      (i) => this.normalize(i.name) === nameKey && (i.unit ?? "") === unitKey
    );

    if (idx > -1) {
      // merge into existing Shopping List Items
      const cur = this.ingredients[idx];
      this.ingredients[idx] = {
        ...cur,
        // sum only when both amounts are numeric
        amount: this.mergeAmount(cur.amount, ingredient.amount),
      };
    } else {
      // new Line
      this.ingredients.push({ ...ingredient });
    }

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (const it of ingredients) this.addIngredient(it);

    //   for (let ingredient of ingredients) {
    //     this.addIngredient(ingredient);
    //   }

    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());
  }

  // ───────── helpers ─────────
  private normalize(s: string): string {
    return s.trim().toLowerCase();
  }

  private mergeAmount(a?: number, b?: number): number | undefined {
    const isNum = (x: any): x is number =>
      typeof x === "number" && Number.isFinite(x);

    if (isNum(a) && isNum(b)) return a + b;
    if (!isNum(a) && isNum(b)) return b; // previously unspecified, now numeric
    return a; // keep existing (covers both unspecified)
  }
}

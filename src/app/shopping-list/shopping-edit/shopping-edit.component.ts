import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Ingredient, Unit } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrl: "./shopping-edit.component.css", // ok on Angular v17+
})
export class ShoppingEditComponent {
  constructor(private slService: ShoppingListService) {}

  onAddItem(form: NgForm) {
    const { name, amount: amountInput, unit: unitInput } = form.value;
    const trimmedName = (name ?? "").trim();
    if (!trimmedName) return;

    const parsedAmount =
      amountInput === "" || amountInput === undefined || amountInput === null
        ? undefined
        : Number(amountInput);
    const amount =
      typeof parsedAmount === "number" && Number.isFinite(parsedAmount)
        ? parsedAmount
        : undefined;
    const unit = (unitInput || undefined) as Unit | undefined;

    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: trimmedName,
      amount,
      unit,
    };

    this.slService.addIngredient(newIngredient);
    form.resetForm({ unit: "" });
  }

  onClear(form: NgForm) {
    form.resetForm({ unit: "" });
  }
}
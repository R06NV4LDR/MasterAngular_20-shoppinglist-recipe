import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Ingredient, Unit } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrl: "./shopping-edit.component.css", // ok on Angular v17+
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("shoppingForm") slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.unit,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
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

    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.resetForm({ unit: "" });
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear();
    throw new Error("Method not implemented.");
  }
}

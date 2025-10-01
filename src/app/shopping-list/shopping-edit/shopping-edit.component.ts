import { Component, OnInit } from "@angular/core";
import { Ingredient, Unit } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrl: "./shopping-edit.component.css", // ok on Angular v17+
})
export class ShoppingEditComponent implements OnInit {
  
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem(form: NgForm) {
    const value = form.value;



    // if (!name) return;

    // const amount = amountRaw === "" ? undefined : Number(amountRaw);
    // const unit = (unitRaw || undefined) as Unit | undefined;

    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name,
      amount: Number.isFinite(amount as number)
        ? (amount as number)
        : undefined,
      unit,
    };
    this.slService.addIngredient(value.name, value.amount, value.unit);

    // optional: reset
    this.nameInputRef.nativeElement.value = "";
    this.amountInputRef.nativeElement.value = "";
    this.unitInputRef.nativeElement.value = "";
  }
}

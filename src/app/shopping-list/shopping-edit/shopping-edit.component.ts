import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Ingredient, Unit } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrl: "./shopping-edit.component.css", // ok on Angular v17+
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild("amountInput") amountInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild("unitInput") unitInputRef!: ElementRef<HTMLSelectElement>;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem() {
    const name = this.nameInputRef.nativeElement.value.trim();
    const amountRaw = this.amountInputRef.nativeElement.value;
    const unitRaw = this.unitInputRef.nativeElement.value;

    if (!name) return;

    const amount = amountRaw === "" ? undefined : Number(amountRaw);
    const unit = (unitRaw || undefined) as Unit | undefined;

    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name,
      amount: Number.isFinite(amount as number)
        ? (amount as number)
        : undefined,
      unit,
    };
    this.slService.addIngredient(newIngredient);

    // optional: reset
    this.nameInputRef.nativeElement.value = "";
    this.amountInputRef.nativeElement.value = "";
    this.unitInputRef.nativeElement.value = "";
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Ingredient, Unit } from "../../shared/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrl: "./shopping-edit.component.css",
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameInputRef: ElementRef;
  @ViewChild("amountInput") amountInputRef: ElementRef;
  @ViewChild("unitInput") unitInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit(): void {}

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const ingUnit = this.unitInputRef.nativeElement.value;
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: ingName,
      amount: ingAmount,
      unit: ingUnit,
    };
    
    this.ingredientAdded.emit(newIngredient);
  }
}

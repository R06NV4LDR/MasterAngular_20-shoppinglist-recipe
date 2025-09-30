import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  count = 0;
  private ingSub?: Subscription;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.count = this.slService.getIngredients().length;

    this.ingSub = this.slService.ingredientsChanged.subscribe(
      (ings) => (this.count = ings.length)
    );
  }

  ngOnDestroy(): void {
    this.ingSub?.unsubscribe();
  }
}

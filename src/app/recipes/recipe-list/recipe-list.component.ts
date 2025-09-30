import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrl: "./recipe-list.component.css",
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      1,
      "Ghackets mit Hörnli",
      "Ghackets und Hörnli sind ein echter Schweizer Klassiker. Das einfache Rezept mit gehacktem Rindfleisch und selbst gemachtem Apfelmus ist schnell zubereitet.",
      "https://reisehappen.de/wp-content/uploads/2023/09/Ghackets-4-720x480.jpg"
    ), //
    new Recipe(
      2,
      "Papet Vaudois",
      "Die Spezialität aus dem Waadtland ist ein herrliches Winteressen. Würzige Würste auf Lauch und Kartoffeln an der für Papet vaudois typischen Sauce.",
      "https://res.cloudinary.com/swissmilk/image/fetch/ar_16:10,g_auto,w_1296,c_fill,f_auto,q_auto,fl_progressive/https://api.swissmilk.ch/wp-content/uploads/2021/09/LM199905_29_MEN905B028A_Papet-vaudois-scaled.jpg"
    ), //
    new Recipe(
      3,
      "Südtiroler Speckknödel",
      "Eine runde Köstlichkeit: der Südtiroler Speckknödel!",
      "https://images.simedia.cloud/cms-v2/CustomerData/496/files/Images/rezepte/speckknoedel_01.jpg/600x0/image.jpg?v=638941401451"
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}

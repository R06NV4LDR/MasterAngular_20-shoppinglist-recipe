import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { ingredients } from "../shared/ingredient.data";
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      1,
      "Ghackets mit Hörnli",
      "Ghackets und Hörnli sind ein echter Schweizer Klassiker. Das einfache Rezept mit gehacktem Rindfleisch und selbst gemachtem Apfelmus ist schnell zubereitet.",
      "https://reisehappen.de/wp-content/uploads/2023/09/Ghackets-4-720x480.jpg",
      [
        // Apfelmus
        { id: "ing_applejuice", name: "Apfelsaft", amount: 1.5, unit: "dl" },
        { id: "ing_lemonjuice", name: "Zitronensaft", amount: 2, unit: "EL" },
        { id: "ing_sugar", name: "Zucker", amount: 2, unit: "EL" },
        {
          id: "ing_cinnamon_stick",
          name: "Zimtstange",
          amount: 0.5,
          unit: "Stk",
        }, // ½
        { id: "ing_apples", name: "Äpfel", amount: 800, unit: "g" },

        // Ghackets & Hörnli
        {
          id: "ing_beef_ground",
          name: "gehacktes Rindfleisch",
          amount: 600,
          unit: "g",
        }, // 500–600 → 600
        {
          id: "ing_frying_fat",
          name: "Bratbutter oder Bratcrème",
          unit: "n. B.",
        },
        { id: "ing_onion", name: "Zwiebel", amount: 1, unit: "Stk" },
        {
          id: "ing_garlic_clove",
          name: "Knoblauchzehe",
          amount: 1,
          unit: "Stk",
        },
        {
          id: "ing_marjoram_twigs",
          name: "Majoranzweige",
          amount: 3,
          unit: "Zweig",
        },
        {
          id: "ing_thyme_twigs",
          name: "Thymianzweige",
          amount: 5,
          unit: "Zweig",
        },
        { id: "ing_tomato_puree", name: "Tomatenpüree", amount: 1, unit: "EL" },
        { id: "ing_flour", name: "Mehl", amount: 1.5, unit: "EL" }, // 1½
        {
          id: "ing_redwine_or_bouillon",
          name: "Rotwein oder Bouillon",
          amount: 1,
          unit: "dl",
        },
        { id: "ing_bouillon", name: "Bouillon", amount: 2, unit: "dl" },
        { id: "ing_salt", name: "Salz", unit: "n. B." },
        { id: "ing_pepper", name: "Pfeffer aus der Mühle", unit: "n. B." },
        { id: "ing_paprika", name: "Paprika", unit: "n. B." },
        { id: "ing_hornli", name: "Hörnli", amount: 400, unit: "g" }, // 300–400 → 400
        {
          id: "ing_cheese_grated",
          name: "geriebener Käse",
          amount: 100,
          unit: "g",
        },
        {
          id: "ing_marjoram_garnish",
          name: "Majoran (zum Garnieren)",
          unit: "n. B.",
        },
      ]
    ), //
    new Recipe(
      2,
      "Papet Vaudois",
      "Die Spezialität aus dem Waadtland ist ein herrliches Winteressen. Würzige Würste auf Lauch und Kartoffeln an der für Papet vaudois typischen Sauce.",
      "https://res.cloudinary.com/swissmilk/image/fetch/ar_16:10,g_auto,w_1296,c_fill,f_auto,q_auto,fl_progressive/https://api.swissmilk.ch/wp-content/uploads/2021/09/LM199905_29_MEN905B028A_Papet-vaudois-scaled.jpg",
      [
        {
          id: "ing_saucisson",
          name: "Waadtländer Saucisson",
          amount: 2,
          unit: "Stk",
        },
        { id: "ing_water", name: "Wasser", amount: 2, unit: "l" }, // zum Sieden
        { id: "ing_leek", name: "Lauch", amount: 800, unit: "g" },
        {
          id: "ing_potatoes_waxy",
          name: "Kartoffeln, fest kochend",
          amount: 500,
          unit: "g",
        },
        { id: "ing_butter", name: "Butter", amount: 1, unit: "EL" },
        { id: "ing_salt_tl", name: "Salz", amount: 1, unit: "TL" },
        { id: "ing_white_wine", name: "Weisswein", amount: 0.5, unit: "dl" },
        {
          id: "ing_half_cream_sauce",
          name: "Saucen-Halbrahm",
          amount: 2,
          unit: "dl",
        },
        {
          id: "ing_parsley_flat",
          name: "Petersilie, glattblättrig",
          amount: 3,
          unit: "EL",
        },
      ]
    ), //
    new Recipe(
      3,
      "Südtiroler Speckknödel",
      "Eine runde Köstlichkeit: der Südtiroler Speckknödel!",
      "https://images.simedia.cloud/cms-v2/CustomerData/496/files/Images/rezepte/speckknoedel_01.jpg/600x0/image.jpg?v=638941401451",
      [
        {
          id: "ing_speck_suedtiroler",
          name: "Südtiroler Speck",
          amount: 100,
          unit: "g",
        },
        {
          id: "ing_bread_knoedelteig",
          name: "Weissbrot für Knödelteig",
          amount: 200,
          unit: "g",
        },
        { id: "ing_flour", name: "Mehl", amount: 40, unit: "g" },
        {
          id: "ing_onion_braised",
          name: "geschmorte Zwiebeln",
          amount: 50,
          unit: "g",
        },
        { id: "ing_chives", name: "Schnittlauch", amount: 1, unit: "EL" }, // oder Petersilie
        { id: "ing_eggs", name: "Eier", amount: 3, unit: "Stk" },
        { id: "ing_milk", name: "Milch", unit: "n. B." },
        { id: "ing_salt", name: "Salz", unit: "n. B." },
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) {

  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(Ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}

import { Ingredient } from "./ingredient.model";

export interface Ingredient {
  id: string;
  name: { de: string; en: string };
  category?: { de: string; en: string };
}

export const ingredients: Ingredient[] = [
  // Proteins & Meat
  {
    id: "ing_chicken_breast",
    name: "Hühnerbrustfilet",
    category: "Fleisch",
    nutritionPer100g: {},
  },
  {
    id: "ing_beef_ground",
    name: "Rinderhackfleisch",
    category: "Fleisch",
    nutritionPer100g: {},
  },
  {
    id: "ing_pork_chop",
    name: "Schweinekotelett",
    category: "Fleisch",
    nutritionPer100g: {},
  },
  {
    id: "ing_sausage",
    name: "Wurst",
    category: "Fleisch",
    nutritionPer100g: {},
  },
  { id: "ing_bacon", name: "Speck", category: "Fleisch", nutritionPer100g: {} },
  { id: "ing_egg", name: "Eier", category: "Tierisch", nutritionPer100g: {} },

  // Fish & Seafood
  {
    id: "ing_salmon",
    name: "Lachsfilet",
    category: "Fisch",
    nutritionPer100g: {},
  },
  {
    id: "ing_shrimp",
    name: "Garnelen",
    category: "Fisch",
    nutritionPer100g: {},
  },

  // Dairy & Eggs
  {
    id: "ing_milk",
    name: "Milch",
    category: "Milchprodukte",
    nutritionPer100g: {},
  },
  {
    id: "ing_butter",
    name: "Butter",
    category: "Milchprodukte",
    nutritionPer100g: {},
  },
  {
    id: "ing_cheese",
    name: "Käse (z.B. Emmentaler, Gouda)",
    category: "Milchprodukte",
    nutritionPer100g: {},
  },
  { id: "ing_yogurt", name: "Naturjoghurt", category: "Milchprodukte" },
  { id: "ing_cream", name: "Sahne / Rahm", category: "Milchprodukte" },

  // Vegetables
  { id: "ing_onion", name: "Zwiebeln", category: "Gemüse" },
  { id: "ing_garlic", name: "Knoblauch", category: "Gemüse" },
  { id: "ing_carrot", name: "Karotten", category: "Gemüse" },
  { id: "ing_tomato", name: "Tomaten", category: "Gemüse" },
  { id: "ing_potato", name: "Kartoffeln", category: "Gemüse" },
  { id: "ing_paprika", name: "Paprika", category: "Gemüse" },
  { id: "ing_spinach", name: "Spinat", category: "Gemüse" },
  { id: "ing_broccoli", name: "Brokkoli", category: "Gemüse" },
  { id: "ing_mushroom", name: "Champignons", category: "Gemüse" },
  { id: "ing_cucumber", name: "Gurke", category: "Gemüse" },

  // Herbs & Spices
  { id: "ing_salt", name: "Salz", category: "Gewürze" },
  { id: "ing_pepper", name: "Schwarzer Pfeffer", category: "Gewürze" },
  { id: "ing_paprika_powder", name: "Paprikapulver", category: "Gewürze" },
  { id: "ing_chili_powder", name: "Chilipulver", category: "Gewürze" },
  { id: "ing_cumin", name: "Kreuzkümmel", category: "Gewürze" },
  {
    id: "ing_basil",
    name: "Basilikum (frisch oder getrocknet)",
    category: "Kräuter",
  },
  { id: "ing_parsley", name: "Petersilie", category: "Kräuter" },
  { id: "ing_chives", name: "Schnittlauch", category: "Kräuter" },
  { id: "ing_thyme", name: "Thymian", category: "Kräuter" },
  { id: "ing_rosemary", name: "Rosmarin", category: "Kräuter" },
  { id: "ing_oregano", name: "Oregano", category: "Kräuter" },

  // Pantry staples
  { id: "ing_flour", name: "Mehl", category: "Backzutaten" },
  { id: "ing_rice", name: "Reis", category: "Grundnahrungsmittel" },
  { id: "ing_pasta", name: "Pasta", category: "Grundnahrungsmittel" },
  { id: "ing_bread", name: "Brot", category: "Grundnahrungsmittel" },
  { id: "ing_sugar", name: "Zucker", category: "Backzutaten" },
  { id: "ing_honey", name: "Honig", category: "Süßungsmittel" },
  { id: "ing_oil_olive", name: "Olivenöl", category: "Öle & Fette" },
  { id: "ing_oil_sunflower", name: "Sonnenblumenöl", category: "Öle & Fette" },
  { id: "ing_vinegar", name: "Essig", category: "Öle & Fette" },
  { id: "ing_tomato_paste", name: "Tomatenpüree", category: "Vorrat" },
  { id: "ing_bouillon", name: "Gemüsebouillon", category: "Vorrat" },
];

const { findRecipesByIngredients, scaleRecipe } = require("../recipes/recipes");

describe("Ricerca Ricette per Ingredienti", () => {
  const recipes = [
    { name: "Pasta al Pomodoro", ingredients: ["pasta", "pomodoro", "basilico"] },
    { name: "Insalata", ingredients: ["lattuga", "pomodoro", "olio"] },
    { name: "Uova Strapazzate", ingredients: ["uova", "burro", "sale"] },
  ];

  test("Trova ricette che contengono uno degli ingredienti forniti", () => {
    expect(findRecipesByIngredients(recipes, ["pomodoro"])).toEqual([
      "Pasta al Pomodoro",
      "Insalata",
    ]);
  });

  test("Trova ricette con più ingredienti forniti", () => {
    expect(findRecipesByIngredients(recipes, ["pomodoro", "basilico"])).toEqual([
      "Pasta al Pomodoro",
    ]);
  });

  test("Nessuna ricetta trovata se nessun ingrediente corrisponde", () => {
    expect(findRecipesByIngredients(recipes, ["cioccolato"])).toEqual([]);
  });
});

describe("Adattamento delle Porzioni", () => {
  const recipe = {
    name: "Pasta al Pomodoro",
    ingredients: {
      pasta: 100,
      pomodoro: 150,
      basilico: 10,
    },
    portions: 2,
  };

  test("Scala le quantità degli ingredienti in base alle porzioni", () => {
    expect(scaleRecipe(recipe, 4)).toEqual({
      pasta: 200,
      pomodoro: 300,
      basilico: 20,
    });
  });

  test("Riduce le quantità per meno porzioni", () => {
    expect(scaleRecipe(recipe, 1)).toEqual({
      pasta: 50,
      pomodoro: 75,
      basilico: 5,
    });
  });
});

import React from "react";
import "./style.css";
import RecipeBasics from "./components/RecipeBasics";
import RecipeIngredient from "./components/RecipeIngredient";

// const mockRecipeData = {
//   recipeName: "Hot Cocoa",
//   recipeServingSize: "2",
//   recipeIngredients: {
//     0: {
//       ingredient: "milk",
//       unit: "cups",
//       qty: "2",
//       bulkUnit: "gallons",
//       bulkQty: "5",
//       bulkCost: "100",
//       recipeCosts: ""
//     },
//     1: {
//       ingredient: "cocoa powder",
//       unit: "ounces",
//       qty: "2",
//       bulkUnit: "pounds",
//       bulkQty: "10",
//       bulkCost: "200",
//       recipeCosts: ""
//     },
//     2: {
//       ingredient: "sugar",
//       unit: "ounces",
//       qty: "1",
//       bulkUnit: "pounds",
//       bulkQty: "15",
//       bulkCost: "300",
//       recipeCosts: ""
//     },
//   },
// };

function App() {
  const [formData, setFormData] = React.useState({
    recipeName: "",
    recipeServingSize: "",
    recipeIngredients: {},
  });

  function handleChange(e) {
    const { name, id, value } = e.target;

    if (id) {
      const copiedFormData = JSON.parse(JSON.stringify(formData));

      copiedFormData.recipeIngredients[id] = {
        ...copiedFormData.recipeIngredients[id],
        [name]: value,
      };

      setFormData(copiedFormData);
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }
  }

  const round = (value, precision) => {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  function handleSubmit(e) {
    e.preventDefault();

    const determineMultiplier = (smallUnit, largeUnit, largeQty) => {
      if (
        (smallUnit === "cups" && largeUnit === "gallons") ||
        (smallUnit === "ounces" && largeUnit === "pounds") ||
        (smallUnit === "tablespoons" && largeUnit === "cups")
      ) {
        return 16;
      } else if (
        (smallUnit === "fluid-ounces" && largeUnit === "cups") ||
        (smallUnit === "pint" && largeUnit === "gallon")
      ) {
        return 8;
      } else if (smallUnit === "cups" && largeUnit === "fluid-ounces") {
        return 1 / 8;
      } else if (smallUnit === "teaspoons" && largeUnit === "cups") {
        return 48;
      } else if (smallUnit === "tablespoons" && largeUnit === "gallons") {
        return 256;
      } else if (smallUnit === "teaspoons" && largeUnit === "gallons") {
        return 768;
      } else if (smallUnit === "fluid-ounces" && largeUnit === "gallons") {
        return 128;
      } else if (smallUnit === "tablespoons" && largeUnit === "fluid-ounces") {
        return 2;
      } else if (smallUnit === "teaspoons" && largeUnit === "fluid-ounces") {
        return 6;
      } else if (smallUnit === "quart" && largeUnit === "gallon") {
        return 4;
      } else if (smallUnit === "each" && largeUnit === "each") {
        return largeQty;
      } else if (smallUnit === "dashes" || smallUnit === "pinches") {
        console.log("cannot calculate, placeholder here");
        return largeQty;
      } else {
        console.log("assuming same units");
        return 1;
      }
    };

    const numIngredients = Object.keys(formData.recipeIngredients).length;

    const calculateRecipeCosts = (recipe) => {
      let copiedRecipe = JSON.parse(JSON.stringify(recipe));
      let ingredients = copiedRecipe.recipeIngredients;

      for (let i = 0; i < numIngredients; i++) {
        let multiplier = determineMultiplier(
          ingredients[i].unit,
          ingredients[i].bulkUnit,
          ingredients[i].bulkQty
        );

        let ingredientQty = ingredients[i].qty;
        let bulkSmallUnitQty = ingredients[i].bulkQty * multiplier;
        let costRatio = ingredientQty / bulkSmallUnitQty;
        let fullIngredientCost = ingredients[i].bulkCost * costRatio;

        ingredients[i].recipeCosts = round(fullIngredientCost, 2);
      }

      setFormData(copiedRecipe);
    };

    calculateRecipeCosts(formData);
  }

  const numIngredients = Object.keys(formData.recipeIngredients).length;
  const recipeCostingArray = [];

  let totalRecipeCost = 0;

  for (let i = 0; i < numIngredients; i++) {
    let ingredientData = formData.recipeIngredients[i];
    let item = (
      <div key={i}>
        <div className="ingredient-cost">
          <div>{ingredientData.ingredient}:</div>
          <div>${ingredientData.recipeCosts}</div>
        </div>
      </div>
    );
    recipeCostingArray.push(item);
    totalRecipeCost += ingredientData.recipeCosts;
  }

  totalRecipeCost = round(totalRecipeCost, 2);

  // function handleClear() {
  //   setFormData({
  //     recipeName: "",
  //     recipeServingSize: "",
  //     recipeIngredients: {},
  //   });
  // }

  return (
    <main className="app">
      <h1 className="app-title">Recipe Costing App</h1>
      <form onSubmit={handleSubmit} className="form">
        <RecipeBasics formData={formData} handleChange={handleChange} />
        <fieldset>
          <legend>Recipe Ingredients</legend>
          <RecipeIngredient formData={formData} handleChange={handleChange} />
        </fieldset>
        <div className="form-buttons">
          <button className="submit-button">Submit</button>
          {/* <button className="submit-button" onClick={handleClear}>
            Clear
          </button> */}
        </div>
      </form>

      <div className="display">
        <h2>{formData.recipeName}</h2>
        <div>Serving Size: {formData.recipeServingSize}</div>
        <div>Total Recipe Cost: ${totalRecipeCost}</div>
        <div className="display-recipe-costing">{recipeCostingArray}</div>
      </div>
    </main>
  );
}

export default App;

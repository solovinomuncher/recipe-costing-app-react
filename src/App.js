import React from "react";
import "./style.css";
import RecipeBasics from "./components/RecipeBasics";
import RecipeIngredient from "./components/RecipeIngredient";

function App() {
  const [formData, setFormData] = React.useState({
    recipeName: "",
    recipeServingSize: "",
    recipeIngredients: {},
  });

  const mockRecipeData = {
    recipeName: "Hot Cocoa",
    recipeServingSize: "2",
    recipeIngredients: {
      0: {
        ingredient: "milk",
        unit: "cups",
        qty: "2",
        bulkUnit: "gallons",
        bulkQty: "5",
        bulkCost: "100",
      },
      1: {
        ingredient: "cocoa powder",
        unit: "ounces",
        qty: "2",
        bulkUnit: "pounds",
        bulkQty: "10",
        bulkCost: "200",
      },
      2: {
        ingredient: "sugar",
        unit: "ounces",
        qty: "1",
        bulkUnit: "pounds",
        bulkQty: "15",
        bulkCost: "300",
      },
    },
  };

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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <main className="app">
      <h1 className="app-title">React Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <RecipeBasics formData={formData} handleChange={handleChange} />
        <fieldset>
          <legend>Recipe Ingredients</legend>
          <RecipeIngredient formData={formData} handleChange={handleChange} />
        </fieldset>
        <button>Submit</button>
      </form>
    </main>
  );
}

export default App;

export default function RecipeBasics(props) {
  return (
    <fieldset className="recipe-basics">
      <legend>Recipe Basics</legend>
      <p className="recipe-basics__input">
        <label>Recipe Name:</label>
        <input
          type="text"
          name="recipeName"
          value={props.formData.recipeName}
          onChange={props.handleChange}
        />
      </p>
      <p className="recipe-basics__input">
        <label>Serving Size:</label>
        <input
          type="number"
          name="recipeServingSize"
          value={props.formData.recipeServingSize}
          onChange={props.handleChange}
        />
      </p>
    </fieldset>
  );
}

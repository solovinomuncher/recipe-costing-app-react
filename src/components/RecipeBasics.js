export default function RecipeBasics(props) {
  return (
    <fieldset>
      <legend>Recipe Basics</legend>
      <p>
        <label>Recipe Name:</label>
        <input
          type="text"
          name="recipeName"
          value={props.formData.recipeName}
          onChange={props.handleChange}
        />
      </p>
      <p>
        <label>Recipe Serving Size:</label>
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

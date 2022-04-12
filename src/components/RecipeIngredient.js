export default function RecipeIngredient(props) {
  const ingredientInputArray = [];
  for (let i = 0; i < 10; i++) {
    ingredientInputArray.push(
      <p key={i}>
        <input
          placeholder="Ingredient Name"
          type="text"
          name="ingredient"
          id={i}
          onChange={props.handleChange}
        />
        <select name="unit" id={i} onChange={props.handleChange}>
          <optgroup label="Dry">
            <option value=""></option>
            <option value="cups">Cups</option>
            <option value="dashes">Dashes</option>
            <option value="ounces">Ounces</option>
            <option value="pinches">Pinches</option>
            <option value="tablespoons">Tablespoons</option>
            <option value="teaspoons">Teaspoons</option>
            <option value="pounds">Pounds</option>
            <option value="each">Each</option>
          </optgroup>
          <optgroup label="Liquids">
            <option value="cups">Cups</option>
            <option value="gallons">Gallons</option>
            <option value="fluid-ounces">Fluid Ounces</option>
            <option value="pints">Pints</option>
            <option value="quarts">Quarts</option>
            <option value="tablespoons">Tablespoons</option>
            <option value="teaspoons">Teaspoons</option>
          </optgroup>
        </select>
        <input
          placeholder="Qty"
          type="number"
          name="qty"
          id={i}
          onChange={props.handleChange}
        />
        <select name="bulkUnit" id={i} onChange={props.handleChange}>
          <option value=""></option>
          <optgroup label="Dry">
            <option value="ounces">Ounces</option>
            <option value="pounds">Pounds</option>
            <option value="each">Each</option>
          </optgroup>
          <optgroup label="Liquids">
            <option value="cups">Cups</option>
            <option value="gallons">Gallons</option>
            <option value="fluid-ounces">Fluid Ounces</option>
          </optgroup>
        </select>
        <input
          placeholder="Bulk Qty"
          type="number"
          name="bulkQty"
          id={i}
          onChange={props.handleChange}
        />
        <input
          placeholder="Bulk Cost"
          type="number"
          name="bulkCost"
          id={i}
          onChange={props.handleChange}
        />
      </p>
    );
  }

  return ingredientInputArray;
}

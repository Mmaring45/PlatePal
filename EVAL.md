
## What I implemented

- Add recipe (prompt-based). Users can click "Add Recipe" and enter: name, ingredients, instructions, and category. The app creates a DOM card for each recipe.
- Delete recipe. Each card has a Delete button; confirming removes the card from the DOM.
- Edit recipe . Each card has an Edit button. Editing uses prompt dialogs to update the card's content (name, ingredients, instructions, category).
- Live search/filter. A search bar filters visible cards by recipe name or ingredient as the user types.

## What I struggled with
- I struggled with some parts of the DOM implementation.

	- In particular, I had trouble at first getting newly created cards to appear on the page after filling the prompts. The symptoms were that the prompts would run, but no card showed up.

	

	- What I learned:
		- Always check the console for the first error when something doesn’t run; one error can stop the rest of your script.
		




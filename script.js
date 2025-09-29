// Select the Add Recipe button and the recipe grid
const addRecipeBtn = document.getElementById('add-recipe-btn');
const recipeGrid = document.querySelector('.recipe-grid');

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
// Function to add a new recipe card
function addRecipeCard(name, ingredients, instructions, category) {
  let curName = name;
  let curIngredients = ingredients.slice();
  let curInstructions = instructions;
  let curCategory = category;

  const recipeCard = document.createElement('article');
  recipeCard.classList.add('recipe-card');

  recipeCard.innerHTML = `
    <div class="image-placeholder">Image</div>
    <h2 class="recipe-name">${escapeHtml(curName)}</h2>
    <ul class="ingredients-list">
      ${curIngredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}
    </ul>
    <p class="instructions">${escapeHtml(curInstructions)}</p>
    <span class="category">${escapeHtml(curCategory)}</span>
    <div class="card-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // DELETE 
  const deleteBtn = recipeCard.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    if (confirm(`Delete "${curName}"?`)) recipeCard.remove();
  });

  // EDIT 
  const editBtn = recipeCard.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => {
    const newName = prompt('Edit the recipe name:', curName);
    if (newName === null) return; // cancelled

    const newIngredients = prompt('Edit the ingredients (comma-separated):', curIngredients.join(', '));
    if (newIngredients === null) return;

    const newInstructions = prompt('Edit the instructions:', curInstructions);
    if (newInstructions === null) return;

    const newCategory = prompt('Edit the category (optional):', curCategory);
    if (newCategory === null) return;

    // apply changes 
    curIngredients = newIngredients.split(',').map(s => s.trim()).filter(Boolean);
    curInstructions = newInstructions.trim();
    curCategory = newCategory.trim();

    // update DOM
    recipeCard.querySelector('.recipe-name').textContent = curName;
    recipeCard.querySelector('.ingredients-list').innerHTML =
      curIngredients.map(i => `<li>${escapeHtml(i)}</li>`).join('');
    recipeCard.querySelector('.instructions').textContent = curInstructions;
    recipeCard.querySelector('.category').textContent = curCategory;
  });

  recipeGrid.appendChild(recipeCard);
}

// Add button handler (keeps using prompts)
addRecipeBtn.addEventListener('click', () => {
  const name = prompt('Enter the recipe name:');
  if (!name) { alert('Name required'); return; }

  const ingredientsRaw = prompt('Enter the ingredients (comma-separated):', '');
  if (!ingredientsRaw) { alert('At least one ingredient required'); return; }
  const ingredients = ingredientsRaw.split(',').map(s => s.trim()).filter(Boolean);

  const instructions = prompt('Enter the instructions:', '');
  if (!instructions) { alert('Instructions required'); return; }

  const category = prompt('Enter the category (optional):', '') || '';

  addRecipeCard(name, ingredients, instructions, category);
});

// SEARCH / FILTER
var searchInput = document.getElementsByClassName('search-bar')[0];

function filterRecipes(query) {
  var term = (query || '').toLowerCase().trim();

  // get all recipe card elements
  var cards = document.getElementsByClassName('recipe-card');

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];

    // get the recipe name text
    var nameEls = card.getElementsByClassName('recipe-name');
    var nameText = '';
    if (nameEls.length > 0) {
      nameText = (nameEls[0].textContent || '').toLowerCase();
    }

    // get ingredients text 
    var ingredientsText = '';
    var ingLists = card.getElementsByClassName('ingredients-list');
    if (ingLists.length > 0) {
      var lis = ingLists[0].getElementsByTagName('li');
      for (var j = 0; j < lis.length; j++) {
        var li = lis[j];
        ingredientsText += ' ' + ((li.textContent || '').toLowerCase());
      }
    }

    // match if term is empty or found in name or ingredients
    var matches = false;
    if (term === '') {
      matches = true;
    } else if (nameText.indexOf(term) !== -1) {
      matches = true;
    } else if (ingredientsText.indexOf(term) !== -1) {
      matches = true;
    }

    // show or hide the card
    if (matches) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  }
}

if (searchInput) {
  searchInput.addEventListener('input', function (e) {
    filterRecipes(e.target.value);
  });
}
const searchInput = document.querySelector('#search-input');
const recipeCards = document.querySelectorAll('.recipe-card');

searchInput.addEventListener('input', filterList);

function latinize(input = '') {
  return input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filterList(event) {
  const searchValue = latinize(event?.target?.value);
  recipeCards.forEach((card) => {
    if (!searchValue || latinize(card.innerText).includes(searchValue)) {
      card.style.display = ''
    } else {
      card.style.display = 'none'
    }
  });
}

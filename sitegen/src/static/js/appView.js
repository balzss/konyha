if (localStorage.getItem('recipeAppView')) {
  document.querySelectorAll('.appview-only').forEach((node) => {
    node.classList.remove('appview-only');
  });
} else {
  document.querySelectorAll('.recipe-tag').forEach((node) => {
    node.href = '#';
  });
}

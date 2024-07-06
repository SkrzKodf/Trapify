document.addEventListener('DOMContentLoaded', function() {

    var searchButton = document.getElementById('searchLink');
    var searchBox = document.querySelector('.search-box');

    searchButton.addEventListener('click', function() {
      searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
    });
  });
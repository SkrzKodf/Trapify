document.addEventListener('DOMContentLoaded', (event) => {
  const searchLink = document.getElementById('searchLink');
  const searchBox = document.getElementById('searchBox');

  searchLink.addEventListener('click', function(event) {
    event.preventDefault();
    // Переключаем видимость поискового блока
    if (searchBox.style.display === 'none' || !searchBox.style.display) {
      searchBox.style.display = 'block';
    } else {
      searchBox.style.display = 'none';
    }
  });
});
// document.addEventListener('DOMContentLoaded', function() {

//     var searchButton = document.getElementById('searchLink');
//     var searchBox = document.querySelector('.search-box');

//     searchButton.addEventListener('click', function() {
//       searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
//     });

    
//   });

document.addEventListener('DOMContentLoaded', function() {
    var header = document.getElementById('headId'); 
    var headerHeight = header.offsetHeight;
    var elementToOffset = document.getElementById('searchBox');; 
    elementToOffset.style.marginTop = headerHeight + 'px';
});
document.addEventListener('DOMContentLoaded', function() {
  const searchToggleBtn = document.querySelector('.search-toggle-btn');
  const searchContainer = document.getElementById('searchContainer');
  
  if (searchToggleBtn && searchContainer) {
    
    const isMobile = () => window.innerWidth <= 576;
    
    
    const updateVisibility = () => {
      if (isMobile()) {
        
        if (!searchContainer.classList.contains('show')) {
          searchContainer.style.display = 'none';
        }
      } else {
        
        searchContainer.style.display = 'block';
      }
    };
    
    
    updateVisibility();
    
    
    window.addEventListener('resize', updateVisibility);
    
    
    searchToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      
      searchContainer.classList.toggle('show');
      
      
      if (searchContainer.classList.contains('show')) {
        searchContainer.style.display = 'block';
        const searchInput = searchContainer.querySelector('.search-input');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 300);
        }
      } else {
        searchContainer.style.display = 'none';
      }
    });
    
    
    document.addEventListener('click', function(e) {
      if (!searchContainer.contains(e.target) && !searchToggleBtn.contains(e.target)) {
        searchContainer.classList.remove('show');
        if (isMobile()) {
          searchContainer.style.display = 'none';
        }
      }
    });
    
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchContainer.classList.contains('show')) {
        searchContainer.classList.remove('show');
        if (isMobile()) {
          searchContainer.style.display = 'none';
        }
      }
    });
  }
}); 
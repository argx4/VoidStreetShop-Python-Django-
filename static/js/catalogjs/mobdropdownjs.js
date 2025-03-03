function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById('categoryDropdown');
    dropdown.classList.toggle('show');
    
    
    document.addEventListener('click', function closeDropdown(e) {
      if (!e.target.closest('.category-dropdown')) {
        dropdown.classList.remove('show');
        document.removeEventListener('click', closeDropdown);
      }
    });
  }
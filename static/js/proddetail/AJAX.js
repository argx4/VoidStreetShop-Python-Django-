const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      
      const counterElements = document.querySelectorAll('.cart-counter');
      
      counterElements.forEach(counterElement => {
        
        let currentCount = parseInt(counterElement.textContent.trim()) || 0;
        
        currentCount += 1;
        
        counterElement.textContent = currentCount;
        
        counterElement.style.display = '';
      });
    }
  });
});
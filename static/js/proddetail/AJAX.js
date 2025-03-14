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
      // Directly update the cart counter
      const counterElements = document.querySelectorAll('.cart-counter');
      
      counterElements.forEach(counterElement => {
        // Get current count or default to 0
        let currentCount = parseInt(counterElement.textContent.trim()) || 0;
        // Increment by 1
        currentCount += 1;
        // Update the counter text
        counterElement.textContent = currentCount;
        // Make sure it's visible
        counterElement.style.display = '';
      });
    }
  });
});
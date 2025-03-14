document.addEventListener('DOMContentLoaded', function() {
    // This script handles cart counter updates for regular (non-AJAX) forms
    
    // Check if we're on a page with a product detail AJAX form
    // If so, don't add our handlers because AJAX.js will handle it
    if (document.querySelector('script[src*="AJAX.js"]')) {
        // We're on the product detail page with AJAX
        // Only initialize the counter display but don't add event handlers
        initializeCounter();
        return;
    }
    
    // For regular form submissions
    const addToCartForms = document.querySelectorAll('form[action*="basket_add"]');
    
    addToCartForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            updateCartCounter(true);
        });
    });
    
    // For cart removal buttons (when in the basket page)
    const removeButtons = document.querySelectorAll('a[href*="basket_remove"]');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            updateCartCounter(false);
        });
    });
    
    // Run initialization
    initializeCounter();
    
    // Helper functions
    
    // Update counter function
    function updateCartCounter(increment = true) {
        const counterElements = document.querySelectorAll('.cart-counter');
        
        counterElements.forEach(counterElement => {
            let currentCount = parseInt(counterElement.textContent.trim()) || 0;
            
            if (increment) {
                // Increment counter
                counterElement.textContent = currentCount + 1;
                
                // Ensure counter is visible
                counterElement.style.display = '';
            } else {
                // Decrement counter
                if (currentCount > 1) {
                    counterElement.textContent = currentCount - 1;
                } else {
                    // Hide counter if count becomes 0
                    counterElement.style.display = 'none';
                }
            }
        });
    }
    
    // Initial setup - ensure counter is visible if there are items
    function initializeCounter() {
        const counterElements = document.querySelectorAll('.cart-counter');
        
        counterElements.forEach(counterElement => {
            const count = parseInt(counterElement.textContent.trim()) || 0;
            if (count > 0) {
                counterElement.style.display = '';
            } else {
                counterElement.style.display = 'none';
            }
        });
    }
});

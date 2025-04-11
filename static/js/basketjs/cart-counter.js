document.addEventListener('DOMContentLoaded', function() {
    
    if (document.querySelector('script[src*="AJAX.js"]')) {
        
        
        initializeCounter();
        return;
    }
    
    
    const addToCartForms = document.querySelectorAll('form[action*="basket_add"]');
    
    addToCartForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            updateCartCounter(true);
        });
    });
    
    
    const removeButtons = document.querySelectorAll('a[href*="basket_remove"]');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            updateCartCounter(false);
        });
    });
    
    
    initializeCounter();
    
    
    
    
    function updateCartCounter(increment = true) {
        const counterElements = document.querySelectorAll('.cart-counter');
        
        counterElements.forEach(counterElement => {
            let currentCount = parseInt(counterElement.textContent.trim()) || 0;
            
            if (increment) {
                
                counterElement.textContent = currentCount + 1;
                
                
                counterElement.style.display = '';
            } else {
                
                if (currentCount > 1) {
                    counterElement.textContent = currentCount - 1;
                } else {
                    
                    counterElement.style.display = 'none';
                }
            }
        });
    }
    
    
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

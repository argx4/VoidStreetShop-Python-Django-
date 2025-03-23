function showCustomAlert(message, callback) {
    const alertContainer = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    const okButton = document.getElementById('custom-alert-ok');
    
    alertMessage.textContent = message;
    alertContainer.style.display = 'flex';
    
    
    const newOkButton = okButton.cloneNode(true);
    okButton.parentNode.replaceChild(newOkButton, okButton);
    
    
    newOkButton.addEventListener('click', function() {
        alertContainer.style.display = 'none';
        if (typeof callback === 'function') {
            callback();
        }
    });
}


function clearBasket() {
    fetch('/basket/clear/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
        },
    })
    .then(response => {
        if (response.ok) {
            
            document.querySelector('.products').innerHTML = '';
            document.getElementById('basket_items').value = '';
            document.querySelector('.total_sum').innerHTML = 'К оплате: 0 ₴';
            window.location.href = '/basket/';
        }
    });
}


document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    
    showCustomAlert('Замовлення успішно створено! Очікуйте повідомлення менеджера!', function() {
        
        emailjs.sendForm('service_fpsn2s3', 'template_n7qe5dg', form)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                form.reset();
                clearBasket();
            }, function(error) {
                console.error('FAILED...', error);
                showCustomAlert('Ошибка отправки: ' + JSON.stringify(error, null, 2));
            })
            .finally(function() {
                submitButton.disabled = false;
                submitButton.textContent = 'Оформить заказ';
            });
    });
});
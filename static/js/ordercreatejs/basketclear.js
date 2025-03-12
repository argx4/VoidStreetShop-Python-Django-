function clearBasket() {
    fetch('/basket/clear/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
        },
    })
    .then(response => {
        if (response.ok) {
            // Очищаем отображение корзины на странице
            document.querySelector('.products').innerHTML = '';
            document.getElementById('basket_items').value = '';
            document.querySelector('.total_sum').innerHTML = 'К оплате: 0 ₴';
            window.location.href = '/basket/';
        }
    });
}

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    emailjs.sendForm('service_fpsn2s3', 'template_n7qe5dg', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Замовлення успішно створено! Очікуйте повідомлення менеджера!');
            document.getElementById('order-form').reset();
            clearBasket();
        }, function(error) {
            console.error('FAILED...', error);
            alert('Ошибка отправки: ' + JSON.stringify(error, null, 2));
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = 'Оформить заказ';
        });
});
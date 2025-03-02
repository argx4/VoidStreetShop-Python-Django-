const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
let alertShown = false;

const appendAlert = (message, type) => {
  if (!alertShown) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible fade black-alert" role="alert">`,
      `   <div>${message}</div>`,
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
    alertShown = true;


    setTimeout(() => {
      wrapper.querySelector('.alert').classList.add('show');
    }, 10);

    setTimeout(() => {
      const alert = wrapper.querySelector('.alert');
      alert.classList.remove('show');


      setTimeout(() => {
        alert.remove();
        alertShown = false;
      }, 300);
    }, 1000);
  }
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Додано в кошик!', 'success')
  })
}
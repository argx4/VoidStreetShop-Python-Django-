const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();


    const formData = new FormData(form);


    fetch(form.action, {
      method: 'POST',
      body: formData
    })

  });
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.querySelector('.back-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const hasSearch = urlParams.has('search');
    const hasCategory = urlParams.has('category');

    if (hasSearch || hasCategory) {
        backBtn.classList.add('show');
    }
}); 
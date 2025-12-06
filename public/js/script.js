document.addEventListener('DOMContentLoaded', () => {

    const burgerBtn = document.querySelector('.burger-btn');
    const navList = document.querySelector('.nav-list');

    if (burgerBtn && navList) {
        
        burgerBtn.addEventListener('click', () => {
            navList.classList.toggle('is-open');
            const isExpanded = navList.classList.contains('is-open');
            burgerBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
});
const burger = document.querySelector('.burger');
const nav = document.querySelector('.sivu-palkki');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});
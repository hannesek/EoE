const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


document.addEventListener("DOMContentLoaded", function() {
    const aboutBanner = document.getElementById('about-banner');
    const aboutSection = document.getElementById('about');

    if (aboutBanner && aboutSection) {
        aboutBanner.addEventListener('click', function() {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

//About us banner scroll
document.addEventListener("DOMContentLoaded", function() {
    const aboutBanner = document.getElementById('about-banner');
    const aboutSection = document.getElementById('about');

    if (aboutBanner && aboutSection) {
        aboutBanner.addEventListener('click', function() {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Fade in on initial load
    document.body.classList.add('fade-in');

    // Smooth scroll within the page
    const smoothScrollLinks = document.querySelectorAll('.navbar__links');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                event.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth page transition
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.hostname === window.location.hostname && link.pathname !== window.location.pathname) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const url = this.href;

                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = url;
                }, 100); 
            });
        }
    });

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            document.body.classList.remove('fade-out');
        }
        document.body.classList.add('fade-in');
    });
});

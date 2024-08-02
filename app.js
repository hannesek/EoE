const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


// Function to detect scroll to the bottom of the page
function checkScroll() {
    // Get the footer element
    const footer = document.querySelector('footer');
    
    // Calculate the total height of the document and the viewport
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to the bottom
    if (scrollPosition >= documentHeight) {
        footer.classList.add('show'); // Add 'show' class to reveal the footer
    } else {
        footer.classList.remove('show'); // Remove 'show' class to hide the footer
    }
}

// Add event listener for scroll events
window.addEventListener('scroll', checkScroll);

document.addEventListener("DOMContentLoaded", function() {
    const aboutBanner = document.getElementById('about-banner');
    const aboutSection = document.getElementById('about');

    if (aboutBanner && aboutSection) {
        aboutBanner.addEventListener('click', function() {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
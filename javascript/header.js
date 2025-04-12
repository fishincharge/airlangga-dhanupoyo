// Get navigation elements
const navigationHome = document.getElementById('id-navigation-home');
const navigationCatalogue = document.getElementById('id-navigation-catalogue');
const navigationAbout = document.getElementById('id-navigation-about');
const navLinks = document.querySelectorAll('.nav-link');

// Section elements
const homeSection = document.getElementById('id-top'); // Assuming you have this
const catalogueSection = document.getElementById('id-catalogue-scroll');
const aboutSection = document.getElementById('id-about-scroll');

// Click handlers
navigationHome.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    setActiveLink(navigationHome);
});

navigationCatalogue.addEventListener('click', function(e) {
    e.preventDefault();
    catalogueSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    setActiveLink(navigationCatalogue);
});

navigationAbout.addEventListener('click', function(e) {
    e.preventDefault();
    const targetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    setActiveLink(navigationAbout);
});

// Set active link helper function
function setActiveLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Scroll position detection
function updateActiveLinkOnScroll() {
    const scrollPosition = window.scrollY + 200; // Adjust offset as needed
    
    // Home section (top of page)
    if (scrollPosition < catalogueSection.offsetTop - 300) {
        setActiveLink(navigationHome);
    }
    // Catalogue section
    else if (scrollPosition < aboutSection.offsetTop - 300) {
        setActiveLink(navigationCatalogue);
    }
    // About section
    else {
        setActiveLink(navigationAbout);
    }
}

// Throttle scroll events for better performance
let isScrolling;
window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(updateActiveLinkOnScroll, 100);
});

// Initialize active link on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveLinkOnScroll();
    
    // Add click handler for all nav-links to maintain your existing functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveLink(this);
        });
    });
});
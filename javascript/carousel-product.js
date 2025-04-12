function scrollCarousel(direction) {
    const carouselProduct = document.getElementById('productCarousel');
    const scrollAmount = 300; // Adjust this value as needed
    
    if (direction === -1) {
        carouselProduct.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        carouselProduct.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// New drag scrolling functionality
const carouselProduct = document.getElementById('productCarousel');
let isDragging = false;
let startX, scrollLeft;

carouselProduct.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carouselProduct.offsetLeft;
    scrollLeft = carouselProduct.scrollLeft;
    // carouselProduct.style.cursor = 'grabbing';
    e.preventDefault();
});

carouselProduct.addEventListener('mouseleave', () => {
    isDragging = false;
    // carouselProduct.style.cursor = 'grab';
});

carouselProduct.addEventListener('mouseup', () => {
    isDragging = false;
    // carouselProduct.style.cursor = 'grab';
});

carouselProduct.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselProduct.offsetLeft;
    const walk = (x - startX) * 2;
    carouselProduct.scrollLeft = scrollLeft - walk;
});
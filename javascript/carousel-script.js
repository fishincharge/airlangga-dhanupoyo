const numberingCircle = document.querySelectorAll('.circle');
const numberingFont = document.querySelectorAll('.circle p');
const bannerButtons = document.querySelectorAll('.banner-numbering button');
const carousel = document.querySelector('#carousel-promotion');

numberingCircle[0]?.classList.add('active-circle');
numberingFont[0]?.classList.add('active-numbering');

// Function to update circle styles based on active slide
function updateActiveCircle() {
    // Find the currently active carousel item
    const activeSlide = carousel.querySelector('.carousel-item.active');
    if (!activeSlide) return;
    
    // Get its index (from data-bs-slide-to or by position)
    const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(activeSlide);
    
    // Remove all active classes from circles
    document.querySelectorAll('.circle, .circle p').forEach(el => {
      el.classList.remove('active-circle', 'active-numbering');
    });
    
    // Add active classes to corresponding circle
    if (bannerButtons[activeIndex]) {
      const circle = bannerButtons[activeIndex].querySelector('.circle');
      if (circle) {
        circle.classList.add('active-circle');
        const number = circle.querySelector('p');
        if (number) number.classList.add('active-numbering');
      }
    }
  }

// Initial update
updateActiveCircle();

// Update when carousel slides
carousel.addEventListener('slid.bs.carousel', updateActiveCircle);

bannerButtons.forEach(button => {
    button.addEventListener('click', function(){
        numberingCircle.forEach(numberingCircle => numberingCircle.classList.remove('active-circle'));
        numberingFont.forEach(numberingFont => numberingFont.classList.remove('active-numbering'));

        const index = [...bannerButtons].indexOf(button);
        numberingCircle[index]?.classList.add('active-circle');
        numberingFont[index]?.classList.add('active-numbering');
    });
});

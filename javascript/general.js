let currentWidth = window.innerWidth;
window.addEventListener("resize", function(){
    const newWidth = window.innerWidth;
    // Only reload if crossing the threshold (either direction)
    if((currentWidth >= 768 && newWidth < 768) || 
       (currentWidth < 768 && newWidth >= 768)) {
        window.location.reload();
    }
    currentWidth = newWidth;
});
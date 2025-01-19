document.addEventListener('DOMContentLoaded', function() {
    // Get all elements that need to fade up
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset when animation triggers
    });

    // Observe each fade element
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

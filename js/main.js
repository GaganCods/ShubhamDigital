// Portfolio Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Initially show only 2 items from each category
    filterInitialItems();

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                item.style.display = 'none'; // Hide all items first
                
                if (filter === 'all') {
                    // Show 2 items from each category
                    filterInitialItems();
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block'; // Show all items of selected category
                }
            });
        });
    });

    function filterInitialItems() {
        const categories = ['wedding', 'event', 'portrait'];
        categories.forEach(category => {
            const items = document.querySelectorAll(`.portfolio-item.${category}`);
            items.forEach((item, index) => {
                item.style.display = index < 2 ? 'block' : 'none';
            });
        });
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const consent = document.getElementById('consent').checked;
    const errorDiv = document.getElementById('error');

    // Clear previous error messages
    errorDiv.textContent = '';

    // Validation
    if (!name || !email || !phone || !subject || !message || !consent) {
        errorDiv.textContent = 'Please fill in all the fields and agree to the privacy policy.';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorDiv.textContent = 'Please enter a valid email address.';
        return;
    }

    // Construct the WhatsApp message with the new template and emojis
    const whatsappMessage = `👋 Hi there!\n\n` +
        `🌟 Name: ${name} \n` +
        `📧 Email: ${email} \n` +
        `📱 Phone: ${phone} \n` +
        `📌 Subject: ${subject} \n` +
        `💬 Message: ${message} \n\n` +
        `I want to reach out you for more details! 😊`;

    // WhatsApp URL (Ensure phone number is in international format)
    const phoneNumber = '9536388420'; // Your WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    document.getElementById('contactForm').reset();
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const whatsappLink = "https://whatsapp.com/channel/0029Vb1wScPBA1esC9P8zK2h";
    
    window.open(whatsappLink, '_blank'); // Open in a new tab
});

// Initialize mobile navigation
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    // ... other initializations ...
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Prevent video downloading
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('featured-video');
    
    if (video) {
        // Disable right click on video
        video.addEventListener('contextmenu', e => e.preventDefault());
        
        // Disable keyboard shortcuts
        video.addEventListener('keydown', e => {
            if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
            }
        });
        
        // Re-enable controls interaction
        video.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.paused) {
                    this.play();
                } else {
                    this.pause();
                }
            }
        });
    }
});

// Counter Animation
function startCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // Smoother animation with smaller increments
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Initialize counters when they become visible
const observeCounters = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.dataset.target);
            entry.target.textContent = '0'; // Start from zero
            startCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.2 }); // Trigger earlier

// Start observing counter elements
document.addEventListener('DOMContentLoaded', () => {
    const counterElements = document.querySelectorAll('.counter-number');
    counterElements.forEach(counter => {
        counter.textContent = '0' + (counter.dataset.suffix || '');
        observeCounters.observe(counter);
    });
});

// Newsletter Subscription Handler - Updated Version
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Basic email validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            // Store email in localStorage (optional)
            localStorage.setItem('subscribedEmail', email);

            // Open WhatsApp Channel
            const whatsappLink = "https://whatsapp.com/channel/0029Vb1wScPBA1esC9P8zK2h";
            window.open(whatsappLink, '_blank');

            // Reset form and show success message
            this.reset();
            alert('Thank you for subscribing! You will be redirected to our WhatsApp Channel.');
        });
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // initializeNavigation();
    // initializeVideoPlayer();
    // initializeContactForm();
});

// Gallery Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const popup = document.querySelector('.gallery-popup');
    const popupImage = document.getElementById('popupImage');
    const closeBtn = document.querySelector('.popup-close');
    const prevBtn = document.querySelector('.popup-nav.prev');
    const nextBtn = document.querySelector('.popup-nav.next');
    let currentImageIndex = 0;
    let currentImages = [];

    // Function to open popup
    function openPopup(image, images) {
        popupImage.src = image.src;
        popupImage.alt = image.alt;
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        currentImages = images;
        currentImageIndex = currentImages.indexOf(image);
        
        // Show/hide navigation based on number of images
        if (currentImages.length <= 1) {
            popup.classList.add('single-image');
        } else {
            popup.classList.remove('single-image');
        }
    }

    // Function to close popup
    function closePopup() {
        popup.classList.remove('active');
        popup.classList.remove('single-image');
        document.body.style.overflow = ''; // Restore scrolling
        popupImage.src = '';
        popupImage.alt = '';
    }

    // Function to navigate to next/previous image
    function navigateImage(direction) {
        if (currentImages.length <= 1) return;
        
        currentImageIndex = (currentImageIndex + direction + currentImages.length) % currentImages.length;
        const newImage = currentImages[currentImageIndex];
        
        // Add fade effect
        popupImage.style.opacity = '0';
        setTimeout(() => {
            popupImage.src = newImage.src;
            popupImage.alt = newImage.alt;
            popupImage.style.opacity = '1';
        }, 200);
    }

    // Add click event to gallery items
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        img.addEventListener('click', () => {
            const visibleImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img'));
            openPopup(img, visibleImages);
        });
    });

    // Close popup when clicking outside the image
    popup.addEventListener('click', (e) => {
        // Close only if clicking the dark overlay (not the image or navigation buttons)
        if (e.target === popup || e.target.classList.contains('gallery-popup')) {
            closePopup();
        }
    });

    // Prevent popup from closing when clicking the content area
    document.querySelector('.popup-content').addEventListener('click', (e) => {
        // Stop event from reaching the popup overlay
        e.stopPropagation();
    });

    // Navigation buttons should not trigger popup close
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage(-1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage(1);
    });

    // Close button click event
    closeBtn.addEventListener('click', closePopup);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!popup.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closePopup();
                break;
            case 'ArrowLeft':
                navigateImage(-1);
                break;
            case 'ArrowRight':
                navigateImage(1);
                break;
        }
    });
});
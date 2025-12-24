// Équi-Solutions Website JavaScript
// Professional Interactivity & Form Handling

// ================================
// Mobile Menu Toggle
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
});

// ================================
// Smooth Scroll for Navigation Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Scroll Animation for Stats
// ================================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // Only animate numbers
                if (text.match(/\d+/)) {
                    const number = parseInt(text.match(/\d+/)[0]);
                    const suffix = text.replace(/\d+/, '');
                    
                    animateNumber(target, 0, number, 2000, suffix);
                    observer.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Initialize stats animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStats);
} else {
    animateStats();
}

// ================================
// Scroll Reveal Animation
// ================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .principle, .age-group, .package, .feature, .highlight');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize reveal animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealOnScroll);
} else {
    revealOnScroll();
}

// ================================
// Contact Form Handling
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                location: document.getElementById('location').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Show success message
                showFormMessage('success', 'Merci! Votre message a été envoyé. Je vous contacterai bientôt.');
                
                // Reset form
                contactForm.reset();
                
                // Here you would typically send the form data to your server
                // Example: sendFormData(formData);
                
                console.log('Form submitted:', formData);
            }
        });
    }
});

function validateForm(data) {
    const errors = [];
    
    // Validate name
    if (data.name.trim().length < 2) {
        errors.push('Veuillez entrer votre nom complet');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
        errors.push('Veuillez entrer un numéro de téléphone valide');
    }
    
    // Validate service selection
    if (!data.service) {
        errors.push('Veuillez sélectionner un type de service');
    }
    
    // Validate message
    if (data.message.trim().length < 10) {
        errors.push('Veuillez entrer un message plus détaillé (minimum 10 caractères)');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showFormMessage('error', errors.join('<br>'));
        return false;
    }
    
    return true;
}

function showFormMessage(type, message) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = message;
    
    // Style the message
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginTop = '1rem';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.fontWeight = '500';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    
    // Insert message after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// ================================
// Active Navigation Link Highlighting
// ================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ================================
// Navbar Background on Scroll
// ================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ================================
// Phone Number Click Tracking (Optional)
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone number clicked:', this.getAttribute('href'));
            // You can add analytics tracking here
        });
    });
});

// ================================
// Email Link Click Tracking (Optional)
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email link clicked:', this.getAttribute('href'));
            // You can add analytics tracking here
        });
    });
});

// ================================
// Service Card Interaction Enhancement
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-green)';
            this.style.borderWidth = '2px';
            this.style.borderStyle = 'solid';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.border = 'none';
            }
        });
    });
});

// ================================
// Package Card Comparison Helper
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const packages = document.querySelectorAll('.package');
    
    packages.forEach(pkg => {
        pkg.addEventListener('click', function(e) {
            // Don't trigger if clicking a button
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Toggle selection highlight
            this.classList.toggle('selected');
            
            // Add visual feedback
            if (this.classList.contains('selected')) {
                this.style.borderColor = 'var(--accent-gold)';
                this.style.borderWidth = '3px';
            } else {
                this.style.borderColor = 'transparent';
                this.style.borderWidth = '1px';
            }
        });
    });
});

// ================================
// Print Pricing Helper
// ================================
function printPricing() {
    window.print();
}

// Add print button functionality if needed
document.addEventListener('DOMContentLoaded', function() {
    const printButtons = document.querySelectorAll('[data-action="print"]');
    printButtons.forEach(button => {
        button.addEventListener('click', printPricing);
    });
});

// ================================
// Accessibility: Keyboard Navigation
// ================================
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// ================================
// Load Performance Monitoring
// ================================
window.addEventListener('load', function() {
    console.log('Équi-Solutions website loaded successfully');
    console.log('Contact: +33 7 44 75 07 13');
    console.log('Email: contact@equi-solutions.fr');
});

// ================================
// Console Welcome Message
// ================================
console.log('%c🐴 Équi-Solutions', 'font-size: 24px; font-weight: bold; color: #2C5F2D;');
console.log('%cSolutions through trust', 'font-size: 14px; font-style: italic; color: #666;');
console.log('%cMobile Equine Behavioral Specialist', 'font-size: 12px; color: #4A4A4A;');
console.log('📞 +33 7 44 75 07 13');
console.log('✉️ contact@equi-solutions.fr');
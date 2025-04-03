// Mobile Menu Toggle
const hambergerMenu = document.querySelector('.hamberger-menu');
const closeMenu = document.querySelector('.close-menu');
const mainMenu = document.querySelector('.mainmenu-nav');

hambergerMenu.addEventListener('click', () => {
    mainMenu.classList.add('active');
    hambergerMenu.style.display = 'none';
    closeMenu.style.display = 'block';
});

closeMenu.addEventListener('click', () => {
    mainMenu.classList.remove('active');
    hambergerMenu.style.display = 'block';
    closeMenu.style.display = 'none';
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (mainMenu.classList.contains('active')) {
                mainMenu.classList.remove('active');
                hambergerMenu.style.display = 'block';
                closeMenu.style.display = 'none';
            }
        }
    });
});

// Typing Animation
const words = document.querySelectorAll('.cd-words-wrapper b');
let currentWord = 0;

function typeWord() {
    const word = words[currentWord];
    word.style.opacity = '1';
    word.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(20px)';
        
        currentWord = (currentWord + 1) % words.length;
        
        setTimeout(typeWord, 500);
    }, 2000);
}

// Start typing animation when the page loads
window.addEventListener('load', typeWord);

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    notification.offsetHeight;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Resume Tabs
const resumeTabs = document.querySelectorAll('.nav-tabs .nav-link');
const resumeContents = document.querySelectorAll('.resume-content > div');

resumeTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs
        resumeTabs.forEach(t => t.classList.remove('active'));
        resumeContents.forEach(c => c.style.display = 'none');
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const targetId = tab.getAttribute('href');
        const targetContent = document.querySelector(targetId);
        if (targetContent) {
            targetContent.style.display = 'block';
        }
    });
});

// Set initial active tab
if (resumeTabs.length > 0) {
    resumeTabs[0].click();
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section, .project-card').forEach(element => {
    observer.observe(element);
});

// Typing Animation for Hero Section
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
} 
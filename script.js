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


// pricing Tab Navigation
document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons and panes
      document.querySelectorAll('.tab-button').forEach((btn) => btn.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach((pane) => pane.classList.remove('active'));
  
      // Add active class to the clicked button and corresponding pane
      this.classList.add('active');
      const target = document.querySelector(this.getAttribute('data-target'));
      console.log('Activating tab:', target); // Debugging line
      target.classList.add('active');
    });
  });



// Resume Tab Navigation
document.querySelectorAll('.resume-tab-button').forEach((button) => {
    button.addEventListener('click', function () {
      // Remove active class from all Resume buttons and panes
      document.querySelectorAll('.resume-tab-button').forEach((btn) => btn.classList.remove('active'));
      document.querySelectorAll('.resume-tab-pane').forEach((pane) => pane.classList.remove('active'));
  
      // Add active class to the clicked Resume button and corresponding pane
      this.classList.add('active');
      const target = document.querySelector(this.getAttribute('data-target'));
      target.classList.add('active');
    });
  });
  

  
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

document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Your message has been sent successfully!');
  });
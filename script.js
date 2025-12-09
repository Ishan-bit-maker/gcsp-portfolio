// Initialize Feather Icons
feather.replace();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (sidebar.classList.contains('open')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        }
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-feather', 'menu');
                feather.replace();
            }
        }
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            }
        }
    });
});

// Active Navigation Highlighting
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navItems.forEach(item => {
        const itemSection = item.getAttribute('data-section') || item.getAttribute('href')?.substring(1);
        if (itemSection === current) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
    
    // Add fade-in to section headings
    const headings = document.querySelectorAll('.section-heading, .section-intro');
    headings.forEach(heading => {
        heading.classList.add('fade-in');
        observer.observe(heading);
    });
    
    // Make first section visible immediately
    const firstSection = document.querySelector('#home');
    if (firstSection) {
        const firstCards = firstSection.querySelectorAll('.fade-in');
        firstCards.forEach(card => card.classList.add('visible'));
    }
    
    // Initial active nav update
    updateActiveNav();
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    updateActiveNav();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('open');
    }
});

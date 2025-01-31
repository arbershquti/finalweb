let images = ['images/background.jpg', 'images/1.jpg', 'images/2.jpg'];
let currentImage = 0;
let header = document.getElementById('hero');

function changeImage() {
    header.style.backgroundImage = `url(${images[currentImage]})`;
    currentImage = (currentImage + 1) % images.length;
}

// Auto-rotate header background every 7 seconds
setInterval(changeImage, 7000);

// Manual-rotate on click
header.onclick = changeImage;

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const timerElement = document.querySelector('.timer');
    let currentSlide = 0;
    let timer = 7;
    const projectNames = ['House Extension Project', 'House Renovation Project', 'Living Room Project'];

    function showSlide() {
        // Add leaving class to current active slide
        const activeSlide = document.querySelector('.carousel-slide.active');
        if (activeSlide) {
            activeSlide.classList.add('leaving');
        }

        // Remove all classes from the next slide
        slides[currentSlide].classList.remove('active', 'leaving');

        // Show the current slide after a short delay to allow the leaving animation
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
        }, 50);

        // Update project name and color
        timerElement.innerHTML = `<span class="timer-number">${timer}</span> | <span class="project-name">${projectNames[currentSlide]}</span>`;

        // Move to the next slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Reset the timer
        timer = 7;
    }

    // Show the first slide immediately
    showSlide();

    // Auto-rotate every 5 seconds
    setInterval(showSlide, 5000);

    // Update the timer every second
    setInterval(() => {
        timer--;
        // Update only the timer number, keep the project name
        const timerNumber = timerElement.querySelector('.timer-number');
        timerNumber.textContent = timer;
    }, 1000);

    // Add touch support for carousel
    const carousel = document.querySelector('.carousel');
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchEndX < touchStartX) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide();
        }
        if (touchEndX > touchStartX) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    const aboutContent = document.querySelector('.about-content');
    const aboutElements = document.querySelectorAll('.about-title h2, .about-title h3, .about-text p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-content')) {
                    entry.target.classList.add('animate');
                    // Animate child elements with a delay
                    aboutElements.forEach((el, index) => {
                        setTimeout(() => el.classList.add('animate'), index * 200);
                    });
                } else {
                    entry.target.classList.add('animate');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    projectItems.forEach(item => {
        observer.observe(item);
    });
    
    if (aboutContent) {
        observer.observe(aboutContent);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const imageWithTextSection = document.querySelector('.image-with-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (imageWithTextSection) {
        observer.observe(imageWithTextSection);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.quote-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            fullName: form.querySelector('#full-name').value,
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            address: form.querySelector('#address').value,
            postcode: form.querySelector('#postcode').value,
            source: form.querySelector('#source').value,
            message: form.querySelector('#message').value
        };
        
        try {
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Format message for WhatsApp
            const whatsappMessage = `
*New Consultation Request*

*Name:* ${formData.fullName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Address:* ${formData.address}
*Postcode:* ${formData.postcode}
*Found Us Through:* ${formData.source}

*Message:*
${formData.message}`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Replace with your phone number (include country code without '+')
            const phoneNumber = '355697506265';
            
            // Create WhatsApp URL
            const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
            
            // Redirect to WhatsApp directly
            window.location.href = whatsappURL;
            
            // Show success message
            showNotification('Thank you! Connecting to WhatsApp...', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            // Show error message
            showNotification('Something went wrong. Please try again.', 'error');
            console.error('Error:', error);
            
        } finally {
            // Reset button state
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});

// Notification styles and function (same as before)
const styles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 4px;
        color: white;
        font-size: 1rem;
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
        max-width: 400px;
    }

    .notification.success {
        background-color: rgba(46, 125, 50, 0.9);
        backdrop-filter: blur(10px);
    }

    .notification.error {
        background-color: rgba(211, 47, 47, 0.9);
        backdrop-filter: blur(10px);
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Notification function
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.5s ease-out reverse';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

document.querySelectorAll('.borough').forEach(borough => {
    borough.addEventListener('click', () => {
        // Remove active class from all boroughs
        document.querySelectorAll('.borough').forEach(b => b.classList.remove('active'));
        
        // Add active class to the clicked borough
        borough.classList.add('active');
        
        // Get the selected borough
        const selectedBorough = borough.getAttribute('data-borough');
        
        // Log the selected borough (replace with your filtering logic)
        console.log(`Selected borough: ${selectedBorough}`);
        
        // Example: Filter projects based on the selected borough
        filterProjects(selectedBorough);
    });
});

function filterProjects(borough) {
    // Example: Fetch projects for the selected borough
    fetch(`/api/projects?borough=${borough}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Projects in ${borough}:`, data);
            // Update the UI with the filtered projects
            updateProjectList(data);
        })
        .catch(error => console.error('Error fetching projects:', error));
}

function updateProjectList(projects) {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;

    // Clear existing projects
    projectList.innerHTML = '';

    // Add new projects
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <img src="${project.image}" alt="${project.title}">
        `;
        projectList.appendChild(projectItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const timelineSteps = document.querySelectorAll('.timeline-step');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineSteps.forEach(step => {
        observer.observe(step);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('project-filter');
    const projectItems = document.querySelectorAll('.project-item');

    filterSelect.addEventListener('change', function() {
        const selectedCategory = this.value;

        projectItems.forEach(project => {
            if (selectedCategory === 'all' || project.dataset.category === selectedCategory) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// LTAB - Main JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeFormHandling();
    initializeAnimations();
    initializeScrollEffects();
});

// Navigation Functions
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    // Add mobile menu functionality if needed
    console.log('Mobile menu toggled');
}

// Scroll to form function for CTA buttons
function scrollToForm() {
    const formSection = document.getElementById('contact');
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = formSection.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Form Handling
function initializeFormHandling() {
    const form = document.getElementById('auditForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const modal = document.getElementById('successModal');
    
    form.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(event) {
    const field = event.target;
    const fieldGroup = field.closest('.form-group') || field.parentElement;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Remove existing validation classes
    fieldGroup.classList.remove('error', 'success');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = `${getFieldDisplayName(fieldName)} is required.`;
    }
    
    // Specific field validations
    switch (fieldName) {
        case 'contactNumber':
            if (field.value && !isValidPhoneNumber(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
            break;
        case 'fullName':
            if (field.value && field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
            break;
        case 'businessName':
            if (field.value && field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Business name must be at least 2 characters long.';
            }
            break;
    }
    
    // Apply validation styling and messages
    if (!isValid) {
        fieldGroup.classList.add('error');
        showFieldError(fieldGroup, errorMessage);
    } else if (field.value.trim()) {
        fieldGroup.classList.add('success');
        hideFieldError(fieldGroup);
    }
    
    return isValid;
}

function clearFieldError(event) {
    const field = event.target;
    const fieldGroup = field.closest('.form-group') || field.parentElement;
    fieldGroup.classList.remove('error');
    hideFieldError(fieldGroup);
}

function showFieldError(fieldGroup, message) {
    let errorElement = fieldGroup.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        fieldGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideFieldError(fieldGroup) {
    const errorElement = fieldGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function getFieldDisplayName(fieldName) {
    const names = {
        'fullName': 'Full Name',
        'email': 'Email Address',
        'contactNumber': 'Contact Number',
        'businessName': 'Business Name',
        'businessCategory': 'Business Category'
    };
    return names[fieldName] || fieldName;
}

function isValidPhoneNumber(phone) {
    // Basic phone validation - accepts various formats
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validate all fields
    const fields = form.querySelectorAll('input[required], select[required]');
    let isFormValid = true;
    
    fields.forEach(field => {
        const isFieldValid = validateField({ target: field });
        if (!isFieldValid) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showFormError('Please fix the errors above and try again.');
        return;
    }
    
    // Show loading state
    form.classList.add('form-loading');
    submitButton.disabled = true;
    
    try {
        // Get form data for WhatsApp
        const formValues = {
            fullName: formData.get('fullName').trim(),
            email: formData.get('email').trim(),
            contactNumber: formData.get('contactNumber').trim(),
            businessName: formData.get('businessName').trim(),
            businessCategory: formData.get('businessCategory')
        };
        
        // Show success message
        showSuccessModal();
        
        // Redirect to WhatsApp (works locally and on live website)
        setTimeout(() => {
            redirectToWhatsApp(formValues);
        }, 1500);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError('Something went wrong. Please try again or contact us directly.');
    } finally {
        // Remove loading state after a delay
        setTimeout(() => {
            form.classList.remove('form-loading');
            submitButton.disabled = false;
        }, 2500);
    }
}

function showFormError(message) {
    // Create or update error message
    const form = document.getElementById('auditForm');
    let errorElement = form.querySelector('.form-general-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-general-error bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4';
        form.appendChild(errorElement);
    }
    
    errorElement.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    errorElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }, 5000);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    
    // Auto-hide modal after redirect
    setTimeout(() => {
        hideSuccessModal();
    }, 3000);
}

function hideSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}



function redirectToWhatsApp(formData) {
    const whatsappNumber = '919164060961';
    const message = createWhatsAppMessage(formData);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Try to open WhatsApp
    try {
        window.open(whatsappUrl, '_blank');
        hideSuccessModal();
        
        // Reset form after successful submission
        setTimeout(() => {
            document.getElementById('auditForm').reset();
            clearAllFieldValidation();
        }, 1000);
        
    } catch (error) {
        console.error('WhatsApp redirect error:', error);
        
        // Fallback: show direct contact information
        showFallbackContact();
    }
}

function createWhatsAppMessage(data) {
    return `Hi! I'm interested in LTAB services.

My Details:
📝 Name: ${data.fullName}
📧 Email: ${data.email}
📞 Contact: ${data.contactNumber}
🏢 Business: ${data.businessName}
🏷️ Category: ${data.businessCategory}

I'd like to get my free Google Business audit report and learn more about how AI can help grow my business online.`;
}

function showFallbackContact() {
    const modal = document.getElementById('successModal');
    const modalContent = modal.querySelector('.bg-white');
    
    modalContent.innerHTML = `
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-phone text-blue-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Contact Us Directly</h3>
        <p class="text-gray-600 mb-6">WhatsApp didn't open? No problem! Contact us directly:</p>
        <div class="space-y-3">
            <a href="tel:+919164060961" class="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                <i class="fas fa-phone mr-2"></i>
                Call +91 91640 60961
            </a>
            <a href="https://wa.me/919164060961" class="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                <i class="fab fa-whatsapp mr-2"></i>
                Open WhatsApp
            </a>
            <button onclick="hideSuccessModal()" class="text-gray-500 hover:text-gray-700 transition-colors">
                Close
            </button>
        </div>
    `;
}

function clearAllFieldValidation() {
    const fieldGroups = document.querySelectorAll('.form-group');
    fieldGroups.forEach(group => {
        group.classList.remove('error', 'success');
        hideFieldError(group);
    });
    
    // Remove general error message
    const generalError = document.querySelector('.form-general-error');
    if (generalError) {
        generalError.style.display = 'none';
    }
}

// Animation Functions
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-item, .rocket-animation');
    animatedElements.forEach(el => observer.observe(el));
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const header = document.querySelector('header');
        
        // Header hide/show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Update progress bars on scroll
        updateProgressBars();
    });
}

function updateProgressBars() {
    const progressBars = document.querySelectorAll('[style*="width:"]');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Bar is visible, animate if needed
            bar.style.transition = 'width 1s ease-in-out';
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimizations
function preloadCriticalResources() {
    // Preload WhatsApp redirect
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = '//wa.me';
    document.head.appendChild(link);
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', preloadCriticalResources);

// Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // Could send error reports to analytics here
});

// Export functions for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToForm,
        validateField,
        isValidPhoneNumber,
        createWhatsAppMessage
    };
}
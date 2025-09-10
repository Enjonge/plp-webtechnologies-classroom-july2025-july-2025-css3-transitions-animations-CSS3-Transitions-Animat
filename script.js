// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const animateBoxBtn = document.getElementById('animateBoxBtn');
const animationBox = document.getElementById('animationBox');
const flipCardBtn = document.getElementById('flipCardBtn');
const flipCard = document.getElementById('flipCard');
const startLoaderBtn = document.getElementById('startLoaderBtn');
const stopLoaderBtn = document.getElementById('stopLoaderBtn');
const loader = document.getElementById('loader');
const showModalBtn = document.getElementById('showModalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

// Global variables
let animationInterval;
let isLoaderAnimating = false;

// Navigation function
function navigateTo(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Navigation event listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        navigateTo(sectionId);
    });
});

// Box animation functions
function animateBox(duration, animationType) {
    // Clear any existing animations
    animationBox.style.animation = 'none';
    
    // Trigger reflow
    void animationBox.offsetWidth;
    
    // Apply new animation
    if (animationType === 'complex') {
        animationBox.style.animation = `boxAnimation ${duration}s ease-in-out`;
    } else {
        animationBox.style.animation = `pulse ${duration}s infinite`;
    }
    
    // Reset animation after it completes
    setTimeout(() => {
        animationBox.style.animation = 'none';
    }, duration * 1000);
}

// Card flip functions
function flipCardAnimation() {
    flipCard.classList.toggle('flipped');
}

// Loader animation functions
function startLoader() {
    if (isLoaderAnimating) return;
    
    isLoaderAnimating = true;
    const bars = loader.querySelectorAll('.loader-bar');
    
    bars.forEach(bar => {
        bar.style.animationPlayState = 'running';
    });
}

function stopLoader() {
    if (!isLoaderAnimating) return;
    
    isLoaderAnimating = false;
    const bars = loader.querySelectorAll('.loader-bar');
    
    bars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
}

// Modal functions
function showModal() {
    modal.style.display = 'flex';
}

function hideModal() {
    modal.style.display = 'none';
}

// Utility functions with parameters and return values
function calculateProductPrice(quantity, pricePerUnit) {
    // Local scope variables
    const taxRate = 0.16; // 16% VAT
    const discountThreshold = 100;
    const discountRate = 0.1; // 10% discount for bulk orders
    
    let subtotal = quantity * pricePerUnit;
    let discount = 0;
    
    if (quantity > discountThreshold) {
        discount = subtotal * discountRate;
    }
    
    let taxableAmount = subtotal - discount;
    let tax = taxableAmount * taxRate;
    let total = taxableAmount + tax;
    
    // Return an object with all calculated values
    return {
        subtotal: formatCurrency(subtotal),
        discount: formatCurrency(discount),
        tax: formatCurrency(tax),
        total: formatCurrency(total)
    };
}

function formatCurrency(amount) {
    // Format amount as currency
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
    }).format(amount);
}

// Function to demonstrate reuse for DOM manipulation
function createNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px;
        border-radius: 5px;
        color: white;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    `;
    
    if (type === 'success') {
        notification.style.background = '#4CAF50';
    } else if (type === 'error') {
        notification.style.background = '#F44336';
    } else {
        notification.style.background = '#2196F3';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-in reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Function to demonstrate scope and reuse
function toggleElementVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    if (!element) return false; // Early return if element doesn't exist
    
    if (isVisible) {
        element.style.display = 'block';
        element.style.animation = 'fadeIn 0.5s';
    } else {
        element.style.display = 'none';
    }
    
    return true; // Return success status
}

// Event listeners
animateBoxBtn.addEventListener('click', () => {
    animateBox(3, 'complex');
    createNotification('Box animation started!', 'success');
});

flipCardBtn.addEventListener('click', () => {
    flipCardAnimation();
    createNotification('Card flipped!', 'info');
});

startLoaderBtn.addEventListener('click', () => {
    startLoader();
    createNotification('Loader started', 'info');
});

stopLoaderBtn.addEventListener('click', () => {
    stopLoader();
    createNotification('Loader stopped', 'info');
});

showModalBtn.addEventListener('click', showModal);

closeModal.addEventListener('click', hideModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Demonstrate utility function
function demonstrateCalculations() {
    // Calculate product price for different quantities
    const smallOrder = calculateProductPrice(50, 100);
    const largeOrder = calculateProductPrice(150, 100);
    
    console.log('Small order calculation:', smallOrder);
    console.log('Large order calculation:', largeOrder);
    
    // Show notification with calculation example
    createNotification(`Large order total: ${largeOrder.total}`, 'success');
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active section
    navigateTo('services');
    
    // Demonstrate calculations
    demonstrateCalculations();
    
    // Add click events to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.getAttribute('data-service');
            createNotification(`You selected ${serviceType} service`, 'info');
        });
    });
    
    // Add animation to logo on hover
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'pulse 1s';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.animation = 'pulse 2s infinite';
    });
});
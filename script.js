
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;

function showSlide(n) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (n + testimonials.length) % testimonials.length;
    testimonials[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});


setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

const calculateBtn = document.getElementById('calculate-btn');
const calculatorResult = document.getElementById('calculator-result');
const estimateValue = document.getElementById('estimate-value');
const sizeSlider = document.getElementById('size');
const sizeValue = document.getElementById('size-value');

sizeSlider.addEventListener('input', () => {
    sizeValue.textContent = sizeSlider.value;
});

calculateBtn.addEventListener('click', () => {

    const projectType = document.getElementById('project-type').value;
    const size = parseInt(document.getElementById('size').value);
    const material = document.getElementById('material').value;
    const features = document.getElementById('features').value;


    let basePricePerSqFt;

    if (projectType === 'patio-cover') {
        basePricePerSqFt = material === 'basic' ? 35 : material === 'premium' ? 50 : 75;
    } else if (projectType === 'deck') {
        basePricePerSqFt = material === 'basic' ? 25 : material === 'premium' ? 40 : 65;
    } else {
        basePricePerSqFt = material === 'basic' ? 60 : material === 'premium' ? 90 : 140;
    }


    let featuresMultiplier = 1;
    if (features === 'lighting' || features === 'railing') {
        featuresMultiplier = 1.15;
    } else if (features === 'both') {
        featuresMultiplier = 1.3;
    }


    const basePrice = basePricePerSqFt * size;
    const totalPrice = basePrice * featuresMultiplier;
    const lowerRange = Math.round(totalPrice * 0.8);
    const upperRange = Math.round(totalPrice * 1.2);


    estimateValue.textContent = `$${lowerRange.toLocaleString()} - $${upperRange.toLocaleString()}`;
    calculatorResult.style.display = 'block';
});

const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

chatBtn.addEventListener('click', () => {
    chatBox.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', 'bot-message');
    messageDiv.textContent = message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', 'user-message');
    messageDiv.textContent = message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addUserMessage(message);
        userInput.value = '';


        setTimeout(() => {
            if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
                addBotMessage("Our patio covers typically range from $5,000-$15,000 and decks from $8,000-$25,000 depending on size and materials. For a more accurate estimate, try our calculator or request a free quote!");
            } else if (message.toLowerCase().includes('time') || message.toLowerCase().includes('long')) {
                addBotMessage("Most patio cover projects take 2-4 weeks, while decks typically take 3-6 weeks from start to finish. The exact timeline depends on the project scope and weather conditions.");
            } else if (message.toLowerCase().includes('material') || message.toLowerCase().includes('wood')) {
                addBotMessage("We offer various materials including pressure-treated wood, cedar, composite, and aluminum. Each has different benefits in terms of durability, maintenance, and cost. Which are you most interested in?");
            } else if (message.toLowerCase().includes('start') || message.toLowerCase().includes('begin')) {
                addBotMessage("Great! To get started, we'll schedule a free consultation to discuss your project. Would you like me to connect you with our team now?");
            } else {
                addBotMessage("I'd be happy to help with that! For more detailed information, you can visit our website or I can connect you with one of our specialists. What else would you like to know?");
            }
        }, 1000);
    }
}


const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const projectDetails = document.getElementById('project-details').value;


    alert(`Thank you, ${name}! Your quote request has been submitted. We'll contact you within 24 hours.`);

    contactForm.reset();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

animateOnScroll();

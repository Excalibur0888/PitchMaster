/**
 * CricketFantasy - Main JavaScript
 * Author: CricketFantasy Team
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Date formatting function
    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    // Update blog dates
    const blogDates = document.querySelectorAll('.blog-date');
    const today = new Date();
    blogDates.forEach(dateElement => {
        dateElement.textContent = formatDate(today);
    });

    // Update upcoming matches dates
    const matchDates = document.querySelectorAll('.match-date');
    matchDates.forEach((dateElement, index) => {
        const matchDate = new Date();
        matchDate.setDate(today.getDate() + (index + 1) * 2); // Add 2 days for each match
        dateElement.textContent = `${formatDate(matchDate)} | ${dateElement.textContent.split('|')[1]}`;
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-toggle') && !event.target.closest('.nav-menu')) {
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        // First, make sure all answers are closed initially
        faqQuestions.forEach(question => {
            const answer = question.nextElementSibling;
            question.classList.remove('active');
            answer.style.maxHeight = null;
        });
        
        // Add click event listeners
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class on the question
                this.classList.toggle('active');
                
                // Toggle the visibility of the answer
                const answer = this.nextElementSibling;
                if (this.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            });
        });
    }

    // Initialize FAQ items (hide answers initially)
    const faqAnswers = document.querySelectorAll('.faq-answer');
    if (faqAnswers.length > 0) {
        faqAnswers.forEach(answer => {
            answer.style.maxHeight = null;
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0)';
            }
        });
    };
    
    // Initialize animation styles
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        if (element.classList.contains('slide-up')) {
            element.style.transform = 'translateY(50px)';
        } else if (element.classList.contains('slide-in-left')) {
            element.style.transform = 'translateX(-50px)';
        } else if (element.classList.contains('slide-in-right')) {
            element.style.transform = 'translateX(50px)';
        }
    });
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Stat Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const animateStats = function() {
            statNumbers.forEach(statNumber => {
                const elementPosition = statNumber.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 50 && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    
                    // Get the target value from the data-value attribute
                    const targetValue = parseFloat(statNumber.getAttribute('data-value'));
                    const displayText = statNumber.textContent.trim(); // Store the display text (e.g., "2x")
                    const hasXSuffix = displayText.endsWith('x');
                    
                    let currentValue = 0;
                    const duration = 2000; // 2 seconds
                    const increment = targetValue / (duration / 16); // 60fps
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        
                        if (currentValue >= targetValue) {
                            currentValue = targetValue;
                            clearInterval(counter);
                            
                            // Format the final number
                            if (hasXSuffix) {
                                // If it had an 'x' suffix (like 2x), restore it
                                statNumber.textContent = targetValue.toString() + 'x';
                            } else if (targetValue >= 1000000) {
                                // Format millions with 'M' suffix
                                statNumber.textContent = (targetValue / 1000000).toFixed(1) + 'M';
                            } else if (targetValue >= 1000) {
                                // Format thousands with 'K' suffix
                                statNumber.textContent = (targetValue / 1000).toFixed(0) + 'K';
                            } else {
                                // Format regular numbers with commas
                                statNumber.textContent = targetValue.toLocaleString();
                            }
                        } else {
                            // During animation, show the number with appropriate formatting
                            let formattedValue;
                            
                            if (targetValue >= 1000000) {
                                // Format millions with 'M' suffix during animation
                                formattedValue = (currentValue / 1000000).toFixed(1) + 'M';
                            } else if (targetValue >= 1000) {
                                // Format thousands with 'K' suffix during animation
                                formattedValue = (currentValue / 1000).toFixed(0) + 'K';
                            } else if (Number.isInteger(targetValue)) {
                                // Format integers
                                formattedValue = Math.floor(currentValue).toLocaleString();
                            } else {
                                // Format decimals
                                formattedValue = currentValue.toFixed(1).toLocaleString();
                            }
                            
                            // Add 'x' suffix if needed
                            if (hasXSuffix) {
                                formattedValue += 'x';
                            }
                            
                            statNumber.textContent = formattedValue;
                        }
                    }, 16);
                }
            });
        };
        
        // Run on page load and scroll
        window.addEventListener('load', animateStats);
        window.addEventListener('scroll', animateStats);
        
        // Also run immediately to ensure animation starts right away
        // Use a small timeout to ensure DOM is fully ready
        setTimeout(animateStats, 100);
    }

    // Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}); 
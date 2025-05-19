// script.js - Main script for the landing page

document.addEventListener('DOMContentLoaded', () => {
    // This file is kept minimal as most functionality is in main.js and intro-sequence.js
    // It can be used for any landing page specific functionality
    
    // Add skip intro button
    const introSequence = document.getElementById('intro-sequence');
    if (introSequence) {
        const skipButton = document.createElement('button');
        skipButton.className = 'skip-intro';
        skipButton.textContent = 'SKIP INTRO';
        skipButton.addEventListener('click', () => {
            // Skip to main content
            document.getElementById('intro-sequence').style.display = 'none';
            document.getElementById('main-content').style.opacity = 1;
        });
        introSequence.appendChild(skipButton);
    }
    
    // Handle any special effects or animations for the landing page
    const startButton = document.getElementById('start-mission');
    if (startButton) {
        startButton.addEventListener('mouseenter', () => {
            gsap.to(startButton, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        startButton.addEventListener('mouseleave', () => {
            gsap.to(startButton, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
});
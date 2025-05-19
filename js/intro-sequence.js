// Intro sequence animations using GSAP
document.addEventListener('DOMContentLoaded', () => {
    // Check if this is the first visit
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro) {
        // Skip intro if already seen in this session
        skipIntroSequence();
        return;
    }
    
    // Mark as seen for this session
    sessionStorage.setItem('hasSeenIntro', 'true');
    
    // Console text content
    const consoleLines = [
        "> INITIALIZING SYSTEM...",
        "> ESTABLISHING SECURE CONNECTION...",
        "> ACCESSING BIRTHDAY PROTOCOL...",
        "> GENERATING COSMIC CHALLENGE INTERFACE...",
        "> HAPPY BIRTHDAY, NICK!",
        "> PREPARE FOR MISSION BRIEFING...",
        "> LOADING 38 PUZZLES..."
    ];
    
    // Create timeline
    const tl = gsap.timeline({
        onComplete: () => setTimeout(finishIntroSequence, 1000)
    });
    
    // Get DOM elements
    const consoleContainer = document.querySelector('.console-container');
    const consoleText = document.getElementById('console-text');
    const starfieldContainer = document.querySelector('.starfield-container');
    const hologramContainer = document.querySelector('.hologram-container');
    const irisSegments = document.querySelectorAll('.iris-segment');
    
    // Generate stars
    createStars();
    
    // Start animation sequence
    tl
        // Start with starfield zoom
        .to(starfieldContainer, {
            scale: 1.5,
            duration: 3,
            ease: "power2.out"
        })
        
        // Fade in console
        .to(consoleContainer, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut"
        }, "-=1")
        
        // Type console text
        .call(function() {
            typeConsoleText(consoleLines, 0, 50);
        })
        
        // Wait for typing to complete (approximation)
        .to({}, { duration: consoleLines.length * 1.5 })
        
        // Fade out console
        .to(consoleContainer, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        })
        
        // Fade in hologram
        .to(hologramContainer, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
            onStart: animateHologram
        }, "-=0.5")
        
        // Hold hologram for a moment
        .to({}, { duration: 2 })
        
        // Fade out hologram
        .to(hologramContainer, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        })
        
        // Prepare iris door
        .to('.iris-door', {
            opacity: 1,
            duration: 0.5
        })
        
        // Animate iris door opening
        .to(irisSegments, {
            width: "250vw",
            height: "250vh",
            duration: 1.5,
            stagger: 0.1,
            ease: "power3.inOut"
        });
    
    // Functions
    function createStars() {
        const starfield = document.getElementById('starfield');
        starfield.style.boxShadow = generateStars(500);
    }
    
    function generateStars(count) {
        let stars = '';
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 100);
            const size = (Math.random() * 2 + 1) / 10;
            const opacity = Math.random();
            stars += `${stars ? ', ' : ''}${x}vw ${y}vh 0 ${size}px rgba(255, 255, 255, ${opacity})`;
        }
        return stars;
    }
    
    function typeConsoleText(lines, lineIndex, speed) {
        if (lineIndex >= lines.length) return;
        
        const line = lines[lineIndex];
        let charIndex = 0;
        
        // Clear previous line's cursor
        if (lineIndex > 0) {
            consoleText.innerHTML = consoleText.innerHTML.replace('<span class="blink">▋</span>', '');
        }
        
        const typeChar = () => {
            if (charIndex < line.length) {
                consoleText.innerHTML += line.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, speed);
            } else {
                // Add line break and cursor
                consoleText.innerHTML += '<br><span class="blink">▋</span>';
                // Start next line
                setTimeout(() => typeConsoleText(lines, lineIndex + 1, speed), 500);
            }
        };
        
        typeChar();
    }
    
    function animateHologram() {
        const hologramRing = document.querySelector('.hologram-ring');
        
        // Rotate hologram ring
        gsap.to(hologramRing, {
            rotation: 360,
            duration: 10,
            ease: "none",
            repeat: -1
        });
        
        // Pulse hologram projection
        gsap.to('.hologram-projection', {
            scale: 1.1,
            opacity: 0.9,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }
    
    function finishIntroSequence() {
        // Fade out intro sequence
        gsap.to('#intro-sequence', {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                // Hide intro sequence
                document.getElementById('intro-sequence').style.display = 'none';
                
                // Show main content with fade in
                gsap.to('#main-content', {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.inOut"
                });
            }
        });
    }
});

function skipIntroSequence() {
    document.getElementById('intro-sequence').style.display = 'none';
    document.getElementById('main-content').style.opacity = 1;
}
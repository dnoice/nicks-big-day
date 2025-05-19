// Puzzle 1: Space Station Assembly - script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Space Station Assembly puzzle initialized');
    
    // Puzzle configuration
    const puzzleConfig = {
        id: 1,
        moduleTypes: [
            {
                id: 1,
                name: 'core-module',
                label: 'CORE',
                connectors: ['top', 'right', 'bottom', 'left'],
                svg: `<svg viewBox="0 0 100 100" class="module-svg">
                        <defs>
                            <linearGradient id="core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="rgba(0, 127, 255, 1)" />
                                <stop offset="100%" stop-color="rgba(0, 100, 200, 1)" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <rect x="10" y="10" width="80" height="80" class="module-shape" rx="5" />
                        <circle cx="50" cy="50" r="25" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="0.5" />
                        <circle cx="50" cy="50" r="15" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" stroke-width="0.5" />
                        <path d="M30,50 L70,50 M50,30 L50,70" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
                        <circle cx="50" cy="10" r="5" class="connector top" />
                        <circle cx="90" cy="50" r="5" class="connector right" />
                        <circle cx="50" cy="90" r="5" class="connector bottom" />
                        <circle cx="10" cy="50" r="5" class="connector left" />
                        <text x="50" y="55" class="module-label">CORE</text>
                    </svg>`
            },
            {
                id: 2,
                name: 'habitat-module',
                label: 'HABITAT',
                connectors: ['top', 'bottom'],
                svg: `<svg viewBox="0 0 100 100" class="module-svg">
                        <defs>
                            <linearGradient id="habitat-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="rgba(0, 207, 255, 1)" />
                                <stop offset="100%" stop-color="rgba(0, 150, 200, 1)" />
                            </linearGradient>
                        </defs>
                        <rect x="10" y="25" width="80" height="50" class="module-shape" rx="5" />
                        <rect x="30" y="10" width="40" height="15" class="module-shape" rx="2" />
                        <rect x="30" y="75" width="40" height="15" class="module-shape" rx="2" />
                        <rect x="20" y="35" width="60" height="30" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="0.5" rx="3" />
                        <line x1="25" y1="50" x2="75" y2="50" stroke="rgba(255,255,255,0.4)" stroke-width="0.5" />
                        <circle cx="35" cy="42" r="3" fill="rgba(255,255,255,0.3)" />
                        <circle cx="65" cy="42" r="3" fill="rgba(255,255,255,0.3)" />
                        <circle cx="35" cy="58" r="3" fill="rgba(255,255,255,0.3)" />
                        <circle cx="65" cy="58" r="3" fill="rgba(255,255,255,0.3)" />
                        <circle cx="50" cy="10" r="5" class="connector top" />
                        <circle cx="50" cy="90" r="5" class="connector bottom" />
                        <text x="50" y="55" class="module-label">HABITAT</text>
                    </svg>`
            },
            {
                id: 3,
                name: 'observatory-module',
                label: 'OBSERVATORY',
                connectors: ['left'],
                svg: `<svg viewBox="0 0 100 100" class="module-svg">
                        <defs>
                            <radialGradient id="observatory-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stop-color="rgba(217, 0, 255, 0.7)" />
                                <stop offset="100%" stop-color="rgba(217, 0, 255, 1)" />
                            </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="40" class="module-shape" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="0.5" stroke-dasharray="4,4" />
                        <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" stroke-width="0.5" />
                        <path d="M50,20 L50,80 M20,50 L80,50 M35,35 L65,65 M35,65 L65,35" stroke="rgba(255,255,255,0.3)" stroke-width="0.5" />
                        <circle cx="50" cy="50" r="10" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" stroke-width="0.5" />
                        <circle cx="10" cy="50" r="5" class="connector left" />
                        <text x="50" y="55" class="module-label">OBSERVATORY</text>
                    </svg>`
            },
            {
                id: 4,
                name: 'docking-module',
                label: 'DOCKING',
                connectors: ['left', 'right'],
                svg: `<svg viewBox="0 0 100 100" class="module-svg">
                        <defs>
                            <linearGradient id="docking-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="rgba(255, 153, 0, 1)" />
                                <stop offset="100%" stop-color="rgba(255, 98, 0, 1)" />
                            </linearGradient>
                        </defs>
                        <rect x="20" y="35" width="60" height="30" class="module-shape" rx="5" />
                        <rect x="5" y="25" width="15" height="50" class="module-shape" />
                        <rect x="80" y="25" width="15" height="50" class="module-shape" />
                        <rect x="35" y="42" width="30" height="16" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="0.5" rx="2" />
                        <circle cx="10" cy="50" r="5" class="connector left" />
                        <circle cx="90" cy="50" r="5" class="connector right" />
                        <path d="M20,40 L20,60 M80,40 L80,60" stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-dasharray="2,2" />
                        <text x="50" y="55" class="module-label">DOCKING</text>
                    </svg>`
            },
            {
                id: 5,
                name: 'lab-module',
                label: 'LAB',
                connectors: ['top', 'bottom'],
                svg: `<svg viewBox="0 0 100 100" class="module-svg">
                        <defs>
                            <linearGradient id="lab-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="rgba(0, 220, 100, 1)" />
                                <stop offset="100%" stop-color="rgba(0, 180, 80, 1)" />
                            </linearGradient>
                        </defs>
                        <rect x="25" y="10" width="50" height="80" class="module-shape" rx="5" />
                        <polygon points="25,10 75,10 80,25 20,25" class="module-shape" />
                        <rect x="30" y="30" width="40" height="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="0.5" rx="2" />
                        <circle cx="40" cy="40" r="5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" stroke-width="0.5" />
                        <circle cx="60" cy="40" r="5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" stroke-width="0.5" />
                        <rect x="35" y="55" width="30" height="10" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" stroke-width="0.5" rx="1" />
                        <circle cx="50" cy="10" r="5" class="connector top" />
                        <circle cx="50" cy="90" r="5" class="connector bottom" />
                        <text x="50" y="55" class="module-label">LAB</text>
                    </svg>`
            },
            {
                id: 6,
                name: 'engine-module',
                label: 'ENGINE',
                connectors: ['left'],
                svg: `<svg viewBox="0 0 100 100" class="module-svg">
                        <defs>
                            <linearGradient id="engine-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="rgba(255, 60, 60, 1)" />
                                <stop offset="100%" stop-color="rgba(200, 40, 40, 1)" />
                            </linearGradient>
                            <filter id="engine-glow">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <rect x="10" y="25" width="60" height="50" class="module-shape" rx="5" />
                        <polygon points="70,25 90,40 90,60 70,75" class="module-shape" />
                        <rect x="20" y="35" width="30" height="30" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="0.5" rx="3" />
                        <line x1="75" y1="43" x2="95" y2="43" stroke="rgba(255, 200, 50, 0.6)" stroke-width="2" >
                            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1s" repeatCount="indefinite" />
                        </line>
                        <line x1="75" y1="50" x2="100" y2="50" stroke="rgba(255, 150, 50, 0.6)" stroke-width="2" >
                            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.3s" repeatCount="indefinite" />
                        </line>
                        <line x1="75" y1="57" x2="95" y2="57" stroke="rgba(255, 200, 50, 0.6)" stroke-width="2" >
                            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.7s" repeatCount="indefinite" />
                        </line>
                        <circle cx="10" cy="50" r="5" class="connector left" />
                        <text x="40" y="55" class="module-label">ENGINE</text>
                    </svg>`
            }
        ]
    };
    
    // DOM Elements
    const puzzleBoard = document.getElementById('puzzle-board');
    const puzzlePieces = document.getElementById('puzzle-pieces');
    const puzzleTarget = document.getElementById('puzzle-target');
    const moduleOutlines = document.querySelectorAll('.module-outline');
    const successMessage = document.getElementById('success-message');
    const nextPuzzleBtn = document.getElementById('next-puzzle-btn');
    const hintBtn = document.getElementById('hint-btn');
    const hintModal = document.getElementById('hint-modal');
    const closeHintBtn = document.getElementById('close-hint-btn');
    const homeBtn = document.getElementById('home-btn');
    
    // Game state
    let correctPositions = 0;
    let isDraggingEnabled = true;
    let connectorLines = [];
    
    // Initialize puzzle
    initializePuzzle();
    
    // Event listeners
    if (nextPuzzleBtn) nextPuzzleBtn.addEventListener('click', goToNextPuzzle);
    if (hintBtn) hintBtn.addEventListener('click', showHint);
    if (closeHintBtn) closeHintBtn.addEventListener('click', hideHint);
    if (homeBtn) homeBtn.addEventListener('click', goHome);
    
    // Initialize puzzle
    function initializePuzzle() {
        // Create puzzle pieces
        createModules();
        
        // Setup draggable pieces
        setupDraggable();
        
        // Add glow pulse to target outlines
        animateTargetOutlines();
        
        console.log('Puzzle fully initialized');
    }
    
    // Animate target outlines for visual effect
    function animateTargetOutlines() {
        moduleOutlines.forEach(outline => {
            gsap.to(outline, {
                boxShadow: '0 0 15px rgba(0, 207, 255, 0.3)',
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: 'sine.inOut'
            });
        });
    }
    
    // Create space station modules
    function createModules() {
        // Create each module - position them in a semi-circle around the edges
        puzzleConfig.moduleTypes.forEach((module, index) => {
            // Create module element
            const moduleEl = document.createElement('div');
            moduleEl.className = `puzzle-piece ${module.name}`;
            moduleEl.dataset.moduleId = module.id;
            moduleEl.innerHTML = module.svg;
            
            // Position module - distribute around the bottom of the screen
            const boardWidth = puzzleBoard.clientWidth || 1000;
            const spacing = boardWidth / (puzzleConfig.moduleTypes.length + 1);
            const x = spacing * (index + 1) - (moduleEl.clientWidth / 2 || 60);
            const y = puzzleBoard.clientHeight - (moduleEl.clientHeight || 120) - 40;
            
            moduleEl.style.left = x + 'px';
            moduleEl.style.top = y + 'px';
            
            // Add to board
            puzzlePieces.appendChild(moduleEl);
            
            console.log(`Created ${module.name} module`);
        });
    }
    
    // Setup draggable functionality with enhanced touch support
    function setupDraggable() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        console.log(`Setting up draggable for ${pieces.length} modules`);
        
        // Try GSAP Draggable first
        if (window.Draggable) {
            pieces.forEach(piece => {
                // Create draggable for each piece
                Draggable.create(piece, {
                    type: 'x,y',
                    bounds: puzzleBoard,
                    edgeResistance: 0.65,
                    inertia: true,
                    allowContextMenu: true,
                    minimumMovement: 2,
                    throwResistance: 3000,
                    onDragStart: function() {
                        if (!isDraggingEnabled) return;
                        piece.classList.add('dragging');
                        this.startZ = piece.style.zIndex;
                        piece.style.zIndex = 100;
                        showConnectionLines(piece);
                    },
                    onDrag: function() {
                        if (!isDraggingEnabled) return;
                        updateConnectionLines(piece);
                        checkNearPosition(piece);
                    },
                    onDragEnd: function() {
                        if (!isDraggingEnabled) return;
                        piece.classList.remove('dragging');
                        piece.style.zIndex = this.startZ || 1;
                        hideConnectionLines();
                        
                        checkPosition(this.target);
                    }
                });
            });
            
            console.log('GSAP Draggable setup complete');
        } else {
            // Fallback to manual drag implementation
            console.warn('GSAP Draggable not available, using fallback drag implementation');
            setupFallbackDraggable(pieces);
        }
    }
    
    // Show connection lines from module connectors
    function showConnectionLines(module) {
        // Remove any existing lines
        hideConnectionLines();
        
        // Get module type
        const moduleId = parseInt(module.dataset.moduleId);
        const moduleType = puzzleConfig.moduleTypes.find(m => m.id === moduleId);
        
        if (!moduleType) return;
        
        // Create lines for each connector
        moduleType.connectors.forEach(connector => {
            const line = document.createElement('div');
            line.className = 'connection-line';
            
            // Set line properties based on connector type
            const connectorPosition = getConnectorPosition(module, connector);
            
            // Position and style the line
            line.style.position = 'absolute';
            line.style.width = '3px';
            line.style.height = '60px';
            line.style.left = `${connectorPosition.x}px`;
            line.style.top = `${connectorPosition.y}px`;
            line.style.transformOrigin = 'center top';
            
            // Rotate based on connector position
            switch(connector) {
                case 'top':
                    line.style.transform = 'rotate(0deg)';
                    break;
                case 'right':
                    line.style.transform = 'rotate(90deg)';
                    line.style.transformOrigin = 'left center';
                    break;
                case 'bottom':
                    line.style.transform = 'rotate(180deg)';
                    line.style.transformOrigin = 'center bottom';
                    break;
                case 'left':
                    line.style.transform = 'rotate(-90deg)';
                    line.style.transformOrigin = 'right center';
                    break;
            }
            
            // Add to board
            puzzleBoard.appendChild(line);
            connectorLines.push(line);
        });
    }
    
    // Update connection lines as module moves
    function updateConnectionLines(module) {
        const moduleId = parseInt(module.dataset.moduleId);
        const moduleType = puzzleConfig.moduleTypes.find(m => m.id === moduleId);
        
        if (!moduleType) return;
        
        // Update positions for each line
        moduleType.connectors.forEach((connector, index) => {
            if (connectorLines[index]) {
                const connectorPosition = getConnectorPosition(module, connector);
                
                // Update line position
                connectorLines[index].style.left = `${connectorPosition.x}px`;
                connectorLines[index].style.top = `${connectorPosition.y}px`;
            }
        });
    }
    
    // Hide connection lines
    function hideConnectionLines() {
        connectorLines.forEach(line => line.remove());
        connectorLines = [];
    }
    
    // Get connector position in page coordinates
    function getConnectorPosition(module, connectorType) {
        const moduleRect = module.getBoundingClientRect();
        const boardRect = puzzleBoard.getBoundingClientRect();
        
        let x, y;
        
        // Calculate connector position based on type
        switch(connectorType) {
            case 'top':
                x = moduleRect.left + moduleRect.width / 2 - boardRect.left;
                y = moduleRect.top - boardRect.top;
                break;
            case 'right':
                x = moduleRect.right - boardRect.left;
                y = moduleRect.top + moduleRect.height / 2 - boardRect.top;
                break;
            case 'bottom':
                x = moduleRect.left + moduleRect.width / 2 - boardRect.left;
                y = moduleRect.bottom - boardRect.top;
                break;
            case 'left':
                x = moduleRect.left - boardRect.left;
                y = moduleRect.top + moduleRect.height / 2 - boardRect.top;
                break;
        }
        
        return { x, y };
    }
    
    // Check if module is near its correct position (for visual feedback)
    function checkNearPosition(module) {
        const moduleId = parseInt(module.dataset.moduleId);
        const moduleRect = module.getBoundingClientRect();
        
        // Find matching outline
        const targetOutline = document.querySelector(`.module-outline[data-position="${moduleId}"]`);
        if (!targetOutline) return;
        
        const outlineRect = targetOutline.getBoundingClientRect();
        
        // Calculate centers
        const moduleCenterX = moduleRect.left + moduleRect.width / 2;
        const moduleCenterY = moduleRect.top + moduleRect.height / 2;
        const outlineCenterX = outlineRect.left + outlineRect.width / 2;
        const outlineCenterY = outlineRect.top + outlineRect.height / 2;
        
        // Calculate distance
        const distance = Math.sqrt(
            Math.pow(moduleCenterX - outlineCenterX, 2) + 
            Math.pow(moduleCenterY - outlineCenterY, 2)
        );
        
        // If close but not correct, add near-position class
        if (distance < 100 && distance > 30) {
            module.classList.add('near-position');
        } else {
            module.classList.remove('near-position');
        }
    }
    
    // Manual draggable implementation as fallback
    function setupFallbackDraggable(pieces) {
        pieces.forEach(piece => {
            let offsetX, offsetY;
            let isDragging = false;
            
            // Mouse events
            piece.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', endDrag);
            
            // Touch events
            piece.addEventListener('touchstart', handleTouchStart, { passive: false });
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
            
            function startDrag(e) {
                if (!isDraggingEnabled || piece.classList.contains('correct-position')) return;
                e.preventDefault();
                isDragging = true;
                
                const rect = piece.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                
                piece.style.zIndex = 100;
                piece.classList.add('dragging');
                
                showConnectionLines(piece);
            }
            
            function drag(e) {
                if (!isDragging) return;
                e.preventDefault();
                
                const boardRect = puzzleBoard.getBoundingClientRect();
                let left = e.clientX - boardRect.left - offsetX;
                let top = e.clientY - boardRect.top - offsetY;
                
                // Ensure piece stays within bounds
                left = Math.max(0, Math.min(left, boardRect.width - piece.offsetWidth));
                top = Math.max(0, Math.min(top, boardRect.height - piece.offsetHeight));
                
                piece.style.left = `${left}px`;
                piece.style.top = `${top}px`;
                
                updateConnectionLines(piece);
                checkNearPosition(piece);
            }
            
            function endDrag() {
                if (!isDragging) return;
                isDragging = false;
                
                piece.style.zIndex = 1;
                piece.classList.remove('dragging');
                hideConnectionLines();
                
                checkPosition(piece);
            }
            
            function handleTouchStart(e) {
                if (e.cancelable) e.preventDefault();
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousedown', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                startDrag(mouseEvent);
            }
            
            function handleTouchMove(e) {
                if (!isDragging) return;
                if (e.cancelable) e.preventDefault();
                
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                drag(mouseEvent);
            }
            
            function handleTouchEnd() {
                endDrag();
            }
        });
    }
    
    // Check if a module is placed in the correct position
    function checkPosition(module) {
        if (!isDraggingEnabled) return;
        
        const moduleId = parseInt(module.dataset.moduleId);
        const moduleRect = module.getBoundingClientRect();
        
        // Find matching outline
        const targetOutline = document.querySelector(`.module-outline[data-position="${moduleId}"]`);
        if (!targetOutline) return;
        
        const outlineRect = targetOutline.getBoundingClientRect();
        
        // Calculate centers
        const moduleCenterX = moduleRect.left + moduleRect.width / 2;
        const moduleCenterY = moduleRect.top + moduleRect.height / 2;
        const outlineCenterX = outlineRect.left + outlineRect.width / 2;
        const outlineCenterY = outlineRect.top + outlineRect.height / 2;
        
        // Calculate distance
        const distance = Math.sqrt(
            Math.pow(moduleCenterX - outlineCenterX, 2) + 
            Math.pow(moduleCenterY - outlineCenterY, 2)
        );
        
        console.log(`Module ${moduleId} distance: ${distance}px`);
        
        // Module is in correct position if distance is small enough
        if (distance < 50) {
            // COMPLETELY NEW APPROACH: Actually move the module to be a child of the target outline
            lockModuleToOutline(module, targetOutline);
            markAsCorrect(module);
            
            // Play sound if available
            if (window.puzzleUtils && window.puzzleUtils.playSound) {
                window.puzzleUtils.playSound('complete');
            }
            
            // Check if puzzle is completed
            if (++correctPositions >= puzzleConfig.moduleTypes.length) {
                puzzleCompleted();
            }
        }
    }
    
    // Lock a module in place by making it a child of the outline
    function lockModuleToOutline(module, targetOutline) {
        // Get current computed styles to maintain appearance
        const computedStyle = window.getComputedStyle(module);
        const currentWidth = computedStyle.width;
        const currentHeight = computedStyle.height;
        
        // Store original parent for potential recovery
        module.dataset.originalParent = module.parentElement.id;
        
        // Clone the module to avoid any existing event handler issues
        const clonedModule = module.cloneNode(true);
        
        // Set up the cloned module with fixed positioning inside the outline
        clonedModule.style.position = 'absolute';
        clonedModule.style.left = '0';
        clonedModule.style.top = '0';
        clonedModule.style.width = '100%';
        clonedModule.style.height = '100%';
        clonedModule.style.margin = '0';
        clonedModule.style.transform = 'none';
        clonedModule.style.zIndex = '5';
        
        // Make original module invisible but keep in DOM temporarily
        module.style.opacity = '0';
        module.style.pointerEvents = 'none';
        
        // Clear any existing module in the outline (just in case)
        const existingModule = targetOutline.querySelector('.puzzle-piece');
        if (existingModule) {
            existingModule.remove();
        }
        
        // Add the cloned module to the outline
        targetOutline.appendChild(clonedModule);
        
        // Flash effect for satisfying feedback
        gsap.fromTo(clonedModule, 
            { opacity: 0.5, scale: 1.1 }, 
            { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
        
        // Remove the original module after a short delay
        setTimeout(() => {
            if (module.parentNode) {
                module.parentNode.removeChild(module);
            }
        }, 100);
        
        console.log(`Module locked to outline ${targetOutline.dataset.position}`);
    }
    
    // Mark module as correctly placed
    function markAsCorrect(module) {
        module.classList.remove('near-position');
        module.classList.add('correct-position');
        
        // Apply to both the module and any clone in the outline
        const moduleId = module.dataset.moduleId;
        const targetOutline = document.querySelector(`.module-outline[data-position="${moduleId}"]`);
        if (targetOutline) {
            const placedModule = targetOutline.querySelector('.puzzle-piece');
            if (placedModule) {
                placedModule.classList.add('correct-position');
                placedModule.style.pointerEvents = 'none';
            }
        }
        
        // Make sure the target outline looks correct
        gsap.to(targetOutline, {
            boxShadow: '0 0 20px var(--success)',
            border: '1px solid var(--success)',
            duration: 0.3
        });
        
        console.log(`Module marked as correct`);
    }
    
    // Handle puzzle completion
    function puzzleCompleted() {
        // Disable dragging
        isDraggingEnabled = false;
        
        console.log('Puzzle completed!');
        
        // Show success animation
        setTimeout(() => {
            // Final success animation
            const timeline = gsap.timeline({
                onComplete: () => {
                    // Show success message
                    successMessage.style.display = 'block';
                    gsap.fromTo(successMessage, 
                        { opacity: 0, y: 20 }, 
                        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                    );
                }
            });
            
            // Flash effect
            timeline.to(puzzleBoard, {
                boxShadow: '0 0 50px var(--success)',
                duration: 0.5,
                ease: "power2.in"
            })
            .to(puzzleBoard, {
                boxShadow: '0 0 15px var(--primary-glow)',
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Mark puzzle as completed in localStorage
            if (window.puzzleUtils) {
                window.puzzleUtils.markPuzzleComplete(puzzleConfig.id);
            }
        }, 600);
    }
    
    // Navigation functions
    function goToNextPuzzle() {
        if (window.puzzleUtils) {
            window.puzzleUtils.goToNextPuzzle(puzzleConfig.id);
        } else {
            // Fallback if puzzleUtils not available
            window.location.href = `../puzzle${puzzleConfig.id + 1}/index.html`;
        }
    }
    
    function goHome() {
        if (window.puzzleUtils) {
            window.puzzleUtils.goToMainMenu();
        } else {
            // Fallback if puzzleUtils not available
            window.location.href = '../../index.html';
        }
    }
    
    // Hint functions
    function showHint() {
        hintModal.style.display = 'flex';
        gsap.fromTo(hintModal, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.3 }
        );
        
        // Record hint usage if utils available
        if (window.puzzleUtils) {
            window.puzzleUtils.recordHintUsage(puzzleConfig.id);
            window.puzzleUtils.playSound('hint');
        }
    }
    
    function hideHint() {
        gsap.to(hintModal, {
            opacity: 0, 
            duration: 0.3,
            onComplete: () => {
                hintModal.style.display = 'none';
            }
        });
    }
});
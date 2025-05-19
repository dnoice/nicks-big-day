/**
 * main.js - Core functionality for Nick's Cosmic Challenge
 * This file handles global game state, progress tracking, navigation,
 * utility functions, and common behaviors across all puzzles.
 */

// Immediately-invoked function expression to avoid global scope pollution
(function() {
    // Constants
    const TOTAL_PUZZLES = 38;
    const STORAGE_KEY = 'nicksBigDayProgress';
    const DEBUG_MODE = false; // Set to true to enable debug logging
    
    // Game state
    let gameState = {
        completed: [], // Array of completed puzzle IDs
        currentPuzzle: 1, // Current available puzzle
        lastVisited: Date.now(), // Last time user visited
        hints: {}, // Tracks hint usage per puzzle
        attempts: {}, // Tracks attempts per puzzle
        timeSpent: {}, // Tracks time spent per puzzle
        totalTimeSpent: 0, // Total time spent on all puzzles
        settings: { // User settings
            soundEnabled: true,
            musicEnabled: true,
            isDarkMode: true
        }
    };

    // DOM elements cache (will be populated on load)
    const elements = {};
    
    // Audio elements
    let audioEffects = {};
    
    // Event tracking
    let startTime = Date.now();
    let currentPuzzleId = null;
    
    /**
     * Initialize when DOM is fully loaded
     */
    document.addEventListener('DOMContentLoaded', () => {
        // Cache DOM elements
        cacheElements();
        
        // Initialize game state
        initializeGameState();
        
        // Initialize audio if available
        initializeAudio();
        
        // Set up event listeners
        setupEventListeners();
        
        // Apply user settings
        applySettings();
        
        // Determine current page/puzzle
        identifyCurrentPage();
        
        // Generate puzzle grid if on main page
        if (isMainPage()) {
            generatePuzzleGrid();
        }
        
        // Start tracking time for current puzzle
        startTimeTracking();
        
        // Log initialization complete
        logDebug('Game initialized successfully');
    });

    /**
     * Cache commonly used DOM elements
     */
    function cacheElements() {
        // Main page elements
        elements.puzzleGrid = document.getElementById('puzzle-grid');
        elements.puzzleCounter = document.querySelector('.puzzle-counter');
        elements.startButton = document.getElementById('start-mission');
        
        // Navigation elements that might be on any page
        elements.homeBtn = document.getElementById('home-btn');
        elements.hintBtn = document.getElementById('hint-btn');
        elements.nextPuzzleBtn = document.getElementById('next-puzzle-btn');
        
        // Theme elements
        elements.themeToggle = document.getElementById('theme-toggle');
        
        // Debug panel (if available)
        elements.debugPanel = document.getElementById('debug-panel');
    }
    
    /**
     * Initialize game state from storage or defaults
     */
    function initializeGameState() {
        try {
            // Try to load saved state
            const savedState = localStorage.getItem(STORAGE_KEY);
            
            if (savedState) {
                // Parse saved state
                const parsedState = JSON.parse(savedState);
                
                // Merge with default state (to handle new properties added in updates)
                gameState = {...gameState, ...parsedState};
                
                logDebug('Game state loaded from storage', gameState);
            } else {
                // No saved state, initialize fresh state
                resetGameState();
            }
            
            // Update UI with current state
            updateGameStateUI();
        } catch (error) {
            logError('Error initializing game state:', error);
            
            // Fallback to reset if loading fails
            resetGameState();
        }
    }
    
    /**
     * Reset game state to defaults
     */
    function resetGameState() {
        gameState = {
            completed: [],
            currentPuzzle: 1,
            lastVisited: Date.now(),
            hints: {},
            attempts: {},
            timeSpent: {},
            totalTimeSpent: 0,
            settings: {
                soundEnabled: true,
                musicEnabled: true,
                isDarkMode: true
            }
        };
        
        // Save to storage
        saveGameState();
        
        logDebug('Game state reset to defaults');
    }
    
    /**
     * Save current game state to localStorage
     */
    function saveGameState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
            logDebug('Game state saved successfully');
            return true;
        } catch (error) {
            logError('Error saving game state:', error);
            
            // Attempt to clear storage and try again if it might be a quota issue
            try {
                // Remove non-essential data
                const essentialState = {
                    completed: gameState.completed,
                    currentPuzzle: gameState.currentPuzzle,
                    lastVisited: gameState.lastVisited,
                    settings: gameState.settings
                };
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(essentialState));
                logDebug('Saved essential game state after error');
                return true;
            } catch (fallbackError) {
                logError('Critical error saving game state:', fallbackError);
                
                // Show error to user if all saving attempts fail
                alert('Unable to save progress. Please make sure cookies and local storage are enabled in your browser.');
                return false;
            }
        }
    }
    
    /**
     * Update UI elements based on game state
     */
    function updateGameStateUI() {
        // Update puzzle counter on main page
        if (elements.puzzleCounter) {
            elements.puzzleCounter.textContent = gameState.completed.length;
        }
        
        // Update theme based on settings
        document.body.classList.toggle('theme-dark', gameState.settings.isDarkMode);
        document.body.classList.toggle('theme-light', !gameState.settings.isDarkMode);
        
        // Update other UI elements as needed
        if (elements.themeToggle) {
            elements.themeToggle.checked = gameState.settings.isDarkMode;
        }
        
        // Debug panel updates
        updateDebugPanel();
    }
    
    /**
     * Generate the puzzle grid on the main page
     */
    function generatePuzzleGrid() {
        if (!elements.puzzleGrid) return;
        
        // Clear existing content
        elements.puzzleGrid.innerHTML = '';
        
        // Create puzzle items
        for (let i = 1; i <= TOTAL_PUZZLES; i++) {
            const puzzleItem = document.createElement('div');
            
            // Determine puzzle status
            const isCompleted = gameState.completed.includes(i);
            const isLocked = i > gameState.currentPuzzle && !isCompleted;
            
            // Set classes based on status
            puzzleItem.className = `puzzle-item${isCompleted ? ' puzzle-item-completed' : ''}${isLocked ? ' puzzle-item-locked' : ''}`;
            
            // Create puzzle content
            puzzleItem.innerHTML = `
                <div class="puzzle-number">${i}</div>
                <div class="puzzle-icon">${getPuzzleIcon(i)}</div>
                <div class="puzzle-status">${
                    isCompleted ? 'COMPLETED' : 
                    isLocked ? 'LOCKED' : 'AVAILABLE'
                }</div>
            `;
            
            // Add click event for available puzzles
            if (!isLocked) {
                puzzleItem.addEventListener('click', () => {
                    navigateToPuzzle(i);
                });
            }
            
            elements.puzzleGrid.appendChild(puzzleItem);
        }
    }
    
    /**
     * Determine puzzle icon based on puzzle number
     * Icons are themed by puzzle type
     */
    function getPuzzleIcon(puzzleNumber) {
        // Define icons and their meaning
        const icons = [
            '🧩', // Assembly puzzles (1, 11, 21, 31)
            '🚀', // Action/Reaction puzzles (2, 12, 22, 32)
            '👾', // Pattern Matching puzzles (3, 13, 23, 33)
            '🛸', // Spatial Arrangement puzzles (4, 14, 24, 34)
            '🔮', // Visual Discovery puzzles (5, 15, 25, 35)
            '⭐', // Memory/Sequence puzzles (6, 16, 26, 36)
            '🌌', // Navigation puzzles (7, 17, 27, 37)
            '🔭', // Observation puzzles (8, 18, 28, 38)
            '🌠', // Timing puzzles (9, 19, 29)
            '🪐', // Mechanical puzzles (10, 20, 30)
        ];
        
        // Assign icon based on puzzle type (every 10th puzzle uses the same pattern)
        const iconIndex = (puzzleNumber - 1) % 10;
        return icons[iconIndex];
    }
    
    /**
     * Initialize audio elements
     */
    function initializeAudio() {
        // Only initialize if sound is enabled
        if (!gameState.settings.soundEnabled) return;
        
        try {
            // Create audio objects
            audioEffects = {
                click: new Audio('../assets/audio/click.mp3'),
                complete: new Audio('../assets/audio/complete.mp3'),
                error: new Audio('../assets/audio/error.mp3'),
                hint: new Audio('../assets/audio/hint.mp3')
            };
            
            // Preload audio
            Object.values(audioEffects).forEach(audio => {
                audio.load();
                audio.volume = 0.5; // Set default volume
            });
            
            logDebug('Audio initialized successfully');
        } catch (error) {
            logError('Error initializing audio:', error);
            // Disable sound if initialization fails
            gameState.settings.soundEnabled = false;
            saveGameState();
        }
    }
    
    /**
     * Set up global event listeners
     */
    function setupEventListeners() {
        // Start button on main page
        if (elements.startButton) {
            elements.startButton.addEventListener('click', () => {
                if (gameState.completed.length === 0) {
                    // First time starting, go to puzzle 1
                    navigateToPuzzle(1);
                } else {
                    // Show puzzle grid
                    document.querySelector('.puzzle-grid').scrollIntoView({ behavior: 'smooth' });
                }
                playSound('click');
            });
        }
        
        // Home button on puzzle pages
        if (elements.homeBtn) {
            elements.homeBtn.addEventListener('click', () => {
                navigateToMainMenu();
                playSound('click');
            });
        }
        
        // Theme toggle
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('change', (e) => {
                gameState.settings.isDarkMode = e.target.checked;
                applySettings();
                saveGameState();
                playSound('click');
            });
        }
        
        // Before unload - save time spent
        window.addEventListener('beforeunload', () => {
            updateTimeSpent();
        });
        
        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // User switched away from tab
                updateTimeSpent();
            } else {
                // User returned to tab
                startTime = Date.now();
            }
        });
    }
    
    /**
     * Apply user settings
     */
    function applySettings() {
        // Apply theme
        document.body.classList.toggle('theme-dark', gameState.settings.isDarkMode);
        document.body.classList.toggle('theme-light', !gameState.settings.isDarkMode);
        
        // Apply other settings as needed
        if (elements.themeToggle) {
            elements.themeToggle.checked = gameState.settings.isDarkMode;
        }
    }
    
    /**
     * Identify current page/puzzle
     */
    function identifyCurrentPage() {
        // Check if we're on a puzzle page
        const puzzlePath = window.location.pathname.match(/puzzle(\d+)/);
        
        if (puzzlePath && puzzlePath[1]) {
            currentPuzzleId = parseInt(puzzlePath[1]);
            logDebug('Current puzzle identified:', currentPuzzleId);
        } else {
            // Check for finale page
            if (window.location.pathname.includes('finale')) {
                currentPuzzleId = 'finale';
                logDebug('On finale page');
            } else {
                // Assume main menu
                currentPuzzleId = null;
                logDebug('On main menu');
            }
        }
    }
    
    /**
     * Check if current page is the main menu
     */
    function isMainPage() {
        return currentPuzzleId === null;
    }
    
    /**
     * Start tracking time for the current puzzle
     */
    function startTimeTracking() {
        startTime = Date.now();
        
        // Initialize time tracking for this puzzle if needed
        if (currentPuzzleId && typeof currentPuzzleId === 'number') {
            if (!gameState.timeSpent[currentPuzzleId]) {
                gameState.timeSpent[currentPuzzleId] = 0;
            }
        }
    }
    
    /**
     * Update time spent on current puzzle
     */
    function updateTimeSpent() {
        if (currentPuzzleId && typeof currentPuzzleId === 'number') {
            const endTime = Date.now();
            const timeSpent = endTime - startTime;
            
            // Only track if sensible amount (less than 30 minutes)
            if (timeSpent > 0 && timeSpent < 30 * 60 * 1000) {
                gameState.timeSpent[currentPuzzleId] += timeSpent;
                gameState.totalTimeSpent += timeSpent;
                saveGameState();
            }
            
            startTime = endTime;
        }
    }
    
    /**
     * Play a sound effect if sound is enabled
     */
    function playSound(soundName) {
        if (gameState.settings.soundEnabled && audioEffects[soundName]) {
            // Clone and play to allow overlapping sounds
            audioEffects[soundName].cloneNode().play().catch(err => {
                // Ignore errors - sound isn't critical
                logDebug('Sound play error:', err);
            });
        }
    }
    
    /**
     * Mark a puzzle as completed
     */
    function markPuzzleComplete(puzzleId) {
        if (!gameState.completed.includes(puzzleId)) {
            // Add to completed list
            gameState.completed.push(puzzleId);
            
            // Sort for consistency
            gameState.completed.sort((a, b) => a - b);
            
            // Update current available puzzle if needed
            if (puzzleId === gameState.currentPuzzle) {
                gameState.currentPuzzle = Math.max(gameState.currentPuzzle, puzzleId + 1);
            }
            
            // Update last visited time
            gameState.lastVisited = Date.now();
            
            // Save progress
            saveGameState();
            
            // Play completion sound
            playSound('complete');
            
            // Update UI if needed
            updateGameStateUI();
            
            logDebug(`Puzzle ${puzzleId} marked as complete`);
            
            // Return true if this completes all puzzles
            return gameState.completed.length >= TOTAL_PUZZLES;
        }
        
        return false;
    }
    
    /**
     * Increment attempt counter for current puzzle
     */
    function recordPuzzleAttempt(puzzleId) {
        if (!gameState.attempts[puzzleId]) {
            gameState.attempts[puzzleId] = 0;
        }
        
        gameState.attempts[puzzleId]++;
        saveGameState();
        
        return gameState.attempts[puzzleId];
    }
    
    /**
     * Record hint usage for current puzzle
     */
    function recordHintUsage(puzzleId) {
        if (!gameState.hints[puzzleId]) {
            gameState.hints[puzzleId] = 0;
        }
        
        gameState.hints[puzzleId]++;
        saveGameState();
        
        return gameState.hints[puzzleId];
    }
    
    /**
     * Navigate to a specific puzzle
     */
    function navigateToPuzzle(puzzleId) {
        // Validate puzzle ID
        if (puzzleId < 1 || puzzleId > TOTAL_PUZZLES) {
            logError(`Invalid puzzle ID: ${puzzleId}`);
            return;
        }
        
        // Update time spent before navigating
        updateTimeSpent();
        
        // Calculate relative path based on current location
        let basePath = '';
        
        if (currentPuzzleId) {
            // We're on a puzzle page - go up a level
            basePath = '../';
        }
        
        // Navigate to the puzzle
        window.location.href = `${basePath}puzzle${puzzleId}/index.html`;
    }
    
    /**
     * Navigate to the next puzzle after current
     */
    function navigateToNextPuzzle(currentPuzzleId) {
        const nextPuzzle = currentPuzzleId + 1;
        
        if (nextPuzzle <= TOTAL_PUZZLES) {
            navigateToPuzzle(nextPuzzle);
        } else {
            // All puzzles completed, go to finale
            navigateToFinale();
        }
    }
    
    /**
     * Navigate to main menu
     */
    function navigateToMainMenu() {
        // Update time spent before navigating
        updateTimeSpent();
        
        // Calculate path based on current location
        let path = '';
        
        if (currentPuzzleId) {
            // Puzzle pages need to go up levels
            if (currentPuzzleId === 'finale') {
                path = './index.html';
            } else {
                path = '../../index.html';
            }
        } else {
            // Already on main menu
            return;
        }
        
        window.location.href = path;
    }
    
    /**
     * Navigate to finale page
     */
    function navigateToFinale() {
        // Update time spent before navigating
        updateTimeSpent();
        
        // Calculate path based on current location
        let path = '';
        
        if (currentPuzzleId && currentPuzzleId !== 'finale') {
            // From puzzle page
            path = '../../finale.html';
        } else if (!currentPuzzleId) {
            // From main menu
            path = './finale.html';
        } else {
            // Already on finale
            return;
        }
        
        window.location.href = path;
    }
    
    /**
     * Check puzzle prerequisites (if puzzle requires completing others first)
     */
    function checkPuzzlePrerequisites(puzzleId) {
        // For now just check if the puzzle is unlocked
        return puzzleId <= gameState.currentPuzzle || gameState.completed.includes(puzzleId);
    }
    
    /**
     * Update debug panel with current state info
     */
    function updateDebugPanel() {
        if (!DEBUG_MODE || !elements.debugPanel) return;
        
        // Update debug information
        elements.debugPanel.innerHTML = `
            <div class="debug-info">
                <h3>Debug Info</h3>
                <p>Current Puzzle: ${currentPuzzleId || 'Main Menu'}</p>
                <p>Completed: ${gameState.completed.join(', ') || 'None'}</p>
                <p>Current Available: ${gameState.currentPuzzle}</p>
                <p>Total Time: ${formatTime(gameState.totalTimeSpent)}</p>
                <button id="debug-reset">Reset Progress</button>
            </div>
        `;
        
        // Add event listener to reset button
        document.getElementById('debug-reset').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress?')) {
                resetGameState();
                window.location.reload();
            }
        });
    }
    
    /**
     * Format milliseconds as readable time
     */
    function formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    }
    
    /**
     * Debug logging
     */
    function logDebug(...args) {
        if (DEBUG_MODE) {
            console.log('[NicksBigDay]', ...args);
        }
    }
    
    /**
     * Error logging (always shown)
     */
    function logError(...args) {
        console.error('[NicksBigDay]', ...args);
    }
    
    /**
     * Expose utilities for puzzles to use
     */
    window.puzzleUtils = {
        // Progress tracking
        markPuzzleComplete,
        recordPuzzleAttempt,
        recordHintUsage,
        
        // Navigation
        goToNextPuzzle: navigateToNextPuzzle,
        goToMainMenu: navigateToMainMenu,
        goToFinale: navigateToFinale,
        goToPuzzle: navigateToPuzzle,
        
        // Audio
        playSound,
        
        // Game state
        getPuzzleIcon,
        checkPuzzlePrerequisites,
        getTotalPuzzles: () => TOTAL_PUZZLES,
        getCurrentPuzzleId: () => currentPuzzleId,
        getCompletedCount: () => gameState.completed.length,
        
        // Utility functions for puzzles
        shuffleArray: (array) => {
            // Fisher-Yates shuffle algorithm
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        
        getRandomInt: (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        // Debug functions (only work if DEBUG_MODE is true)
        debug: (...args) => logDebug(...args),
        resetProgress: () => {
            if (DEBUG_MODE) {
                resetGameState();
                return true;
            }
            return false;
        }
    };
})();
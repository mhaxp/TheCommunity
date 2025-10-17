/**
 * TheCommunity - Hangman Game Module
 *
 * A simple Hangman game with German words and SVG graphics.
 */

'use strict';

const HangmanGame = {
    // Game configuration
    words: ['HAUS', 'KATZE', 'BLUME', 'SONNE'],
    maxWrongGuesses: 6,

    // Game state
    currentWord: '',
    guessedLetters: new Set(),
    wrongGuesses: 0,
    gameOver: false,
    won: false,

    /**
     * Initialize the Hangman game
     */
    init() {
        console.log('Hangman game initializing...');

        // Cache DOM elements
        this.elements = {
            wordDisplay: document.getElementById('word-display'),
            lettersContainer: document.getElementById('letters-container'),
            messageDisplay: document.getElementById('game-message'),
            newGameButton: document.getElementById('new-game-button'),
            svgCanvas: document.getElementById('hangman-svg')
        };

        // Verify all elements exist
        if (!this.elements.wordDisplay || !this.elements.lettersContainer ||
            !this.elements.messageDisplay || !this.elements.newGameButton ||
            !this.elements.svgCanvas) {
            console.error('Required game elements not found');
            return;
        }

        // Set up event listeners
        this.elements.newGameButton.addEventListener('click', () => this.startNewGame());

        // Start first game
        this.startNewGame();

        console.log('Hangman game initialized successfully');
    },

    /**
     * Start a new game
     */
    startNewGame() {
        // Reset game state
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessedLetters = new Set();
        this.wrongGuesses = 0;
        this.gameOver = false;
        this.won = false;

        // Reset UI
        this.updateWordDisplay();
        this.createLetterButtons();
        this.drawHangman();
        this.elements.messageDisplay.textContent = 'Errate das Wort!';
        this.elements.messageDisplay.className = 'game-message';

        console.log('New game started');
    },

    /**
     * Handle letter guess
     * @param {string} letter - The guessed letter
     */
    guessLetter(letter) {
        if (this.gameOver || this.guessedLetters.has(letter)) {
            return;
        }

        this.guessedLetters.add(letter);

        // Check if letter is in word
        if (this.currentWord.includes(letter)) {
            this.updateWordDisplay();

            // Check for win
            if (this.isWordComplete()) {
                this.gameOver = true;
                this.won = true;
                this.elements.messageDisplay.textContent = '🎉 Gewonnen! Du hast das Wort erraten!';
                this.elements.messageDisplay.className = 'game-message win';
            }
        } else {
            this.wrongGuesses++;
            this.drawHangman();

            // Check for loss
            if (this.wrongGuesses >= this.maxWrongGuesses) {
                this.gameOver = true;
                this.won = false;
                this.elements.messageDisplay.textContent = `💀 Verloren! Das Wort war: ${this.currentWord}`;
                this.elements.messageDisplay.className = 'game-message lose';
                this.revealWord();
            }
        }

        // Update button state
        this.updateLetterButtons();
    },

    /**
     * Update the word display
     */
    updateWordDisplay() {
        const display = this.currentWord
            .split('')
            .map(letter => this.guessedLetters.has(letter) ? letter : '_')
            .join(' ');

        this.elements.wordDisplay.textContent = display;
    },

    /**
     * Reveal the complete word (when game is lost)
     */
    revealWord() {
        this.elements.wordDisplay.textContent = this.currentWord.split('').join(' ');
    },

    /**
     * Check if the word is completely guessed
     * @returns {boolean}
     */
    isWordComplete() {
        return this.currentWord.split('').every(letter => this.guessedLetters.has(letter));
    },

    /**
     * Create letter buttons for the alphabet
     */
    createLetterButtons() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ';
        this.elements.lettersContainer.innerHTML = '';

        alphabet.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.className = 'letter-button';
            button.addEventListener('click', () => this.guessLetter(letter));
            this.elements.lettersContainer.appendChild(button);
        });
    },

    /**
     * Update letter button states
     */
    updateLetterButtons() {
        const buttons = this.elements.lettersContainer.querySelectorAll('.letter-button');
        buttons.forEach(button => {
            const letter = button.textContent;
            if (this.guessedLetters.has(letter)) {
                button.disabled = true;
                button.classList.add(this.currentWord.includes(letter) ? 'correct' : 'wrong');
            }
        });
    },

    /**
     * Draw the hangman using SVG
     */
    drawHangman() {
        const svg = this.elements.svgCanvas;

        // Clear existing content
        svg.innerHTML = '';

        // SVG dimensions
        const parts = [
            // 0: Base
            '<line x1="10" y1="190" x2="90" y2="190" stroke="#2c3e50" stroke-width="3"/>',
            // 1: Vertical pole
            '<line x1="30" y1="190" x2="30" y2="20" stroke="#2c3e50" stroke-width="3"/>',
            // 2: Top horizontal
            '<line x1="30" y1="20" x2="100" y2="20" stroke="#2c3e50" stroke-width="3"/>',
            // 3: Rope
            '<line x1="100" y1="20" x2="100" y2="40" stroke="#2c3e50" stroke-width="2"/>',
            // 4: Head
            '<circle cx="100" cy="55" r="15" stroke="#e74c3c" stroke-width="2" fill="none"/>',
            // 5: Body
            '<line x1="100" y1="70" x2="100" y2="120" stroke="#e74c3c" stroke-width="2"/>',
            // 6: Left arm
            '<line x1="100" y1="85" x2="80" y2="100" stroke="#e74c3c" stroke-width="2"/>',
            // 7: Right arm
            '<line x1="100" y1="85" x2="120" y2="100" stroke="#e74c3c" stroke-width="2"/>',
            // 8: Left leg
            '<line x1="100" y1="120" x2="85" y2="150" stroke="#e74c3c" stroke-width="2"/>',
            // 9: Right leg
            '<line x1="100" y1="120" x2="115" y2="150" stroke="#e74c3c" stroke-width="2"/>'
        ];

        // Draw gallows (always visible)
        svg.innerHTML += parts[0] + parts[1] + parts[2] + parts[3];

        // Draw body parts based on wrong guesses
        const bodyParts = [4, 5, 6, 7, 8, 9]; // Head, body, left arm, right arm, left leg, right leg
        for (let i = 0; i < this.wrongGuesses && i < bodyParts.length; i++) {
            svg.innerHTML += parts[bodyParts[i]];
        }
    }
};

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HangmanGame.init());
} else {
    HangmanGame.init();
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HangmanGame;
}

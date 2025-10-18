/**
 * TheCommunity - Käsekästchen (Dots and Boxes) Game Module
 *
 * A kid-friendly implementation of the classic Dots and Boxes game
 * for two players: Leo (green) and Flo (pink)
 */

'use strict';

const KaesekaestchenGame = {
    // Game configuration
    gridSize: 8, // 8x8 boxes = 9x9 dots
    players: [
        { name: 'Leo', color: '#00ff00', colorName: 'green' },
        { name: 'Flo', color: '#ff69b4', colorName: 'pink' }
    ],

    // Game state
    currentPlayerIndex: 0,
    scores: [0, 0],
    horizontalLines: [], // [row][col] - player index who drew the line or null
    verticalLines: [], // [row][col] - player index who drew the line or null
    boxes: [], // [row][col] - owner index or null
    gameOver: false,
    winner: null,

    /**
     * Initialize the Käsekästchen game
     */
    init() {
        console.log('Käsekästchen game initializing...');

        // Cache DOM elements
        this.elements = {
            gameBoard: document.getElementById('kaese-game-board'),
            currentPlayerDisplay: document.getElementById('kaese-current-player'),
            scoreDisplay: document.getElementById('kaese-scores'),
            messageDisplay: document.getElementById('kaese-game-message'),
            newGameButton: document.getElementById('kaese-new-game-button'),
            instructionsToggle: document.getElementById('kaese-instructions-toggle'),
            instructionsPanel: document.getElementById('kaese-instructions-panel'),
            fireworksCanvas: document.getElementById('kaese-fireworks')
        };

        // Verify all elements exist
        if (!this.elements.gameBoard || !this.elements.currentPlayerDisplay ||
            !this.elements.scoreDisplay || !this.elements.messageDisplay ||
            !this.elements.newGameButton || !this.elements.fireworksCanvas) {
            console.error('Required game elements not found');
            return;
        }

        // Set up event listeners
        this.elements.newGameButton.addEventListener('click', () => this.startNewGame());

        if (this.elements.instructionsToggle && this.elements.instructionsPanel) {
            this.elements.instructionsToggle.addEventListener('click', () => {
                this.elements.instructionsPanel.classList.toggle('hidden');
                const isHidden = this.elements.instructionsPanel.classList.contains('hidden');
                this.elements.instructionsToggle.textContent = isHidden ? '📖 Anleitung anzeigen' : '📖 Anleitung verbergen';
            });
        }

        // Start first game
        this.startNewGame();

        console.log('Käsekästchen game initialized successfully');
    },

    /**
     * Start a new game
     */
    startNewGame() {
        // Reset game state
        this.currentPlayerIndex = 0;
        this.scores = [0, 0];
        this.gameOver = false;
        this.winner = null;

        // Initialize grid arrays
        this.horizontalLines = [];
        this.verticalLines = [];
        this.boxes = [];

        for (let row = 0; row <= this.gridSize; row++) {
            this.horizontalLines[row] = [];
            this.verticalLines[row] = [];
            this.boxes[row] = [];

            for (let col = 0; col <= this.gridSize; col++) {
                this.horizontalLines[row][col] = null;
                this.verticalLines[row][col] = null;
                if (row < this.gridSize && col < this.gridSize) {
                    this.boxes[row][col] = null;
                }
            }
        }

        // Reset UI
        this.drawBoard();
        this.updateScoreDisplay();
        this.updateCurrentPlayerDisplay();
        this.elements.messageDisplay.textContent = 'Viel Spaß beim Spielen!';
        this.elements.messageDisplay.className = 'kaese-game-message';

        // Hide fireworks
        this.elements.fireworksCanvas.style.display = 'none';

        console.log('New Käsekästchen game started');
    },

    /**
     * Draw the game board
     */
    drawBoard() {
        const board = this.elements.gameBoard;
        board.innerHTML = '';

        const dotSize = 8;
        const cellSize = 50;
        const lineThickness = 4;

        const svgWidth = (this.gridSize + 1) * cellSize;
        const svgHeight = (this.gridSize + 1) * cellSize;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight);
        svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

        // Draw boxes (filled when claimed)
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const x = col * cellSize + dotSize;
                const y = row * cellSize + dotSize;
                const boxSize = cellSize - dotSize;

                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', x);
                rect.setAttribute('y', y);
                rect.setAttribute('width', boxSize);
                rect.setAttribute('height', boxSize);

                const owner = this.boxes[row][col];
                if (owner !== null) {
                    rect.setAttribute('fill', this.players[owner].color);
                    rect.setAttribute('fill-opacity', '0.3');
                    rect.setAttribute('stroke', this.players[owner].color);
                    rect.setAttribute('stroke-width', '2');
                } else {
                    rect.setAttribute('fill', 'transparent');
                }

                svg.appendChild(rect);
            }
        }

        // Draw horizontal lines
        for (let row = 0; row <= this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const x1 = col * cellSize + dotSize;
                const x2 = (col + 1) * cellSize + dotSize;
                const y = row * cellSize + dotSize;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', this.horizontalLines[row][col] !== null ? this.players[this.horizontalLines[row][col]].color : '#ccc');
                line.setAttribute('stroke-width', lineThickness);
                line.setAttribute('stroke-linecap', 'round');
                line.classList.add('kaese-line');
                line.style.cursor = this.horizontalLines[row][col] !== null || this.gameOver ? 'default' : 'pointer';

                if (this.horizontalLines[row][col] === null && !this.gameOver) {
                    line.addEventListener('click', () => this.handleLineClick('horizontal', row, col));
                    line.addEventListener('mouseenter', (e) => {
                        if (!this.gameOver) {
                            e.target.setAttribute('stroke', this.players[this.currentPlayerIndex].color);
                            e.target.setAttribute('opacity', '0.5');
                        }
                    });
                    line.addEventListener('mouseleave', (e) => {
                        if (this.horizontalLines[row][col] === null) {
                            e.target.setAttribute('stroke', '#ccc');
                            e.target.setAttribute('opacity', '1');
                        }
                    });
                }

                svg.appendChild(line);
            }
        }

        // Draw vertical lines
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col <= this.gridSize; col++) {
                const x = col * cellSize + dotSize;
                const y1 = row * cellSize + dotSize;
                const y2 = (row + 1) * cellSize + dotSize;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x);
                line.setAttribute('y2', y2);
                line.setAttribute('stroke', this.verticalLines[row][col] !== null ? this.players[this.verticalLines[row][col]].color : '#ccc');
                line.setAttribute('stroke-width', lineThickness);
                line.setAttribute('stroke-linecap', 'round');
                line.classList.add('kaese-line');
                line.style.cursor = this.verticalLines[row][col] !== null || this.gameOver ? 'default' : 'pointer';

                if (this.verticalLines[row][col] === null && !this.gameOver) {
                    line.addEventListener('click', () => this.handleLineClick('vertical', row, col));
                    line.addEventListener('mouseenter', (e) => {
                        if (!this.gameOver) {
                            e.target.setAttribute('stroke', this.players[this.currentPlayerIndex].color);
                            e.target.setAttribute('opacity', '0.5');
                        }
                    });
                    line.addEventListener('mouseleave', (e) => {
                        if (this.verticalLines[row][col] === null) {
                            e.target.setAttribute('stroke', '#ccc');
                            e.target.setAttribute('opacity', '1');
                        }
                    });
                }

                svg.appendChild(line);
            }
        }

        // Draw dots
        for (let row = 0; row <= this.gridSize; row++) {
            for (let col = 0; col <= this.gridSize; col++) {
                const cx = col * cellSize + dotSize;
                const cy = row * cellSize + dotSize;

                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', cx);
                circle.setAttribute('cy', cy);
                circle.setAttribute('r', dotSize / 2);
                circle.setAttribute('fill', '#2c3e50');

                svg.appendChild(circle);
            }
        }

        board.appendChild(svg);
    },

    /**
     * Handle line click
     * @param {string} direction - 'horizontal' or 'vertical'
     * @param {number} row - Row index
     * @param {number} col - Column index
     */
    handleLineClick(direction, row, col) {
        if (this.gameOver) return;

        // Check if line is already drawn
        if (direction === 'horizontal' && this.horizontalLines[row][col] !== null) return;
        if (direction === 'vertical' && this.verticalLines[row][col] !== null) return;

        // Draw the line and record who drew it
        if (direction === 'horizontal') {
            this.horizontalLines[row][col] = this.currentPlayerIndex;
        } else {
            this.verticalLines[row][col] = this.currentPlayerIndex;
        }

        // Check if any boxes were completed
        const boxesCompleted = this.checkBoxCompletion(direction, row, col);

        if (boxesCompleted > 0) {
            // Player gets another turn
            this.scores[this.currentPlayerIndex] += boxesCompleted;
            this.updateScoreDisplay();
        } else {
            // Switch player
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            this.updateCurrentPlayerDisplay();
        }

        // Redraw board
        this.drawBoard();

        // Check if game is over
        this.checkGameOver();
    },

    /**
     * Check if any boxes were completed by the last move
     * @param {string} direction - 'horizontal' or 'vertical'
     * @param {number} row - Row index
     * @param {number} col - Column index
     * @returns {number} Number of boxes completed
     */
    checkBoxCompletion(direction, row, col) {
        let completedCount = 0;

        if (direction === 'horizontal') {
            // Check box above
            if (row > 0 && this.isBoxComplete(row - 1, col)) {
                if (this.boxes[row - 1][col] === null) {
                    this.boxes[row - 1][col] = this.currentPlayerIndex;
                    completedCount++;
                }
            }
            // Check box below
            if (row < this.gridSize && this.isBoxComplete(row, col)) {
                if (this.boxes[row][col] === null) {
                    this.boxes[row][col] = this.currentPlayerIndex;
                    completedCount++;
                }
            }
        } else {
            // Check box to the left
            if (col > 0 && this.isBoxComplete(row, col - 1)) {
                if (this.boxes[row][col - 1] === null) {
                    this.boxes[row][col - 1] = this.currentPlayerIndex;
                    completedCount++;
                }
            }
            // Check box to the right
            if (col < this.gridSize && this.isBoxComplete(row, col)) {
                if (this.boxes[row][col] === null) {
                    this.boxes[row][col] = this.currentPlayerIndex;
                    completedCount++;
                }
            }
        }

        // After checking adjacent boxes, check for enclosed areas
        const enclosedCount = this.claimEnclosedAreas();
        completedCount += enclosedCount;

        return completedCount;
    },

    /**
     * Detect and claim all boxes that are enclosed (cannot reach the edge)
     * @returns {number} Number of newly claimed boxes
     */
    claimEnclosedAreas() {
        let claimedCount = 0;

        // Check each unclaimed box to see if it's enclosed
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.boxes[row][col] === null) {
                    // Check if this box is enclosed
                    if (!this.canReachEdge(row, col)) {
                        // Box is enclosed, claim it for current player
                        this.boxes[row][col] = this.currentPlayerIndex;
                        claimedCount++;
                    }
                }
            }
        }

        return claimedCount;
    },

    /**
     * Check if a box can reach the edge of the grid without crossing completed lines
     * Uses BFS to explore connected boxes
     * @param {number} startRow - Starting box row
     * @param {number} startCol - Starting box column
     * @returns {boolean} True if the box can reach the edge
     */
    canReachEdge(startRow, startCol) {
        // If we're already at the edge, we can reach it
        if (startRow === 0 || startRow === this.gridSize - 1 ||
            startCol === 0 || startCol === this.gridSize - 1) {
            return true;
        }

        const visited = new Set();
        const queue = [[startRow, startCol]];
        visited.add(`${startRow},${startCol}`);

        while (queue.length > 0) {
            const [row, col] = queue.shift();

            // Try to move to adjacent boxes
            // Move up (if no horizontal line blocks us)
            if (row > 0 && this.horizontalLines[row][col] === null) {
                const key = `${row - 1},${col}`;
                if (!visited.has(key)) {
                    // Check if this new position is at the edge
                    if (row - 1 === 0 || col === 0 || col === this.gridSize - 1) {
                        return true;
                    }
                    visited.add(key);
                    queue.push([row - 1, col]);
                }
            }

            // Move down (if no horizontal line blocks us)
            if (row < this.gridSize - 1 && this.horizontalLines[row + 1][col] === null) {
                const key = `${row + 1},${col}`;
                if (!visited.has(key)) {
                    // Check if this new position is at the edge
                    if (row + 1 === this.gridSize - 1 || col === 0 || col === this.gridSize - 1) {
                        return true;
                    }
                    visited.add(key);
                    queue.push([row + 1, col]);
                }
            }

            // Move left (if no vertical line blocks us)
            if (col > 0 && this.verticalLines[row][col] === null) {
                const key = `${row},${col - 1}`;
                if (!visited.has(key)) {
                    // Check if this new position is at the edge
                    if (col - 1 === 0 || row === 0 || row === this.gridSize - 1) {
                        return true;
                    }
                    visited.add(key);
                    queue.push([row, col - 1]);
                }
            }

            // Move right (if no vertical line blocks us)
            if (col < this.gridSize - 1 && this.verticalLines[row][col + 1] === null) {
                const key = `${row},${col + 1}`;
                if (!visited.has(key)) {
                    // Check if this new position is at the edge
                    if (col + 1 === this.gridSize - 1 || row === 0 || row === this.gridSize - 1) {
                        return true;
                    }
                    visited.add(key);
                    queue.push([row, col + 1]);
                }
            }
        }

        // If we exhausted the queue without reaching the edge, we're enclosed
        return false;
    },

    /**
     * Check if a box is complete
     * @param {number} row - Box row
     * @param {number} col - Box column
     * @returns {boolean}
     */
    isBoxComplete(row, col) {
        return this.horizontalLines[row][col] !== null &&
               this.horizontalLines[row + 1][col] !== null &&
               this.verticalLines[row][col] !== null &&
               this.verticalLines[row][col + 1] !== null;
    },

    /**
     * Check if the game is over
     */
    checkGameOver() {
        const totalBoxes = this.gridSize * this.gridSize;
        const claimedBoxes = this.scores[0] + this.scores[1];

        if (claimedBoxes === totalBoxes) {
            this.gameOver = true;

            if (this.scores[0] > this.scores[1]) {
                this.winner = 0;
            } else if (this.scores[1] > this.scores[0]) {
                this.winner = 1;
            } else {
                this.winner = null; // Tie
            }

            if (this.winner !== null) {
                const winnerName = this.players[this.winner].name;
                const winnerColor = this.players[this.winner].colorName;
                this.elements.messageDisplay.textContent = `🎉 ${winnerName} hat gewonnen!`;
                this.elements.messageDisplay.className = `kaese-game-message win-${winnerColor}`;

                // Show fireworks
                this.showFireworks(this.players[this.winner].color);
            } else {
                this.elements.messageDisplay.textContent = '🤝 Unentschieden!';
                this.elements.messageDisplay.className = 'kaese-game-message tie';
            }
        }
    },

    /**
     * Update the current player display
     */
    updateCurrentPlayerDisplay() {
        const player = this.players[this.currentPlayerIndex];
        this.elements.currentPlayerDisplay.innerHTML =
            `<span style="color: ${player.color}; font-weight: bold;">${player.name}</span> ist dran`;
    },

    /**
     * Update the score display
     */
    updateScoreDisplay() {
        this.elements.scoreDisplay.innerHTML = `
            <span style="color: ${this.players[0].color}; font-weight: bold;">${this.players[0].name}: ${this.scores[0]}</span>
            <span style="margin: 0 1rem;">-</span>
            <span style="color: ${this.players[1].color}; font-weight: bold;">${this.players[1].name}: ${this.scores[1]}</span>
        `;
    },

    /**
     * Show fireworks animation for the winner
     * @param {string} color - Winner's color
     */
    showFireworks(color) {
        const canvas = this.elements.fireworksCanvas;
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles = [];
        const particleCount = 100;
        const duration = 3000; // 3 seconds
        const startTime = Date.now();

        // Create initial particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                decay: 0.98
            });
        }

        const animate = () => {
            const elapsed = Date.now() - startTime;

            if (elapsed > duration) {
                canvas.style.display = 'none';
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new particles periodically
            if (Math.random() < 0.1) {
                for (let i = 0; i < 20; i++) {
                    particles.push({
                        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
                        y: canvas.height / 2 + (Math.random() - 0.5) * 100,
                        vx: (Math.random() - 0.5) * 10,
                        vy: (Math.random() - 0.5) * 10,
                        life: 1.0,
                        decay: 0.98
                    });
                }
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1; // Gravity
                p.life *= p.decay;

                if (p.life < 0.01) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = p.life;
                ctx.fill();
            }

            ctx.globalAlpha = 1.0;
            requestAnimationFrame(animate);
        };

        animate();
    }
};

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => KaesekaestchenGame.init());
} else {
    KaesekaestchenGame.init();
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KaesekaestchenGame;
}

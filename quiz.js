/**
 * TheCommunity - Pub Quiz Game Module
 *
 * A pub quiz game with left-alternative themed questions covering
 * social justice, environmentalism, labor history, and progressive topics.
 */

'use strict';

const PubQuiz = {
    // Quiz configuration
    questions: [
        {
            question: "Welche Gewerkschaftsbewegung führte 1886 zum ersten Internationalen Arbeiter*innentag (1. Mai)?",
            answers: ["Der Kampf für den 8-Stunden-Tag in den USA", "Die Pariser Kommune", "Der Generalstreik in Berlin", "Die Russische Revolution"],
            correct: 0,
            explanation: "Der 1. Mai erinnert an den Kampf für den 8-Stunden-Tag, der 1886 in den USA stattfand und bei den Haymarket-Ereignissen in Chicago eskalierte."
        },
        {
            question: "Was bedeutet 'Intersektionalität' in der feministischen Theorie?",
            answers: ["Die Überschneidung von Straßen", "Die Verbindung verschiedener Diskriminierungsformen", "Eine mathematische Theorie", "Die Kreuzung von politischen Ideologien"],
            correct: 1,
            explanation: "Intersektionalität, geprägt von Kimberlé Crenshaw, beschreibt wie verschiedene Diskriminierungsformen (Sexismus, Rassismus, Klassismus etc.) sich überschneiden und verstärken."
        },
        {
            question: "Welches Land führte als erstes in Europa dieEhe für alle ein?",
            answers: ["Deutschland", "Die Niederlande", "Schweden", "Spanien"],
            correct: 1,
            explanation: "Die Niederlande führten 2001 als erstes Land weltweit die gleichgeschlechtliche Ehe ein."
        },
        {
            question: "Was ist das Ziel der 'Degrowth'-Bewegung?",
            answers: ["Wirtschaftswachstum maximieren", "Schrumpfung der Wirtschaft für Nachhaltigkeit", "Bevölkerungswachstum kontrollieren", "Gewichtsreduktion"],
            correct: 1,
            explanation: "Degrowth (Postwachstum) strebt eine geplante Reduktion der Wirtschaftsproduktion an, um ökologische Nachhaltigkeit und soziale Gerechtigkeit zu erreichen."
        },
        {
            question: "Wer schrieb 'Das Kapital'?",
            answers: ["Friedrich Engels", "Karl Marx", "Rosa Luxemburg", "Antonio Gramsci"],
            correct: 1,
            explanation: "Karl Marx schrieb 'Das Kapital', eine fundamentale Kritik der politischen Ökonomie des Kapitalismus."
        },
        {
            question: "Was besagt das 1,5-Grad-Ziel des Pariser Klimaabkommens?",
            answers: ["Durchschnittstemperatur der Meere", "Maximale globale Erwärmung gegenüber vorindustrieller Zeit", "Temperatur in Städten", "Temperatur der Atmosphäre"],
            correct: 1,
            explanation: "Das 1,5-Grad-Ziel strebt an, die globale Erwärmung auf maximal 1,5°C über dem vorindustriellen Niveau zu begrenzen."
        },
        {
            question: "Was ist ein 'bedingungsloses Grundeinkommen'?",
            answers: ["Mindestlohn für alle", "Regelmäßige Zahlung ohne Bedingungen", "Kindergeld", "Arbeitslosengeld"],
            correct: 1,
            explanation: "Ein bedingungsloses Grundeinkommen ist eine regelmäßige Zahlung an alle Bürger*innen ohne Bedürftigkeitsprüfung oder Arbeitspflicht."
        },
        {
            question: "Welche Aktivistin wurde zum Symbol der Klimabewegung?",
            answers: ["Greta Thunberg", "Malala Yousafzai", "Angela Davis", "Vandana Shiva"],
            correct: 0,
            explanation: "Greta Thunberg wurde durch ihre Schulstreiks für das Klima zum globalen Symbol der Klimabewegung."
        },
        {
            question: "Was bedeutet 'FLINTA*'?",
            answers: ["Eine politische Partei", "Frauen, Lesben, Inter, Non-binary, Trans, Agender Personen", "Ein Mineralstein", "Eine Gewerkschaft"],
            correct: 1,
            explanation: "FLINTA* ist ein inklusiver Begriff für Frauen, Lesben, Inter, Non-binary, Trans und Agender Personen, die strukturelle Diskriminierung erfahren."
        },
        {
            question: "Was fordert die 'Fridays for Future'-Bewegung primär?",
            answers: ["Mehr Schulferien", "Klimagerechtigkeit und Emissionsreduktion", "Digitalisierung", "Bildungsreformen"],
            correct: 1,
            explanation: "Fridays for Future setzt sich für Klimagerechtigkeit ein und fordert die Einhaltung des Pariser Klimaabkommens."
        },
        {
            question: "Wer prägte den Begriff 'Prekariat'?",
            answers: ["Guy Standing", "Karl Marx", "Pierre Bourdieu", "Slavoj Žižek"],
            correct: 0,
            explanation: "Guy Standing beschrieb das Prekariat als neue soziale Klasse von Menschen in unsicheren Arbeitsverhältnissen."
        },
        {
            question: "Was ist 'Care-Arbeit'?",
            answers: ["Automobilproduktion", "Sorge- und Pflegearbeit", "Büroarbeit", "Handwerksarbeit"],
            correct: 1,
            explanation: "Care-Arbeit umfasst Sorge-, Pflege- und Betreuungsarbeit, die oft unsichtbar und unterbezahlt ist."
        },
        {
            question: "Welches Prinzip beschreibt, dass die größten CO2-Emittenten die größte Verantwortung für Klimaschutz tragen?",
            answers: ["Verursacherprinzip", "Solidarprinzip", "Leistungsprinzip", "Mehrheitsprinzip"],
            correct: 0,
            explanation: "Das Verursacherprinzip besagt, dass die Hauptverursacher des Klimawandels die Hauptverantwortung für dessen Bekämpfung tragen."
        },
        {
            question: "Was ist eine Genossenschaft?",
            answers: ["Eine Aktiengesellschaft", "Ein demokratisch geführtes Unternehmen im Kollektivbesitz", "Eine Behörde", "Eine Stiftung"],
            correct: 1,
            explanation: "Genossenschaften sind demokratisch von ihren Mitgliedern geführte Unternehmen im Kollektivbesitz."
        },
        {
            question: "Was kritisiert der Begriff 'Greenwashing'?",
            answers: ["Umweltverschmutzung", "Falsche ökologische Werbeversprechen", "Geldwäsche", "Grüne Politik"],
            correct: 1,
            explanation: "Greenwashing bezeichnet irreführende PR-Maßnahmen, die ein umweltfreundliches Image vortäuschen."
        },
        {
            question: "Welches Konzept beschreibt 'Commons' oder 'Gemeingüter'?",
            answers: ["Privateigentum", "Gemeinsam verwaltete Ressourcen", "Staatseigentum", "Börsengehandelte Güter"],
            correct: 1,
            explanation: "Commons sind Ressourcen, die gemeinschaftlich verwaltet und genutzt werden, wie z.B. öffentliche Parks oder freie Software."
        },
        {
            question: "Was ist das Hauptziel des Konzepts 'Food Sovereignty' (Ernährungssouveränität)?",
            answers: ["Exportsteigerung", "Lokale Kontrolle über Nahrungsmittelproduktion", "Industrialisierung der Landwirtschaft", "Genmanipulation"],
            correct: 1,
            explanation: "Ernährungssouveränität fordert das Recht von Gemeinschaften, ihre eigenen Nahrungsmittel nachhaltig und demokratisch zu produzieren."
        },
        {
            question: "Was besagt das Konzept der 'Klimagerechtigkeit'?",
            answers: ["Alle Länder müssen gleich viel CO2 reduzieren", "Reichere Länder tragen größere Verantwortung", "Klimawandel ist ungerecht", "Gerechtigkeit vor Klimaschutz"],
            correct: 1,
            explanation: "Klimagerechtigkeit fordert, dass reichere Länder und Verursacher mehr Verantwortung übernehmen und vulnerable Gemeinschaften unterstützen."
        },
        {
            question: "Was ist 'Gentrification'?",
            answers: ["Stadtentwicklung", "Aufwertung von Stadtteilen mit Verdrängung", "Gentechnologie", "Geburtenkontrolle"],
            correct: 1,
            explanation: "Gentrification beschreibt die Aufwertung von Stadtvierteln, die oft zur Verdrängung einkommensschwacher Bewohner*innen führt."
        },
        {
            question: "Welches Grundprinzip verfolgt 'Antifaschismus'?",
            answers: ["Gewaltfreiheit um jeden Preis", "Aktiver Widerstand gegen faschistische Tendenzen", "Parteipolitik", "Nationalismus"],
            correct: 1,
            explanation: "Antifaschismus bedeutet aktiven Widerstand gegen faschistische, rassistische und autoritäre Bewegungen und Strukturen."
        }
    ],

    // Game state
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 10, // Number of questions per game
    selectedQuestions: [],
    answered: false,
    timeLeft: 30,
    timerInterval: null,

    /**
     * Initialize the Pub Quiz game
     */
    init() {
        console.log('Pub Quiz initializing...');

        // Cache DOM elements
        this.elements = {
            questionText: document.getElementById('quiz-question'),
            answersContainer: document.getElementById('quiz-answers'),
            scoreDisplay: document.getElementById('quiz-score'),
            progressDisplay: document.getElementById('quiz-progress'),
            timerDisplay: document.getElementById('quiz-timer'),
            explanationDisplay: document.getElementById('quiz-explanation'),
            nextButton: document.getElementById('quiz-next-button'),
            newGameButton: document.getElementById('quiz-new-game-button')
        };

        // Verify all elements exist
        if (!this.elements.questionText || !this.elements.answersContainer ||
            !this.elements.scoreDisplay || !this.elements.progressDisplay ||
            !this.elements.timerDisplay || !this.elements.explanationDisplay ||
            !this.elements.nextButton || !this.elements.newGameButton) {
            console.error('Required quiz elements not found');
            return;
        }

        // Set up event listeners
        this.elements.nextButton.addEventListener('click', () => this.nextQuestion());
        this.elements.newGameButton.addEventListener('click', () => this.startNewGame());

        // Start first game
        this.startNewGame();

        console.log('Pub Quiz initialized successfully');
    },

    /**
     * Start a new game
     */
    startNewGame() {
        // Reset game state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answered = false;

        // Select random questions
        this.selectedQuestions = this.selectRandomQuestions(this.totalQuestions);

        // Hide new game button, show next button
        this.elements.newGameButton.style.display = 'none';
        this.elements.nextButton.style.display = 'none';

        // Reset UI
        this.updateScore();
        this.showQuestion();

        console.log('New quiz game started');
    },

    /**
     * Select random questions from the pool
     * @param {number} count - Number of questions to select
     * @returns {Array} Array of selected questions
     */
    selectRandomQuestions(count) {
        const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    },

    /**
     * Show current question
     */
    showQuestion() {
        if (this.currentQuestionIndex >= this.selectedQuestions.length) {
            this.endGame();
            return;
        }

        const question = this.selectedQuestions[this.currentQuestionIndex];
        this.answered = false;

        // Update question text
        this.elements.questionText.textContent = question.question;

        // Clear and populate answers
        this.elements.answersContainer.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-answer-button';
            button.textContent = answer;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.elements.answersContainer.appendChild(button);
        });

        // Update progress
        this.updateProgress();

        // Hide explanation
        this.elements.explanationDisplay.style.display = 'none';
        this.elements.explanationDisplay.className = 'quiz-explanation';
        this.elements.nextButton.style.display = 'none';

        // Start timer
        this.startTimer();
    },

    /**
     * Start the question timer
     */
    startTimer() {
        this.timeLeft = 30;
        this.updateTimer();

        // Clear any existing timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();

            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                if (!this.answered) {
                    this.timeUp();
                }
            }
        }, 1000);
    },

    /**
     * Update timer display
     */
    updateTimer() {
        this.elements.timerDisplay.textContent = `Zeit: ${this.timeLeft}s`;

        // Add warning class when time is running out
        if (this.timeLeft <= 10) {
            this.elements.timerDisplay.classList.add('warning');
        } else {
            this.elements.timerDisplay.classList.remove('warning');
        }
    },

    /**
     * Handle time running out
     */
    timeUp() {
        this.answered = true;
        const question = this.selectedQuestions[this.currentQuestionIndex];

        // Disable all buttons
        const buttons = this.elements.answersContainer.querySelectorAll('.quiz-answer-button');
        buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add('correct');
            }
        });

        // Show explanation
        this.showExplanation(false);

        // Show next button
        this.elements.nextButton.style.display = 'block';
    },

    /**
     * Handle answer selection
     * @param {number} selectedIndex - Index of selected answer
     */
    selectAnswer(selectedIndex) {
        if (this.answered) {
            return;
        }

        this.answered = true;
        clearInterval(this.timerInterval);

        const question = this.selectedQuestions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;

        // Update score if correct
        if (isCorrect) {
            this.score++;
            this.updateScore();
        }

        // Update button states
        const buttons = this.elements.answersContainer.querySelectorAll('.quiz-answer-button');
        buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add('correct');
            } else if (index === selectedIndex) {
                button.classList.add('wrong');
            }
        });

        // Show explanation
        this.showExplanation(isCorrect);

        // Show next button
        this.elements.nextButton.style.display = 'block';
    },

    /**
     * Show explanation for the current question
     * @param {boolean} wasCorrect - Whether the answer was correct
     */
    showExplanation(wasCorrect) {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        this.elements.explanationDisplay.textContent = question.explanation;
        this.elements.explanationDisplay.className = `quiz-explanation ${wasCorrect ? 'correct' : 'wrong'}`;
        this.elements.explanationDisplay.style.display = 'block';
    },

    /**
     * Move to next question
     */
    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.selectedQuestions.length) {
            this.showQuestion();
        } else {
            this.endGame();
        }
    },

    /**
     * Update score display
     */
    updateScore() {
        this.elements.scoreDisplay.textContent = `Punkte: ${this.score}`;
    },

    /**
     * Update progress display
     */
    updateProgress() {
        const current = this.currentQuestionIndex + 1;
        const total = this.selectedQuestions.length;
        this.elements.progressDisplay.textContent = `Frage ${current} von ${total}`;
    },

    /**
     * End the game and show results
     */
    endGame() {
        clearInterval(this.timerInterval);

        const percentage = Math.round((this.score / this.selectedQuestions.length) * 100);
        let message = '';
        let emoji = '';

        if (percentage >= 80) {
            emoji = '🌟';
            message = 'Hervorragend! Du kennst dich bestens mit linken Themen aus!';
        } else if (percentage >= 60) {
            emoji = '👍';
            message = 'Gut gemacht! Du hast ein solides Wissen über progressive Themen.';
        } else if (percentage >= 40) {
            emoji = '📚';
            message = 'Nicht schlecht! Es gibt noch einiges zu lernen.';
        } else {
            emoji = '💪';
            message = 'Weiter so! Jede*r fängt mal an. Solidarität ist ein Lernprozess!';
        }

        this.elements.questionText.textContent = `${emoji} Quiz beendet!`;
        this.elements.answersContainer.innerHTML = `
            <div class="quiz-results">
                <h3>${message}</h3>
                <p class="quiz-final-score">Du hast ${this.score} von ${this.selectedQuestions.length} Fragen richtig beantwortet (${percentage}%)</p>
            </div>
        `;

        this.elements.explanationDisplay.style.display = 'none';
        this.elements.nextButton.style.display = 'none';
        this.elements.newGameButton.style.display = 'block';
        this.elements.timerDisplay.textContent = '';
    }
};

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PubQuiz.init());
} else {
    PubQuiz.init();
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PubQuiz;
}

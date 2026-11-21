/* =========================
   WORD2VEC PAGE DATA
   All windows, pair counts, cosine values and the analogy were checked in Python.
========================= */

const PAGE = {
    name: "Word2Vec",
    all:  "Excellent! You can tell CBOW from Skip-gram, build training pairs, and compare word vectors.",
    good: "Good job! Review the questions you missed and try again.",
    low:  "Keep practicing! Remember: Word2Vec learns vectors by predicting words inside a window, and similar words get similar vectors."
};

/* Warm-up: "the dog chased a cat", centre word "chased", window size 1 -> dog, a */
const practice = {
    words: ["the", "dog", "chased", "a", "cat"],
    answer: [1, 3],
    correctHtml: "With window size 1, the context words of <strong>chased</strong> are <strong>dog</strong> and <strong>a</strong>.",
    wrongHtml: "Window size 1 means one word on each side of the centre word. Pick the word just before \"chased\" and the word just after it.",
    result: {
        label: "Skip-gram training pairs for the centre word \"chased\" (centre → context):",
        items: [{ text: "chased → dog", hot: true }, { text: "chased → a", hot: true }]
    }
};

const ENC_OPTIONS = ["CBOW", "Skip-gram"];

const questions = [
    /* ---------- EASY ---------- */
    {
        level: "easy",
        type: "choice",
        title: "What is a word embedding?",
        instruction: "Word2Vec turns every word into a vector, which is a list of numbers. Pick the best answer for each row.",
        prompt: "Complete each statement.",
        items: [
            { label: "In Word2Vec, each word is represented by",           options: ["a list of numbers (a vector)", "a single letter", "a dictionary definition"], answer: "a list of numbers (a vector)" },
            { label: "Words with similar meanings get vectors that are",   options: ["close together", "far apart", "identical"],                                       answer: "close together" },
            { label: "Word2Vec learns its vectors from",                   options: ["large amounts of raw text", "a hand-written dictionary", "grammar rules"],       answer: "large amounts of raw text" },
            { label: "Word2Vec is trained as a",                           options: ["shallow neural network", "rule-based stemmer", "table of n-gram counts"],         answer: "shallow neural network" }
        ],
        explain: "An embedding is a <strong>vector</strong> of numbers. Word2Vec learns it from raw text, so words that appear in similar contexts (like \"cat\" and \"dog\") end up with <strong>close</strong> vectors. " +
                 "The model itself is a small, <strong>shallow neural network</strong>, and the vectors are its learned weights."
    },
    {
        level: "easy",
        type: "choice",
        title: "CBOW or Skip-gram?",
        instruction: "Word2Vec has two training styles. CBOW predicts the centre word from its context. Skip-gram predicts the context words from the centre word.",
        prompt: "Which model does each description match?",
        items: [
            { label: "Predicts the centre word from the surrounding words",  options: ENC_OPTIONS, answer: "CBOW" },
            { label: "Predicts the surrounding words from the centre word",  options: ENC_OPTIONS, answer: "Skip-gram" },
            { label: "Input: the, cat, on, a  →  Output: sat",                options: ENC_OPTIONS, answer: "CBOW" },
            { label: "Input: sat  →  Outputs: cat, on",                       options: ENC_OPTIONS, answer: "Skip-gram" }
        ],
        explain: "<strong>CBOW</strong> (Continuous Bag of Words) takes many context words as input and predicts <strong>one</strong> centre word. " +
                 "<strong>Skip-gram</strong> does the reverse: <strong>one</strong> centre word goes in, and it predicts the words around it."
    },
    {
        level: "easy",
        type: "select",
        title: "Pick the context words",
        instruction: "The window size w is how many words to look at on each side of the centre word. Click every context word.",
        prompt: "Centre word: \"jump\". Window size: 2. Sentence: \"quick brown foxes jump over lazy dogs\"",
        sentence: ["quick", "brown", "foxes", "jump", "over", "lazy", "dogs"],
        answers: [1, 2, 4, 5],
        explain: "With window size 2, the context is the 2 words before and the 2 words after \"jump\": <strong>brown, foxes, over, lazy</strong>. " +
                 "\"quick\" and \"dogs\" are 3 words away, so they are outside the window. The centre word itself is never part of its own context."
    },
    {
        level: "easy",
        type: "select",
        title: "Build the skip-gram pairs",
        instruction: "A skip-gram training pair is written (centre → context). With window size 1, the context is only the word directly before or after. Click every valid pair.",
        prompt: "Which pairs come from \"I love natural language processing\" with window size 1?",
        sentence: ["I → love", "love → natural", "I → natural", "language → natural", "processing → language", "natural → processing", "love → language"],
        answers: [0, 1, 3, 4],
        explain: "Valid pairs connect <strong>neighbouring</strong> words: <strong>I → love, love → natural, language → natural, processing → language</strong>. " +
                 "<strong>I → natural</strong>, <strong>natural → processing</strong> and <strong>love → language</strong> skip a word, so they are 2 positions apart and fall outside window size 1."
    },

    /* ---------- MEDIUM ---------- */
    {
        level: "medium",
        type: "choice",
        title: "Count the context words",
        instruction: "A centre word has at most 2w context words: w on the left and w on the right. Near the start or end of a sentence there are fewer.",
        prompt: "How many context words does the centre word have?",
        items: [
            { label: "Window size 2, centre word in the middle of a long sentence",                       options: ["2", "4", "5"], answer: "4" },
            { label: "Window size 3, centre word in the middle of a long sentence",                       options: ["3", "6", "7"], answer: "6" },
            { label: "Window size 2, centre word is the first word of the sentence",                      options: ["2", "4", "0"], answer: "2" },
            { label: "Window size 1, centre word \"natural\" in \"I love natural language processing\"",  options: ["1", "2", "3"], answer: "2" }
        ],
        explain: "In the middle, the count is <strong>2w</strong>: 2 × 2 = <strong>4</strong> and 2 × 3 = <strong>6</strong>. " +
                 "The first word has nothing on its left, so with w = 2 it only has the 2 words on its right: <strong>2</strong>. " +
                 "\"natural\" has one neighbour on each side, so <strong>2</strong>."
    },
    {
        level: "medium",
        type: "choice",
        title: "Count the training pairs",
        instruction: "Every pair of words that sit within w positions of each other gives 2 skip-gram pairs (one in each direction). Pick the total for each row.",
        prompt: "How many (centre → context) pairs does the sentence produce?",
        items: [
            { label: "5 words, window size 1",                  options: ["6", "8", "10"],  answer: "8" },
            { label: "5 words, window size 2",                  options: ["12", "14", "16"], answer: "14" },
            { label: "4 words, window size 1",                  options: ["3", "6", "8"],   answer: "6" },
            { label: "3 words, window size 5 (bigger than the sentence)", options: ["3", "6", "9"], answer: "6" }
        ],
        explain: "<strong>5 words, w = 1:</strong> 4 neighbouring pairs × 2 directions = <strong>8</strong>. " +
                 "<strong>5 words, w = 2:</strong> 4 pairs at distance 1 plus 3 pairs at distance 2 = 7 pairs, × 2 = <strong>14</strong>. " +
                 "<strong>4 words, w = 1:</strong> 3 pairs × 2 = <strong>6</strong>. " +
                 "<strong>3 words, w = 5:</strong> the window covers the whole sentence, so all 3 word pairs count: 3 × 2 = <strong>6</strong>."
    },
    {
        level: "medium",
        type: "choice",
        title: "Compare vectors with cosine similarity",
        instruction: "Cosine similarity = (a · b) ÷ (|a| × |b|). It is 1 for the same direction, 0 for unrelated (90°) and −1 for opposite directions. Use the vectors given.",
        prompt: "Vectors: cat = (4, 1), dog = (5, 2), car = (1, 4), banana = (−3, 2)",
        items: [
            { label: "Which word is the most similar to \"cat\"?",                     options: ["dog", "car", "banana"], answer: "dog" },
            { label: "Cosine similarity of a = (1, 0) and b = (0, 1)",                options: ["0", "0.5", "1"],        answer: "0" },
            { label: "Cosine similarity of a = (1, 2) and b = (2, 4)",                 options: ["0", "0.5", "1"],        answer: "1" },
            { label: "Cosine similarity of a = (1, 0) and b = (−1, 0)",                options: ["−1", "0", "1"],         answer: "−1" }
        ],
        explain: "The cosine similarities with \"cat\" are <strong>dog 0.99</strong>, car 0.47 and banana −0.67, so <strong>dog</strong> points in almost the same direction. " +
                 "(1, 0) and (0, 1) are at 90°, so the similarity is <strong>0</strong>. (2, 4) is just (1, 2) stretched, so the direction is the same: <strong>1</strong>. " +
                 "(1, 0) and (−1, 0) point in opposite directions: <strong>−1</strong>. Cosine ignores length and only compares direction."
    },

    /* ---------- HARD ---------- */
    {
        level: "hard",
        type: "select",
        title: "Spot the mistake in the pairs",
        instruction: "A student listed the skip-gram pairs for the centre word \"sat\" with window size 2. Some pairs are wrong. Click every wrong pair.",
        prompt: "Sentence: \"the cat sat on a mat\". Which of the student's pairs are wrong?",
        sentence: ["sat → the", "sat → cat", "sat → on", "sat → mat", "sat → sat"],
        answers: [3, 4],
        explain: "With window size 2, the context of \"sat\" is <strong>the, cat, on, a</strong>. " +
                 "<strong>sat → mat</strong> is wrong because \"mat\" is 3 positions away. " +
                 "<strong>sat → sat</strong> is wrong because a word is never its own context. " +
                 "The student also forgot the pair <strong>sat → a</strong>."
    },
    {
        level: "hard",
        type: "choice",
        title: "Word analogies with vectors",
        instruction: "Embeddings capture relationships as directions, so vector arithmetic can solve analogies. Work out king − man + woman, then find the closest word.",
        prompt: "Vectors: king = (4, 2), man = (1, 1), woman = (1, 3), queen = (4, 4), prince = (4, 1), castle = (0, 5)",
        items: [
            { label: "king − man + woman = ?",                                         options: ["(4, 4)", "(4, 2)", "(6, 0)"], answer: "(4, 4)" },
            { label: "Which word is closest to that result?",                          options: ["queen", "prince", "castle"],  answer: "queen" },
            { label: "What does this kind of analogy show?",                           options: ["Relationships like gender are stored as directions", "Word2Vec stores a dictionary", "Words are sorted alphabetically"],
              answer: "Relationships like gender are stored as directions" }
        ],
        explain: "king − man = (3, 1), and adding woman (1, 3) gives <strong>(4, 4)</strong>, which is exactly the vector for <strong>queen</strong>. " +
                 "Subtracting \"man\" and adding \"woman\" moves the vector along the gender direction. " +
                 "In real Word2Vec the result is only approximately \"queen\", but the idea is the same: <strong>relationships are stored as directions</strong>."
    },
    {
        level: "hard",
        type: "choice",
        title: "Choose CBOW or Skip-gram",
        instruction: "Both models learn useful vectors, but they suit different situations. CBOW is faster to train, while Skip-gram works better for rare words and small datasets.",
        prompt: "Which model fits each situation?",
        items: [
            { label: "You have a small dataset with many rare words",                  options: ENC_OPTIONS, answer: "Skip-gram" },
            { label: "You need fast training on a very large corpus",                  options: ENC_OPTIONS, answer: "CBOW" },
            { label: "Guess the missing word in \"the cat ___ on a mat\" from its neighbours", options: ENC_OPTIONS, answer: "CBOW" },
            { label: "Use the word \"sat\" to predict \"cat\" and \"on\"",              options: ENC_OPTIONS, answer: "Skip-gram" }
        ],
        explain: "<strong>Skip-gram</strong> makes one training example per (centre, context) pair, so rare words get more updates and it copes better with small data. " +
                 "<strong>CBOW</strong> averages the context into a single prediction, which makes it faster on large corpora. " +
                 "Predicting a missing word from its neighbours is CBOW; predicting neighbours from one word is Skip-gram."
    }
];

/* =========================
   QUIZ ENGINE
   Expects these globals from the data section above:
   practice  - warm-up config
   questions - the 10 questions
   PAGE      - text for the final screen
========================= */

const LEVEL_LABEL = { easy: "Easy", medium: "Medium", hard: "Hard" };
const practiceAnswer = new Set(practice.answer);
let practiceSelection = new Set();

let currentQuestionIndex = 0;
let selections = questions.map(q =>
    q.type === "select" ? new Set() : q.items.map(() => null)
);
let questionResults = new Array(questions.length).fill(null);

/* =========================
   SHARED HELPERS
========================= */

function makeChip(text, isSelected, onClick) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "word-chip" + (isSelected ? " selected" : "");
    chip.textContent = text;
    chip.setAttribute("aria-pressed", isSelected ? "true" : "false");
    chip.addEventListener("click", onClick);
    return chip;
}

function setChipSelected(chip, isSelected) {
    chip.classList.toggle("selected", isSelected);
    chip.setAttribute("aria-pressed", isSelected ? "true" : "false");
}

function sameSet(a, b) {
    return a.size === b.size && [...a].every(v => b.has(v));
}

/* =========================
   WARM-UP
========================= */

function renderPractice() {
    const container = document.getElementById("practiceSentence");
    container.innerHTML = "";
    practiceSelection = new Set();

    practice.words.forEach((word, index) => {
        const chip = makeChip(word, false, () => {
            if (practiceSelection.has(index)) practiceSelection.delete(index);
            else practiceSelection.add(index);
            setChipSelected(chip, practiceSelection.has(index));
        });
        container.appendChild(chip);
    });
}

function checkPractice() {
    const feedback = document.getElementById("practiceFeedback");
    const result = document.getElementById("practiceResult");
    const isCorrect = sameSet(practiceSelection, practiceAnswer);

    feedback.className = isCorrect ? "feedback show correct" : "feedback show wrong";
    feedback.innerHTML = isCorrect
        ? "<strong>🎉 Correct!</strong><br>" + practice.correctHtml
        : "<strong>❌ Not quite.</strong><br>" + practice.wrongHtml;

    result.className = "practice-result show";
    result.innerHTML = `
        <div class="result-label">${practice.result.label}</div>
        <div class="result-chips">
            ${practice.result.items.map(t => `<span class="result-chip${t.hot ? " changed" : ""}">${t.text}</span>`).join("")}
        </div>
    `;

    document.querySelectorAll("#practiceSentence .word-chip").forEach((chip, index) => {
        chip.classList.remove("correct", "missed", "wrong-selected");
        if (practiceAnswer.has(index)) {
            chip.classList.add(practiceSelection.has(index) ? "correct" : "missed");
        } else if (practiceSelection.has(index)) {
            chip.classList.add("wrong-selected");
        }
    });
}

/* =========================
   PROGRESS STRIP
========================= */

function buildProgressStrip() {
    const strip = document.getElementById("progressStrip");
    strip.innerHTML = "";
    questions.forEach((q, i) => {
        const seg = document.createElement("button");
        seg.type = "button";
        seg.className = "progress-seg seg-" + q.level;
        seg.textContent = i + 1;
        seg.addEventListener("click", () => {
            currentQuestionIndex = i;
            renderQuestion();
        });
        strip.appendChild(seg);
    });
}

function updateProgressStrip() {
    document.querySelectorAll("#progressStrip .progress-seg").forEach((seg, i) => {
        const r = questionResults[i];
        seg.classList.toggle("seg-correct", r === true);
        seg.classList.toggle("seg-wrong", r === false);
        seg.classList.toggle("seg-current", i === currentQuestionIndex);
        const status = r === true ? "correct" : r === false ? "incorrect" : "not checked";
        seg.setAttribute("aria-label", `Question ${i + 1}, ${LEVEL_LABEL[questions[i].level]}, ${status}`);
        if (i === currentQuestionIndex) seg.setAttribute("aria-current", "step");
        else seg.removeAttribute("aria-current");
    });
}

/* =========================
   TASK RENDERING
========================= */

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const area = document.getElementById("taskArea");
    area.innerHTML = "";

    document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1;
    document.getElementById("questionInstruction").textContent = q.instruction;

    const box = document.getElementById("questionBox");
    box.innerHTML = "";
    const meta = document.createElement("div");
    meta.className = "question-meta";
    const title = document.createElement("span");
    title.className = "question-title";
    title.textContent = q.title;
    const level = document.createElement("span");
    level.className = "level level-" + q.level;
    level.textContent = LEVEL_LABEL[q.level];
    meta.append(title, level);
    const prompt = document.createElement("div");
    prompt.className = "question-prompt";
    prompt.textContent = q.prompt;
    box.append(meta, prompt);

    if (q.type === "select") renderSelectQuestion(q, area);
    else renderChoiceQuestion(q, area);

    resetFeedback();

    if (questionResults[currentQuestionIndex] !== null) {
        applyMarks();
        showFeedback(true);
    }

    updateSelectionStatus();
    updateNavigationButtons();
    updateProgressStrip();
}

function renderSelectQuestion(q, area) {
    const wrap = document.createElement("div");
    wrap.className = "task-word-area";
    wrap.id = "taskWords";
    const selection = selections[currentQuestionIndex];

    q.sentence.forEach((word, index) => {
        const chip = makeChip(word, selection.has(index), () => {
            if (selection.has(index)) selection.delete(index);
            else selection.add(index);
            setChipSelected(chip, selection.has(index));
            onSelectionChanged();
        });
        wrap.appendChild(chip);
    });
    area.appendChild(wrap);
}

function renderChoiceQuestion(q, area) {
    const list = document.createElement("div");
    list.className = "choice-list";
    const picks = selections[currentQuestionIndex];

    q.items.forEach((item, rowIndex) => {
        const row = document.createElement("div");
        row.className = "choice-row";
        row.dataset.row = rowIndex;

        const label = document.createElement("div");
        label.className = "choice-label";
        label.textContent = item.label;

        const options = document.createElement("div");
        options.className = "choice-options";

        item.options.forEach(option => {
            const chip = makeChip(option, picks[rowIndex] === option, () => {
                picks[rowIndex] = option;
                options.querySelectorAll(".word-chip").forEach(c => setChipSelected(c, c === chip));
                onSelectionChanged();
            });
            chip.dataset.option = option;
            options.appendChild(chip);
        });

        row.append(label, options);
        list.appendChild(row);
    });
    area.appendChild(list);
}

function onSelectionChanged() {
    // Changing an answer after checking clears the old result so it can be checked again.
    if (questionResults[currentQuestionIndex] !== null) {
        questionResults[currentQuestionIndex] = null;
        clearMarks();
        resetFeedback();
        updateProgressStrip();
    }
    updateSelectionStatus();
}

function updateSelectionStatus() {
    const q = questions[currentQuestionIndex];
    const status = document.getElementById("selectionStatus");
    if (q.type === "select") {
        const count = selections[currentQuestionIndex].size;
        status.textContent = `${count} item${count === 1 ? "" : "s"} selected`;
    } else {
        const answered = selections[currentQuestionIndex].filter(v => v !== null).length;
        status.textContent = `${answered} of ${q.items.length} answered`;
    }
}

/* =========================
   CHECKING
========================= */

function checkAnswer() {
    const q = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    let isCorrect;

    if (q.type === "select") {
        const selected = selections[currentQuestionIndex];
        if (selected.size === 0) {
            feedback.className = "feedback show wrong";
            feedback.innerHTML = "<strong>Select at least one item first.</strong><br>Click the items you think match, then check again.";
            return;
        }
        isCorrect = sameSet(selected, new Set(q.answers));
    } else {
        const picks = selections[currentQuestionIndex];
        if (picks.some(p => p === null)) {
            feedback.className = "feedback show wrong";
            feedback.innerHTML = "<strong>Answer every row first.</strong><br>Pick one option in each row, then check again.";
            return;
        }
        isCorrect = q.items.every((item, i) => picks[i] === item.answer);
    }

    questionResults[currentQuestionIndex] = isCorrect;
    applyMarks();
    showFeedback(false);
    updateProgressStrip();
}

function applyMarks() {
    const q = questions[currentQuestionIndex];

    if (q.type === "select") {
        const selected = selections[currentQuestionIndex];
        const correct = new Set(q.answers);
        document.querySelectorAll("#taskWords .word-chip").forEach((chip, index) => {
            chip.classList.remove("correct", "missed", "wrong-selected");
            if (correct.has(index)) chip.classList.add(selected.has(index) ? "correct" : "missed");
            else if (selected.has(index)) chip.classList.add("wrong-selected");
        });
        return;
    }

    const picks = selections[currentQuestionIndex];
    document.querySelectorAll(".choice-row").forEach(row => {
        const rowIndex = Number(row.dataset.row);
        const item = q.items[rowIndex];
        const rowCorrect = picks[rowIndex] === item.answer;
        row.classList.remove("row-correct", "row-wrong");
        row.classList.add(rowCorrect ? "row-correct" : "row-wrong");

        row.querySelectorAll(".word-chip").forEach(chip => {
            chip.classList.remove("correct", "missed", "wrong-selected");
            if (chip.dataset.option === item.answer) chip.classList.add("correct");
            else if (chip.dataset.option === picks[rowIndex]) chip.classList.add("wrong-selected");
        });
    });
}

function clearMarks() {
    document.querySelectorAll("#taskArea .word-chip").forEach(chip =>
        chip.classList.remove("correct", "missed", "wrong-selected"));
    document.querySelectorAll(".choice-row").forEach(row =>
        row.classList.remove("row-correct", "row-wrong"));
}

function showFeedback(isSaved) {
    const q = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    const explain = document.getElementById("explainBox");
    const ok = questionResults[currentQuestionIndex] === true;

    feedback.className = ok ? "feedback show correct" : "feedback show wrong";
    if (ok) {
        feedback.innerHTML = isSaved
            ? "<strong>🎉 Correct!</strong><br>You answered this question correctly."
            : "<strong>🎉 Correct!</strong><br>Every answer is right.";
    } else {
        feedback.innerHTML = "<strong>❌ Not quite.</strong><br>The correct answers are highlighted in green. Read the explanation below, then change your answers to try again.";
    }

    explain.className = "explain-box show";
    explain.innerHTML = "<strong>Why:</strong> " + q.explain;
}

function resetFeedback() {
    const feedback = document.getElementById("feedback");
    const explain = document.getElementById("explainBox");
    feedback.className = "feedback";
    feedback.innerHTML = "";
    explain.className = "explain-box";
    explain.innerHTML = "";
}

/* =========================
   NAVIGATION & FINISH
========================= */

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function updateNavigationButtons() {
    const previousButton = document.getElementById("previousButton");
    const nextButton = document.getElementById("nextButton");
    previousButton.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Finish Task ✓";
        nextButton.onclick = finishTask;
    } else {
        nextButton.textContent = "Next →";
        nextButton.onclick = nextQuestion;
    }
}

function finishTask() {
    const score = questionResults.filter(r => r === true).length;
    const total = questions.length;
    const taskCard = document.querySelector(".task-card");

    const levelScores = ["easy", "medium", "hard"].map(level => {
        const idx = questions.map((q, i) => q.level === level ? i : -1).filter(i => i !== -1);
        const got = idx.filter(i => questionResults[i] === true).length;
        return `<li><span><span class="level level-${level}">${LEVEL_LABEL[level]}</span></span><span>${got} / ${idx.length}</span></li>`;
    }).join("");

    const recap = questions.map((q, i) => {
        const status = questionResults[i] === true
            ? '<span class="ok">Correct</span>'
            : questionResults[i] === false
                ? '<span class="no">Incorrect</span>'
                : '<span class="no">Not checked</span>';
        return `<li><span>${i + 1}. ${q.title}</span>${status}</li>`;
    }).join("");

    taskCard.innerHTML = `
        <div class="final-score">
            <div class="score-icon">🎉</div>
            <h2>Task Completed!</h2>
            <p>You completed all ${total} ${PAGE.name} challenges.</p>
            <div class="score-circle">${score}/${total}</div>
            <ul class="recap">${levelScores}</ul>
            <ul class="recap">${recap}</ul>
            <p class="score-message">
                ${score === total
                    ? PAGE.all
                    : score >= Math.ceil(total * 0.7)
                    ? PAGE.good
                    : PAGE.low
                }
            </p>
            <button onclick="restartQuiz()">Try Again</button>
        </div>
    `;
}

function restartQuiz() {
    location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("totalQuestions").textContent = questions.length;
    renderPractice();
    buildProgressStrip();
    renderQuestion();
});

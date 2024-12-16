
const quizData = [
    
    { question: "Quel attribut est utilisé pour spécifier un lien hypertexte dans une balise <a> ?", options: ["href", "src", "link"], correct: "href" },
    { question: "À quoi sert la propriété CSS `flexbox` ?", options: ["Créer une mise en page fluide et adaptable", "Ajouter des animations", "Gérer les formulaires"], correct: "Créer une mise en page fluide et adaptable" },
    { question: "Que fait la méthode `addEventListener` en JavaScript ?", options: ["Elle attache une fonction à un événement", "Elle supprime un événement", "Elle modifie le style d’un élément"], correct: "Elle attache une fonction à un événement" },
    { question: "Quelle est la syntaxe correcte pour créer une fonction en Python ?", options: ["function ma_fonction()", "def ma_fonction()", "func ma_fonction()"], correct: "def ma_fonction()" },
    { question: "Que signifie l'opérateur `**` en Python ?", options: ["Multiplication", "Puissance", "Modulo"], correct: "Puissance" },
    { question: "Qu'est-ce que l'apprentissage par transfert ?", options: ["Transférer des données entre modèles", "Réutiliser un modèle pré-entraîné pour une nouvelle tâche", "Optimiser un réseau neuronal"], correct: "Réutiliser un modèle pré-entraîné pour une nouvelle tâche" },
    { question: "Quel framework est souvent utilisé pour entraîner des modèles de Deep Learning ?", options: ["TensorFlow", "Flask", "Apache"], correct: "TensorFlow" },
    { question: "Quelle technologie est la plus couramment utilisée pour développer des applications mobiles multiplateformes ?", options: ["React Native", "AngularJS", "Django"], correct: "React Native" },
    { question: "Quelle entreprise a développé le langage Python ?", options: ["Google", "Microsoft", "Guido van Rossum"], correct: "Guido van Rossum" },
    { question: "Que signifie l'opérateur `**` en Python ?", options: ["Multiplication", "Puissance", "Modulo"], correct: "Puissance" }
];

let currentQuestionIndex = 0; // L'index de la question actuelle
let answers = []; // Tableau pour enregistrer les réponses de l'utilisateur

const questionContainer = document.getElementById("question-container");
const questionProgress = document.getElementById("question-progress");
const nextButton = document.getElementById("next-button");


// Fonction pour charger une question: afficher une question
//Affiche la question et ses options dans le conteneur questionContainer.
//Les options sont rendues dynamiquement en parcourant le tableau options grâce à .map().
//La progression (exemple : "1 sur 10 Questions") est mise à jour.
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p class="question">${currentQuestionIndex + 1}. ${currentQuestion.question}</p>
        <div class="options">
            ${currentQuestion.options
                .map(option => `<label><input type="radio" name="answer" value="${option}"> ${option}</label>`)
                .join("")}
        </div>
    `;
    questionProgress.textContent = `${currentQuestionIndex + 1} sur ${quizData.length} Questions`;
}

// Gérer le clic sur le bouton suivant
nextButton.addEventListener("click", () => {
const selectedOption = document.querySelector('input[name="answer"]:checked'); // Vérifie si une réponse est sélectionnée
if (!selectedOption) {
alert("Veuillez sélectionner une réponse !");
return;
 }

// Sauvegarder la réponse de l'utilisateur
answers.push({
answer: selectedOption.value, // Réponse choisie par l'utilisateur
correctAnswer: quizData[currentQuestionIndex].correct // Bonne réponse
});

currentQuestionIndex++; // Passer à la question suivante

if (currentQuestionIndex < quizData.length) {
loadQuestion(); // Charger la prochaine question
} else {
displayResults(); // Afficher les résultats si c'était la dernière question
}
});


// Fonction pour afficher les résultats à la fin du quiz
function displayResults() {
    let score = 0;

    // Calculer le score final
    answers.forEach((response, index) => {
        if (response.answer === response.correctAnswer) {
            score++;
        }
    });

    // Afficher les résultats avec les bonnes réponses
    questionContainer.innerHTML = `<h2>Quiz Terminé !</h2>
        <p>Votre score final est de ${score} / ${quizData.length}.</p>
        <h3>Réponses :</h3>
        <ul>
            ${quizData
            //Utilise .map() pour générer une liste des réponses correctes.
                .map(
                    (q, index) =>
                        `<li>Question ${index + 1}: ${q.correct})</li>` 
                )
                .join("")}
        </ul>`;
    //Cache le bouton "Suivant" et la progression pour laisser place aux résultats.
    nextButton.classList.add("hidden");
    questionProgress.classList.add("hidden");
}

// Charger la première question au démarrage
loadQuestion();

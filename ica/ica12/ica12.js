// Select the new quote button
const newQuoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

// Add an event listener to the button
newQuoteButton.addEventListener('click', getQuote);
answerButton.addEventListener('click', getAnswer);

const quoteText = document.querySelector('#js-quote-text');
const answerText = document.querySelector('#js-answer-text');

// API endpoint
const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

// Function to fetch a new quote
async function getQuote() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        displayQuote(data.question);
        answer = data.answer;
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        alert("Failed to fetch a new quote. Please check the console for details.");
    }
}

async function getAnswer() {
    displayAnswer(answer);
}

// Function to display the quote in the HTML
function displayQuote(quote) {
    quoteText.textContent = quote;
}

function displayAnswer(answer) {
    answerText.textContent = answer;
}

// Fetch a quote on page load
getQuote();

let answer = "";
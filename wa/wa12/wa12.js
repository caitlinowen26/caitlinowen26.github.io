/*
// Select the new quote button
const newQuoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

// Add an event listener to the button
newQuoteButton.addEventListener('click', getQuote);
answerButton.addEventListener('click', getAnswer);

const quoteText = document.querySelector('#js-quote-text');
const answerText = document.querySelector('#js-answer-text');

// API endpoint
const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion'; //change api

// Function to fetch a new quote
async function getQuote() 
{
    try {
        const response = await fetch(endpoint);
        if (!response.ok) 
        {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        displayQuote(data.question);
        answer = data.answer;
    } 
    catch (error) 
    {
        console.error("Failed to fetch quote:", error);
        alert("Failed to fetch a new quote. Please check the console for details.");
    }
}

async function getAnswer() 
{
    displayAnswer(answer);
}

// Function to display the quote in the HTML
function displayQuote(quote) 
{
    quoteText.textContent = quote;
}

function displayAnswer(answer) 
{
    answerText.textContent = answer;
}

// Fetch a quote on page load
getQuote();

let answer = "";


// Select the new quote button
const newQuoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet'); // Assuming you still want a button to do something

// Add an event listener to the button
newQuoteButton.addEventListener('click', getQuote);
answerButton.addEventListener('click', getSomethingElse); // Rename this function

const quoteText = document.querySelector('#js-quote-text');
const answerText = document.querySelector('#js-answer-text'); // You can repurpose this or remove it

// API endpoint
const endpoint = 'https://api.breakingbadquotes.xyz/v1/quotes'; // Breaking Bad Quotes API

// Function to fetch a new quote
async function getQuote() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        displayQuote(data[0].quote, data[0].author); // API returns an array; grab the first quote
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        alert("Failed to fetch a new quote. Please check the console for details.");
    }
}

// Function to do something else (you can adapt this)
async function getSomethingElse() {
    // This function can be repurposed to do something with the Breaking Bad data
    // For example, you could display the author in the answerText field.
    answerText.textContent = "This button doesn't do anything yet!";
}

// Function to display the quote in the HTML
function displayQuote(quote, author) {
    quoteText.textContent = `"${quote}" - ${author}`; // Display quote and author
}

// Fetch a quote on page load
getQuote();
*/

// Select the new quote button
const newQuoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

// Add an event listener to the button
newQuoteButton.addEventListener('click', getQuote);
answerButton.addEventListener('click', showAuthor);

const quoteText = document.querySelector('#js-quote-text');
const answerText = document.querySelector('#js-answer-text');

// API endpoint
const endpoint = 'https://api.breakingbadquotes.xyz/v1/quotes';

let currentQuote = null; // Store the current quote object

// Function to fetch a new quote
async function getQuote() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        currentQuote = data[0]; // Store the entire quote object
        displayQuote(currentQuote.quote); // Display only the quote initially
        answerText.textContent = ""; // Clear the author text
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        alert("Failed to fetch a new quote. Please check the console for details.");
    }
}

// Function to show the author
function showAuthor() {
    if (currentQuote) {
        answerText.textContent = `- ${currentQuote.author}`; // Display the author
    } else {
        answerText.textContent = "No quote loaded yet!";
    }
}

// Function to display the quote in the HTML
function displayQuote(quote) {
    quoteText.textContent = `"${quote}"`; // Display only the quote
}

// Fetch a quote on page load
getQuote();
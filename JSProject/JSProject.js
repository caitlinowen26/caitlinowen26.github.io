const morseCodeMap = {
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    'y': '-.--', // Morse code for 'yes'
    'n': '-.',   // Morse code for 'no'
};

let currentDigit = 1; // Track the current digit being requested
const totalDigits = 10; // Total digits in a phone number
let phoneNumber = ''; // Store the phone number
let isConfirming = false; // Flag to check if we are confirming the number
let timer; // Timer variable
let timeLeft = 15; // Time in seconds

// Function to create and display a custom alert
function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.id = 'customAlert';
    alertDiv.innerText = message;
    document.body.appendChild(alertDiv);

    // Style the alert
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.9);
        color: #ffcc00;
        padding: 20px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 20px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
    `;

    // Remove the alert after 3 seconds
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', function() {
        const morseInput = document.getElementById('morseInput').value.trim();
        console.log(`Submit clicked with input: ${morseInput}`); // Debugging log

        if (!isConfirming) {
            if (currentDigit <= totalDigits) {
                const digit = decodeMorse(morseInput);
                console.log(`Decoded digit: ${digit}`); // Debugging log

                if (digit && digit.length === 1) { // Ensure only one digit is entered
                    phoneNumber += digit; // Append the digit to the phone number
                    currentDigit++; // Move to the next digit
                    resetTimer(); // Reset the timer

                    if (currentDigit <= totalDigits) {
                        document.getElementById('morsePrompt').innerText = `Digit ${currentDigit}:`;
                        document.getElementById('morseInput').value = ''; // Clear input
                    } else {
                        document.getElementById('result').innerText = `Is this your number? ${phoneNumber}`;
                        document.getElementById('morsePrompt').innerText = 'Enter "yes" or "no" in Morse code:';
                        isConfirming = true; // Set confirming flag
                        document.getElementById('morseInput').value = ''; // Clear input
                    }
                } else {
                    document.getElementById('result').innerText = 'Invalid Morse Code! Enter a valid digit.';
                }
            }
        } else {
            // Confirming phase
            const confirmation = decodeMorse(morseInput);
            console.log(`Confirmation input: ${confirmation}`); // Debugging log

            if (confirmation === 'y') {
                document.getElementById('result').innerText = `Your phone number is: ${phoneNumber}`;
                document.getElementById('morsePrompt').innerText = 'Thank you!';
                document.getElementById('morseInput').style.display = 'none'; // Hide input after confirmation
                document.getElementById('submitBtn').style.display = 'none'; // Hide button after confirmation
                clearInterval(timer); // Clear the timer
            } else if (confirmation === 'n') {
                // Reset for re-entry
                resetGame();
            } else {
                document.getElementById('result').innerText = 'Invalid! Enter either "yes" or "no".';
            }
        }
    });
});

function decodeMorse(morse) {
    return Object.keys(morseCodeMap).find(key => morseCodeMap[key] === morse);
}

// Timer functions
function startTimer() {
    timeLeft = 15; // Reset time
    document.getElementById('timer').innerText = `${timeLeft} seconds`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            flashRed(); // Flash the screen red when time is up
            showAlert('Times up >:)'); // Notify user
            resetGame(); // Start over if time runs out
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer(); // Restart the timer
}

function resetGame() {
    currentDigit = 1; // Reset to the first digit
    phoneNumber = ''; // Clear stored phone number
    isConfirming = false; // Reset confirming flag

    document.getElementById('morsePrompt').innerText = `Digit ${currentDigit}:`;
    document.getElementById('morseInput').value = ''; // Clear input
    document.getElementById('result').innerText = ''; // Clear previous result
    resetTimer(); // Reset timer
}

// Flash the screen red with a pulsing effect for 3 seconds
function flashRed() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block'; // Show the overlay

    setTimeout(() => {
        overlay.style.display = 'none'; // Hide the overlay after 3 seconds
    }, 3000); // Flash for 3 seconds
}

// Start the timer when the page loads
window.onload = startTimer;


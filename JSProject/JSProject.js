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
let timeLeft = 10; // Time in seconds

document.getElementById('submitBtn').addEventListener('click', function() {
    const morseInput = document.getElementById('morseInput').value.trim();

    if (!isConfirming) {
        if (currentDigit <= totalDigits) {
            const digit = decodeMorse(morseInput);

            if (digit && digit.length === 1) { // Ensure only one digit is entered
                phoneNumber += digit; // Append the digit to the phone number
                currentDigit++; // Move to the next digit
                resetTimer(); // Reset the timer

                if (currentDigit <= totalDigits) {
                    document.getElementById('morsePrompt').innerText = `Please enter the Morse code for digit ${currentDigit}:`;
                    document.getElementById('morseInput').value = ''; // Clear input
                } else {
                    document.getElementById('result').innerText = `Is this your number? ${phoneNumber}`;
                    document.getElementById('morsePrompt').innerText = 'Please enter "yes" or "no" in Morse code:';
                    isConfirming = true; // Set confirming flag
                    document.getElementById('morseInput').value = ''; // Clear input
                }
            } else {
                document.getElementById('result').innerText = 'Invalid Morse Code! Please enter a valid digit.';
            }
        }
    } else {
        // Confirming phase
        const confirmation = decodeMorse(morseInput);
        if (confirmation === 'y') {
            document.getElementById('result').innerText = `Your confirmed phone number is: ${phoneNumber}`;
            document.getElementById('morsePrompt').innerText = 'Thank you!';
            document.getElementById('morseInput').style.display = 'none'; // Hide input after confirmation
            document.getElementById('submitBtn').style.display = 'none'; // Hide button after confirmation
            clearInterval(timer); // Clear the timer
        } else if (confirmation === 'n') {
            // Reset for re-entry
            currentDigit = 1;
            phoneNumber = '';
            isConfirming = false;
            resetTimer(); // Reset timer
            document.getElementById('morsePrompt').innerText = `Please enter the Morse code for digit ${currentDigit}:`;
            document.getElementById('morseInput').value = ''; // Clear input
            document.getElementById('result').innerText = ''; // Clear previous result
        } else {
            document.getElementById('result').innerText = 'Invalid Morse Code! Please enter "yes" or "no".';
        }
    }
});

function decodeMorse(morse) {
    return Object.keys(morseCodeMap).find(key => morseCodeMap[key] === morse);
}

// Timer functions
function startTimer() {
    timeLeft = 10; // Reset time
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            flashRed(); // Call the flash function first
            setTimeout(() => {
                alert('Time is up! You have to start over.'); // Show alert after flashing
                resetGame(); // Reset the game if time runs out
            }, 3000); // Delay the alert for 3 seconds
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer(); // Restart the timer
}

function resetGame() {
    currentDigit = 1;
    phoneNumber = '';
    isConfirming = false;
    document.getElementById('morsePrompt').innerText = `Please enter the Morse code for digit ${currentDigit}:`;
    document.getElementById('morseInput').value = ''; // Clear input
    document.getElementById('result').innerText = ''; // Clear previous result
    resetTimer(); // Reset the timer
}

// Flash the screen red for 3 seconds
function flashRed() {
    const originalColor = document.body.style.backgroundColor; // Save the original background color
    document.body.style.backgroundColor = 'red'; // Change to red

    setTimeout(() => {
        document.body.style.backgroundColor = originalColor; // Revert back to original color
    }, 3000); // Flash for 3 seconds
}

// Start the timer when the page loads
window.onload = startTimer;
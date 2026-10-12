const passwordField = document.getElementById("Password");
const generateButton = document.querySelector("button");
const copyIcon = document.querySelector(".display img");

function generatePassword() {
    const userInput = passwordField.value.trim();
    const specialChars = "!@#$%^&*()_+";
    const numbers = "0123456789";
    let finalPassword = "";

    if (userInput) {
        let hasNumbers = /\d/.test(userInput); // Check if input contains numbers
        let hasLetters = /[a-zA-Z]/.test(userInput);

        if (hasNumbers && hasLetters) {
            // Insert special character between letters and numbers & add one at the end
            finalPassword = userInput.replace(/(\d+)/, `${getRandomChar(specialChars)}$1`) + getRandomChar(specialChars);
        } else {
            // If only letters, add a random number + special character at start & end
            finalPassword = getRandomChar(numbers) + getRandomChar(specialChars) + userInput + getRandomChar(specialChars);
        }
    } else {
        // Generate a fully random password (10 characters)
        finalPassword = generateRandomPassword(10);
    }

    passwordField.value = finalPassword;
}

// Function to get a random character from a given set
function getRandomChar(charSet) {
    return charSet.charAt(Math.floor(Math.random() * charSet.length));
}

// Function to generate a completely random password
function generateRandomPassword(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += getRandomChar(chars);
    }
    return password;
}

// Function to copy password to clipboard
copyIcon.addEventListener("click", () => {
    if (passwordField.value) {
        navigator.clipboard.writeText(passwordField.value);
    }
});

// Add event listener to generate button
generateButton.addEventListener("click", generatePassword);

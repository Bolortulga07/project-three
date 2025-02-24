"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Create an interface for user input
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Generate a random number between 1 and 10
var secretNumber = Math.floor(Math.random() * 10) + 1;
var attempts = 3;
console.log("🎮 Welcome to the Number Guessing Game!");
console.log("Guess a number between 1 and 10. You have 3 attempts.");
// Function to handle user input
function askGuess() {
    rl.question("Enter your guess: ", function (input) {
        var guess = parseInt(input, 10);
        if (isNaN(guess) || guess < 1 || guess > 10) {
            console.log("❌ Invalid input. Please enter a number between 1 and 10.");
        }
        else if (guess === secretNumber) {
            console.log("🎉 Congratulations! You guessed the right number!");
            rl.close();
            return;
        }
        else {
            attempts--;
            if (attempts > 0) {
                console.log("\u274C Wrong guess! You have ".concat(attempts, " attempts left."));
                askGuess();
            }
            else {
                console.log("\uD83D\uDE22 Game Over! The correct number was ".concat(secretNumber, "."));
                rl.close();
            }
        }
    });
}
// Start the game
askGuess();

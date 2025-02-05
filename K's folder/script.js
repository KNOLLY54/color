document.addEventListener("DOMContentLoaded", () => {
    const colorBox = document.getElementById("colorBox");
    const colorButtons = document.querySelectorAll(".color-btn");
    const gameStatus = document.getElementById("gameStatus");
    const scoreDisplay = document.getElementById("score");
    const newGameButton = document.getElementById("newGameButton");

    let colors = [];
    let targetColor = "";
    let score = 0;

    function generateColors() {
        colors = [];
        for (let i = 0; i < 6; i++) {
            let color = rgb(random(0, 255), random(0, 255), random(0, 255));
            colors.push(color);
        }
        console.log("Generated colors:", colors);
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function rgb(r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    }

    function setupGame() {
        generateColors();
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        colorBox.style.backgroundColor = targetColor;
        console.log("Target color:", targetColor);

        colorButtons.forEach((button, index) => {
            button.style.backgroundColor = colors[index];
            button.classList.remove("wrong");
            button.onclick = () => checkGuess(colors[index], button);
        });

        gameStatus.textContent = "";
    }

    function checkGuess(selectedColor, button) {
        if (selectedColor === targetColor) {
            gameStatus.textContent = "Correct! 🎉";
            gameStatus.style.color = "green";
            score++;
            scoreDisplay.textContent = score;
            setTimeout(setupGame, 1000);
        } else {
            gameStatus.textContent = "Wrong! Try Again.";
            gameStatus.style.color = "red";
            button.classList.add("wrong");
            setTimeout(() => button.classList.remove("wrong"), 500);
        }
    }

    newGameButton.addEventListener("click", () => {
        score = 0;
        scoreDisplay.textContent = score;
        setupGame();
    });

    setupGame();
});
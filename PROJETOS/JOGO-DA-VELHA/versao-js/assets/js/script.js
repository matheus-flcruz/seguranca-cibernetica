/* assets/js/script.js */

const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#turn-indicator');
const restartBtn = document.querySelector('#reset-button');

// O estado do tabuleiro (array de 9 posições)
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;

// No seu Python, o PC era 'X' e Jogador 'O'. Vamos manter.
const player = "O";
const computer = "X";
let currentPlayer = computer; // O PC começa, igual no seu Python

// Matrizes de vitória (Linhas, Colunas, Diagonais)
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Vez de: ${currentPlayer}`;
    running = true;
    
    // Se for a vez do computador (início do jogo), ele joga
    if(currentPlayer === computer){
        setTimeout(computerPlay, 500); // Pequeno delay para parecer que está pensando
    }
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-index") - 1; // Ajusta 1-9 para 0-8

    // Se a célula já tem algo ou o jogo parou, ou se não é a vez do humano
    if (options[cellIndex] != "" || !running || currentPlayer === computer) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    // Adiciona classe para estilizar cor (definido no seu CSS como .x e .o)
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = (currentPlayer === "O") ? computer : player;
    statusText.textContent = `Vez de: ${currentPlayer}`;

    // Se mudou para o computador, ele joga automaticamente
    if(currentPlayer === computer && running){
        setTimeout(computerPlay, 600);
    }
}

function computerPlay() {
    // Lógica simples: Escolhe um espaço aleatório (igual ao randrange do Python)
    let available = [];
    
    // Acha os espaços vazios
    options.forEach((cell, index) => {
        if(cell === "") available.push(index);
    });

    if(available.length > 0 && running){
        // Sorteia um índice
        const randomIndex = Math.floor(Math.random() * available.length);
        const cellIndex = available[randomIndex];
        
        // Pega a div correspondente no HTML
        const cell = document.querySelector(`.cell[data-index="${cellIndex + 1}"]`);
        
        updateCell(cell, cellIndex);
        checkWinner();
    }
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Venceu!`;
        statusText.className = "win"; // Adiciona classe para CSS (opcional)
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Empate!`;
        statusText.className = "draw";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = computer; // PC começa de novo
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Vez de: ${currentPlayer}`;
    statusText.className = ""; // Reseta cor
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o"); // Remove classes de cor
    });
    running = true;
    
    // PC joga o primeiro movimento
    setTimeout(computerPlay, 500);
}
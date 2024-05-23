// Zmienne globalne
let currentOperand = "0";
let previousOperand = "";
let operation = undefined;

const history = [];

// Funkcja aktualizująca wyświetlacz
function updateDisplay() {
    const displayScreen = document.querySelector("#display p");

    if (operation != null) {
        displayScreen.innerText = `${previousOperand} ${operation} ${currentOperand}`;
    } else {
        displayScreen.innerText = currentOperand || "0";
    }

    // Dynamiczne dostosowywanie rozmiaru czcionki
    if (currentOperand.length > 10 || previousOperand.length > 10) {
        displayScreen.style.fontSize = "18px";
    } else {
        displayScreen.style.fontSize = "24px";
    }
}

// Funkcja aktualizująca wydruk historii działań
function updateHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";

    history.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item}`;
        historyList.appendChild(li);
    });
}

// Funkcja dodawania cyfry do aktualnego operandu
function appendNumber(number) {
    if (number === "." && (currentOperand === "" || currentOperand.includes("."))) {
        const isResult = previousOperand !== "" && operation === undefined;

        if (isResult) {
            currentOperand = "0" + number;
        }
        return;
    }

    if (currentOperand === "0" && number !== ".") {
        currentOperand = number.toString();
    } else if (currentOperand.length < 12) {
        currentOperand = currentOperand.toString() + number.toString();
    }

    updateDisplay();
}

// Funkcja wybierająca operację matematyczną
function chooseOperation(op) {
    if (currentOperand === "" && previousOperand !== "") {
        operation = op;
        updateDisplay();
        return;
    }

    if (currentOperand === "") return;

    if (previousOperand !== "") {
        compute();
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
}

// Funkcja wykonywania obliczeń
function compute() {
    let computation;
    let current = parseFloat(currentOperand);
    const prev = parseFloat(previousOperand);

    if (isNaN(prev)) return;
    if (isNaN(current)) current = prev;

    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "/":
            computation = prev / current;
            break;
        default:
            return;
    }

    addToHistory(`${prev} ${operation} ${current} = ${computation}`);

    currentOperand = computation.toString();
    previousOperand = currentOperand;
    operation = undefined;

    updateDisplay();
    updateHistory();
}

// Funkcja dodająca działanie do historii
function addToHistory(expression) {
    history.push(expression);
}

// Funkcja kasująca ostatnią cyfrę
function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);

    if (currentOperand === "") {
        currentOperand = "0";
    }

    updateDisplay();
}

// Funkcja kasująca cały bufor
function clearScreen() {
    currentOperand = "0";
    previousOperand = "";
    operation = undefined;
    
    updateDisplay();
}

// Funkcja inicjująca kalkulator
function gen() {
    const body = document.querySelector("body");

    const existingMain = document.getElementById("main");
    if (existingMain) {
        existingMain.remove();
    }

    const main = document.createElement("div");
    main.setAttribute("id", "main");

    const buttonBox = document.createElement("div");
    buttonBox.setAttribute("id", "buttonBox");

    const historyBox = document.createElement("div");
    historyBox.setAttribute("id", "historyBox");

    const displayDiv = document.createElement("div");
    displayDiv.setAttribute("id", "display");
    const displayScreen = document.createElement("p");
    displayScreen.innerHTML = "0";
    displayDiv.appendChild(displayScreen);

    const historyList = document.createElement("ul");
    historyList.setAttribute("id", "history");

    historyBox.appendChild(historyList);

    main.appendChild(displayDiv);
    main.appendChild(buttonBox);
    body.appendChild(main);
    body.appendChild(historyBox);

    const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    numberButtons.forEach((number) => {
        const button = document.createElement("button");
        button.innerText = number;
        button.onclick = function () {
            appendNumber(number);
        };
        buttonBox.appendChild(button);
    });

    const operations = ["+", "-", "*", "/"];

    operations.forEach((op) => {
        const button = document.createElement("button");
        button.innerText = op;
        button.onclick = function () {
            chooseOperation(op);
        };
        buttonBox.appendChild(button);
    });

    const keyEqual = document.createElement("button");
    keyEqual.innerText = "=";
    keyEqual.onclick = function () {
        compute();
    };
    buttonBox.appendChild(keyEqual);

    const keyDot = document.createElement("button");
    keyDot.innerText = ".";
    keyDot.onclick = function () {
        appendNumber(".");
    };
    buttonBox.appendChild(keyDot);

    const keyClear = document.createElement("button");
    keyClear.innerText = "C";
    keyClear.onclick = deleteNumber;
    buttonBox.appendChild(keyClear);

    const keyClearAll = document.createElement("button");
    keyClearAll.innerText = "CE";
    keyClearAll.onclick = clearScreen;
    buttonBox.appendChild(keyClearAll);
}

gen();

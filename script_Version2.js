let balance = 100;
let gameInterval;
let gameInProgress = false;

function updateBalanceDisplay() {
  document.getElementById("balance").innerText = `Balance: ₹${balance}`;
}

function logResult(picked, result, outcome, amount) {
  const log = document.getElementById("history");
  const entry = document.createElement("li");
  entry.innerText = `You picked ${picked.toUpperCase()}, Result was ${result.toUpperCase()}. ${outcome}! ₹${amount}`;
  log.prepend(entry);
}

function placeBet(color) {
  if (gameInProgress) {
    alert("Wait for the current game to finish.");
    return;
  }

  const betAmount = parseInt(document.getElementById("bet").value);

  if (isNaN(betAmount) || betAmount <= 0) {
    alert("Enter a valid bet amount.");
    return;
  }

  if (betAmount > balance) {
    alert("Insufficient balance.");
    return;
  }

  gameInProgress = true;
  document.getElementById("result").innerText = "Waiting for result...";
  let timeLeft = 3;
  document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

  gameInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      runGame(color, betAmount);
    }
  }, 1000);
}

function runGame(userColor, betAmount) {
  const colors = ["red", "green", "violet"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  document.getElementById("result").innerText = `Result: ${randomColor.toUpperCase()}`;
  document.getElementById("timer").innerText = "";

  let outcomeText;
  if (userColor === randomColor) {
    let winnings = 0;
    if (randomColor === "violet") {
      winnings = betAmount * 5;
    } else {
      winnings = betAmount * 2;
    }
    balance += winnings - betAmount;
    outcomeText = `You won ₹${winnings}`;
    alert(outcomeText);
    logResult(userColor, randomColor, "You WON", winnings);
  } else {
    balance -= betAmount;
    outcomeText = `You lost ₹${betAmount}`;
    alert(outcomeText);
    logResult(userColor, randomColor, "You LOST", betAmount);
  }

  updateBalanceDisplay();
  gameInProgress = false;
}

window.onload = function () {
  updateBalanceDisplay();
};

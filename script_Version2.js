const colors = ['red', 'green', 'blue'];
let selectedColor = '';

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function setColorBox() {
  selectedColor = randomColor();
  document.getElementById('colorBox').style.background = selectedColor;
}

function resetGame() {
  setColorBox();
  document.getElementById('result').textContent = '';
  document.getElementById('playAgain').style.display = 'none';
  document.querySelectorAll('.color-btn').forEach(btn => btn.disabled = false);
}

document.addEventListener('DOMContentLoaded', () => {
  setColorBox();

  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const guess = this.getAttribute('data-color');
      if (guess === selectedColor) {
        document.getElementById('result').textContent = 'Correct! 🎉';
      } else {
        document.getElementById('result').textContent = `Wrong! The colour was ${selectedColor}.`;
      }
      document.getElementById('playAgain').style.display = 'inline-block';
      document.querySelectorAll('.color-btn').forEach(btn => btn.disabled = true);
    });
  });

  document.getElementById('playAgain').addEventListener('click', resetGame);
});
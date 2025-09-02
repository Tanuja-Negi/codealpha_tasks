let display = document.getElementById('display');
let currentInput = '';

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.') && !/[\+\-\*\/]$/.test(currentInput)) return;
  currentInput += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === '') return;
  if (/[\+\-\*\/]$/.test(currentInput)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += operator;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(currentInput);
    currentInput = result.toString();
  } catch (error) {
    currentInput = 'Error';
  }
  updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  else if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
  else if (e.key === 'Enter') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearDisplay();
  else if (e.key === '.') appendNumber('.');
});

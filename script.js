// DOM Variables
const selectCurrencyOne = document.querySelector('#currency-one');
const selectCurrencyTwo = document.querySelector('#currency-two');
const amountCurrencyOne = document.querySelector('#amount-one');
const amountCurrencyTwo = document.querySelector('#amount-two');

const swapBtn = document.querySelector('#swap');
const showRate = document.querySelector('#rate');

// Event listeners
selectCurrencyOne.addEventListener('change', calculate);
amountCurrencyOne.addEventListener('input', calculate);
selectCurrencyTwo.addEventListener('change', calculate);
amountCurrencyTwo.addEventListener('input', calculate);

swapBtn.addEventListener('click', () => {
  const temp = selectCurrencyOne.value;
  selectCurrencyOne.value = selectCurrencyTwo.value;
  selectCurrencyTwo.value = temp;
  calculate();
})

// Function
// DOM update and fetch rate
function calculate() {
  const currencyOne = selectCurrencyOne.value;
  const currencyTwo = selectCurrencyTwo.value;

  fetch(`https://v6.exchangerate-api.com/v6/bcf7e7a9582bf72f03263c4c/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
      // Get rate
      const rate = data.conversion_rates[currencyTwo];
      // Show rate in DOM
      showRate.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`
      // Display amount in DOM
      amountCurrencyTwo.value = (amountCurrencyOne.value * rate).toFixed(2);
    });

}

// Calling function
calculate();
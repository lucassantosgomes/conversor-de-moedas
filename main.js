const inputValueInitial = document.getElementById('option__value-initial');
function removeDisplayLoading() {
  document.getElementById('display-loading').style.display = 'none';
}
function showDisplayLoading(mensagem = 'Carregando dados...') {
  document.getElementById('display-loading').style.display = 'flex';
  document.querySelector('.display-loading span').textContent = mensagem;
}
function getCoinSelected() {
  const coins = Array(...document.getElementsByName('coin'));
  const coinSelected = coins.filter(element => element.checked);
  return coinSelected[0].id;
}

function updatePlaceholderInputValueInitial(newPlaceHolder) {
  inputValueInitial.placeholder = `Adicione o valor em ${newPlaceHolder}`;
}
function calculateConversionInitialReal(value) {
  const real = value.toFixed(2);
  const dolar = (value / +priceReal.USDBRL.bid).toFixed(2);
  const euro = (value / +priceReal.EURBRL.bid).toFixed(2);
  const btc = value / +priceReal.BTCBRL.bid;
  return { real, dolar, euro, btc };
}

function calculateConversionInitialDolar(value) {
  value = value.toFixed(2);
  const real = (value * 5.26).toFixed(2);
  const dolar = value;
  const euro = value;
  const btc = value * 0.000051;
  return { real, dolar, euro, btc };
}

function calculateConversionInitialEuro(value) {
  value = value.toFixed(2);
  const real = (value * 5.25).toFixed(2);
  const dolar = value;
  const euro = value;
  const btc = value * 0.000051;
  return { real, dolar, euro, btc };
}
function calculateConversionInitialBtc(value) {
  const real = (value * 103366.3).toFixed(2);
  const dolar = (value * 19707.8).toFixed(2);
  const euro = (value * 19677.65).toFixed(2);
  const btc = value;
  return { real, dolar, euro, btc };
}

function showResults({ real, dolar, euro, btc }) {
  document.getElementById('valor-real').textContent = real;
  document.getElementById('valor-dolar').textContent = dolar;
  document.getElementById('valor-euro').textContent = euro;
  document.getElementById('valor-btc').textContent = btc;
}

function calculateConversion() {
  const coinInitialSelected = getCoinSelected();
  const valueInitial = +document.getElementById('option__value-initial').value;
  let resultsConversion;
  if (coinInitialSelected === 'real') {
    resultsConversion = calculateConversionInitialReal(valueInitial);
    updatePlaceholderInputValueInitial('real');
  } else if (coinInitialSelected === 'dolar') {
    resultsConversion = calculateConversionInitialDolar(valueInitial);
    updatePlaceholderInputValueInitial('dolar');
  } else if (coinInitialSelected === 'euro') {
    resultsConversion = calculateConversionInitialEuro(valueInitial);
    updatePlaceholderInputValueInitial('euro');
  } else if (coinInitialSelected === 'bitcoin') {
    resultsConversion = calculateConversionInitialBtc(valueInitial);
    updatePlaceholderInputValueInitial('bitcoin');
  } else return;
  showResults(resultsConversion);
}
alert('ATENÇÃO: as conversões só são atuais quando o valor inicial é em real');
inputValueInitial.addEventListener('keyup', calculateConversion);
inputValueInitial.addEventListener('change', calculateConversion);
document.getElementsByName('coin').forEach(element => {
  element.addEventListener('change', calculateConversion);
});

showDisplayLoading();
const cotacaoBrlApiUrl =
  'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL';
let priceReal;
fetch(cotacaoBrlApiUrl)
  .then(res => res.json())
  .then(res => {
    priceReal = res;
    removeDisplayLoading();
  })
  .catch(e => {
    showDisplayLoading(
      'Ocorreu um erro, verifique a conecção e atualize a página.'
    );
  });

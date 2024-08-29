import  { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    fetch('/src/assets/data.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching the data:', error));
  }, []);

  const handleConvert = () => {
    if (fromCurrency && toCurrency && amount) {
      const fromRate = data.find((country) =>
        country.currencies.hasOwnProperty(fromCurrency)
      ).currencies[fromCurrency].rateToUSD;

      const toRate = data.find((country) =>
        country.currencies.hasOwnProperty(toCurrency)
      ).currencies[toCurrency].rateToUSD;

      const result = (amount * fromRate) / toRate;
      setConvertedAmount(result.toFixed(3));
      setExchangeRate((fromRate / toRate).toFixed(4));
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">From</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        >
          {data.map((country) => {
            if (country.currencies) {
              const currencyCode = Object.keys(country.currencies)[0];
              const currencyName = country.currencies[currencyCode].name;
              const uniqueKey = `${currencyCode}-${country.name}`;
              return (
                <option key={uniqueKey} value={currencyCode}>
                  {currencyName} ({currencyCode})
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">To</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        >
          {data.map((country) => {
            if (country.currencies) {
              const currencyCode = Object.keys(country.currencies)[0];
              const currencyName = country.currencies[currencyCode].name;
              const uniqueKey = `${currencyCode}-${country.name}`;
              return (
                <option key={uniqueKey} value={currencyCode}>
                  {currencyName} ({currencyCode})
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>
      </div>
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
      >
        Convert
      </button>

      {convertedAmount !== null && (
        <div className="mt-6">
          <p className="text-lg">{`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}</p>
          <p className="text-sm text-gray-500">1 {fromCurrency} = {exchangeRate} {toCurrency}</p>
        </div>
      )}
    </div>
  );
};

export default App;

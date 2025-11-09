import { useState } from 'react';
import './App.css';
import { InputBox } from './components/index';
import { useCurrencyInfo } from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const currencies = Object.keys(currencyInfo);

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="app-container">
      <div className="w-full">
        <div className="w-full max-w-xl mx-auto border border-gray-60 rounded-lg p-6 backdrop-blur-sm bg-white/30 shadow-lg">
          
          {/* 🌟 Heading added here */}
         <h1 className="text-5xl font-extrabold text-center text-blue-950 mb-8 drop-shadow-md tracking-wide">
  <span className="block text-6xl mb-2 animate-bounce">💱</span>
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
    Currency Converter
  </span>
</h1>
<p className="text-center text-gray-900 text-sm italic mb-6">
  Convert currencies instantly — powered by real-time rates 🌍
</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={currencies}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={currencies}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

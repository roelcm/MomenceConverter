import { Currency } from "../models/Currency";


function getCurrencyData( currencies, currencyCode ) {
    return currencies.find(curr => curr.code === currencyCode);
}

export function getCurrency(data) {
    if (data.length < 5) {
        return
    }
    
    return new Currency(data[0], data[1], data[2], data[3], data[4])
}

export function formatNumber(currency, amount) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

      return formatter.format(amount)
}


export function calcTotal(currencies, amount, fromCurrency, toCurrency) {
    let fromCurrencyData = getCurrencyData(currencies, fromCurrency);
    let toCurrencyData = getCurrencyData(currencies, toCurrency);
    
    return amount * toCurrencyData.amount * fromCurrencyData.rate / toCurrencyData.rate;
}
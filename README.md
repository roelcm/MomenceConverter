# Momence Converter

Simple currency converter, allows users to choose from a list of currencies and convert between them. Also the list of all available currencies and it's rate, conversions
.

## Screenshot

https://user-images.githubusercontent.com/119692027/208942999-6b5121cc-fe86-450b-be72-d93c3cdae148.png

## Installation
- Clone or download the repo
- ```cd MomenceConverter```
- ```yarn```
- ```npx pod-install```
- ```yarn ios```

## Structure
Important Files:

```bash
MomenceConverter/
├── App.js
├── views
│   └── CurrencyConverter.js
├── components
│   └── CurrencyForm.js
│   └── CurrencyList.js
├── utils
│   └── functions.js
└── models
    └── Currency.js
```

**App.js**: Simply imports and renders CurrencyConverter.js

**views/CurrencyConverter.js**: Main view, fetches currency API and displays header, forms and currency list.

**components/CurrencyForm.js**: Form to select currency and input amount to convert.

**components/CurrencyList.js**: List of currencies displayed at the bottom.

**utils/functions.js**: A couple of functions used across the app.

**models/Currency.js**: Model that represents one currency.

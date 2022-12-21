export class Currency {
    constructor(country, currency, amount, code, rate) {
        this.country = country;
        this.currency = currency;
        this.amount = amount;
        this.code = code;
        this.rate = parseFloat(rate);
        this.label = code;
        this.value = rate;
    }
}


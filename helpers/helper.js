class Helper {
    static currencyFormat(currency) {
        return `Rp. ${currency.toLocaleString()}`;
    }

    static optionFormat(obj) {
        return `${obj.name}, ${Helper.currencyFormat(obj.price)}, ${obj.avgRating}`;
    }
}

module.exports = Helper;
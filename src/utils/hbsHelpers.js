const Intl = require('intl');

module.exports = {
    convertPriceInReais: price => {
        const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2})

        let priceStr = String(price);
        if (priceStr.indexOf('.') != -1 && priceStr.substring(priceStr.indexOf('.')).length > 3 ){
            priceStr = priceStr.substr(0, priceStr.indexOf('.') + 3);
            return formatter.format(Number(priceStr))
        }

        return formatter.format(price)
    },
    isSelected: (filter, value) => {
        return filter == value ? 'selected': '';
    }
}
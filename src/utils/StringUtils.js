module.exports.formatCardNumber = function (cardNumber) {
    return cardNumber.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/g, '$1 $2 $3 $4')
}

module.exports.getNames = function (objectListWithNameField, delimiter) {
    let names = "";
    for (const item of objectListWithNameField) {
        names = names + item.name + delimiter
    }
    if (objectListWithNameField.length > 0) {
        names = names.substring(0, names.length - delimiter.length)
    }
    return names;
}

module.exports.getInitials = function (name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    let initials = [...name.matchAll(rgx)] || [];
    initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
}

module.exports.currencyOption = {
    currency: 'IDR',
    valueRange: {
        min: 0,
    }
}
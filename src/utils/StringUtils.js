module.exports.formatCardNumber = function (cardNumber) {
    return cardNumber.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/g, '$1 $2 $3 $4')
}
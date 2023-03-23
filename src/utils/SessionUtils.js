const Cookies = require('js-cookie');
const {default: jwtDecode} = require('jwt-decode');

module.exports.isAuthorized = function () {
    try {
        const token = Cookies.get('BEARER');
        const decode = jwtDecode(token);
        console.log(decode)
        return !!decode.email;
    } catch (_) {
        return false;
    }

}
module.exports.getSessionData = function () {
    const token = Cookies.get('BEARER');
    return jwtDecode(token);
}
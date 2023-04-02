const Cookies = require('js-cookie');
const { default: jwtDecode } = require('jwt-decode');

module.exports.isAuthorized = function () {
    try {
        const token = Cookies.get('BEARER');
        const decode = jwtDecode(token);
        return !!decode.email;
    } catch (_) {
        return false;
    }

}
module.exports.getSessionData = function () {
    const token = Cookies.get('BEARER');
    return jwtDecode(token);
}
module.exports.putSessionData = function (key, value, expireInHour) {
    const now = new Date();
    const expires = new Date(now.getTime() + expireInHour * 60 * 60 * 1000);
    Cookies.set(key, value, {
        expires,
    });
}
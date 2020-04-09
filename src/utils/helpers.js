export const isValidEmail = email => {
    const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return EMAIL_REGEX.test(email);
};

export const isProd = process.env.NODE_ENV === 'production';
export const isGithub = window.location.hostname.indexOf('github') > -1;

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

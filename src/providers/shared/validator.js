/**
 * Chek if email is valid
 * @prop String email
 * @returns Boolean
 */
export const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Chek if vatiable is empty
 * @prop String thing
 * @returns Boolean
 */
export const isEmpty = (thing) => {
    let empty = false;

    switch (typeof thing) {
        case 'undefined':
            empty = true;
            break;
        case 'string':
            if (thing.trim().length === 0) {
                empty = true;
            }
            break;
        case 'object':
            if (thing === null) {
                empty = true;
            } else if (Object.keys(thing).length === 0) {
                empty = true;
            }
            break;
        case 'number':
            if (thing === null) {
                empty = true;
            } else if (!thing) {
                empty = true;
            }
            break;
        default:
            empty = true;
    }

    return empty;
}

/**
 * Check length of the string greater than
 * @prop String|Integer str
 * @prop boolean|options.trim Trim input before validating
 * @prop number|options.lt Check if length less than lt
 * @prop number|options.lte Check if length is less than or equals to lte
 * @prop number|options.gt Check if length is greater than gt
 * @prop number|options.gte Check if length is greater than or equals to gte
 * @returns Boolean
 */
export const isLength = (str, options) => {

    if (isEmpty(options)) {
        throw new Error("Who will provide the options you?")
    }

    let isValid = true;

    if (['string', 'number'].indexOf(typeof str) === -1) {
        isValid = false;
    } else {
        // Convert to string incase it's number
        let len = 0;

        if (options.trim) {
            len = str.toString().trim().length;
        } else {
            len = str.toString().length;
        }

        if (typeof options.lt === 'number' && len >= options.lt) {
            isValid = false;
        } else if (typeof options.lte === 'number' && len > options.lte) {
            isValid = false;
        } else if (typeof options.gt === 'number' && len <= options.gt) {
            isValid = false;
        } else if (typeof options.gte === 'number' && len < options.gte) {
            isValid = false;
        }
    }

    return isValid;
}

/**
 * Check if string contains whitespaces
 * @prop String str
 * @returns Boolean
 */
export const isContainWhiteSpace = (str) => {

    if (typeof str === 'string' || typeof str === 'number') {
        return str.toString().trim().indexOf(' ') !== -1;
    } else {
        return false;
    }
}

/**
 * check phone number
 */
export const isPhoneNumber = (mobile) => {

    if (/^\d{10}$/.test(mobile)) {
        return true;
    } else {
        return false;
    }
}

/**
 * check percentage format 
 */
export const isValidPercentage = (percentage) => {

    // percentage = parseFloat(percentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        return false;
    } else {
        return true;
    }
}

/**
 * check username format
 */
export const isUsername = (username) => {

    if (/^[a-zA-Z0-9\_\-\.]+$/.test(username)) {
        return true;
    } else {
        return false;
    }
}

/**
 * check number 
 */
export const numberOnly = (numberString) => {
    if(isNaN(numberString)) {
        return false;
    } else {
        return true;
    }
}

/**
 * return true if found more then 0
 */
export const isMoreThenZero = (numberString) => {

    numberString = parseFloat(numberString);
    if(numberString > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * validate the date
 */
export const isDate = (InputDate) => {

    let moment = require('moment');

    if(!moment(InputDate, 'YYYY-MM-DD').isValid()) {
        return false;
    } else {
        return true;
    }
}

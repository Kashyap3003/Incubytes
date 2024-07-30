function add(numbers) {
    // checking for input, if it is emphty than it return 
    if (!numbers) {
        return 0;
    }

    const defaultDelimiter = /[\n,]/;


    if (numbers.startsWith('//')) {
        // extracting custom delimiter and the numbers part from the string
        const [delimiterPart, numbersPart] = numbers.split('\n', 2);

        if (delimiterPart.startsWith('//[')) {
            // extracting and escaping special characters from multiple delimiters
            const delimiters = delimiterPart
                .slice(3, -1)
                .split('][')
                .map(delim => escapeRegExp(delim)) // here we are escapimg special characters
                .join('|');

            return calculateSum(numbersPart, new RegExp(delimiters, 'g'));
        } 
        else {

            const singleDelimiter = delimiterPart.slice(2);
            return calculateSum(numbersPart, new RegExp(escapeRegExp(singleDelimiter), 'g'));
        }
    } 
    else {
        // this is the default delimiter
        return calculateSum(numbers, defaultDelimiter);
    }
}

function calculateSum(numbers, delimiter) {

    const numArray = numbers.split(delimiter);


    const negatives = numArray.filter(isNegativeNumber);

    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(',')}`);
    }


    return numArray
        .map(toNumber)
        .filter(isValidNumber)
        .reduce(sumNumbers, 0);
}

// here are some helper functions
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isNegativeNumber(num) {
    const parsedNum = toNumber(num);
    return !isNaN(parsedNum) && parsedNum < 0;
}

function toNumber(num) {
    return parseInt(num, 10);
}

function isValidNumber(num) {
    return !isNaN(num) && num <= 1000;
}

function sumNumbers(sum, num) {
    return sum + num;
}

module.exports = add;

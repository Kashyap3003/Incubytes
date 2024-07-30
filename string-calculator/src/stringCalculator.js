function add(numbers) {
    if (numbers === "") {
        return 0;
    }

    // Split the input string by commas or new lines
    const numArray = numbers.split(/[\n,/]/);
    return numArray.reduce((sum, num) => sum + parseInt(num), 0);
}

module.exports = add;

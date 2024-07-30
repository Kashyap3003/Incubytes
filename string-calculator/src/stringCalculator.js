function add(numbers) {
    if (numbers === "") {
        return 0;
    }

    let delimiter = /[\n,]/; // Default delimiters: comma and newline

    if (numbers.startsWith("//")) {
        // Custom delimiter specified
        const parts = numbers.split("\n", 2);
        delimiter = new RegExp(parts[0].slice(2).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape special characters
        numbers = parts[1]; // Update numbers to the remaining part
    }

    const numArray = numbers.split(delimiter);
    return numArray.reduce((sum, num) => {
        const parsedNum = parseInt(num);
        return sum + (isNaN(parsedNum) ? 0 : parsedNum);
    }, 0);
}

module.exports = add;

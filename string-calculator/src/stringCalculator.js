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
    const negatives = numArray.filter(num => parseInt(num) < 0);

    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
    }

    return numArray.reduce((sum, num) => sum + (isNaN(parseInt(num)) ? 0 : parseInt(num)), 0);
}

module.exports = add;

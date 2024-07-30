function add(numbers) {
    if (numbers === "") {
        return 0;
    }

    let delimiter = /[\n,]/; // Default delimiters: comma and newline

    if (numbers.startsWith("//")) {
        // Custom delimiter specified
        const parts = numbers.split("\n", 2);
        const delimiterPart = parts[0].slice(2); // Extract delimiter part
        
        if (delimiterPart.startsWith('[') && delimiterPart.endsWith(']')) {
            // Handle multiple delimiters
            const delimiters = delimiterPart
                .slice(1, -1) // Remove outer brackets
                .split('][') // Split by inner brackets
                .map(delim => delim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special characters
                .join('|'); // Combine delimiters into regex OR pattern
            delimiter = new RegExp(delimiters);
        } else {
            // Single delimiter
            delimiter = new RegExp(delimiterPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape special characters
        }
        numbers = parts[1]; // Update numbers to the remaining part
    }

    const numArray = numbers.split(delimiter);
    const negatives = numArray.filter(num => {
        const parsedNum = parseInt(num);
        return !isNaN(parsedNum) && parsedNum < 0;
    });

    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
    }

    return numArray
        .map(num => parseInt(num))
        .filter(num => num <= 1000) // Ignore numbers greater than 1000
        .reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
}

module.exports = add;

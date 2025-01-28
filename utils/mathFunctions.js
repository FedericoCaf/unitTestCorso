function media(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error("Numbers must be an array");
    }
    if (numbers.length === 0) {
        throw new Error("Array must not be empty");
    }
    if (numbers.some(n => n > 200000)) {
        throw new Error(`Number must be lower than 200000`);
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error("Numbers must contain numbers only");
    }
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}


function mediana(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error("Numbers must be an array");
    }
    if (numbers.length === 0) {
        throw new Error("Array must not be empty");
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error("Numbers must contain numbers only");
    }
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function moda(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error("Numbers must be an array");
    }
    if (numbers.length === 0) {
        throw new Error("Array must not be empty");
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error("Numbers must contain numbers only");
    }
    const frequency = {};
    numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    const maxFrequency = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(key => frequency[key] === maxFrequency).map(Number);
    return modes.length === 1 ? modes[0] : modes;
}

function varianza(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error("Numbers must be an array");
    }
    if (numbers.length === 0) {
        throw new Error("Array must not be empty");
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error("Numbers must contain numbers only");
    }
    const mean = media(numbers);
    return numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
}

function deviazione(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error("Numbers must be an array");
    }
    if (numbers.length === 0) {
        throw new Error("Array must not be empty");
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error("Numbers must contain numbers only");
    }
    return Math.sqrt(varianza(numbers));
}

module.exports = { media, mediana, moda, varianza, deviazione };


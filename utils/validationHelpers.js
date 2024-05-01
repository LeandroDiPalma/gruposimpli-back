export const isEmpty = (value) => {
    return value === undefined || value === null || String(value).trim() === '';
}

export const isPositiveNumber = (value) => {
    console.log(value)
    console.log(value > 0)
    return value > 0;
}

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

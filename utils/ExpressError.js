class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

// ESM way to write: `module.exports = ExpressError`
export default ExpressError;
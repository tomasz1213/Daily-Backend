class HttpError extends Error {
    code: { code: number; };
    constructor(message: string, errorCode: { code: number }) {
        super(message);
        this.code = errorCode;
    }
}

module.exports = HttpError;
class Success {
    /**
     * Returns an object with the status code and the data
     * @param {*} data 
     * @param {number} statusCode 
     */
    constructor(data, statusCode) {
        this.status = statusCode;
        this.data = data;
    }
}

module.exports = Success;
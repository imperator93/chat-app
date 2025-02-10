export class DatabaseResponse {
    constructor(success, reason, data = null) {
        this.success = success;
        this.reason = reason;
        this.data = data;
    }
}
export class GetDataIdFromValuesCommand {
    /**
     * @returns {GetDataIdFromValuesCommand}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @param {*[]} values
     * @returns {Promise<string>}
     */
    async getDataIdFromValues(values) {
        return Buffer.from(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(values.map(value => typeof value === "string" ? encodeURIComponent(value.trim().toLowerCase()) : value ?? "").join("%")))).toString("hex");
    }
}

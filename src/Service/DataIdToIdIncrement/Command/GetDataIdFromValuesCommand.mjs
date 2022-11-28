/** @typedef {import("../../../../../flux-hash-api/src/Adapter/Api/HashApi.mjs").HashApi} HashApi */

export class GetDataIdFromValuesCommand {
    /**
     * @type {HashApi}
     */
    #hash_api;

    /**
     * @param {HashApi} hash_api
     * @returns {GetDataIdFromValuesCommand}
     */
    static new(hash_api) {
        return new this(
            hash_api
        );
    }

    /**
     * @param {HashApi} hash_api
     * @private
     */
    constructor(hash_api) {
        this.#hash_api = hash_api;
    }

    /**
     * @param {*[]} values
     * @returns {Promise<string>}
     */
    async getDataIdFromValues(values) {
        return this.#hash_api.generateHash(
            values.map(value => typeof value === "string" ? encodeURIComponent(value.trim().toLowerCase()) : value ?? "").join("%"),
            "sha-256"
        );
    }
}

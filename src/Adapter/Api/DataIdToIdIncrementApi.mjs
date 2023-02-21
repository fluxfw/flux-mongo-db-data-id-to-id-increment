/** @typedef {import("mongodb").Collection} Collection */
/** @typedef {import("../../Service/DataIdToIdIncrement/Port/DataIdToIdIncrementService.mjs").DataIdToIdIncrementService} DataIdToIdIncrementService */
/** @typedef {import("../../../../flux-id-increment-api/src/Adapter/Api/IdIncrementApi.mjs").IdIncrementApi} IdIncrementApi */

export class DataIdToIdIncrementApi {
    /**
     * @type {Collection}
     */
    #collection;
    /**
     * @type {DataIdToIdIncrementService | null}
     */
    #data_id_to_id_increment_service = null;
    /**
     * @type {IdIncrementApi}
     */
    #id_increment_api;
    /**
     * @type {string}
     */
    #id_increment_service_prefix;

    /**
     * @param {Collection} collection
     * @param {IdIncrementApi} id_increment_api
     * @param {string} id_increment_service_prefix
     * @returns {DataIdToIdIncrementApi}
     */
    static new(collection, id_increment_api, id_increment_service_prefix) {
        return new this(
            collection,
            id_increment_api,
            id_increment_service_prefix
        );
    }

    /**
     * @param {Collection} collection
     * @param {IdIncrementApi} id_increment_api
     * @param {string} id_increment_service_prefix
     * @private
     */
    constructor(collection, id_increment_api, id_increment_service_prefix) {
        this.#collection = collection;
        this.#id_increment_api = id_increment_api;
        this.#id_increment_service_prefix = id_increment_service_prefix;
    }

    /**
     * @param {string} service
     * @param {number} id
     * @returns {Promise<void>}
     */
    async delete(service, id) {
        await (await this.#getDataIdToIdIncrementService()).delete(
            service,
            id
        );
    }

    /**
     * @param {string} service
     * @param {string} data_id
     * @returns {Promise<number>}
     */
    async get(service, data_id) {
        return (await this.#getDataIdToIdIncrementService()).get(
            service,
            data_id
        );
    }

    /**
     * @param {*[]} values
     * @returns {Promise<string>}
     */
    async getDataIdFromValues(values) {
        return (await this.#getDataIdToIdIncrementService()).getDataIdFromValues(
            values
        );
    }

    /**
     * @param {string} service
     * @returns {Promise<number[]>}
     */
    async getIds(service) {
        return (await this.#getDataIdToIdIncrementService()).getIds(
            service
        );
    }

    /**
     * @returns {Promise<DataIdToIdIncrementService>}
     */
    async #getDataIdToIdIncrementService() {
        this.#data_id_to_id_increment_service ??= (await import("../../Service/DataIdToIdIncrement/Port/DataIdToIdIncrementService.mjs")).DataIdToIdIncrementService.new(
            this.#collection,
            this.#id_increment_api,
            this.#id_increment_service_prefix
        );

        return this.#data_id_to_id_increment_service;
    }
}

/** @typedef {import("mongodb").Collection} Collection */
/** @typedef {import("../../../../../flux-id-increment-api/src/Adapter/Api/IdIncrementApi.mjs").IdIncrementApi} IdIncrementApi */

export class DataIdToIdIncrementService {
    /**
     * @type {Collection}
     */
    #collection;
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
     * @returns {DataIdToIdIncrementService}
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
        await (await import("../Command/DeleteCommand.mjs")).DeleteCommand.new(
            this.#collection
        )
            .delete(
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
        return (await import("../Command/GetCommand.mjs")).GetCommand.new(
            this.#collection,
            this.#id_increment_api,
            this.#id_increment_service_prefix
        )
            .get(
                service,
                data_id
            );
    }

    /**
     * @param {*[]} values
     * @returns {Promise<string>}
     */
    async getDataIdFromValues(values) {
        return (await import("../Command/GetDataIdFromValuesCommand.mjs")).GetDataIdFromValuesCommand.new()
            .getDataIdFromValues(
                values
            );
    }

    /**
     * @param {string} service
     * @returns {Promise<number[]>}
     */
    async getIds(service) {
        return (await import("../Command/GetIdsCommand.mjs")).GetIdsCommand.new(
            this.#collection
        )
            .getIds(
                service
            );
    }
}

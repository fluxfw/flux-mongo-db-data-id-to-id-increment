/** @typedef {import("mongodb").Collection} Collection */

/** @typedef {import("../../../../../flux-id-increment-api/src/Adapter/Api/IdIncrementApi.mjs").IdIncrementApi} IdIncrementApi */

export class GetCommand {
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
     * @returns {GetCommand}
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
     * @param {string} data_id
     * @returns {Promise<number>}
     */
    async get(service, data_id) {
        return (await this.#collection.findOne({
            service,
            data_id
        }))?.id ?? (async () => {
            const id = await this.#id_increment_api.next(
                `${this.#id_increment_service_prefix}${service}`
            );

            await this.#collection.insertOne({
                service,
                data_id,
                id
            });

            return id;
        })();
    }
}

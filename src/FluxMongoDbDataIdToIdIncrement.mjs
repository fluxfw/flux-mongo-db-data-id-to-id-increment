/** @typedef {import("mongodb").Collection} Collection */
/** @typedef {import("../../flux-mongo-db-id-increment/src/FluxMongoDbIdIncrement.mjs").FluxMongoDbIdIncrement} FluxMongoDbIdIncrement */

export class FluxMongoDbDataIdToIdIncrement {
    /**
     * @type {Collection}
     */
    #collection;
    /**
     * @type {FluxMongoDbIdIncrement}
     */
    #flux_mongo_db_id_increment;
    /**
     * @type {string}
     */
    #prefix;

    /**
     * @param {Collection} collection
     * @param {FluxMongoDbIdIncrement} flux_mongo_db_id_increment
     * @param {string} prefix
     * @returns {FluxMongoDbDataIdToIdIncrement}
     */
    static new(collection, flux_mongo_db_id_increment, prefix) {
        return new this(
            collection,
            flux_mongo_db_id_increment,
            prefix
        );
    }

    /**
     * @param {Collection} collection
     * @param {FluxMongoDbIdIncrement} flux_mongo_db_id_increment
     * @param {string} prefix
     * @private
     */
    constructor(collection, flux_mongo_db_id_increment, prefix) {
        this.#collection = collection;
        this.#flux_mongo_db_id_increment = flux_mongo_db_id_increment;
        this.#prefix = prefix;
    }

    /**
     * @param {string} service
     * @param {number} id
     * @returns {Promise<void>}
     */
    async delete(service, id) {
        await this.#collection.deleteMany({
            service,
            id
        });

        /*await this.#id_increment_service.clear(
            `${this.#prefix}${service}`
        );*/
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
            const id = await this.#flux_mongo_db_id_increment.next(
                `${this.#prefix}${service}`
            );

            await this.#collection.insertOne({
                service,
                data_id,
                id
            });

            return id;
        })();
    }

    /**
     * @param {*[]} values
     * @returns {Promise<string>}
     */
    async getDataIdFromValues(values) {
        return Buffer.from(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(values.map(value => typeof value === "string" ? encodeURIComponent(value.trim().toLowerCase()) : value ?? "").join("%")))).toString("hex");
    }

    /**
     * @param {string} service
     * @returns {Promise<number[]>}
     */
    async getIds(service) {
        return this.#collection.find({
            service
        }).map(data => data.id).toArray();
    }
}

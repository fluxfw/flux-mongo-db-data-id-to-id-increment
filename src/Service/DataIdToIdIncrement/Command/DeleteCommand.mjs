/** @typedef {import("mongodb").Collection} Collection */

export class DeleteCommand {
    /**
     * @type {Collection}
     */
    #collection;

    /**
     * @param {Collection} collection
     * @returns {DeleteCommand}
     */
    static new(collection) {
        return new this(
            collection
        );
    }

    /**
     * @param {Collection} collection
     * @private
     */
    constructor(collection) {
        this.#collection = collection;
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
            `${this.#id_increment_service_prefix}${service}`
        );*/
    }
}

/** @typedef {import("mongodb").Collection} Collection */

export class GetIdsCommand {
    /**
     * @type {Collection}
     */
    #collection;

    /**
     * @param {Collection} collection
     * @returns {GetIdsCommand}
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
     * @returns {Promise<number[]>}
     */
    async getIds(service) {
        return this.#collection.find({
            service
        }).map(data => data.id).toArray();
    }
}

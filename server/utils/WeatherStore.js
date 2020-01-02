module.exports = class WeatherStore {
    constructor(opts = {}) {
        Object.defineProperties(this, {
            cache: {
                value: new Map(),
                enumerable: true
            },
            time: {
                value: opts.time || 60000,
                enumerable: true
            }
        });
        console.log(this);
    }
    put(key, value) {
        this.cache.set(key, value);
        setTimeout(() => {
            this.cache.delete(key);
            console.log("Deleted key from cache after " + this.time + " milliseconds.");
        }, this.time)
    }
    get(key) {
        return this.cache.get(key);
    }
}
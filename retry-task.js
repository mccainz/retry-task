const backoff = require('./backoff');

const __sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Retry {

    constructor(config) {
        this.config = {...{ maxAttempts: 5, delay: 1000}, ...config}
        if (typeof this.config.delay !== 'function') {
            const val = this.config.delay;
            this.config.delay = () => {
                return val;
            }
        }
    }

    task(fxTask) {
        return {
            until: (fxUntil) => {
                return {
                    invoke: () => {
                        let v;
                        return new Promise(async (resolve) => {
                            let i = 0;
                            do {
                                try {
                                    await __sleep(this.config.delay(i));
                                    v = await Promise.resolve(fxTask());
                                } catch (err) {
                                    v = err;
                                }
                                i = i + 1;
                            } while (!fxUntil(v, i) && i < this.config.maxAttempts)
                            resolve(v);
                        })
                    }
                }
            }
        }
    }
}

Retry.BackOff = backoff;

module.exports = Retry;

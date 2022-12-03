module.exports = {
    constant: (i) => {
        return 1000;
    },
    exponential: (i) => {
        const val = i*i*1000;
        return val;
    },
    linear: (i) => {
        const val = i*1000;
        return val;
    },
    constantJitter: (i) => {
        const val = 1000;
        const randomJitter = Math.random() * 1000;
        return val + randomJitter;
    },
    exponentialJitter: (i) => {
        const delay = i * 1000;
        const randomJitter = i * Math.random() * 1000;
        const val = delay + randomJitter;
        return val;
    },
    linearJitter: (i) => {
        const val = i*1000;
        const randomJitter = Math.random() * 1000;
        return val + randomJitter;
    }
}
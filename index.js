const Retry = require('./retry-task');

const test = async () => {

    const taskFx = async () => {
        return parseInt(Math.random() * 10);
    }

    const untilFx = (v, i) => {
        console.log(`${v} = 9 === ${v === 9}`);
        return v === 9;
    }

    const config = {
        maxAttempts: Number.POSITIVE_INFINITY,
        delay: Retry.BackOff.constantJitter,
    }

    const retry = new Retry(config);
    const result = await retry.task(taskFx).until(untilFx).invoke();

    console.log(result);
}

test();
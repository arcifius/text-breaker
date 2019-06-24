const { assert } = require(`chai`);
const textSamples = require(`./utils/texts`);
const breaker = require(`../src/breaker`);

describe(`String breaker`, () => {

    it(`Receives a text and break it into lines respecting the limiter`, () => {
        const limiter = 40;

        textSamples.lineBreak.forEach(sample => {
            const result = breaker(sample.raw, limiter);

            // Asserts if all lines respect the limiter
            result.split(`\n`).forEach(line => {
                assert(line.length <= limiter, `Characters per line`);
            });

            // Asserts if the result match the expected one
            assert(result === sample.expected, `Texts match`);
        });
    });

});
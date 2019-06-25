const { expect, assert } = require(`chai`);
const textSamples = require(`./utils/texts`);
const breaker = require(`../src/breaker`);
const { WordLengthGreaterThanLimit } = require("../src/exceptions");

describe(`Text breaker`, () => {
    describe(`Not expecting text justification`, () => {
        let texts = [];

        before(function () {
            texts = textSamples.filter(t => !t.justified && !t.raise);
        });

        it(`receives a text and break it into lines respecting the limiter`, () => {
            texts.forEach(sample => {
                if (sample.raise) {
                    assert.throws(
                        breaker(sample.raw, sample.limiter),
                        WordLengthGreaterThanLimit,
                        `WordLengthGreaterThanLimit thrown`
                    );
                } else {
                    const result = breaker(sample.raw, sample.limiter);

                    // Asserts if all lines respect the limiter
                    result.split(`\n`).forEach(line => {
                        assert(line.length <= sample.limiter, `Characters per line`);
                    });

                    // Asserts if the result match the expected one
                    assert(result === sample.expected, `Texts match`);
                }
            });
        });
    });

    describe(`Expecting text justification`, () => {
        let texts = [];

        before(function () {
            texts = textSamples.filter(t => t.justified && !t.raise);
        });

        it(`receives a text, break it into lines and apply text justification to the result`, () => {
            texts.forEach(sample => {
                if (sample.raise) {
                    expect(() => breaker(sample.raw, sample.limiter, true))
                        .to.throw(WordLengthGreaterThanLimit);
                } else {
                    const result = breaker(sample.raw, sample.limiter, true);

                    // console.log(result);
                    // console.log(sample.expected);

                    // Asserts if all lines respect the limiter
                    result.split(`\n`).forEach(line => {
                        if (line.length && line.includes(` `)) {
                            assert(line.length === sample.limiter, `Characters per line`);
                        }
                    });

                    // Asserts if the result match the expected one
                    assert(result == sample.expected, `Texts match`);
                }
            });
        });
    });

    describe(`When word length is greater than limiter`, () => {
        let texts = [];

        before(function () {
            texts = textSamples.filter(t => t.raise);
        });

        it(`throws an exception`, () => {
            texts.forEach(sample => {
                expect(() => breaker(sample.raw, sample.limiter, true))
                    .to.throw(WordLengthGreaterThanLimit);
            });
        });
    });

});
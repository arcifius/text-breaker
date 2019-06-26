/* eslint max-nested-callbacks: 0 */

const {expect, assert} = require('chai');
const breaker = require('../src/breaker');
const {WordLengthGreaterThanLimit, LowLimiter} = require('../src/exceptions');
const textSamples = require('./utils/texts');

describe('Text breaker', () => {
	describe('Not expecting text justification', () => {
		let texts = [];

		before(() => {
			texts = textSamples.filter(t => !t.justified && !t.raise);
		});

		it('receives a text and break it into lines respecting the limiter', () => {
			texts.forEach((sample, index) => {
				if (sample.raise) {
					assert.throws(
						breaker(sample.raw, sample.limiter),
						WordLengthGreaterThanLimit,
						'WordLengthGreaterThanLimit thrown'
					);
				} else {
					const result = breaker(sample.raw, sample.limiter);

					// Asserts if all lines respect the limiter
					result.split('\n').forEach(line => {
						assert(line.length <= sample.limiter, `[SAMPLE ${index}] Invalid characters per line`);
					});

					// Asserts if the result match the expected one
					assert(result === sample.expected, `[SAMPLE ${index}] Texts does not match`);
				}
			});
		});
	});

	describe('Expecting text justification', () => {
		let texts = [];

		before(() => {
			texts = textSamples.filter(t => t.justified && !t.raise);
		});

		it('receives a text, break it into lines and apply text justification to the result', () => {
			texts.forEach((sample, index) => {
				if (sample.raise) {
					expect(() => breaker(sample.raw, sample.limiter, true))
						.to.throw(WordLengthGreaterThanLimit);
				} else {
					const result = breaker(sample.raw, sample.limiter, true);

					// Asserts if all lines respect the limiter
					result.split('\n').forEach(line => {
						if (line.length > 0 && line.includes(' ')) {
							assert(line.length === sample.limiter, `[SAMPLE ${index}] Invalid characters per line`);
						}
					});

					// Asserts if the result match the expected one
					assert(result === sample.expected, `[SAMPLE ${index}] Texts does not match`);
				}
			});
		});
	});

	describe('Throws an exception', () => {
		let wordGreater = [];
		let lowLimiter = [];

		before(() => {
			wordGreater = textSamples.filter(t => t.raise === 'WordLengthGreaterThanLimit');
			lowLimiter = textSamples.filter(t => t.raise === 'LowLimiter');
		});

		it('when word length is greater than limiter', () => {
			wordGreater.forEach(sample => {
				expect(() => breaker(sample.raw, sample.limiter, true))
					.to.throw(WordLengthGreaterThanLimit, sample.expected);
			});
		});

		it('when limiter is too low, below 1.', () => {
			lowLimiter.forEach(sample => {
				expect(() => breaker(sample.raw, sample.limiter, true))
					.to.throw(LowLimiter, sample.expected);
			});
		});
	});
});

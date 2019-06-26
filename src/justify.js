/**
 * Justify function
 * Intended to justify only single lines.
 */

/**
 * Updates values to reflect current space indexes
 *
 * @param {Array} arr space indexes array
 * @param {Number} value the value that changed
 * @param {Number} increaseValue the value that will be increased
 * @returns {Array} updated array
 */
function _updateIndexes(arr, value, increaseValue) {
	const tmp = arr.slice(0);
	let shouldIncrease = false;

	return tmp.map(position => {
		if (position === value) {
			shouldIncrease = true;
		}

		return shouldIncrease ? position + increaseValue : position;
	});
}

/**
 * Justificates a text line
 * Note that this will only work with lines!
 *
 * @param {String} line the text to be justified
 * @param {Array} spaceIndexes the initial position of spaces
 * @param {Number} spacesLeft the number of spaces that need to distributed
 * @returns {String} justified text line
 */
function _justify(line, spaceIndexes, spacesLeft) {
	// If no spaces were found
	if (spaceIndexes.length === 0) {
		return line;
	}

	// Array to control processed indexes
	const processedIndexes = [];

	// Processes indexes intermittently
	for (let i = 0; i < spaceIndexes.length; i += 2) {
		if (spacesLeft === 0) {
			break;
		}

		let intermediary = [...line].slice(0, spaceIndexes[i]);
		intermediary.push(' ');
		intermediary = intermediary.concat(line.slice(spaceIndexes[i]));
		line = intermediary.join('');
		spaceIndexes = _updateIndexes(spaceIndexes, spaceIndexes[i], 1);
		processedIndexes.push(spaceIndexes[i]);
		spacesLeft -= 1;
	}

	// Based on already processed indexes, filter the ones that
	// still need to be processed.
	const pending = spaceIndexes.filter(index => {
		return !processedIndexes.includes(index);
	}).reverse();

	// Processes pending indexes
	for (let i = 0; i < pending.length; i += 1) {
		if (spacesLeft === 0) {
			break;
		}

		let intermediary = [...line].slice(0, pending[i]);
		intermediary.push(' ');
		intermediary = intermediary.concat(line.slice(pending[i]));
		line = intermediary.join('');
		spaceIndexes = _updateIndexes(spaceIndexes, pending[i], 1);
		spacesLeft -= 1;
	}

	if (spacesLeft > 0) {
		// If we still have spaces to distribute, then, let the recursion start
		return _justify(line, spaceIndexes, spacesLeft);
	}

	// Otherwise our line should be already justified, so we just to return it
	return line;
}

/**
 * Small wrapper to `_justify`.
 *
 * @param {String} line line's text
 * @param {Number} maxCharInLine the maximum allowed characters into line
 * @returns {String} justified line
 */
function justifyLine(line, maxCharInLine) {
	const initialSpaceIndexes = [];
	[...line].forEach((char, index) => {
		if (char === ' ') {
			initialSpaceIndexes.push(index);
		}
	});

	return _justify(line, initialSpaceIndexes, maxCharInLine - line.length);
}

module.exports = justifyLine;

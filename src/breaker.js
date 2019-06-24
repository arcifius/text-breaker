/**
 * Breaker function
 */

const { WordLengthGreaterThanLimit } = require("./exceptions");

/**
 * Strips last character of provided string
 * if last character is an empty space.
 * 
 * @param {String} line 
 * @returns {String}
 */
function _verifyForStrip(line) {
    const lastChar = line.substring(line.length - 1);

    if (lastChar === ` `) {
        return line.substring(0, line.length - 1);
    }

    return line;
}

/**
 * Process a paragraph or any piece of text.
 * 
 * @param {String} paragraph any text block
 * @param {Number} maxCharPerLine the maximum of characters allowed in a line
 * @returns {String} resulting paragraph/text
 */
function _processParagraph(paragraph, maxCharPerLine) {
    const output = [];
    let currentLine = ``;

    paragraph.split(` `).forEach(word => {
        if (word.length > maxCharPerLine) {
            throw new WordLengthGreaterThanLimit(
                `The word "${word}" can't respect your maximum limit of characters per line!`
            );
        }

        let tmp = currentLine;
        tmp += currentLine.length === 0 ? `${word} ` : `${word}`;

        if (tmp.length === maxCharPerLine) {
            // Start another fresh line
            output.push(tmp);
            currentLine = ``;
        } else if (tmp.length > maxCharPerLine) {
            // Start another line with the word
            output.push(_verifyForStrip(currentLine));
            currentLine = `${word} `;
        } else {
            // Just put the word on the current line
            currentLine += `${word} `;
        }
    });

    if (currentLine.length) {
        output.push(_verifyForStrip(currentLine));
    }

    return output.join(`\n`);
}

/**
 * Break provided text into lines respecting the limiter.
 * 
 * @param {String} text any text, paragraphs are considered through `\n`
 * @param {Number} maxCharPerLine the maximum of characters allowed in a line
 * @returns {String} resulting text
 */
function breakLines(text, maxCharPerLine = 40) {
    const output = [];
    const paragraphs = text.split(`\n`);

    paragraphs.forEach(paragraph => {
        output.push(_processParagraph(paragraph, maxCharPerLine));
    });

    return output.join(`\n`);
}

module.exports = breakLines;
/**
 * Breaker function
 */

const { WordLengthGreaterThanLimit, LowLimiter } = require("./exceptions");
const justify = require("./justify");

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
 * @param {Boolean} shouldJustify determines if the result should be justified.
 * @returns {String} resulting paragraph/text
 */
function _processParagraph(paragraph, maxCharPerLine, shouldJustify) {
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
            const processedLine = _verifyForStrip(tmp);
            output.push(shouldJustify ? justify(processedLine, maxCharPerLine) : processedLine);
            currentLine = ``;
        } else if (tmp.length > maxCharPerLine) {
            if (currentLine.length) {
                // Start another line with the word
                const processedLine = _verifyForStrip(currentLine);
                output.push(shouldJustify ? justify(processedLine, maxCharPerLine) : processedLine);
                currentLine = `${word} `;
            } else {
                // If nothing is present on currentLine use tmp
                const processedLine = _verifyForStrip(tmp);
                output.push(shouldJustify ? justify(processedLine, maxCharPerLine) : processedLine);
            }
        } else {
            // Just put the word on the current line
            currentLine += `${word} `;
        }
    });

    if (currentLine.length) {
        let processedLine = _verifyForStrip(currentLine);

        if (processedLine !== `` && shouldJustify) {
            processedLine = justify(processedLine, maxCharPerLine);
        }

        output.push(processedLine);
    }

    return output.join(`\n`);
}

/**
 * Break provided text into lines respecting the limiter.
 * 
 * @param {String} text any text, paragraphs are considered through `\n`
 * @param {Number} maxCharPerLine the maximum of characters allowed in a line
 * @param {Boolean} shouldJustify determines if the result should be justified.
 * @returns {String} resulting text
 */
function breakLines(text, maxCharPerLine, shouldJustify = false) {
    // Prepare the text to be justified, when necessary
    if (shouldJustify) {
        text = text.replace(/ +/g, ` `);
    }

    if (maxCharPerLine < 1) {
        throw new LowLimiter(
            `Maximum characters per line must be 1 or greater`
        );
    }

    const output = [];
    const paragraphs = text.split(`\n`);

    paragraphs.forEach(paragraph => {
        output.push(_processParagraph(paragraph, maxCharPerLine, shouldJustify));
    });

    return output.join(`\n`);
}

module.exports = breakLines;
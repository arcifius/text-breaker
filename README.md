# text-breaker

Breaks text into X characters per line.
This project wasn't meant to be a npm package.

## Usage

After you clone this repo, you can test the function through node console:

-   Make sure you have node (version 10 or superior) installed on your computer.
-   Open a terminal.
-   Using the terminal, move to this project folder.

Run

```bash
$ node
```

Then, inside node console

```javascript
const textbreaker = require("./index");
```

`textbreaker` accepts three params:

-   `String` text.
-   `Number` maximum allowed characters per line.
-   `Boolean` determines if the result should be justified.

Respecting the limiter you provide, it returns a breaked text that could be justified if you want to.

> The boolean indicating text justification needs isn't mandatory, the default value is false.

Now you can make any test you want to (:

## Tests

You can test it through the terminal but a lot of cases are already covered! Inside project's folder, just type

```bash
$ npm test
```

> Before testing, run `npm install`. It will install the necessary testing libraries (:

## Structure

-   `/src/`
    -   breaker.js
        -   Implementation of text breaker.
    -   justify.js
        -   Implementation of text justification.
    -   exceptions.js
        -   Implementation of possible exceptions that can occur while running the text breaker function.
-   `/tests/`
    -   /utils/texts.js
        -   Definition of test cases.
    -   breaker.test.js
        -   Implementation of tests based on data provided into `tests/utils/texts.js`.

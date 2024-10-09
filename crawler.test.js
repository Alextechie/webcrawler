const { normalizeURL, getURLFromHTML } = require("./crawl.js");

const { test, expect } = require("@jest/globals");


test('normalizeURL strip protocol', () => {
    const input = 'https:blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https:blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected)
})


test('normalizeURL make lowercase', () => {
    const input = 'https:BLOG.BOOT.DEV/PATH';
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected)
})

test('normalizeURL strip protocol http', () => {
    const input = 'http:blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected)
})

test('getURLFromHTML absolute path', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/" >
            Boot.dev Blog
        </a>
    </body>
<html>   
`
    const inputBaseUrl = "https://blog.boot.dev/path/"
    const actual = getURLFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected)
})



test('getURLFromHTML relative path', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/" >
            Boot.dev Blog
        </a>
    </body>
<html>   
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected)
})


test('getURLFromHTML both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/" >
            Boot.dev Blog Path 1
        </a>
        <a href="/path2/" >
            Boot.dev Blog Path 2
        </a>
    </body>
<html>   
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected)
})


test('getURLFromHTML invalid link', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalidlink" >
            Invalid link
        </a>
    </body>
<html>   
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected)
})



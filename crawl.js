const { JSDOM } = require("jsdom");

function getURLFromHTML(HtmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(HtmlBody)
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === "/") {
            // relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }
        } else {
            // absolute
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`Error : ${err.message}`)
            }
        }

    }
    return urls
}


function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    console.log(hostPath)
    return hostPath.toLowerCase();
};

module.exports = {
    normalizeURL,
    getURLFromHTML
}
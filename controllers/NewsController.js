const CONFIG = require('../config.json');
const rssSourceUrl = CONFIG.newsSourceUrl;
const Parser = require('rss-parser');
const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media', {
                keepArray: false
            }],
        ],
    }
});


exports.getAll = async function (req, res) {
    let feed = await parser.parseURL(rssSourceUrl)
        .catch(() => {
            console.log("TCL: parseURL -> false")
        });

    return feed ? res.json(feed) : [];
};
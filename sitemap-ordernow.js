const jsonPath = 'https://raw.githubusercontent.com/Narendran-T2S/json-files/main/db.json';

const getJson = async (url) => {
    const data = await fetch(url)
    .then(res => res.json())
    .then(json => json);
    return data;
}

function generateXMLBody(list) {
    const lastmod = new Date().toISOString().slice(0, 8);
    let xmlBody = list.map(item => {
        return `
        <url>
            <loc>${item.url}</loc>
            <lastmod>${lastmod}01T05:00:42+00:00</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.6400</priority>
        </url>`;
    })
    xmlBody = xmlBody.join('');
    return xmlBody;
}

function generateXML(list) {
    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${generateXMLBody(list)}
</urlset>
`;
}

async function run() {
    const list = await getJson(jsonPath);
    console.log(generateXML(list));
}

run();

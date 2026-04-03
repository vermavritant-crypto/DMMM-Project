import fs from 'fs';
import https from 'https';

const code = fs.readFileSync('src/utils/data.js', 'utf8');
const regex = /img\("([^"]+)"\)/g;
let match;
const ids = new Set();
while ((match = regex.exec(code)) !== null) {
  ids.add(match[1]);
}

const checkUrl = (id) => {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
    https.get(url, (res) => {
      resolve({ id, status: res.statusCode });
    });
  });
};

async function run() {
  const results = await Promise.all([...ids].map(id => checkUrl(id)));
  fs.writeFileSync('image_results.json', JSON.stringify(results, null, 2));
}
run();

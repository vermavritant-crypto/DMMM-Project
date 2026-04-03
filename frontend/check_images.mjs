import fs from 'fs';
import https from 'https';

const code = fs.readFileSync('src/utils/data.js', 'utf8');
const regex = /img\("([^"]+)"\)/g;
let match;
const ids = new Set();
while ((match = regex.exec(code)) !== null) {
  ids.add(match[1]);
}

for (const id of ids) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
  https.get(url, (res) => {
    console.log(`ID: ${id} - ${res.statusCode}`);
  });
}

const fs = require('fs');
const https = require('https');
const code = fs.readFileSync('src/utils/data.js', 'utf8');
const ids = [...code.matchAll(/img\("([^"]+)"\)/g)].map(m => m[1]);
const uniqueIds = [...new Set(ids)];
uniqueIds.forEach(id => {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
  https.get(url, (res) => {
    if (res.statusCode !== 200 && res.statusCode !== 302) {
      console.log(`Failed: ${id} (${res.statusCode})`);
    } else {
      console.log(`OK: ${id} (${res.statusCode})`);
    }
  });
});

import fs from 'fs';

let content = fs.readFileSync('src/utils/data.js', 'utf8');

// Replace the helper definition
content = content.replace(
  /const img = \([^)]+\) => `[^`]+`;/,
  'const img = (kw, lock) => `https://loremflickr.com/800/450/${kw}?lock=${lock}`;'
);

const replacements = [
  'macbook,design',
  'office,laptop',
  'print,flyer',
  'apparel,design',
  'pen,notepad',
  'typing,keyboard',
  'industry,factory',
  'tablet,reading',
  'vlog,camera',
  'monitor,editing',
  'podcast,microphone',
  'business,graph',
  'planner,desk',
  'network,people',
  'chart,business'
];

let i = 0;
// Replace all 15 instances of image: img(...)
content = content.replace(/image: img\([^)]+\)/g, () => {
    const rep = `image: img("${replacements[i]}", ${i+1})`;
    i++;
    return rep;
});

fs.writeFileSync('src/utils/data.js', content);
console.log("Images swapped successfully. Counter reached:", i);

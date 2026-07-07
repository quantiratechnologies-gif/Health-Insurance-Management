import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { regex: /\btext-yellow-400\b/g, replacement: 'text-yellow-600 dark:text-yellow-400' },
  { regex: /\btext-indigo-400\b/g, replacement: 'text-indigo-600 dark:text-indigo-400' },
  { regex: /\btext-amber-500\b/g, replacement: 'text-amber-600 dark:text-amber-500' },
];

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, replacement);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}

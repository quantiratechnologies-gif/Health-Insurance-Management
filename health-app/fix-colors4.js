import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // WCAG Contrast Fixes for Light/Dark mode
  { regex: /text-yellow-300/g, replacement: 'text-yellow-700 dark:text-yellow-300' },
  { regex: /text-red-300/g, replacement: 'text-red-700 dark:text-red-300' },
  { regex: /text-indigo-300/g, replacement: 'text-indigo-700 dark:text-indigo-300' },
  { regex: /text-sky-400/g, replacement: 'text-sky-700 dark:text-sky-400' },
  // Fix the duplicate dark: classes
  { regex: /dark:text-indigo-600 dark:text-indigo-400/g, replacement: 'dark:text-indigo-400' },
  
  // Fix dark button backgrounds with black text in Light Mode
  { regex: /bg-indigo-600 hover:bg-indigo-500 text-foreground/g, replacement: 'bg-indigo-600 hover:bg-indigo-500 text-white' },
  { regex: /bg-indigo-600 text-foreground/g, replacement: 'bg-indigo-600 text-white' }
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

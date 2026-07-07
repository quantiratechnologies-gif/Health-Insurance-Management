import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // Backgrounds
  { regex: /bg-slate-900/g, replacement: 'bg-card' },
  { regex: /bg-\[\#0d1117\]/g, replacement: 'bg-card' },
  { regex: /bg-slate-800\/60/g, replacement: 'bg-card' },
  { regex: /bg-slate-800/g, replacement: 'bg-card' },
  { regex: /bg-white\/5/g, replacement: 'bg-muted/50' },
  { regex: /hover:bg-white\/10/g, replacement: 'hover:bg-muted' },
  { regex: /hover:bg-white\/5/g, replacement: 'hover:bg-muted/50' },
  
  // Borders
  { regex: /border-white\/10/g, replacement: 'border-border' },
  { regex: /border-white\/15/g, replacement: 'border-border' },
  { regex: /border-white\/5/g, replacement: 'border-border' },
  { regex: /border-slate-700\/50/g, replacement: 'border-border' },
  
  // Text colors
  { regex: /\btext-white\b/g, replacement: 'text-foreground' },
  { regex: /\btext-slate-200\b/g, replacement: 'text-foreground' },
  { regex: /\btext-slate-300\b/g, replacement: 'text-foreground' },
  { regex: /\btext-slate-400\b/g, replacement: 'text-muted-foreground' },
  { regex: /\btext-slate-500\b/g, replacement: 'text-muted-foreground' },
  { regex: /\btext-emerald-400\b/g, replacement: 'text-emerald-600 dark:text-emerald-400' },
  { regex: /\btext-indigo-400\b/g, replacement: 'text-indigo-600 dark:text-indigo-400' },
  { regex: /\btext-red-400\b/g, replacement: 'text-red-600 dark:text-red-400' },
  { regex: /\btext-sky-300\b/g, replacement: 'text-sky-600 dark:text-sky-400' },
  { regex: /\btext-violet-400\b/g, replacement: 'text-violet-600 dark:text-violet-400' },
  { regex: /\btext-emerald-300\b/g, replacement: 'text-emerald-600 dark:text-emerald-400' },
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

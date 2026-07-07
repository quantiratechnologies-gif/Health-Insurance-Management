import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // Fix gradients with text-foreground back to text-white
  { regex: /bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-foreground/g, replacement: 'bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white' },
  { regex: /bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-foreground/g, replacement: 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white' },
  { regex: /bg-gradient-to-r from-teal-500 to-green-500 p-6 text-foreground/g, replacement: 'bg-gradient-to-r from-teal-500 to-green-500 p-6 text-white' },
  { regex: /bg-gradient-to-r from-red-600 to-rose-500 p-5 text-foreground/g, replacement: 'bg-gradient-to-r from-red-600 to-rose-500 p-5 text-white' },
  
  // Badges inside those gradients
  { regex: /bg-white\/20 text-foreground border-white\/30/g, replacement: 'bg-white/20 text-white border-white/30' },
  
  // Missed buttons with text-foreground
  { regex: /className="bg-green-600 hover:bg-green-700 text-foreground"/g, replacement: 'className=""' },
  { regex: /className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-foreground text-xs"/g, replacement: 'className="w-full mt-3 text-xs"' },
  { regex: /bg-blue-600 text-foreground rounded-br-sm/g, replacement: 'bg-blue-600 text-white rounded-br-sm' },

  // Replace text-gray-* with semantic variables
  { regex: /text-gray-900/g, replacement: 'text-foreground' },
  { regex: /text-gray-800/g, replacement: 'text-foreground' },
  { regex: /text-gray-500/g, replacement: 'text-muted-foreground' },
  { regex: /text-gray-400/g, replacement: 'text-muted-foreground' },
  { regex: /text-gray-600/g, replacement: 'text-muted-foreground' },
  
  // Replace text-blue-600 with text-primary (blue-600 was used as primary in PatientPortal, but we are standardizing to green)
  { regex: /text-blue-600/g, replacement: 'text-primary' },
  
  // Also clean up any lingering bg-blue-600 buttons that are not standard
  { regex: /bg-blue-600 hover:bg-blue-700/g, replacement: 'bg-primary hover:bg-primary/90 text-primary-foreground' },

  // Clean up empty classNames
  { regex: /className=""/g, replacement: '' }
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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // AdminPortal Red/Yellow buttons to standard destructive variant
  { regex: /className="bg-red-600 hover:bg-red-500 text-foreground"/g, replacement: 'variant="destructive"' },
  { regex: /className="bg-yellow-600 hover:bg-yellow-500 text-foreground"/g, replacement: 'variant="destructive"' },
  
  // PatientPortal custom primary buttons
  { regex: /className="bg-blue-600 hover:bg-blue-700 text-foreground gap-2"/g, replacement: 'className="gap-2"' },
  { regex: /className="bg-blue-600 hover:bg-blue-700 text-foreground shrink-0"/g, replacement: 'className="shrink-0"' },
  { regex: /className="bg-blue-600 hover:bg-blue-700 text-foreground"/g, replacement: '' },
  { regex: /className="w-full bg-blue-600 hover:bg-blue-700 text-foreground h-11 text-sm font-semibold gap-2"/g, replacement: 'className="w-full h-11 text-sm font-semibold gap-2"' },
  
  // PatientPortal amber button -> destructive or default? Default is fine.
  { regex: /className="w-full bg-amber-500 hover:bg-amber-600 text-foreground gap-2"/g, replacement: 'variant="destructive" className="w-full gap-2"' },
  
  // AdminPortal custom primary buttons
  { regex: /className="bg-emerald-600 hover:bg-emerald-500 text-foreground text-xs"/g, replacement: 'className="text-xs"' },
  { regex: /className="bg-emerald-600 hover:bg-emerald-500 text-foreground"/g, replacement: '' },
  { regex: /className="bg-indigo-600 hover:bg-indigo-500 text-foreground"/g, replacement: '' },
  
  // TPAPortal custom primary buttons
  { regex: /className="bg-emerald-600 hover:bg-emerald-700 text-foreground text-xs"/g, replacement: 'className="text-xs"' },
  { regex: /className="bg-emerald-600 hover:bg-emerald-700 text-foreground"/g, replacement: '' },
  { regex: /className="w-full bg-emerald-600 hover:bg-emerald-700 text-foreground"/g, replacement: 'className="w-full"' },
  
  // Cleanup empty classNames
  { regex: /className=""/g, replacement: '' },
];

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, replacement);
  }
  
  // Extra pass for TPAPortal multiline classNames
  // <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-foreground text-xs"
  content = content.replace(/className="bg-emerald-600 hover:bg-emerald-700 text-foreground text-xs"/g, 'className="text-xs"');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}

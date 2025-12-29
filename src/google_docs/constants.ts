
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../..");

export const STYLE_GUIDE_DOCS_ID = process.env.STYLE_GUIDE_DOCS_ID || '1IdqkkYHTY8GpNBj30ET7Fpu7YCDE-pJsBqZVf6FfqWE';
export const EMAIL_STYLE_GUIDE_DEFAULT_FILE = path.join(
  PROJECT_ROOT, "context", "style-guide.md"
);
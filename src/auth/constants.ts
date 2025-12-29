
import path from 'path';
import os from 'os';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../..");

// Auth
export const GLOBAL_AUTH_DIRECTORY = path.join(os.homedir(), '.email-ts-mcp');
export const OAUTH_CLIENT_KEYS = path.join(GLOBAL_AUTH_DIRECTORY, 'oauth-credentials.json')
export const TOKENS_FILE = path.join(GLOBAL_AUTH_DIRECTORY, 'tokens.json')
export const LOCAL_OAUTH_PATH = path.join(PROJECT_ROOT, 'oauth-credentials.json');

// Docs
export const STYLE_GUIDE_DOCS_ID = process.env.STYLE_GUIDE_DOCS_ID || '1IdqkkYHTY8GpNBj30ET7Fpu7YCDE-pJsBqZVf6FfqWE';
export const EMAIL_STYLE_GUIDE_DEFAULT_FILE = path.join(
  PROJECT_ROOT, "context", "style-guide.md"
);
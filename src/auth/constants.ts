
import path from 'path';
import os from 'os';

export const GLOBAL_AUTH_DIRECTORY = path.join(os.homedir(), '.email-ts-mcp');
export const OAUTH_CLIENT_KEYS = path.join(GLOBAL_AUTH_DIRECTORY, 'oauth-credentials.json')
export const TOKENS_FILE = path.join(GLOBAL_AUTH_DIRECTORY, 'tokens.json')
export const LOCAL_OAUTH_PATH = path.join(process.cwd(), 'oauth-credentials.json');

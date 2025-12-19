import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';

import { GLOBAL_AUTH_DIRECTORY, OAUTH_CLIENT_KEYS, TOKENS_FILE, LOCAL_OAUTH_PATH } from './constants.js';

const authSetup = async (): Promise<OAuth2Client> => {

  // Create config directory if it doesn't exist
  if (!fs.existsSync(GLOBAL_AUTH_DIRECTORY)) {
    fs.mkdirSync(GLOBAL_AUTH_DIRECTORY, { recursive: true });
  }

  if (fs.existsSync(LOCAL_OAUTH_PATH)) {
    // If found in current directory, copy to config directory
    fs.copyFileSync(LOCAL_OAUTH_PATH, OAUTH_CLIENT_KEYS);
    console.error('OAuth keys found in current directory, copied to global config.');
  }
  let oauth2Client: OAuth2Client;


  if (!fs.existsSync(OAUTH_CLIENT_KEYS)) {
    console.error('Error: OAuth keys file not found. Please place oauth-credentials.json in current directory.');
    process.exit(1);
  }

  const keysContent = JSON.parse(fs.readFileSync(OAUTH_CLIENT_KEYS, 'utf8'));
  const keys = keysContent.installed || keysContent.web;

  if (!keys) {
    console.error('Error: Invalid OAuth keys file format. File should contain either "installed" or "web" credentials.');
    process.exit(1);
  }

  const callback = "http://localhost:3000/oauth2callback";

  oauth2Client = new OAuth2Client(
    keys.client_id,
    keys.client_secret,
    callback
  );

  oauth2Client.on('tokens', (tokens) => {
    console.error('New tokens received');
    fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens));
  });

  if (fs.existsSync(TOKENS_FILE)) {
    const credentials = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'));
    oauth2Client.setCredentials(credentials);
  }

  return oauth2Client;
}

export default authSetup;


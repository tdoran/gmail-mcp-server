import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { OAuth2Client } from 'google-auth-library';
import { z } from "zod";
import fs from 'fs';
import path from 'path';
import http from 'http';
import open from 'open';


const OAUTH_CLIENT_KEYS = path.join(process.cwd(), 'oauth-credentials.json')
const TOKENS_FILE = path.join(process.cwd(), 'tokens.json')

let oauth2Client: OAuth2Client;

const authSetup = async () => {


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

  if (fs.existsSync(TOKENS_FILE)) {
    const credentials = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'));
    oauth2Client.setCredentials(credentials);
  }


}

async function authenticate() {
  const server = http.createServer();
  server.listen(3000);

  return new Promise<void>((resolve, reject) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.compose',

      ],
    });

    console.log('Please visit this URL to authenticate:', authUrl);
    open(authUrl);

    server.on('request', async (req, res) => {
      if (!req.url?.startsWith('/oauth2callback')) return;

      const url = new URL(req.url, 'http://localhost:3000');
      const code = url.searchParams.get('code');

      if (!code) {
        res.writeHead(400);
        res.end('No code provided');
        reject(new Error('No code provided'));
        return;
      }

      try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens));

        res.writeHead(200);
        res.end('Authentication successful! You can close this window.');
        server.close();
        resolve();
      } catch (error) {
        res.writeHead(500);
        res.end('Authentication failed');
        reject(error);
      }
    });
  });
}

const server = new McpServer({
  name: "email-ts",
  version: "1.0.0",
});


async function main() {
  await authSetup();

  if (process.argv[2] === 'auth') {
    await authenticate();
    console.log('Authentication completed successfully');
    process.exit(0);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Email MCP Server (email-ts) running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
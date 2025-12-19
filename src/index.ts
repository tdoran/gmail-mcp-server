import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google } from 'googleapis';


import authSetup from './auth/authSetup.js';
import authenticate from './auth/authenticate.js';
import { registerEmailTools } from './mcp/registerEmailTools.js';

const server = new McpServer({
  name: "email-ts",
  version: "1.0.0",
});
async function main() {
  const oauth2Client = await authSetup();

  if (process.argv[2] === 'auth') {
    await authenticate(oauth2Client);
    console.log('Authentication completed successfully');
    process.exit(0);
  }

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  registerEmailTools(server, gmail);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Email MCP Server (email-ts) running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
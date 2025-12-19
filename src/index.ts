import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google } from 'googleapis';
import type { gmail_v1 } from 'googleapis';
import { z } from "zod";
import fs from 'fs';
import path from 'path';

import authSetup from './auth/authSetup.js';
import authenticate from './auth/authenticate.js';

type GmailMessagePart = gmail_v1.Schema$MessagePart;
type EmailBodyContent = {
  text: string;
  html: string;
};

const server = new McpServer({
  name: "email-ts",
  version: "1.0.0",
});


const getHeaderValue = (headers: { name?: string | null; value?: string | null }[] | null | undefined, name: string) => {
  const found = headers?.find((h) => h.name === name);
  return found?.value || undefined;
};

const toBase64Url = (input: string): string => {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}


const decodeBody = (data?: string) =>
  data ? Buffer.from(data, 'base64').toString('utf8') : '';

/**
* Walks through a MIME tree and collects text/plain and text/html payloads
*/
function decodeEmailBodyText(part: GmailMessagePart): EmailBodyContent {
  const result: EmailBodyContent = { text: '', html: '' };
  console.error('decodeEmailBodyText part: ', JSON.stringify(part, null, 2))

  // Handle top-level payload
  if (part.body?.data) {
    const decoded = decodeBody(part.body.data);
    console.error('decodeEmailBodyText decoded: ', JSON.stringify(decoded, null, 2))

    switch (part.mimeType) {
      case 'text/plain':
        result.text += decoded;
        break;
      case 'text/html':
        result.html += decoded;
        break;
    }
  }

  // Traverse child parts, if any
  if (Array.isArray(part.parts)) {
    for (const childPart of part.parts) {
      const childContent = decodeEmailBodyText(childPart);
      result.text += childContent.text;
      result.html += childContent.html;
    }
  }

  return result;
}





async function main() {
  const oauth2Client = await authSetup();

  if (process.argv[2] === 'auth') {
    await authenticate(oauth2Client);
    console.log('Authentication completed successfully');
    process.exit(0);
  }

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  server.registerTool(
    "get_emails",
    {
      description: "Gets emails from Gmail (lists unread IDs, then fetches each email's content).",
      inputSchema: z.object({
        maxResults: z.number().optional().describe("Maximum number of emails to return"),
        unread: z.boolean().optional().describe("Only return unread emails"),
      }),
    },
    async ({ maxResults = 10, unread = true }) => {

      const listResponse = await gmail.users.messages.list({
        userId: 'me',
        maxResults: maxResults,
        labelIds: unread ? ['UNREAD'] : undefined,
      });

      console.error('get_emails list response.data: ', JSON.stringify(listResponse.data, null, 2))

      const messageIds = (listResponse.data.messages || [])
        .map((m) => m.id)
        .filter((id): id is string => typeof id === 'string' && id.length > 0);

      if (messageIds.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No ${unread ? 'unread ' : ''}emails found.`,
            },
          ],
        };
      }



      const messages = await Promise.all(
        messageIds.map(async (id) => {
          const { data } = await gmail.users.messages.get({
            userId: 'me',
            id: id,
          });
          const payload = data.payload
          const headers = payload?.headers

          const subject = getHeaderValue(headers, 'Subject') || 'No subject';
          const from = getHeaderValue(headers, 'From') || 'Unknown';
          const date = getHeaderValue(headers, 'Date') || 'Unknown';

          const { text, html } = decodeEmailBodyText(payload as GmailMessagePart);
          let body = text || html || '';


          const formatted = {
            id: data.id,
            threadId: data.threadId,
            subject,
            from,
            date,
            snippet: data?.snippet,
            body
          }

          return formatted;
        })
      );

      console.error('get_emails messages responses.data: ', JSON.stringify(messages, null, 2))

      const formatted = messages
        .map(({ id, threadId, subject, from, date, body }, i) => {

          return `${i + 1}. ID: ${id}\nThread ID: ${threadId}\n\nSubject: ${subject}\nFrom: ${from}\nDate: ${date}\n\n${body}`;
        })
        .join('\n\n---\n\n');

      console.error('formatted', JSON.stringify(formatted))


      return {
        content: [
          {
            type: "text" as const,
            text: `You have ${messageIds.length} unread emails. Here they are:\n\n${formatted}`,
          },

        ],
      };
    }
  );

  /* 
  1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 
  2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 
  3. The `Subject` headers must match.
  */

  server.registerTool(
    "draft_reply",
    {
      description: "Drafts a reply to an email",
      inputSchema: z.object({
        threadId: z.string().describe("The ID of the email thread to reply to"),
        body: z.string().describe("The body of the email"),
      }),
    },
    // I may need more params here
    async ({ threadId, body }) => {

      const listResponse = await gmail.users.drafts.create({
        userId: 'me',
        requestBody: {
          message: {
            raw: toBase64Url(body),
            threadId
          }
        }
      });

      console.error('draft_reply list response.data: ', JSON.stringify(listResponse.data, null, 2))

      return {
        content: [
          {
            type: "text" as const,
            text: `Drafted reply to thread ${threadId}. The draft content is:\n\n${body}`,
          }
        ]
      }
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Email MCP Server (email-ts) running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
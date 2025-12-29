import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { gmail_v1 } from 'googleapis';
import { z } from 'zod';
import { htmlToText } from 'html-to-text';

import type { GmailMessagePart } from '../types.js';
import { decodeEmailBodyText } from '../gmail/decodeEmailBodyText.js';
import { getHeaderValue } from '../gmail/headers.js';
import { toBase64Url } from '../gmail/base64Url.js';

export const registerEmailTools = ({ server, gmail, styleGuide }: { server: McpServer, gmail: gmail_v1.Gmail, styleGuide: string }) => {
  server.registerTool(
    'get_emails',
    {
      description: "Gets emails from Gmail (lists unread IDs, then fetches each email's content).",
      inputSchema: z.object({
        maxResults: z.number().optional().describe('Maximum number of emails to return'),
        unread: z.boolean().optional().describe('Only return unread emails'),
      }),
    },
    async ({ maxResults = 10, unread = true }) => {
      const listResponse = await gmail.users.messages.list({
        userId: 'me',
        maxResults: maxResults,
        labelIds: unread ? ['UNREAD'] : undefined,
      });

      const messageIds = (listResponse.data.messages || [])
        .map((m) => m.id)
        .filter((id): id is string => typeof id === 'string' && id.length > 0);

      if (messageIds.length === 0) {
        return {
          content: [
            {
              type: 'text' as const,
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
          const payload = data.payload;
          const headers = payload?.headers;

          const subject = getHeaderValue(headers, 'Subject') || 'No subject';
          const from = getHeaderValue(headers, 'From') || 'Unknown';
          const date = getHeaderValue(headers, 'Date') || 'Unknown';

          const { text, html } = decodeEmailBodyText(payload as GmailMessagePart);
          const body =
            text ||
            htmlToText(html, {
              wordwrap: false,
            }) ||
            '';

          const formatted = {
            id: data.id,
            threadId: data.threadId,
            subject,
            from,
            date,
            snippet: data?.snippet,
            body,
          };

          return formatted;
        })
      );

      const formatted = messages
        .map(({ id, threadId, subject, from, date, body }, i) => {
          return `${i + 1}. ID: ${id}\nThread ID: ${threadId}\n\nSubject: ${subject}\nFrom: ${from}\nDate: ${date}\n\n${body}`;
        })
        .join('\n\n---\n\n');


      return {
        content: [
          {
            type: 'text' as const,
            text: `You have ${messageIds.length} unread emails. Here they are in JSON string format:\n\n${JSON.stringify({ emails: messages }, null, 2)}`,
          },
        ],
      };
    }
  );

  server.registerTool(
    'draft_reply',
    {
      description: 'Drafts a reply to an email and tells the user what the content of the draft is. The style guide is: \n\n' + styleGuide,
      inputSchema: z.object({
        threadId: z.string().describe('The ID of the email thread to reply to'),
        body: z.string().describe('The body of the email'),
      }),
    },
    async ({ threadId, body }) => {
      await gmail.users.drafts.create({
        userId: 'me',
        requestBody: {
          message: {
            raw: toBase64Url(body),
            threadId,
          },
        },
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: `Drafted reply to thread ${threadId}. The draft content is:\n\n${body}`,
          },
        ],
      };
    }
  );
};

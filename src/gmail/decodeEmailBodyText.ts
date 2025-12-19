import type { EmailBodyContent, GmailMessagePart } from './types.js';

const decodeBody = (data?: string) => (data ? Buffer.from(data, 'base64').toString('utf8') : '');

/**
* Walks through a MIME tree and collects text/plain and text/html payloads
*/
export function decodeEmailBodyText(part: GmailMessagePart): EmailBodyContent {
  const result: EmailBodyContent = { text: '', html: '' };
  console.error('decodeEmailBodyText part: ', JSON.stringify(part, null, 2));

  // Handle top-level payload
  if (part.body?.data) {
    const decoded = decodeBody(part.body.data);
    console.error('decodeEmailBodyText decoded: ', JSON.stringify(decoded, null, 2));

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

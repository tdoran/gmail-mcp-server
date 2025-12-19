import type { gmail_v1 } from 'googleapis';

export type GmailMessagePart = gmail_v1.Schema$MessagePart;

export type EmailBodyContent = {
  text: string;
  html: string;
};

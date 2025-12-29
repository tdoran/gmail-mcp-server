import type { gmail_v1 } from 'googleapis';
import type { docs_v1 } from 'googleapis';

// Gmail
export type GmailMessagePart = gmail_v1.Schema$MessagePart;

export type EmailBodyContent = {
  text: string;
  html: string;
};

// Google Docs
export type GoogleDoc = docs_v1.Schema$Document;

import { google } from 'googleapis';
import type { docs_v1 } from 'googleapis';
import { auth } from "google-auth-library";
import fs from 'fs';
import type { GoogleDoc } from '../types.js'

import { STYLE_GUIDE_DOCS_ID, EMAIL_STYLE_GUIDE_DEFAULT_FILE } from '../auth/constants.js'


const extractPlainText = (doc: GoogleDoc): string => {
  const content = doc.body?.content ?? [];
  let text = '';

  for (const block of content) {
    const paragraph = block.paragraph;
    if (!paragraph) continue;

    for (const element of paragraph.elements ?? []) {
      if (element.textRun?.content) {
        text += element.textRun.content;
      }
    }
  }

  return text.trim();
}

const docs = google.docs({ version: 'v1', auth });


export const getStyledGuideGoogleDoc = async (docs: docs_v1.Docs): Promise<string> => {
  const defaultStyleGuideText = fs.readFileSync(EMAIL_STYLE_GUIDE_DEFAULT_FILE, "utf-8");

  let styleGuideText = defaultStyleGuideText;
  try {
    const res = await docs.documents.get({
      documentId: STYLE_GUIDE_DOCS_ID,
    });


    const doc = res.data;
    styleGuideText = extractPlainText(doc);
  } catch (err) {
    console.error(`Error fetching style-guide doc: ${err} \n\nDefaulting to default style guide`)
  }
  return styleGuideText

}


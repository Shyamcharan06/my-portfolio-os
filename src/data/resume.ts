import type { ResumeMeta } from "@/types/content";

// The resume lives in this Google Doc — editing it there keeps the Resume app (and
// the downloaded PDF) in sync automatically. Requires the doc's share setting to be
// "Anyone with the link can view" so the embed/export URLs work for visitors.
const RESUME_DOC_ID = "1nYgI4dTT2KrwawR_1DCC6NKh6kRfdIV8H4WmsuCPt2A";

export const resumeMeta: ResumeMeta = {
  fileName: "Shyamcharan_Bharathi_Resume",
  docUrl: `https://docs.google.com/document/d/${RESUME_DOC_ID}/edit`,
  embedUrl: `https://docs.google.com/document/d/${RESUME_DOC_ID}/preview`,
  downloadUrl: `https://docs.google.com/document/d/${RESUME_DOC_ID}/export?format=pdf`,
};

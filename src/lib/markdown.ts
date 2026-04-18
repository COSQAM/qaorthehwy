import { Marked } from "marked";

const markdown = new Marked({ gfm: true, breaks: true });

export function renderDescription(source: string): string {
  const escaped = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return markdown.parse(escaped) as string;
}

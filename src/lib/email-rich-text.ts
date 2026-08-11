import sanitizeHtml from "sanitize-html";

const COLOR_PATTERN =
  /^(#[0-9a-f]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|[a-z]{3,20})$/i;

export function sanitizeEmailHtml(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [
      "p",
      "div",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "span",
      "font",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["style"],
      p: ["style"],
      div: ["style"],
      font: ["color"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedStyles: { "*": { color: [COLOR_PATTERN] } },
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: "a",
        attribs: {
          ...attributes,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      font: (_tagName, attributes) => {
        const attribs: Record<string, string> = {};
        if (attributes.color) attribs.style = `color:${attributes.color}`;
        return { tagName: "span", attribs };
      },
    },
  });
}

export function emailHtmlToText(value: string): string {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

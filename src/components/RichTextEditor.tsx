"use client";

import { useRef, useState } from "react";

export function RichTextEditor({ value, onChange, hasError }: { value: string; onChange: (value: string) => void; hasError: boolean }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [initialValue] = useState(value);

  function command(name: string, commandValue?: string) {
    editorRef.current?.focus();
    document.execCommand(name, false, commandValue);
    onChange(editorRef.current?.innerHTML ?? "");
  }

  function addLink() {
    const url = window.prompt("Link URL (https://…)");
    if (url) command("createLink", url);
  }

  return (
    <div className={`overflow-hidden rounded-lg border bg-[#F7F2EA] ${hasError ? "border-[#b66a50]" : "border-[#e8d8c8]"}`}>
      <div className="flex flex-wrap items-center gap-1 border-b border-[#e8d8c8] bg-[#fdfaf6] p-2" role="toolbar" aria-label="Text formatting">
        <ToolbarButton label="Bold" onClick={() => command("bold")}><strong>B</strong></ToolbarButton>
        <ToolbarButton label="Italic" onClick={() => command("italic")}><em>I</em></ToolbarButton>
        <ToolbarButton label="Underline" onClick={() => command("underline")}><span className="underline">U</span></ToolbarButton>
        <span className="mx-1 h-6 w-px bg-[#e8d8c8]" aria-hidden="true" />
        <ToolbarButton label="Heading" onClick={() => command("formatBlock", "h2")}>H2</ToolbarButton>
        <ToolbarButton label="Paragraph" onClick={() => command("formatBlock", "p")}>¶</ToolbarButton>
        <ToolbarButton label="Bulleted list" onClick={() => command("insertUnorderedList")}>• List</ToolbarButton>
        <ToolbarButton label="Numbered list" onClick={() => command("insertOrderedList")}>1. List</ToolbarButton>
        <ToolbarButton label="Add link" onClick={addLink}>Link</ToolbarButton>
        <label className="ml-1 inline-flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 text-xs font-semibold text-[#5a4535] hover:bg-[#e8d8c8]">
          Color
          <input
            type="color"
            defaultValue="#3d3027"
            className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
            onChange={(event) => command("foreColor", event.target.value)}
            aria-label="Text color"
          />
        </label>
        <ToolbarButton label="Clear formatting" onClick={() => command("removeFormat")}>Clear</ToolbarButton>
      </div>
      <div
        id="job-description-editor"
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Job description"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="job-rich-text min-h-80 px-5 py-4 text-base leading-7 text-[#3D3027] focus:outline-none"
        dangerouslySetInnerHTML={{ __html: initialValue }}
      />
      <div className="border-t border-[#e8d8c8] px-4 py-2 text-xs text-[#9a7a63]">
        Paste a job ad or use the toolbar. Unsafe HTML and scripts are removed when saved.
      </div>
    </div>
  );
}

function ToolbarButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="h-8 rounded-md px-2.5 text-xs font-semibold text-[#5a4535] hover:bg-[#e8d8c8]"
    >
      {children}
    </button>
  );
}

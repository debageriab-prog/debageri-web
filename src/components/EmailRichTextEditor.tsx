"use client";

import { useEffect, useRef } from "react";

export function EmailRichTextEditor({
  value,
  onChange,
  editorId,
}: {
  value: string;
  onChange: (value: string) => void;
  editorId: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  function command(name: string, commandValue?: string) {
    editorRef.current?.focus();
    document.execCommand(name, false, commandValue);
    onChange(editorRef.current?.innerHTML ?? "");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#e8d8c8] bg-white">
      <div
        className="flex flex-wrap items-center gap-1 border-b border-[#e8d8c8] bg-[#F7F2EA]/70 p-2"
        role="toolbar"
        aria-label="Email text formatting"
      >
        <ToolbarButton label="Bold" onClick={() => command("bold")}>
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton label="Italic" onClick={() => command("italic")}>
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton label="Underline" onClick={() => command("underline")}>
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton
          label="Bulleted list"
          onClick={() => command("insertUnorderedList")}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          onClick={() => command("insertOrderedList")}
        >
          1. List
        </ToolbarButton>
        <label className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 text-xs font-semibold text-[#5a4535] hover:bg-[#e8d8c8]">
          Color
          <input
            type="color"
            defaultValue="#3d3027"
            className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
            onChange={(event) => command("foreColor", event.target.value)}
            aria-label="Text color"
          />
        </label>
        <ToolbarButton
          label="Clear formatting"
          onClick={() => command("removeFormat")}
        >
          Clear
        </ToolbarButton>
      </div>
      <div
        id={editorId}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Email message"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="min-h-56 px-4 py-3 text-sm leading-7 text-[#3D3027] focus:outline-none"
      />
      <p className="border-t border-[#e8d8c8] px-4 py-2 text-xs text-[#9a7a63]">
        Use the toolbar to format the email. Unsafe HTML is removed when saved.
      </p>
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
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

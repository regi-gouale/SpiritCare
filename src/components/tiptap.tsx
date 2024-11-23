"use client";

import { Toolbar } from "@/components/toolbar";
import { cn } from "@/lib/utils";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange?: (richtext: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      Document,
      StarterKit.configure(),
      Heading.configure({
        levels: [2],
        HTMLAttributes: { class: "text-xl font-bold" },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "ps-5 mt-2 space-y-1 list-decimal",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "ps-5 mt-2 space-y-4 list-disc",
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[250px] max-h-[450px] w-full rounded-2xl rounded-t-none bg-transparent px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
          onChange ? "border border-input border-t-0" : "border-none"
        ),
      },
    },
    editable: onChange ? true : false,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
      // console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex min-h-[250px] flex-col justify-stretch">
      {onChange ? <Toolbar editor={editor} /> : null}
      <EditorContent
        editor={editor}
        className={cn(onChange ? "border-none" : "")}
      />
    </div>
  );
}

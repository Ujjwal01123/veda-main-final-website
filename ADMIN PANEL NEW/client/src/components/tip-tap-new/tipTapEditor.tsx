"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Palette,
  Table as TableIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Undo,
  Redo,
} from "lucide-react";

interface TipTapEditorProps {
  content?: string;
  onUpdate?: (html: string) => void;
  className?: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content = "",
  onUpdate,
  className = "",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Youtube.configure({
        modestBranding: true,
        nocookie: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYouTube = () => {
    const url = prompt("Enter YouTube video URL");
    if (url) editor.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
  };

  const addLink = () => {
    const url = prompt("Enter link URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div
      className={`border rounded-md bg-white shadow-sm ${className}`}
      style={{ overflow: "hidden" }}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 items-center border-b bg-gray-50 p-2">
        {/* Bold / Italic / Underline */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-300 p-1 rounded" : "p-1"}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-300 p-1 rounded" : "p-1"}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-gray-300 p-1 rounded" : "p-1"}
        >
          <UnderlineIcon size={16} />
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-gray-300 p-1 rounded" : "p-1"}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-gray-300 p-1 rounded" : "p-1"}
        >
          <ListOrdered size={16} />
        </button>

        {/* Alignment */}
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft size={16} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter size={16} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight size={16} />
        </button>

        {/* Color & Highlight */}
        <button onClick={() => editor.chain().focus().setColor("yellow").run()}>
          <Palette size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()}>
          <Highlighter size={16} />
        </button>

        {/* Table / Link / Image / Video */}
        <button onClick={addTable}>
          <TableIcon size={16} />
        </button>
        <button onClick={addLink}>
          <LinkIcon size={16} />
        </button>
        <button onClick={addImage}>
          <ImageIcon size={16} />
        </button>
        <button onClick={addYouTube}>
          <Video size={16} />
        </button>

        {/* Undo / Redo */}
        <button onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </button>
      </div>

      {/* Editor Area */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[180px] focus:outline-none"
      />
    </div>
  );
};

export default TipTapEditor;



// "use client";

// import React, { useCallback, useRef } from "react";
// import { useEditor, EditorContent, Editor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import { TextStyle } from "@tiptap/extension-text-style";
// import Color from "@tiptap/extension-color";
// import Highlight from "@tiptap/extension-highlight";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
// import {Table} from "@tiptap/extension-table";
// import TableRow from "@tiptap/extension-table-row";
// import TableHeader from "@tiptap/extension-table-header";
// import TableCell from "@tiptap/extension-table-cell";
// import Youtube from "@tiptap/extension-youtube";
// import TextAlign from "@tiptap/extension-text-align";
// import History from "@tiptap/extension-history";
// import { Undo2, Redo2, Bold, Italic, UnderlineIcon, Strikethrough, List, ListOrdered, Highlighter, Type, Table2, Link2, ImageIcon, Video } from "lucide-react";

// interface TipTapEditorProps {
//   content?: string;
//   onUpdate?: (html: string) => void;
//   className?: string;
// }

// const TipTapFullEditor: React.FC<TipTapEditorProps> = ({
//   content = "",
//   onUpdate,
//   className,
// }) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({}),
//       Underline,
//       TextStyle,
//       Color,
//       Highlight,
//       Link.configure({
//         openOnClick: true,
//         autolink: true,
//       }),
//       Image.configure({
//         inline: false,
//         allowBase64: true,
//       }),
//       Table.configure({
//         resizable: true,
//       }),
//       TableRow,
//       TableHeader,
//       TableCell,
//       Youtube.configure({
//         controls: true,
//         nocookie: true,
//       }),
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       History,
//     ],
//     content,
//     onUpdate: ({ editor }) => {
//       onUpdate?.(editor.getHTML());
//     },
//   });

//   const addImage = useCallback(() => {
//     const url = window.prompt("Enter Image URL:");
//     if (url) editor?.chain().focus().setImage({ src: url }).run();
//   }, [editor]);

//   const uploadImage = useCallback(
//     (file: File) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         editor?.chain().focus().setImage({ src: reader.result as string }).run();
//       };
//       reader.readAsDataURL(file);
//     },
//     [editor]
//   );

//   const addYouTube = useCallback(() => {
//     const url = window.prompt("Enter YouTube Video URL:");
//     if (url)
//       editor
//         ?.chain()
//         .focus()
//         .setYoutubeVideo({ src: url, width: 640, height: 360 })
//         .run();
//   }, [editor]);

//   const addLink = useCallback(() => {
//     const url = window.prompt("Enter Link URL:");
//     if (url) editor?.chain().focus().setLink({ href: url }).run();
//   }, [editor]);

//   if (!editor) return null;

//   return (
//     <div
//       className={`border border-gray-300 rounded-md bg-[#f9fafb] ${className}`}
//     >
//       {/* Toolbar */}
//       <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-[#f8f9fa] rounded-t-md">
//         <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold size={16} />} active={editor.isActive("bold")} />
//         <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic size={16} />} active={editor.isActive("italic")} />
//         <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} icon={<UnderlineIcon size={16} />} active={editor.isActive("underline")} />
//         <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} icon={<Strikethrough size={16} />} active={editor.isActive("strike")} />

//         <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<List size={16} />} />
//         <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<ListOrdered size={16} />} />

//         <ToolbarButton
//           onClick={() => {
//             const color = window.prompt("Enter text color (e.g. #ff0000)");
//             if (color) editor.chain().focus().setColor(color).run();
//           }}
//           icon={<Highlighter size={16} />}
//         />
//         <ToolbarButton
//           onClick={() => {
//             const bg = window.prompt("Enter highlight color (e.g. yellow)");
//             if (bg) editor.chain().focus().toggleHighlight({ color: bg }).run();
//           }}
//           icon={<Type size={16} />}
//         />

//         <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={<Table2 size={16} />} />
//         <ToolbarButton onClick={addLink} icon={<Link2 size={16} />} />
//         <ToolbarButton onClick={addImage} icon={<ImageIcon size={16} />} />
//         <ToolbarButton onClick={addYouTube} icon={<Video size={16} />} />

//         <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo2 size={16} />} />
//         <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo2 size={16} />} />

//         <input
//           type="file"
//           ref={fileInputRef}
//           hidden
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files?.[0];
//             if (file) uploadImage(file);
//           }}
//         />
//       </div>

//       {/* Editor content */}
//       <EditorContent
//         editor={editor}
//         className="min-h-[200px] bg-white p-3 rounded-b-md focus:outline-none"
//       />
//     </div>
//   );
// };

// const ToolbarButton = ({
//   onClick,
//   icon,
//   active,
// }: {
//   onClick: () => void;
//   icon: React.ReactNode;
//   active?: boolean;
// }) => (
//   <button
//     onClick={onClick}
//     className={`toolbar-btn ${active ? "bg-gray-200" : ""}`}
//   >
//     {icon}
//   </button>
// );

// // Basic CSS for toolbar
// const toolbarBtnStyle = `
// .toolbar-btn {
//   padding: 6px;
//   border: 1px solid #e2e8f0;
//   border-radius: 4px;
//   background: white;
//   cursor: pointer;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
// .toolbar-btn:hover {
//   background-color: #f3f4f6;
// }
// `;

// if (typeof document !== "undefined") {
//   const style = document.createElement("style");
//   style.innerHTML = toolbarBtnStyle;
//   document.head.appendChild(style);
// }

// export default TipTapFullEditor;

import React, { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CharacterCount from "@tiptap/extension-character-count";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  Upload,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Palette,
  Highlighter,
  TableIcon,
  Type,
  Plus,
} from "lucide-react";

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  onChange,
  placeholder = "Start typing...",
  className = "",
}) => {
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);
  const [showFontFamilyDropdown, setShowFontFamilyDropdown] = useState(false);
  const [showSpecialChars, setShowSpecialChars] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strike: false,
    code: false,
    textAlign: "left",
    bulletList: false,
    orderedList: false,
    blockquote: false,
    textStyle: false,
    highlight: false,
    heading: null as number | null,
    link: false,
    fontSize: null as string | null,
    fontFamily: null as string | null,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({
        HTMLAttributes: { class: "max-w-full h-auto rounded-lg" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      HorizontalRule,
      CharacterCount,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TableCell,
      FontFamily.configure({ types: ["textStyle"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      updateActiveFormats(editor);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border-0",
      },
    },
  });

  const updateActiveFormats = (editor: Editor) => {
    const currentFontSize = editor.getAttributes("textStyle").fontSize || null;
    const currentFontFamily =
      editor.getAttributes("textStyle").fontFamily || null;

    setActiveFormats({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      strike: editor.isActive("strike"),
      code: editor.isActive("code"),
      textAlign: editor.isActive({ textAlign: "center" })
        ? "center"
        : editor.isActive({ textAlign: "right" })
        ? "right"
        : editor.isActive({ textAlign: "justify" })
        ? "justify"
        : "left",
      bulletList: editor.isActive("bulletList"),
      orderedList: editor.isActive("orderedList"),
      blockquote: editor.isActive("blockquote"),
      textStyle: editor.isActive("textStyle"),
      highlight: editor.isActive("highlight"),
      heading:
        [1, 2, 3, 4, 5, 6].find((l) =>
          editor.isActive("heading", { level: l })
        ) ?? null,
      link: editor.isActive("link"),
      fontSize: currentFontSize,
      fontFamily: currentFontFamily,
    });
  };

  useEffect(() => {
    if (!editor) return;
    editor.on("selectionUpdate", ({ editor }) => updateActiveFormats(editor));
    editor.on("transaction", ({ editor }) => updateActiveFormats(editor));

    return () => {
      editor.off("selectionUpdate");
      editor.off("transaction");
    };
  }, [editor]);

  if (!editor) return null;

  const addImageFromUrl = () => {
    const url = window.prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Please select an image");

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      editor
        .chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run();
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1 items-center">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            activeFormats.bold ? "bg-gray-200" : ""
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            activeFormats.italic ? "bg-gray-200" : ""
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            activeFormats.strike ? "bg-gray-200" : ""
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-100"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-100"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded hover:bg-gray-100"
          disabled={uploadingImage}
          title="Upload Image"
        >
          {uploadingImage ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
        </button>

        <button
          type="button"
          onClick={addImageFromUrl}
          className="p-2 rounded hover:bg-gray-100"
          title="Add Image from URL"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Editor */}
      <div className={`min-h-[300px] p-4 ${className}`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;

import React, { useState, useEffect, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const [isMounted, setIsMounted] = useState(false);

  // We use a separate state for the dynamically loaded component
  const [QuillComponent, setQuillComponent] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    // Dynamically import react-quill only on the client
    import('react-quill').then((mod) => {
      setQuillComponent(() => mod.default);
    });
  }, []);

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['code-block', 'blockquote'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'code-block', 'blockquote'
  ];

  if (!isMounted || !QuillComponent) {
    return <div className="h-[200px] w-full bg-slate-50 rounded-2xl animate-pulse border border-slate-100" />;
  }

  return (
    <div className="rich-text-editor-wrapper">
      <QuillComponent 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white rounded-2xl overflow-hidden border-slate-200"
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .rich-text-editor-wrapper .ql-toolbar {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          border-color: #e2e8f0;
          background: #f8fafc;
        }
        .rich-text-editor-wrapper .ql-container {
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          border-color: #e2e8f0;
          min-height: 150px;
          font-family: inherit;
        }
        .rich-text-editor-wrapper .ql-editor {
          font-size: 14px;
          line-height: 1.6;
        }
        .rich-text-editor-wrapper .ql-editor pre.ql-syntax {
          background-color: #0f172a;
          color: #f8fafc;
          border-radius: 8px;
          padding: 1rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
      `}} />
    </div>
  );
};

export default RichTextEditor;

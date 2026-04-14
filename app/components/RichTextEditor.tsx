import React, { useState, useEffect, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const [isMounted, setIsMounted] = useState(false);
  const quillRef = React.useRef<any>(null);

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
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['code-block', 'blockquote'],
      ['clean']
    ],
    keyboard: {
      bindings: {
        'code-block-backspace': {
          key: 'Backspace',
          format: ['code-block'],
          handler: function(range: any, context: any) {
            if (context.offset === 0 && context.prefix === '') {
              // @ts-ignore - this refers to the quill instance in handlers
              this.quill.format('code-block', false);
              return false;
            }
            return true;
          }
        }
      }
    }
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
    <div className="rich-text-editor-wrapper relative">
      <QuillComponent 
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        scrollingContainer="html"
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
          border-radius: 1.25rem;
          padding: 1.5rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 14px;
          line-height: 1.7;
          margin: 1.5rem 0;
        }
      `}} />
    </div>
  );
};

export default RichTextEditor;

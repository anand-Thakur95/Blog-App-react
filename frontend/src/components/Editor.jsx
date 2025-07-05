import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import './App.css';

export default function Editor({ props }) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const editorWordCountRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'link',
                'insertImage',
                'mediaEmbed',
                'insertTable',
                'blockQuote',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        image: {
            toolbar: [
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'resizeImage'
            ]
        },
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://'
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        placeholder: 'Type or paste your content here!'
    };

    return (
        <div className="main-container">
            <div
                className="editor-container editor-container_classic-editor"
                ref={editorContainerRef}
            >
                <div className="editor-container__editor">
                    <div ref={editorRef}>
                        {isLayoutReady && (
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfig}
                                data={props?.initialData || ''}
                                onChange={props.onChange}
                                onReady={editor => {
                                    // Editor is ready to use
                                  
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
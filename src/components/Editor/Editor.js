import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = () => {
  return (
    <CKEditor
      data="<p>Hello from CKEditor 5!!</p>"
      onReady={editor => console.log('Editor is ready to use!', editor)}
      onChange={(event, editor) => {
        console.log('Change', { event, editor });
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', { event, editor });
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', { event, editor });
      }}
      editor={ClassicEditor}
    />
  );
};

export default Editor;

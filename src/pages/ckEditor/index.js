import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = () => {
  const [editorData, setEditorData] = useState('');
  const styles = {
    main:{
        minHeight: '95vh'
    }
}
  return (
    <div style={styles.main}>
      <h2>CKEditor in Next.js</h2>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
      />
      <div>
        <h3>Content Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorData }}></div>
      </div>
    </div>
  );
};

export default CKEditorComponent;

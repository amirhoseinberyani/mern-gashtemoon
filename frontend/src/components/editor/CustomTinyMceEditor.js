import { Editor } from '@tinymce/tinymce-react'
import { useContext } from 'react'
import { lang } from '../../localization'
import { Grid } from '@mui/material'
import { FetchContext } from 'contexts/fetchContext'
import { API } from 'config'

export default function CustomTinyMceEditor({ value, setValue }) {
  let { requestUpload } = useContext(FetchContext)

  const handleEditorChange = (content, editor) => {
    setValue(content)
  }

  const uploadImage = (blobInfo, success, failure) => {
    requestUpload(API.Upload.UploadPost, 'post', blobInfo.blob(), [
      {
        title: 'location',
        value: 'content',
      },
    ]).then(({ status, data }) => {
      if (status === 200) {
        // setImage(data?.path);
      }
    })
  }

  return (
    <Grid container direction='row' alignItems='center' dir='ltr'>
      <Editor
        init={{
          height: '40vh',
          width: '100%',
          menubar: false,
          plugins: [
            'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks image visualchars fullscreen link table hr nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
          ],
          toolbar:
            'undo redo | bold | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | emoticons | fullscreen  preview | insertfile image link | ltr rtl',
          image_advtab: true,
          image_uploadtab: true,
          image_caption: true,
          images_upload_handler: uploadImage,
          language: lang,
          setup: (editor) => {
            editor.on('contextMenu', function (e) {
              if (e.target.nodeName === 'IMG') {
                e.preventDefault()
              }
            })
          },
        }}
        onEditorChange={handleEditorChange}
        value={value}
        apiKey='nila1ighiv159bwe1d3l8ewprcfvmcjwar17rez83yeyu2mg'
      />
    </Grid>
  )
}

import React, { useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { lang } from '../../localization'
import { FetchContext } from '../../contexts/FetchContext'
import { API, base_api } from '../../constants/api'

import { Grid } from '@material-ui/core';

export default function CustomTinyMceEditor({ value, setValue }) {
  let { fetchUpload } = useContext(FetchContext)

  const handleEditorChange = (content, editor) => {
    setValue(content)
  }

  const uploadImage = (blobInfo, success, failure) => {
    // fetchUpload(blobInfo.blob()).then(({ status, data }) => {
    //   if (status === 200) {
    //     let url = base_api + data.path
    //     success(url)
    //   }
    // })
    fetchUpload(
      API.Upload.UploadPost,
      "post",
      blobInfo.blob(),
      [
        {
          title: "location",
          value: "content",
        },
      ]
    ).then(({ status, data }) => {
      if (status === 200) {
        // setImage(data?.path);
      }
    });
  }
  return (
    <Grid container direction="row" alignItems="center" dir="ltr" >
      <Editor
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          ],
          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          toolbar_mode: 'wrap',
          font_formats:
            "IRANSans;Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
          image_advtab: true,
          image_uploadtab: true,
          image_caption: true,
          images_upload_handler: uploadImage,
          language: lang
        }}
        onEditorChange={handleEditorChange}
        value={value}
        apiKey="nila1ighiv159bwe1d3l8ewprcfvmcjwar17rez83yeyu2mg"
      />
    </Grid>
  )
}

import React, { useState } from 'react'
import { TextField, Autocomplete, Chip } from '@mui/material'

interface PropTypes {
  onTagsChange?: any
}
const TagInput = ({ onTagsChange }: PropTypes) => {
  const [tags, setTags] = useState([]) // لیست تگ‌های انتخاب شده
  const [inputValue, setInputValue] = useState('') // ورودی کاربر

  const handleChange = (event: any, newValue: any) => {
    setTags(newValue) // وقتی کاربر تگ‌ها را انتخاب یا حذف می‌کند
    onTagsChange(newValue) // ارسال تگ‌ها به والد
  }

  const handleInputChange = (event: any, newInputValue: any) => {
    setInputValue(newInputValue) // مدیریت ورودی کاربر
  }

  return (
    <Autocomplete
      multiple
      freeSolo
      size='small'
      options={inputValue ? [inputValue] : []} // نمایش ورودی کاربر به عنوان گزینه
      value={tags}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          variant='outlined'
          label='تگ‌ها را وارد کنید'
          placeholder='تگ‌ها'
        />
      )}
    />
  )
}

export default TagInput

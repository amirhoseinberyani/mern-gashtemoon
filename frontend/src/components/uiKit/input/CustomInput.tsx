import { TextField } from '@mui/material'

interface CustomInputProps {
  label: JSX.Element | string
  type?: string
  name: string
  error?: boolean
  helperText?: string
  onChange?: (value: string | number | null) => void
  value: string | number | null
  required?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = 'text',
  name,
  error,
  helperText,
  onChange,
  value,
  required = false,
}) => {
  return (
    <TextField
      label={label}
      sx={{
        width: '100%',
      }}
      type={type}
      fullWidth
      variant='outlined'
      margin='dense'
      size='small'
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      error={!!error}
      helperText={helperText}
      required={required}
    />
  )
}

export default CustomInput

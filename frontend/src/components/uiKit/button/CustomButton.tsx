import { Button, ButtonProps } from '@mui/material'

interface CustomButtonProps extends ButtonProps {
  label: JSX.Element |string
  type?: 'submit' | 'button'
  fullWidth?: boolean 
  sx?: object
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  type = 'button',
  fullWidth = false,
  sx,
  ...props
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      sx={{ height: 40, borderRadius: 30, px: 3, minWidth: 'unset', ...sx }}
      {...props}
    >
      {label}
    </Button>
  )
}

export default CustomButton

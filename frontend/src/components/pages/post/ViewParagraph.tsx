import { Grid, Typography } from '@mui/material'

interface ParagraphProps {
  item: any
}

export default function Paragraph({ item }: ParagraphProps) {
  return (
    <Grid
      style={{
        textAlign: 'justify',
        alignItems: 'center',
        margin: '20px 0 20px 0',
      }}
    >
      {/* <Typography variant="h5" fontWeight={300} lineHeight={2}>
        {item.value}
      </Typography> */}
      <Typography
        dangerouslySetInnerHTML={{
          __html: item.value,
        }}
        fontSize='14px'
        lineHeight={3}
      />
    </Grid>
  )
}

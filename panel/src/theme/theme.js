import { createTheme, responsiveFontSizes } from '@material-ui/core'
import palette from './palette'
import { getDirection, getFont } from '../localization'

const theme = createTheme({
    palette: palette,
    spacing: 2.5,
    direction: getDirection(),
    typography: {
        allVariants: {
            fontFamily: getFont()
        },
        h1: {
            fontSize: 40,
            fontWeight:"bold",
            lineHeight: 2
        },
        h2: {
            fontSize: 22,
            fontWeight: 'bold'
        },
        h3: {
            fontSize: 20,
        },
        h4: {
            fontSize: 18,
            fontWeight: "bold"
        },
        h5: {
            fontSize: 16,
            fontWeight: "bold"
        },
        h6: {
            fontSize: 14,
            fontWeight: 500
        },
        subtitle1: {
            fontSize: 24,
            color: `${palette.text.primary}cc`
        },
        subtitle2: {
            fontSize: 12,
        },
        body1: {
            fontSize: 14,
            textAlign: getDirection() === "rtl" ? "justify" : "left",
            lineHeight: 2.2
        },
        body2: {
            fontSize: 12,
            textAlign: getDirection() === "rtl" ? "justify" : "left"
        },
        button: {
            fontSize: 14,
            textTransform:"none"
        }
    }
})

export default responsiveFontSizes(theme);
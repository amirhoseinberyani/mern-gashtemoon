# Theme

The `theme` folder contains configurations related to the application's theme, specifically for managing Material UI (MUI) palettes, typography, and overall design settings. By centralizing theme configurations, we ensure consistency in styling across the entire application and allow easy customization.

## Folder Structure

- **`index.ts`**: The entry point for the theme configuration, where the theme and palette are exported and applied globally.
- **`palette.ts`**: Defines the color palette for the application, including primary, secondary, background, and other color settings based on Material UI’s palette system.
- **`typography.ts`**: Configures the typography (fonts, font sizes, etc.) for the application, using Material UI's typography system.
- **`theme.ts`**: Combines the palette and typography configurations and exports a complete MUI theme that can be applied to the application.

## Why Use the `theme` Folder?

By using a centralized theme configuration:

- **Consistency**: Ensures the application has a consistent look and feel across all components.
- **Customization**: Easily switch between light/dark modes or customize individual aspects of the theme (e.g., typography or colors) without modifying individual components.
- **Maintainability**: Centralizing the theme configuration makes it easier to maintain and adjust global styles when needed.

## Example of Theme Configuration

### `palette.ts`

```typescript
// palette.ts

import { PaletteOptions } from '@mui/material/styles'

const palette: PaletteOptions = {
  primary: {
    main: '#1976d2', // Primary blue color
  },
  secondary: {
    main: '#dc004e', // Secondary pink color
  },
  background: {
    default: '#fafafa', // Background color
    paper: '#ffffff', // Paper background color (for cards, modals, etc.)
  },
  text: {
    primary: '#000000', // Primary text color
    secondary: '#555555', // Secondary text color
  },
}

export default palette
```

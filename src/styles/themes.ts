import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"

export const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#4f46e5",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
})

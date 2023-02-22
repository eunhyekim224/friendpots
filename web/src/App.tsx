import { Home } from "./screens/Home/Home";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, brown } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: brown[500],
        }
    },
});


function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme>
                    <Home />
                </CssBaseline>
            </ThemeProvider>
        </>
    );
}

export default App;

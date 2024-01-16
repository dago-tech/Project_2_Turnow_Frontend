import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

export function SendClearButtons({handleSubmit, handleReset}) {
    
    const theme = createTheme({
        palette: {
            primary: {
                main: "#34495E",
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Button
                    type="button" 
                    variant="contained"
                    size="small"
                    startIcon={<SendIcon />}
                    onClick={handleSubmit}
                    sx={{margin: 2}}
                >
                    Send
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    size="small"
                    startIcon={<ClearIcon />}
                    onClick={handleReset}
                    sx={{margin: 2}}
                >
                    Clear
                </Button>
            </ThemeProvider>
        </>
    )
}
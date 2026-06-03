export const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#2aa8a8",
      light: "#4acaca",
      dark: "#1d7a7a",
      contrastText: "#0b0d11",
    },
    secondary: {
      main: "#c4a35a",
      light: "#d8c07a",
      dark: "#a8883e",
      contrastText: "#0b0d11",
    },
    background: {
      default: "#0b0d11",
      paper: "#16181d",
    },
    text: {
      primary: "#e4e4e0",
      secondary: "#888890",
    },
    error: {
      main: "#e04848",
    },
    success: {
      main: "#4ab86a",
    },
    divider: "#22252b",
  },
  typography: {
    fontFamily: '"Inter", "system-ui", -apple-system, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #22252b",
          backgroundImage: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#1e2128 !important",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #22252b",
          padding: "10px 16px",
          color: "#e4e4e0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            color: "#888890",
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.8125rem",
          padding: "6px 16px",
        },
        containedPrimary: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0b0d11",
          borderBottom: "1px solid #22252b",
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0f1116",
          borderRight: "1px solid #22252b",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#1e2128",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#16181d",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#22252b",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e2128",
          color: "#e4e4e0",
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: {
          "& .RaList-actions": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          "& .RaDatagrid-headerCell": {
            backgroundColor: "#0f1116",
          },
        },
      },
    },
    RaShow: {
      styleOverrides: {
        card: {
          backgroundColor: "#16181d",
        },
      },
    },
  },
};

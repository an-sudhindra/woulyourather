import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
	overrides: {
		palette: {
			primary:{
				main: '#008080'
			}
		},
		MuiPaper:{
			root: {
				minHeight: "24px",
			}
		},
		MuiTypography: {
			subtitle2: {
				fontSize: "0.8rem",
			},
			body2: {
				fontSize: "0.8rem",
			}
		},
		MuiButton: {
			root: {
				fontWeight: "bold",
				backgroundColor: "#008080",
				color: "#ffffff",
				margin: "6px",
				"&:hover": {
					backgroundColor: "#008080"
				},
				'&$disabled': {
					color: "#ffffff",
					backgroundColor: "#bdbdbd",
					cursor: "not-allowed",
				}
			}
		},
		MuiTabs: {
			root: {
				minHeight:"25px",
			},
			indicator: {
				backgroundColor: "#008080",
				minHeight: "3px",
			},
		},
		MuiTab: {
			root: {
				textTransform: "none",
				backgroundColor: "#ffffff",
				minHeight: "24px",
				borderTopLeftRadius: "8px",
				borderTopRightRadius: "8px",
				border: "1px solid #008080",
			},
			wrapper: {
				color: "#008080",
			}
		},
		MuiCard: {
			root: {
				border: "1px solid #008080",
				borderRadius: "10px",
			}
		},
		MuiCardHeader: {
			root: {
				borderBottom: "1px solid #008080",
				backgroundColor: "#008080",
				color: "#ffffff",
				minHeight: "24px",
				padding: "3px",
			},
			title: {
				fontSize: "12px",
				padding: "3px",
				fontWeight: "bold",
			}
		},
		MuiCardActions: {
			root: {
				padding: "4px",
			}
		},
		MuiFormControlLabel: {
			label: {
				fontSize: "12px",
			}
		},
		MuiSvgIcon: {
			root: {
				width: "0.7em",
				height: "0.7em",
			}
		},
		MuiRadio: {
			root:{
				color: "#008080",
			},
			colorPrimary: {
				color: "#008080",
				'&$checked': {
					color: "#008080",
				}
			}
		},
		MuiLinearProgress: {
			root:{
				minHeight: "20px",
				borderRadius: "4px",
			},
			colorPrimary: {
				backgroundColor: "#b2d8d8",
			},
			barColorPrimary: {
				backgroundColor: "#008080",
			},
		},
		MuiBadge:{
			badge: {
				width: "30px",
				height: "30px",
				borderRadius: "50%",
				textAlign: "center",
				fontSize: "9px",
			},
			anchorOriginTopRightRectangle: {
				top: "5px",
				right: "5px",
			}
		},
		MuiFormLabel: {
			root: {
				fontSize: "11px",
			},
		},
		MuiInputLabel: {
			formControl: {
				position: "relative",
			}
		},
		MuiOutlinedInput: {
			input: {
				padding: "8px",
				fontSize: "12px",
			}
		},
	}
});
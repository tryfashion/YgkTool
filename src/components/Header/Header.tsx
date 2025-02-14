import React from "react";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import clsx from "clsx";
import { store } from "../../data/drawerState";

function ElevationScroll(props: Props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

interface Props {
	children: React.ReactElement;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			flexGrow: 1,
		},
		appBar: {
			[theme.breakpoints.up("sm")]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
			// filter: "blur(2px)"
		},
		cover: {
			position: "absolute",
			height: "100%",
			width: "100%",
			filter: "blur(20px)",
			zIndex: -1,
			background: "rgba(255, 255, 255, 0.9)",
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up("sm")]: {
				display: "none",
			},
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
	})
);

export default (props: { title: string; PageAction }) => {
	const classes = useStyles();

	const { title, PageAction } = props;

	return (
		<ElevationScroll {...props}>
			<AppBar
				position="fixed"
				color="inherit"
				className={clsx(classes.appBar)}
			>
				{/* <div className={classes.cover}></div> */}
				<Toolbar>
					<IconButton
						color="primary"
						aria-label="open drawer"
						onClick={() =>
							store.dispatch({ type: "drawer/opened" })
						}
						edge="start"
						className={classes.menuButton}
						size="large"
					>
						<MenuTwoToneIcon />
					</IconButton>
					<Typography
						color="primary"
						variant="h6"
						className={classes.title}
					>
						{title}
					</Typography>
					{PageAction && <PageAction />}
				</Toolbar>
				<Divider />
			</AppBar>
		</ElevationScroll>
	);
};

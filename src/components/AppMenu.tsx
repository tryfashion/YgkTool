import React, { useState, useEffect } from "react";
import fivkits from "../utils/Services/fiv";
import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShareIcon from "@mui/icons-material/Share";
import StyledMarkdown from "./StyledMarkdown";
import CodeIcon from "@mui/icons-material/Code";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		content: {
			padding: theme.spacing(1),
		},
		margin: {
			marginBottom: theme.spacing(1),
		},
	})
);

/**
 * 工具菜单
 */
const AppMenu = ({
	appinfo,
	feedback,
	appDoc,
}: {
	appinfo: IApp;
	feedback: () => void;
	appDoc: string;
}) => {
	const classes = useStyles();
	const { link, name } = appinfo;
	const [help, setHelp] = useState("暂无帮助文本");
	const [fiv, setFiv] = useState(false);
	const [showCode, setShowCode] = useState(false);
	const handleFiv = () => {
		const { link, name } = appinfo;
		if (!fivkits.get(link)) {
			fivkits.add({
				link,
				name,
			});
			setFiv(true);
			window.snackbar({ message: "已收藏" });
		} else {
			fivkits.delete({
				link,
				name,
			});
			setFiv(false);
			window.snackbar({ message: "已取消" });
		}
	};
	const handleShare = () => {
		navigator
			.share({
				title: document.title,
				url: window.location.href,
			})
			.then(() => {
				window.snackbar({ message: "感谢分享^_^" });
			});
	};
	const handleClickCode = (e: any) => {
		e.target.select();
	};
	const handleCode = () => {
		setShowCode(!showCode);
	};
	useEffect(() => {
		if (fivkits.get(link)){
			setFiv(true);
		}
		// const helpMdPath = require(`../../apps/${appinfo.link}/README.md`);
		// fetch(helpMdPath.default)
		// 	.then((response) => {
		// 		return response.text();
		// 	})
		// 	.then((text) => {
		// 		setHelp(text === "" ? "暂无帮助文本" : text);
		// 	});
	});
	return (
        <div className={classes.content}>
			<ButtonGroup aria-label="more options">
				<IconButton
                    component="a"
                    href={`https://github.com/RiverTwilight/ygktool/tree/master/src/apps/${link}`}
                    aria-label="在Github上编辑此页面"
                    size="large">
					<GitHubIcon fontSize="inherit" />
				</IconButton>
				<IconButton onClick={handleFiv} aria-label="收藏" size="large">
					{fiv ? <StarIcon /> : <StarBorderIcon />}
				</IconButton>
				<IconButton onClick={handleCode} aria-label="框架引用" size="large">
					<CodeIcon fontSize="inherit" />
				</IconButton>
				{/* {typeof(navigator.share) != "undefined" && (
					<IconButton onClick={handleShare} aria-label="分享">
						<ShareIcon fontSize="inherit" />
					</IconButton>
				)} */}
				<Button
					className={classes.margin}
					onClick={feedback}
					variant="outlined"
					aria-label="Send us feedback"
				>
					反馈
				</Button>
			</ButtonGroup>

			{showCode && (
				<TextField
					onClick={handleClickCode}
					value={`<iframe src="${window.location.origin}/app/${appinfo.link}?fullscreen=true" width="100%" height="400px" scrolling="no" style="border:0;"></iframe>`}
					id="frame-code"
					label="嵌入代码"
					variant="outlined"
				/>
			)}
			
			<StyledMarkdown content={appDoc} />
		</div>
    );
};

export default AppMenu;

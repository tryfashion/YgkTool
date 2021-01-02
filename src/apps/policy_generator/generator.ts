type config = {
	[profile: string]: string;
};

export default class PG {
	config: config;
	constructor() {
		this.config = {};
	}
	setConfig(key: any, value: any) {
		this.config[key] = value;
	}
	generator(): string {
		console.log(this.config);
		return `## 隐私政策\n
本协议是您与${this.config.firmName}（下称“我们”）之间关于${this.config.websiteName}（下称“本网站”）的法律协议。
在使用本网站时，用户必须要遵从国家或地区的相关法律。\n
### 信息收集\n
本网站在提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。
### 信息安全\n
我们努力保障信息安全，以防信息的丢失、不当使用、未经授权阅览或披露。
我们使用各种安全技术以保障信息的安全。例如，我们将通过服务器多备份、密码加密等安全措施，防止信息泄露、毁损、丢失；
我们建立严格的管理制度和流程以保障信息的安全。例如，我们严格限制访问信息的人员范围，并进行审计，要求他们遵守保密义务；
我们重视信息安全合规工作，并通过与监管机构、第三方测评机构建立了良好的协调沟通机制，及时抵御并处置各类信息安全威胁，为您的信息安全提供全方位保障；
但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网环境下，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。
\n若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，按照《国家网络安全事件应急预案》等有关规定及时上报，并以发送邮件、推送通知、公告等形式告知您相关情况，并向您给出安全建议。
\n为更有效的保障您的信息安全，我们也希望您能够加强自我保护意识。我们仅在 ${this.config.websiteName} 直接导致您个人信息泄露的范围内承担责任，因此，请您妥善保管您的账号及密码信息，避免您的个人信息泄露。除非您判断认为必要的情形下，不向任何第三人提供您的账号密码等个人信息。
		`;
	}
}
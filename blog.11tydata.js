module.exports = {
	eleventyComputed: {
		postUrlStem: data => {
			return data.page.filePathStem.replace(/^\/blog\/|\/index$/g, "");
		},
		wpid: data => {
			return data.wpids[data.postUrlStem];
		},
		disqus_id: data => {
			let wpid = data.wpid;

			if (wpid) {
				return `${ wpid } https:\/\/lea.verou.me\/?p=${ wpid }`;
			}
			else if (data.disqus !== false) {
				return typeof data.disqus !== "string"? data.postUrlStem : data.disqus;
			}
		}
	}
};
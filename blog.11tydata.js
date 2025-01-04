export default {
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
			else if (data.disqus !== false && data.page.date < new Date("2024-01-01")) {
				// Posts before 2024-01-01 use Disqus
				return typeof data.disqus !== "string"? data.postUrlStem : data.disqus;
			}
		},
		is_post: data => {
			return data.tags.includes("blog");
		},
		is_old_post: data => {
			if (!data.is_post) {
				return false;
			}
			return data.page.date < new Date("2023-06-01");
		},
		// Return URLs without /blog/ for blog posts before July 2023
		compatUrl: data => {
			if (data.is_old_post) {
				return data.page.url.replace("/blog/", "/");
			}

			return data.page.url;
		},
	}
};
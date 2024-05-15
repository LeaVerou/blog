// When the tab is not in focus, requestAnimationFrame is not called
// setTimeout is still called, just more slowly
export async function nextFrame () {
	return Promise.race([
		new Promise(requestAnimationFrame),
		new Promise(resolve => setTimeout(resolve, 30)),
	]);
};

export const levels = ["best", "fail", "AA", "AAA", "AAA+"];

function getBlankStat () {
	return levels.reduce((obj, key) => {
		obj[key] = [Infinity, -Infinity];
		return obj;
	}, {});
}

export function getBlankStats () {
	return {
		APCA: {
			white: getBlankStat(),
			black: getBlankStat(),
		},
		WCAG21: {
			white: getBlankStat(),
			black: getBlankStat(),
		}
	};
}

export function getLevel (algo, contrastRatio) {
	contrastRatio = Math.abs(contrastRatio);

	if (algo === "WCAG21") {
		return (contrastRatio < 3) ? "fail" : (contrastRatio < 4.5) ? "AA" : (contrastRatio < 7) ? "AAA" : "AAA+";
	}
	else {
		contrastRatio = Math.abs(contrastRatio);
		return (contrastRatio < 45) ? "fail" : (contrastRatio < 60) ? "AA" : (contrastRatio < 75) ? "AAA" : "AAA+";
	}
}
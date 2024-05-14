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
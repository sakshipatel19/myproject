import * as d3 from "d3";

export const createChartArea = (el, props) => {
	const svg = d3
		.select(el)
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", `0 0 ${props.defaultWidth} ${props.defaultHeight}`)
		.classed(`svg-content-responsive ${props.svgClassName || ""}`, true);

	const g = svg
		.append("g")
		.attr("transform", `translate(${props.margin.left}, ${props.margin.top})`);
	return g;
};
export const drawXAxis = (el, height) => {
	return el
		.append("g")
		.attr("transform", `translate(0,${height})`)
		.attr("text-anchor", "middle")
		.attr("class", "chart-x-axis");
};
export const drawYAxis = el => {
	const yGrid = el.append("g").attr("class", "grid");
	const yAxis = el.append("g").attr("class", "chart-y-axis");

	return { yAxis, yGrid };
};
export const getTrendIconPath = () =>
	"M1.80432447,12.676177 L7.32343461,7.06324549 L10.1537475,9.94167192 C10.5782944,10.3734359 11.2151148,10.3734359 11.6396618,9.94167192 L17.512561,3.96893708 L18.5739284,5.04834699 C18.8569597,5.33618963 19.4230222,5.19226831 19.4230222,4.76050435 L19.9890848,0.586786024 C20.0598426,0.22698272 19.7768113,-0.0608599229 19.4230222,0.0111007378 L15.3190685,0.586786024 C14.8945216,0.658746684 14.753006,1.16247131 15.0360372,1.45031395 L16.0974046,2.52972386 L11.0028414,7.71089144 L8.17252848,4.83246501 C7.74798155,4.40070104 7.11116115,4.40070104 6.68661421,4.83246501 L0.318410201,11.1650032 C-0.106136734,11.5967671 -0.106136734,12.2444131 0.318410201,12.676177 C0.742957135,13.107941 1.37977754,13.107941 1.80432447,12.676177 Z";
export const textwrap = (text, width) => {
	text.each(function() {
		let text = d3.select(this),
			words = text
				.text()
				.split(/\s+/)
				.reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.1, // ems
			x = text.attr("x"),
			y = text.attr("y"),
			dy = 1.1,
			tspan = text
				.text(null)
				.append("tspan")
				.attr("x", x)
				.attr("y", y)
				.attr("dy", dy + "em");
		while ((word = words.pop())) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text
					.append("tspan")
					.attr("x", x)
					.attr("y", y)
					.attr("dy", ++lineNumber * lineHeight + dy + "em")
					.text(word);
			}
		}
	});
};
export const getActionIconCircle = () =>
	"M6.00178381,1.01923809 C4.67065886,1.01923809 3.41954411,1.53752066 2.47878735,2.4777678 C1.53803059,3.41903418 1.0192384,4.67014893 1.0192384,6.00127388 C1.0192384,7.33290845 1.53752097,8.5840232 2.47776811,9.52477996 C3.41852487,10.4655367 4.66963963,10.9833097 6.00076457,10.9833097 C7.33188952,10.9833097 8.5835139,10.4650271 9.52528989,9.52376072 C11.4669385,7.58160254 11.4669385,4.4204356 9.52478027,2.4777678 C8.5835139,1.53752066 7.33239914,1.01923809 6.00178381,1.01923809 Z M6.00076457,12.0025478 C4.39750306,12.0025478 2.89055954,11.3787741 1.75716678,10.2458909 C0.623774024,9.11198854 -0.000509307281,7.60504502 5.32907052e-15,6.00127388 C5.32907052e-15,4.39801236 0.624793262,2.89055923 1.75818602,1.75716647 C2.89157878,0.624283331 4.39852229,8.8817842e-16 6.00178381,8.8817842e-16 C7.60453571,8.8817842e-16 9.11198885,0.624283331 10.2453816,1.75716647 C12.584533,4.09733713 12.5850426,7.90470102 10.2458912,10.2448717 C9.11147923,11.3782644 7.60402609,12.0025478 6.00076457,12.0025478 L6.00076457,12.0025478 Z";
export const getActionYesIcon = () =>
	"M4.641,8 L4.998,6.936 L6.685,6.936 L7.049,8 L8.099,8 L6.342,3.072 L5.376,3.072 L3.619,8 L4.641,8 Z M6.377,6.04 L5.306,6.04 L5.845,4.444 L6.377,6.04 Z";

export const getActionNoIcon = () =>
	"4.984 8.5 4.984 5.539 6.923 8.5 7.791 8.5 7.791 3.6 6.797 3.6 6.797 6.456 4.921 3.6 3.99 3.6 3.99 8.5";

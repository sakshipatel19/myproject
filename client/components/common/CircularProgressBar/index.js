import React, { useState, useEffect } from "react";
import { string, number, bool } from "prop-types";
import "./CircularProgressBar.scss";

const INITIAL_OFFSET = 25;
const circleConfig = {
	x: "100",
	y: "100",
	radius: "90"
};

const CircularProgressBar = ({
	strokeColor,
	strokeWidth,
	innerText,
	legendText,
	percentage,
	trailStrokeWidth,
	trailStrokeColor,
	trailSpaced,
	speed
}) => {
	const [progressBar, setProgressBar] = useState(0);
	const pace = percentage / speed;
	const updatePercentage = () => {
		// setTimeout(() => {
		setProgressBar(percentage);
		// }, pace);
	};

	useEffect(() => {
		if (percentage > 0) updatePercentage();
	}, [percentage]);

	useEffect(() => {
		if (progressBar < percentage) updatePercentage();
	}, [progressBar]);

	return (
		<figure className="circular-progressbar-container">
			<svg viewBox={circleConfig.viewBox} width={200} height={200}>
				<circle
					className="donut-ring"
					cx={circleConfig.x}
					cy={circleConfig.y}
					r={circleConfig.radius}
					fill="transparent"
					stroke={trailStrokeColor}
					strokeWidth={trailStrokeWidth}
					// strokeDasharray={trailSpaced ? 1 : 0}
				/>

				<circle
					className="donut-segment"
					cx={circleConfig.x}
					cy={circleConfig.y}
					r={circleConfig.radius}
					fill="transparent"
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					// strokeDasharray={`${progressBar} ${100 - progressBar}`}
					strokeDasharray="75 25"
					// strokeDashoffset={INITIAL_OFFSET}
				/>

				<g className="chart-text">
					<text x="100" y="110" className="chart-number">
						{progressBar}%
					</text>
					<text x="50%" y="50%" className="chart-label">
						{innerText}
					</text>
				</g>
			</svg>
			{legendText && (
				<figcaption className="figure-key">
					<ul
						className="figure-key-list"
						aria-hidden="true"
						role="presentation"
					>
						<li>
							<span className="shape-circle" />
							<span>{legendText}</span>
						</li>
					</ul>
				</figcaption>
			)}
		</figure>
	);
};

CircularProgressBar.propTypes = {
	strokeColor: string,
	strokeWidth: number,
	innerText: string,
	legendText: string,
	percentage: number,
	trailStrokeWidth: number,
	trailStrokeColor: string,
	trailSpaced: bool,
	speed: number
};

CircularProgressBar.defaultProps = {
	strokeColor: "blueviolet",
	strokeWidth: 1,
	innerText: "Completed",
	legendText: "",
	percentage: 0,
	trailStrokeWidth: 1,
	trailStrokeColor: "#d2d3d4",
	trailSpaced: false,
	speed: 1
};

export default CircularProgressBar;

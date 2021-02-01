import React, { Fragment, useRef } from "react";
import SummaryHeader from "./SummaryHeader";
const PageContainer = ({ title, children }) => {
	const containerRef = useRef(null);
	return (
		<Fragment>
			<SummaryHeader title={title} containerRef={containerRef} />
			<div ref={containerRef} className={"page-container"}>
				{children}
			</div>
		</Fragment>
	);
};

export default PageContainer;

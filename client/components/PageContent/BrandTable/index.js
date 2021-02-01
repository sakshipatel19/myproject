import React from "react";
import BrandTableDetailPage from "./BrandTableDetailPage";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import LoadingTable from "../../common/LoadingSkeleton/LoadingTable";
import DataLoadError from "../common/DataLoadError/DataLoadError";

const BrandTable = props => {
	const { brandsScore, fetchBrands, compareSelected, enable } = props;
	const brandsData = brandsScore?.data;
	return (enable ?
		<div className="brand-type-container section-header-main">
			<div className="brand-type-heading-container">
				<Label text="Brands" labelClass="section-header-title" />
				<div className="download-icon">
					<Icon name="download" size={16} />
				</div>
			</div>
			<div className="brand-type-detailpage-container">
				<div className="detail-page">
					{brandsScore?.fetching ? (
						<LoadingTable />
					) : brandsScore?.error ? (
						<DataLoadError />
					) : (
								<BrandTableDetailPage
									data={brandsData}
									fetchBrands={fetchBrands}
									compareSelected={compareSelected}
								/>
							)}
				</div>
			</div>
		</div> : null
	);
};

export default BrandTable;

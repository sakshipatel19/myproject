import React from "react";
import Card from "../../common/Card";
import VerticalSeparator from "../../common/VerticalSeparator";
import Icon from "../../common/Icon";
import LoadingIndicator from "../../common/LoadingIndicator";
import DataLoadError from "../../PageContent/common/DataLoadError/DataLoadError";
import { isNullOrUndefined } from "../../../utils/number";

const ProductInfo = props => {
	const { data, fetching, error } = props.data;
	return (
		<div className="product-info-container">
			<Card>
				{fetching ? (
					<LoadingIndicator />
				) : error ? (
					<DataLoadError handleRetry={props.onRetryClick} />
				) : (
					<div className="product-info">
						{!isNullOrUndefined(data?.imageURL) ? (
							<img
								src={data?.imageURL}
								alt={"Product"}
								className="product-image"
							/>
						) : (
							<Icon name="imageNotAvailable" iconClass="product-image" />
						)}
						<div className="product-description">
							<div className="product-id">{data?.productId}</div>
							<div className="product-title">{data?.title}</div>
						</div>
						{data?.productUrl !== "" && !isNullOrUndefined(data?.productUrl) && (
							<>
								<VerticalSeparator />
								<Icon
									name="externalPage"
									size={16}
									iconClass="product-external-icon"
									handleIconClick={() =>
										window.open(`http://${data?.productUrl}`, "_blank")
									}
								/>
							</>
						)}
					</div>
				)}
			</Card>
		</div>
	);
};

export default ProductInfo;

import React, { Component, Fragment } from "react";
import CatalogHealthDetail from "../../CatalogHealth/CatalogHealthDetail";
import { defaultTableFilter } from "../../CatalogHealth/CatalogHealthDetail/cataloghealth-reducers";
import Dot from "../../../common/DotWithLabel";
import { CATALOG_HEALTH_DETAIL_COLORPICKER } from "../../../../constants/colors";
import { apiCallBasedOnRoute } from "../../../../services/apiCallBasedOnRoute";
import { tableHeader } from "./CatalogTableHeader";
import Icon from "../../../common/Icon";
import { AVAILABILITY } from "../../../../constants/PageHeaders";

class AvailabilityCatalogHealthDetail extends Component {
	componentDidMount() {
		let payload = {
			...this.props,
			tableFilter: defaultTableFilter,
			selectedTab: this.props.selectedTab,
			searchTerms: []
		};
		this.props.setSearchTermsFilter([]);
		this.props.setTableFilter(defaultTableFilter);
		apiCallBasedOnRoute(payload);
		this.props.fetchCategoriesList(this.props);
	}
	fetchCatalogueHealthTable = payload => {
		const updatedPayload = {
			...this.props,
			...payload
		};
		this.props.fetchAvailabilityCatalogueHealthTable(updatedPayload);
	};
	fetchCatalogueHealthTabs = payload => {
		const updatedPayload = {
			...this.props,
			...payload
		};
		this.props.fetchAvailabilityCatalogueHealthTabs(updatedPayload);
	};
	setSearchTermsFilter = searchList => {
		this.props.setSearchTermsFilter(searchList);
	};
	setSelectedTab = tab => {
		this.props.setSelectedTab(tab);
	};
	setTableFilter = tableFilter => {
		this.props.setTableFilter(tableFilter);
	};
	onCatalogDetailRetryClick = () => {
		let payload = {
			...this.props,
			tableFilter: defaultTableFilter,
			selectedTab: this.props.selectedTab,
			searchTerms: []
		};
		apiCallBasedOnRoute(payload);
		this.props.fetchCategoriesList(this.props);
	};
	DataRowComponent = row => {
		const { catalogHealthDetails } = this.props?.pageConfig[AVAILABILITY];
		const tableHeader = catalogHealthDetails?.tableHeader;
		return (
			<tr className="aligncenter">
				{tableHeader?.map((col, i) => {

					switch (col.key) {
						case 'productName':
							return (<td className={"table-cell-product-name"} key={i}>
								<div>{row.productName}</div>
								<div className={"table-cell-product-code"}>{row.productId}</div>
							</td>);
							break;
						case 'subCategory':
							return (<td key={i}>{`${row.subCategory}`}</td>);
							break;
						case 'score':
							return (<td className={"table-cell-score"} key={i}>{`${row.score}%`}</td>);
							break;
						default:
							if (col.subHeader && col.subHeader.length > 0) {
								const subColumns = col.subHeader.map((sub, index) => {
									return (<td key={index}>{this.tableCellDotCode(row[sub.key])}</td>)
								});
								return subColumns;
							} else {

								return (<td key={i}>{this.tableCellDotCode(row[col.key])}</td>)
							}
							break;

					}
				})
				}
			</tr>
		);
	};

	tableCellDotCode = val => {
		return (
			<Fragment>
				{val?.scoreStatus !== null ? (
					<Dot
						color={CATALOG_HEALTH_DETAIL_COLORPICKER[val?.scoreStatus]}
						size={12}
					/>
				) : (
						<Icon name="noDataOutline" size={12} />
					)}
				<span
					className="catalog-detail-score-value"
					style={{ color: CATALOG_HEALTH_DETAIL_COLORPICKER[val?.scoreStatus] }}
				>
					{val?.score !== null ? `${val?.score}%` : "NA"}
				</span>
			</Fragment>
		);
	};
	render() {
		const {
			catalogHealthTableData,
			catalogHealthTabData,
			selectedTab,
			tableFilter,
			searchTerms,
			countryCode,
			pageConfig
		} = this.props;
		const { enable, tableHeader } = pageConfig[AVAILABILITY]?.catalogHealthDetails;
		const data =
			catalogHealthTableData.data?.availbilityCatalogTable
				?.availabilityCatalogList || [];
		const paginator = catalogHealthTableData.data?.paginator;
		return (enable ?
			<div>
				<CatalogHealthDetail
					data={data}
					catalogHealthTableData={catalogHealthTableData}
					tabData={catalogHealthTabData}
					selectedTab={selectedTab}
					tableFilter={tableFilter}
					searchTerms={searchTerms}
					countryCode={countryCode}
					paginator={paginator}
					setSearchTermsFilter={this.setSearchTermsFilter}
					setSelectedTab={this.setSelectedTab}
					setTableFilter={this.setTableFilter}
					fetchCatalogueHealthTable={this.fetchCatalogueHealthTable}
					fetchCatalogueHealthTabs={this.fetchCatalogueHealthTabs}
					tableHeader={tableHeader}
					DataRowComponent={this.DataRowComponent}
					onRetryClick={this.onCatalogDetailRetryClick}
				/>
			</div> : null
		);
	}
}
export default AvailabilityCatalogHealthDetail;

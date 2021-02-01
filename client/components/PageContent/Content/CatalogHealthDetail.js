import { connect } from "react-redux";
import React, { Fragment, Component } from "react";
import { bindActionCreators } from "redux";
import {
	fetchContentCatalogueHealthTabs,
	fetchContentCatalogueHealthTable,
	exportContentCatalogHealthTable
} from "./content-actions";
import * as catalogActions from "../CatalogHealth/CatalogHealthDetail/cataloghealth-actions";
import CatalogHealthDetail from "../CatalogHealth/CatalogHealthDetail";
import { defaultTableFilter } from "../CatalogHealth/CatalogHealthDetail/cataloghealth-reducers";
import Dot from "../../common/DotWithLabel";
import { CATALOG_HEALTH_DETAIL_COLORPICKER } from "../../../../client/constants/colors";
import { fetchCategoriesList } from "../FiltersBar/filters-bar-actions";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";
import Icon from "../../common/Icon";
import { CONTENT } from "../../../constants/PageHeaders";

const tableHeader = [
	[
		{
			name: "Name",
			key: "productName",
			isSortable: true,
			rowSpan: 2,
			style: { width: "28.16%" }
		},
		{
			name: "Category",
			key: "subCategory",
			isSortable: true,
			rowSpan: 2,
			style: { width: "10.94%" }
		},
		{
			name: "Score",
			key: "score",
			isSortable: true,
			rowSpan: 2,
			style: { width: "5.2%" }
		},
		{
			name: "Title",
			key: "title",
			isSortable: true,
			rowSpan: 2,
			style: { width: "6.93%" }
		},
		{
			name: "Image",
			key: "image",
			colSpan: 2,
			style: { width: "12.35%", borderBottomColor: "#858585" }
		},
		{
			name: "Ratings",
			key: "ratings",
			isSortable: true,
			rowSpan: 2,
			style: { width: "6.93%" }
		},
		{
			name: "Reviews",
			key: "reviews",
			isSortable: true,
			rowSpan: 2,
			style: { width: "6.71%" }
		},
		{
			name: "Features & Benefits",
			key: "featuresBullets",
			isSortable: true,
			rowSpan: 2,
			style: { width: "7.58%" }
		},
		{
			name: "Amazon Pref Tags",
			key: "amznPrefTags",
			isSortable: true,
			rowSpan: 2,
			style: { width: "6.93%" }
		},
		{
			name: "Product Desc",
			key: "productDesc",
			isSortable: true,
			rowSpan: 2,
			style: { width: "6.71%" }
		}
	],
	[
		{
			name: "Pri.",
			key: "primaryImage",
			isSortable: true,
			style: { width: "6.7%", paddingLeft: "2%" }
		},
		{
			name: "Sec.",
			key: "secondaryImage",
			isSortable: true,
			style: { width: "5.8%" }
		}
	]
];

class ContentCatalogHealthDetail extends Component {
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
		this.props.fetchContentCatalogueHealthTable(updatedPayload);
	};
	fetchCatalogueHealthTabs = payload => {
		const updatedPayload = {
			...this.props,
			...payload
		};
		this.props.fetchContentCatalogueHealthTabs(updatedPayload);
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
		const { catalogHealthDetails } = this.props?.pageConfig[CONTENT];
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

	onDownloadCatalogHealthDetails = obj => {
		const payload = {
			...this.props,
			...obj
		};

		this.props.exportContentCatalogHealthTable(payload);
	};

	render() {
		const {
			catalogHealthTableData,
			catalogHealthTabData,
			selectedTab,
			tableFilter,
			searchTerms,
			catalogHelathTableExport,
			pageConfig
		} = this.props;
		const { enable, tableHeader } = pageConfig[CONTENT]?.catalogHealthDetails;
		const data =
			catalogHealthTableData.data?.contentCatalogTable?.contentCatalogList ||
			[];
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
					paginator={paginator}
					setSearchTermsFilter={this.setSearchTermsFilter}
					setSelectedTab={this.setSelectedTab}
					setTableFilter={this.setTableFilter}
					fetchCatalogueHealthTable={this.fetchCatalogueHealthTable}
					fetchCatalogueHealthTabs={this.fetchCatalogueHealthTabs}
					tableHeader={tableHeader}
					DataRowComponent={this.DataRowComponent}
					onRetryClick={this.onCatalogDetailRetryClick}
					onDownloadClick={this.onDownloadCatalogHealthDetails}
					tableExportData={catalogHelathTableExport}
				/>
			</div> : null
		);
	}
}

const mapStateToProps = store => {
	return {
		...store.contentScore,
		...store.global.config,
		...store.catalogDetail
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchContentCatalogueHealthTabs,
			fetchContentCatalogueHealthTable,
			...catalogActions,
			fetchCategoriesList,
			exportContentCatalogHealthTable
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentCatalogHealthDetail);

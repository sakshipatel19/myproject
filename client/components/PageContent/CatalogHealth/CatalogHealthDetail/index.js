import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./cataloghealth-actions";
import { setSelectedPageInConfig } from "../../../global-actions";
import CatalogHealthDetail from "./CatalogHealthDeatil";

const mapStateToProps = (store, props) => {
	return {
		...props,
		...store.catalogDetail,
		categoryNames: store.global.config.categoryNames
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...actions, setSelectedPageInConfig }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CatalogHealthDetail);

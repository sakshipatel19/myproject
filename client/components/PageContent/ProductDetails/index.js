import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./product-details-actions";
import * as globalActions from "../../global-actions";
import ProductDetails from "./ProductDetails";

const mapStateToProps = store => {
	return {
		...store.productDetails,
		...store.global.config,
		...store.asinCompare
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...globalActions, ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

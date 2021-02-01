import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./price-promotion-actions";
import * as globalActions from "../../global-actions";
import PriceAndPromotion from "./PriceAndPromotion";

const mapStateToProps = store => {
	return {
		...store.priceAndPromotion,
		...store.global.config
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...globalActions, ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceAndPromotion);

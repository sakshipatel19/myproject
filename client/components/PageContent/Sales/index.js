import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./sales-actions";
import * as globalActions from "../../global-actions";
import Sales from "./Sales";

const mapStateToProps = store => {
	return {
		...store.salesScore,
		...store.global.config
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...globalActions, ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);

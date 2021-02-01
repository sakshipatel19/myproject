import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./summary-actions";
import * as globalActions from "../../global-actions";
import Summary from "./Summary";

const mapStateToProps = store => {
	return {
		...store.summaryScore,
		...store.global.config
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...globalActions, ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

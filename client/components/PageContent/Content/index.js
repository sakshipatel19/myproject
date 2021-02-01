import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./content-actions";
import * as globalActions from "../../global-actions";
import ContentSummary from "./Content";

const mapStateToProps = store => {
	return {
		...store.contentScore,
		...store.global.config
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...globalActions, ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentSummary);

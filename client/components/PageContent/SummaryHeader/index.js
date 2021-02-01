import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SummaryHeader from "./SummaryHeader";
import * as globalActions from "../../global-actions";

const mapStateToProps = store => {
	return {
		...store.global.config,
		scoreTypeSelectorToDefault: store.global.scoreTypeSelectorToDefault
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(globalActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryHeader);

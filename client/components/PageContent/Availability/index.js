import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./availability-actions";
import * as globalActions from "../../global-actions";
import Availability from "./Availability";

const mapStateToProps = store => {
	return {
		...store.availability,
		...store.global.config
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...globalActions, ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Availability);

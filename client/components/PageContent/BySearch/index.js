import BySearch from "./BySearch";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./by-search-actions";
import * as globalActions from "../../global-actions";

const mapStateToProps = store => {
	return {
		...store.bySearch,
		...store.global.config
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...globalActions, ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BySearch);

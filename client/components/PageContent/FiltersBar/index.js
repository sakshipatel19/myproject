import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import FiltersBar from "./FiltersBar";
import * as globalActions from "../../global-actions";
import * as filtersActions from "./filters-bar-actions";

const mapStateToProps = store => {
	return {
		...store.global.config,
		...store.filtersBar,
		scoreTypeSelectorToDefault: store.global.scoreTypeSelectorToDefault
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ ...filtersActions, ...globalActions }, dispatch);

const FiltersBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(FiltersBar));

export default FiltersBarContainer;

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AsinCompare from "./AsinCompare";
import * as actions from "./AsinCompare-actions";
import {
	setisAsinCompareInConfig,
	setAsinCompareBrandsInConfig
} from "../../global-actions";

const mapStateToProps = state => {
	return { ...state.global.config, ...state.asinCompare };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ ...actions, setisAsinCompareInConfig, setAsinCompareBrandsInConfig },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(AsinCompare);

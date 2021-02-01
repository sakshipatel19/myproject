import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import BrandCompare from "./BrandCompare";
import * as actions from "./BrandCompare-actions";
import {
	setCompareBrandsInConfig,
	setisBrandCompareInConfig,
	setCloseRedirectUrlInConfig
} from "../../global-actions";

const mapStateToProps = state => {
	return { ...state.global.config, ...state.brandCompare };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			...actions,
			setCompareBrandsInConfig,
			setisBrandCompareInConfig,
			setCloseRedirectUrlInConfig
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(BrandCompare);

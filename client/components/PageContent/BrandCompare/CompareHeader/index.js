import { connect } from "react-redux";
import CompareHeader from "./CompareHeader";
import { bindActionCreators } from "redux";
import {
	setCompareBrandsInConfig,
	setisBrandCompareInConfig,
	setBySearchSelectedKeywordsInConfig
} from "../../../global-actions";

const mapStateToProps = ({ global: { config } }) => {
	return { ...config };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ setCompareBrandsInConfig, setisBrandCompareInConfig, setBySearchSelectedKeywordsInConfig },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(CompareHeader);

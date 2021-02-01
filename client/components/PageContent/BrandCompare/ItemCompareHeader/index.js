import { connect } from "react-redux";
import ItemCompareHeader from "./CompareHeader";
import { bindActionCreators } from "redux";
import {
	setisAsinCompareInConfig,
	setAsinCompareBrandsInConfig
} from "../../../global-actions";

const mapStateToProps = state => {
	return {
		...state.global.config,
		asinCompareBrands: state.global.config.asinCompareBrands || []
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ setisAsinCompareInConfig, setAsinCompareBrandsInConfig },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(ItemCompareHeader);

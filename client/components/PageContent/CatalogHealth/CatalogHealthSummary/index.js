import CatalogHealth from "./CatalogHealth";
import {setSelectedTab} from "../CatalogHealthDetail/cataloghealth-actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const mapDispatchToProps = dispatch =>
	bindActionCreators({ setSelectedTab }, dispatch);

export default connect(null, mapDispatchToProps)(CatalogHealth);

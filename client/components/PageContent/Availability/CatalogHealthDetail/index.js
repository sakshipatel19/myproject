import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAvailabilityCatalogueHealthTabs,fetchAvailabilityCatalogueHealthTable }  from "../availability-actions";
import * as catalogActions from "../../CatalogHealth/CatalogHealthDetail/cataloghealth-actions";
import { fetchCategoriesList } from "../../FiltersBar/filters-bar-actions";
import AvailabilityCatalogHealthDetail from "./AvailabilityCatalogHealthDetail";


const mapStateToProps = store => {
	return {
		...store.availability,
		...store.global.config,
		...store.catalogDetail
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ 
		fetchAvailabilityCatalogueHealthTabs,
		fetchAvailabilityCatalogueHealthTable,
		fetchCategoriesList,
		...catalogActions
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityCatalogHealthDetail);

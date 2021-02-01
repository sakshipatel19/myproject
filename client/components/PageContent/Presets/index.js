import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Presets from "./Presets";
import * as actions from "./presets-action";
import * as globalActions from "../../global-actions";

const mapStateToProps = state => {
    return { ...state.global.config, ...state.presets };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { ...actions, ...globalActions },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Presets);

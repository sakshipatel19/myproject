import React, { Component } from "react";
import VerticalSeparator from '../../common/VerticalSeparator';
import Tab from '../../common/Tab';
import SummaryChart from '../common/SummaryChart';

const considerationTabs = [
    { "label": "CONTENT", "key": "content" },
    { "label": "AVAILABILITY", "key": "availability" },
    { "label": "PRICE & PROMOTION", "key": "priceAndPromotion" },
];
const conversionTabs = [
    { "label": "SALES", "key": "sales" }
];

class ConsiderationConversionSummary extends Component {
    state = {
        selectedTab: 'content'
    };
    onSummaryChartSelectorChange = scoreType => {
        this.props.loadAsinOverallScore({
            scoreType,
            selectedTab: this.state.selectedTab
        });
    };

    onSummaryRetryClick = () => {
        this.props.loadAsinOverallScore({
            selectedTab: this.state.selectedTab
        });
    };
    onSummaryExportClick = type => {
        // this.props.fetchAsinOverallScore({ ...this.props, exportType: type });
    };
    onTabChange = (selectedTab) => {
        this.setState({
            selectedTab,
            defaultSelectedChart: selectedTab === "priceAndPromotion" ? "priceScore" : ""
        }, () => { this.onSummaryRetryClick() });
    }
    render() {
        const {
            overallScore,
            isDateCompareSelected,
            brandCompareView,
            compareBrands,
            overallScoreExportData,
            asinCompareView,
            countryCode
        } = this.props;
        return (
            <div className="consideration-conversion-summary">
                <div className="consideration-conversion-headers">
                    <div className="consideration section-header-main">
                        <div className="header section-header-title">{"Consideration"}</div>
                        <div className="consideration-tab">
                            <Tab
                                data={considerationTabs}
                                selectedTab={this.state.selectedTab}
                                onTabChange={this.onTabChange}
                            />
                        </div>
                    </div>
                    <VerticalSeparator />
                    <div className="conversion section-header-main">
                        <div className="header section-header-title">{"Conversion"}</div>
                        <div className="conversion-tab">
                            <Tab
                                data={conversionTabs}
                                selectedTab={this.state.selectedTab}
                                onTabChange={this.onTabChange}
                            />
                        </div>
                    </div>
                </div>
                <SummaryChart
                    score={overallScore}
                    isBrandCompare={brandCompareView}
                    asinCompareView={asinCompareView}
                    isCompareSelected={isDateCompareSelected}
                    compareBrands={compareBrands}
                    downloadData={overallScoreExportData}
                    defaultSelectedChart={this.state.defaultSelectedChart}
                    onSelectorChange={this.onSummaryChartSelectorChange}
                    onRetryClick={this.onSummaryRetryClick}
                    onDownloadClick={this.onSummaryExportClick}
                    enableSectionHeader={false}
                    countryCode={countryCode}
                />
            </div>
        );
    }
}

export default ConsiderationConversionSummary;

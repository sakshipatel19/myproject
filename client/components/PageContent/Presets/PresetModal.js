import React, { Component } from "react";

import Icon from '../../common/Icon';
import LoadingIndicator from "../../common/LoadingIndicator";
import DataLoadError from "../../PageContent/common/DataLoadError/DataLoadError";
import { apiCallBasedOnRoute } from "../../../services/apiCallBasedOnRoute";

class PresetsModal extends Component {
    state = {}
    getPresetTiles = (data) => {
        return data.presets.map((item, index) => this.generateTile(item, index))
    }
    generateTile = (tileData, index) => {
        const {
            brands,
            categories,
            itemids,
            name,
            presetType,
            presetId
        } = tileData;
        return (
            <div className={`preset-tile ${presetType}`} key={presetId}>
                <div className="preset-header" >
                    <div className="preset-title">{name.toUpperCase()}</div>
                    <div className="preset-details">
                        <span>{brands.length}</span>{' Brands, '}
                        <span>{categories.length}</span>{' Categories & '}
                        <span>{itemids.length}</span>{' Item Id'}
                    </div>
                </div>
                <div className="preset-content" >{this.getContent({ brands, categories, itemids, tileId: index })}</div>
                <div className="preset-footer" >
                    VIEW
                    <Icon
                        name="sortRight"
                        size="12"
                        iconClass="preset-view-arrow"
                        handleIconClick={e => this.applyPreset({ brands, categories, itemids, tileId: index, name })}
                    />
                </div>
            </div>
        )
    }
    getContent = (lists) => {
        const listHeaders = [
            {
                title: 'BRANDS',
                key: 'brands',
            },
            {
                title: 'CATEGORIES',
                key: 'categories',
            },
            {
                title: 'ITEM ID',
                key: 'itemids',
            }
        ];
        return (
            listHeaders.map(header => (
                <div className={`list ${header.key}${lists.tileId}`} key={`${header.key}${lists.tileId}`}>
                    <div className="list-title" onClick={e => this.toggleList(header.key, lists.tileId)}>
                        <Icon
                            name="down"
                            size="16"
                            iconClass={`list-title-icon ${!this.state[`${header.key}${lists.tileId}`] ? 'rotate' : ''}`}
                        />
                        <div className="title-text">{header.title}</div>
                    </div>
                    { !this.state[`${header.key}${lists.tileId}`] && <div className="list-items">
                        {lists[header.key].map((item, i) => <div className="list-item" key={`${lists.tileId}-${i}`}>{item}</div>)}
                    </div>}
                </div>)
            )

        );
    }
    toggleList = (listName, tileId) => {
        this.setState({
            [`${listName}${tileId}`]: !this.state[`${listName}${tileId}`]
        });
    }
    applyPreset = (list) => {
        apiCallBasedOnRoute({
            ...this.props,
            brandNames: list.brands,
            categoryNames: list.categories,
            productIdList: list.itemids
        });
        this.props.setPresetNameInConfig(list.name);
        this.props.setBrandNamesInConfig(list.brands);
        this.props.setCategoryNamesInConfig(list.categories);
        this.props.setProductsListInConfig(list.itemids);
        this.props.setScoreTypeSelectorToDefault(
            !this.props.scoreTypeSelectorToDefault
        );
        this.props.hidePresetOverlay();
    }
    render() {
        const { hidePresetOverlay, presets } = this.props;
        return (
            <div className="preset-modal-wrapper">
                <header className="preset-modal-header">
                    <div className="text-container">
                        <div className="header-text">PRESET(s)</div>
                    </div>
                    <div className="brand-comapre-filters"></div>
                    <Icon
                        name="clearWhite"
                        size="18"
                        iconClass="preset-modal-close"
                        handleIconClick={hidePresetOverlay}
                    />
                </header>
                {presets.fetching ? (
                    <LoadingIndicator />
                ) : presets.error ? (
                    <DataLoadError handleRetry={this.props.onRetryClick} />
                ) : (<div className="preset-tile-container">
                    {this.getPresetTiles(presets.data)}
                </div>)
                }
            </div>);
    }
}
export default PresetsModal;
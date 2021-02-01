import React from "react";

import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import "./CatalogHealth.scss";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import DataLoadError from "../../common/DataLoadError/DataLoadError";
import LoadingSquare from "../../../common/LoadingSkeleton/LoadingSquare";

const CatalogHealth = props => {
  const { catalogHealthScore } = props;
  const CatalogHealthLists = catalogHealthScore?.data?.descriptions || [];
  const createCatalogHealthList = () => {
    return CatalogHealthLists.map((item, i) => {
      const colors = ["#00B0A3", "#FCA400", "#FF7A77"];
      return (
        <Link
          to={`${props.location.pathname}/catalog-health`}
          onClick={() => props.setSelectedTab(item?.key)}
          className={"catalog-health-link"}
          key={`catalog-health-link-${item?.descriptionType}_${i}`}
        >
          <div className="catalog-health-list">
            <div
              className="catalog-health-list-heading"
              key={`catalog-health-list-heading-${item?.descriptionType}`}
            >
              {item?.descriptionType}

              <span className="arrow">
                <Icon
                  name={props.arrowIconName || "sortRight"}
                  iconClass={"icon-right-arrow"}
                  size={12}
                />
              </span>
            </div>

            <div className="catalog-health-list-item">
              <div
                className="catalog-health-list-item-score"
                style={{ color: colors[i] }}
                key={`catalog-health-list-item-score-${item?.descriptionType}`}
              >{`${item?.descriptionScore}%`}</div>
              <div
                className="catalog-health-list-item-desc"
                key={`catalog-health-list-item-desc-${item?.descriptionType}`}
              >
                {item?.descriptionComment}
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };
  const createCatalogLoading = [1, 2, 3].map(i => {
    return (
      <div
        className="catalog-loading-placeholder"
        key={`catalog-loading-placeholder-${i}`}
      >
        <LoadingSquare />
      </div>
    );
  });

  return (
    <div className="catalog-health-container">
      <Label text="Catalogue Health" labelClass="section-header-title" />
      <div className="catalog-health-list-container">
        {props?.catalogHealthScore?.fetching ? (
          <>{createCatalogLoading}</>
        ) : (
            <>
              {catalogHealthScore?.error ? (
                <DataLoadError
                  handleRetry={props.fetchCataloghealthScore}
                  error={catalogHealthScore.error}
                />
              ) : (
                  createCatalogHealthList()
                )}
            </>
          )}
      </div>
    </div>
  );
};

export default withRouter(CatalogHealth);

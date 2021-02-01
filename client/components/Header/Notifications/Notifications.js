import React, { Fragment, useState } from "react";
import Icon from "../../common/Icon";
import "./Notifications.scss";
import Notification from "./Notifcation";
import LoadingIndicator from "../../common/LoadingIndicator";
import DataLoadError from "../../PageContent/common/DataLoadError/DataLoadError";
import Overlay from "../../common/Overlay";
import Filter from "./Filter";
import AppliedFilterSection from "./AppliedFilterSection";
import NoResultsMessage from "../../PageContent/common/NoResultsMessage";

const Notifications = props => {
	const { fetching, data, error } = props.notifications;
	const { selectedFilterIds, filter } = props;
	const isFilterApplied = selectedFilterIds.length !== 0;

	let heading = "Notifications",
		newNotificationsCount = 0,
		notificationsList = [],
		paginator = null;
	if (data) {
		heading = data.heading;
		newNotificationsCount = data.newNotificationsCount || 0;
		notificationsList = data.notificationsList;
		paginator = data.paginator;
	}

	const renderNotificationsList = notificationsList => {
		if (notificationsList === null) {
			return <NoResultsMessage />;
		}
		return notificationsList?.map((notification, index) => (
			<Notification
				key={`${Notification.notificationId}_${index}`}
				notification={notification}
			/>
		));
	};

	const updateNotificationStatus = notificationsList => {
		let newNotifications = notificationsList
			?.filter(e => e.new)
			?.map(e => e.notificationId);
		if (newNotifications?.length > 0)
			props.updateNotificationStatus(newNotifications);
	};

	const onCloseNotification = () => {
		updateNotificationStatus(notificationsList);
		props.closeNotification();
	};

	const onNotificationClick = e => {
		e.stopPropagation();
	};

	const [showFilter, setShowFilter] = useState(false);

	const onFilterIconClick = () => {
		setShowFilter(!showFilter);
	};

	const onApplyFilterButton = notificationIds => {
		props.getNotificationsList(0, notificationIds);
		props.updateSelectedFilterIds(notificationIds);
		onFilterIconClick();
	};

	const onCloseFilterIcon = notificationIds => {
		props.getNotificationsList(0, notificationIds);
		props.updateSelectedFilterIds(notificationIds);
	};

	return (
		<Overlay onClick={onCloseNotification} className="notification-overlay">
			<div className="notification-container" onClick={onNotificationClick}>
				<Fragment>
					<div className="notification-header">
						<div className="notification-heading">
							<div className="notification-heading-text">{`${heading} (${newNotificationsCount})`}</div>
						</div>
						<div className="notification-close">
							<Icon
								size="18"
								name="removeNotification"
								iconClass="close-notification"
								handleIconClick={onCloseNotification}
							/>
						</div>
					</div>
					<div
						className={`notification-filter ${
							showFilter ? "filterPresent" : ""
						}`}
					>
						<Icon
							name={`${
								isFilterApplied && !showFilter ? "funnelSelected" : "funnel"
							}`}
							iconClass={`${showFilter ? "filterOpen" : "filterClose"}`}
							size={16}
							handleIconClick={onFilterIconClick}
						/>
						{isFilterApplied && !showFilter ? (
							<AppliedFilterSection
								filter={filter}
								selectedFilterIds={selectedFilterIds}
								onCloseFilterIcon={onCloseFilterIcon}
							/>
						) : (
							"FILTER"
						)}
					</div>
					{showFilter &&
						(props.notificationFilter?.fetching ? (
							<LoadingIndicator />
						) : props.notificationFilter?.error ? (
							<DataLoadError
								handleRetry={() => props.getNotificationFilter()}
							/>
						) : (
							<Filter
								modifiedFilter={filter}
								onApplyFilterButton={onApplyFilterButton}
								closeFilter={() => {
									setShowFilter(!showFilter);
								}}
							/>
						))}
					{fetching ? (
						<LoadingIndicator />
					) : error ? (
						<DataLoadError handleRetry={() => props.getNotificationsList(1)} />
					) : (
						<div className="notification-body">
							{renderNotificationsList(notificationsList)}
						</div>
					)}
				</Fragment>

				{props.loadMore &&
					paginator?.totalPages > 1 &&
					paginator?.currenPage < paginator?.totalPages - 1 && (
						<div
							className="load-more"
							onClick={() =>
								props.loadMoreNotifications(paginator?.currenPage + 1)
							}
						>
							{props.notificationLoadMore?.fetching ? (
								<div className={"notification-load-more-indicator"}>
									<LoadingIndicator />
								</div>
							) : props.notificationLoadMore?.error ? (
								<DataLoadError
									handleRetry={() =>
										props.loadMoreNotifications(paginator?.currenPage + 1)
									}
								/>
							) : (
								"LOAD MORE"
							)}
						</div>
					)}
			</div>
		</Overlay>
	);
};

export default Notifications;

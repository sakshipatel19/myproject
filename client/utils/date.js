import moment, { isMoment } from "moment";

export const formatDate = momentDate => {
	if (momentDate) {
		if (isMoment(momentDate)) {
			if (momentDate === "") {
				return "";
			}
			return momentDate.format("YYYY-MM-DD");
		} else {
			return moment(momentDate).format("YYYY-MM-DD");
		}
	}
};

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
export const dateDiffInDays = (a, b) => {
	a = new Date(a);
	b = new Date(b);
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export const getYTDFromDate = () =>
	moment()
		.startOf("year")
		.format("YYYY-MM-DD");

export const getYTDToDate = () => moment().format("YYYY-MM-DD");

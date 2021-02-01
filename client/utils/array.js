export const compareValues = (key, order = "asc") => {
	return function innerSort(a, b) {
		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			// property doesn't exist on either object
			return 0;
		}

		const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
		const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

		let comparison = 0;
		if (varA > varB) {
			comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return order === "desc" ? comparison * -1 : comparison;
	};
};

export const applySort = (data, sortBy, sortType, SORT_ORDER) => {
	data.sort((e1, e2) => {
		let ele1 = e1[sortBy];
		let ele2 = e2[sortBy];
		if (Array.isArray(e1[sortBy])) {
			ele1 = ele1[0];
			ele2 = ele2[0];
		} else if (typeof ele1 === "object" && ele1 !== null) {
			const firstKey = Object.keys(ele1)[0];
			ele1 = ele1[firstKey];
			ele2 = ele2[firstKey];
		}
		//specific conditions handled based on specific keys of data received
		if (sortBy === "rank") {
			ele1 = parseInt(e1[sortBy]?.split("#")[1]);
			ele2 = parseInt(e2[sortBy]?.split("#")[1]);
		}
		if (typeof ele1 === "string") {
			ele1 = ele1.toLowerCase();
			ele2 = ele2.toLowerCase();
		}
		if (ele1 > ele2) return sortType == SORT_ORDER.ascendingOrder ? 1 : -1;
		if (ele1 < ele2) return sortType == SORT_ORDER.ascendingOrder ? -1 : 1;
		return 0;
	});
	return data;
};

// Output
// true if both are matching
// false if not matching
export const compareTwoArrays = (array1, array2) => {
	if (array1?.length != array2?.length) return false;

	for (let i = 0; i < array1?.length; i++)
		if (array1[i] !== array2[i]) return false;

	return true;
};

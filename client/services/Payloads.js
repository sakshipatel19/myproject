export const createCommonPayload = payload => {
	const {
		brandNames = [],
		categoryNames = [],
		clientOrg = "gsk",
		compareFrom = "",
		compareKey = "",
		compareTo = "",
		countryCode = "",
		fromDate = "",
		keyWordBrands = [],
		keywords = [],
		marketCode = "",
		productIdList = [],
		scoreType = "daily",
		searchTerms = [],
		tabKey = "",
		toDate = ""
	} = payload;

	return {
		brandNames,
		categoryNames,
		clientOrg,
		compareFrom,
		compareKey,
		compareTo,
		countryCode,
		fromDate,
		keyWordBrands,
		keywords,
		marketCode,
		productIdList,
		scoreType,
		searchTerms,
		tabKey,
		toDate
	};
};

export const createComparePayload = (commonPayload, payload, isAsin = false) => {
	const compareBrands = isAsin ? payload?.asinCompareBrands : payload?.compareBrands;
	const filterData = compareBrands?.map(e => {
		let productIdList = [];
		let categoryNames = [];
		e.categoryList?.forEach(category => {
			if (category.isSelected) {
				productIdList = isAsin ? [...productIdList, category.asin[0].productId] : [...productIdList, ...category.asin];
				categoryNames = [...categoryNames, category.category];
			}
		});

		let keyWordBrands = commonPayload?.keyWordBrands;
		if (keyWordBrands?.length > 0)
			keyWordBrands = keyWordBrands.map(obj => ({ ...obj, brand: e.name }));

		return {
			...commonPayload,
			keyWordBrands,
			brandNames: [e.name],
			categoryNames,
			productIdList,
			compareKey: e.type
		};
	});
	return filterData;
};

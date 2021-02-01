const countryToCurrencyMapping = {
	us: {
		currency: "USD",
		locale: "en-US"
	},
	uk: {
		currency: "GBP",
		locale: "en-GB"
	},
	fr: {
		currency: "GBP",
		locale: "en-fr"
	},
	de: {
		currency: "EUR",
		locale: "de-DE"
	},
	it: {
		currency: "EUR",
		locale: "it-IT"
	}
};

export const styles = {
	currency: "currency",
	unit: "unit",
	decimal: "decimal",
	percent: "percent"
};

export const numberFormat = (
	value,
	country = "us",
	style = styles.currency
) => {
	if (value === null) return "NA";
	const locale = countryToCurrencyMapping[country] ? countryToCurrencyMapping[country].locale : countryToCurrencyMapping['uk'].locale;
	const currency = countryToCurrencyMapping[country] ? countryToCurrencyMapping[country].currency : countryToCurrencyMapping['uk'].currency;
	let formatedNum = new Intl.NumberFormat(
		locale,
		{
			style,
			currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}
	).format(value);

	formatedNum = formatedNum === "NaN" ? "" : formatedNum;
	return formatedNum;
};

export const isNullOrUndefined = val => val === null || val === undefined;

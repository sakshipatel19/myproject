export const navData = [
	{
		type: "dashboard",
		label: "DASHBOARD",
		icon: "dashboard",
		iconHover: "dashboardHighlighted"
	},
	{
		type: "shelf",
		label: "SHELF",
		icon: "shelf",
		iconHover: "shelfHighlighted",
		value: [
			{
				label: "SUMMARY",
				value: "summary"
			},
			{
				label: "DISCOVERABILITY",
				value: [
					{
						label: "By Search",
						value: "bysearch"
					}
				]
			},
			{
				label: "CONSIDERATION",
				value: [
					{
						label: "Content",
						value: "content"
					},
					{
						label: "Availability",
						value: "availability"
					},
					{
						label: "Price & Promotion",
						value: "price-and-promotion"
					}
				]
			},
			{
				label: "CONVERSION",
				value: [{ label: "Sales", value: "sales" }]
			}
		]
	},
	{
		type: "boost",
		label: "BOOST",
		icon: "boost",
		iconHover: "boostHighlighted",
		value: []
	},
	{
		type: "amplify",
		label: "AMPLIFY",
		icon: "amplify",
		iconHover: "amplifyHighlighted",
		value: []
	}
];

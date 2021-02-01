export const pageConfig = {
	"default": {
		"summary": {
			"summaryChart": {
				"enable": true
			},
			"attributeScore": {
				"enable": true
			}
		},
		"bysearch": {
			"summaryChart": {
				"enable": true
			},
			"bestSeller": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Brand",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "20%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Paid",
						"key": "paidScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"key": "empty",
						"style": { "width": "44%" }
					}
				]
			},
			"keywordsTable": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Keywords",
						"key": "keyword",
						"isSortable": true,
						"isCheckboxRequired": true,
						"style": { "width": "28%" }
					},
					{
						"name": "Type",
						"key": "keywordType",
						"isSortable": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Brands",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "14%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" },
						"isNumber": true
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"style": { "width": "8%", "borderBottomColor": "#858585", "color": "#717171" },
						"isNumber": true
					},
					{
						"name": "Sponsored Products",
						"key": "spScore",
						"isSortable": true,
						"style": { "width": "10%", "borderBottomColor": "#858585", "color": "#717171" },
						"isNumber": true
					},
					{
						"name": "Sponsored Brands",
						"key": "sbScore",
						"isSortable": true,
						"style": { "width": "8%", "borderBottomColor": "#858585", "color": "#717171" },
						"isNumber": true
					},
					{
						"name": "Search Volume",
						"key": "searchVolume",
						"isSortable": true,
						"style": { "width": "10%" },
						"isNumber": true
					}
				],
				"brandCompareHeader": [
					"Overall Score",
					"Organic",
					"Sponsered Products",
					"Sponsered Brands"
				]
			},
			"bestsellerDetails": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Keywords",
						"key": "keyword",
						"isSortable": true,
						"style": { "width": "25%" }
					},
					{
						"name": "Type",
						"key": "keywordType",
						"isSortable": true,
						"style": { "width": "14%" }
					},
					{
						"name": "Brands",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "18%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "6%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "9%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Sponsered Products",
						"key": "spScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Sponsered Brands",
						"key": "sbScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Search Volume",
						"key": "searchVolume",
						"isSortable": true,
						"style": { "width": "9%" }
					}
				]
			}
		},
		"content": {
			"summaryChart": {
				"enable": true
			},
			"catalogHealth": {
				"enable": true
			},
			"bestSeller": {
				"enable": true
			},
			"attributes": {
				"enable": true
			},
			"brandsTable": {
				"enable": true
			},
			"catalogHealthDetails": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Name",
						"key": "productName",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "28.16%" }
					},
					{
						"name": "Category",
						"key": "subCategory",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "10.94%" }
					},
					{
						"name": "Score",
						"key": "score",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "5.2%" }
					},
					{
						"name": "Title",
						"key": "title",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.93%" }
					},
					{
						"name": "Image",
						"colSpan": 2,
						"subHeader": [
							{
								"name": "Pri.",
								"key": "primaryImage",
								"isSortable": true,
								"style": { "width": "6.7%", "paddingLeft": "2%" }
							},
							{
								"name": "Sec.",
								"key": "secondaryImage",
								"isSortable": true,
								"style": { "width": "5.8%" }
							}
						],
						"style": { "width": "12.35%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Ratings",
						"key": "ratings",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.93%" }
					},
					{
						"name": "Reviews",
						"key": "reviews",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.71%" }
					},
					{
						"name": "Features & Benefits",
						"key": "featuresBullets",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "7.58%" }
					},
					{
						"name": "Amazon Pref Tags",
						"key": "amznPrefTags",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.93%" }
					},
					{
						"name": "Product Desc",
						"key": "productDesc",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.71%" }
					}

				]
			}
		},
		"availability": {
			"summaryChart": {
				"enable": true
			},
			"catalogHealth": {
				"enable": true
			},
			"lostBuyBox": {
				"enable": true
			},
			"bestSeller": {
				"enable": true
			},
			"brandsTable": {
				"enable": true
			},
			"catalogHealthDetails": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Product",
						"key": "productName",
						"isSortable": true,
						"style": { "width": "38%" }
					},
					{
						"name": "Category",
						"key": "subCategory",
						"isSortable": true,
						"style": { "width": "14%" }
					},
					{
						"name": "Score",
						"key": "score",
						"isSortable": true,
						"style": { "width": "10%" }
					},
					{
						"name": "Assortment Index",
						"key": "assortmentIndex",
						"isSortable": true,
						"style": { "width": "14%" }
					},
					{
						"name": "In-Stock Rate",
						"key": "instockRate",
						"isSortable": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Buy Box Win",
						"key": "buyBoxWin",
						"isSortable": true,
						"style": { "width": "12%" }
					}
				]
			}
		},
		"price-and-promotion": {
			"summaryChart": {
				"enable": true
			},
			"bestSeller": {
				"enable": true
			},
			"promotionCountAndType": {
				"enable": true,
				"radarChart": true
			},
			"brandTable": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Name",
						"key": "brandName",
						"isSortable": true,
						"style": { "width": "15%" }
					},
					{
						"name": "Average Discount",
						"key": "averageDiscount",
						"isSortable": true,
						"style": { "width": "13%" }
					},
					{
						"name": "Pricing Score",
						"key": "priceScore",
						"isSortable": true,
						"style": { "width": "36%" }
					},
					{
						"name": "Promotion Score",
						"key": "promotionScore",
						"isSortable": true,
						"style": { "width": "36%" }
					}
				]
			},
			"promotionCount": {
				"enable": true
			}
		},
		"sales": {
			"summaryChart": {
				"enable": true
			},
			"brandTable": {
				"enable": true
			}
		}
	},
	"us-instacart": {
		"summary": {
			"summaryChart": {
				"enable": true
			},
			"attributeScore": {
				"enable": true
			}
		},
		"bysearch": {
			"summaryChart": {
				"enable": true
			},
			"bestSeller": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Brand",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "20%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Paid",
						"key": "paidScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"key": "empty",
						"style": { "width": "44%" }
					}
				]
			},
			"keywordsTable": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Keywords",
						"key": "keyword",
						"isSortable": true,
						"isCheckboxRequired": true,
						"style": { "width": "28%" }
					},
					{
						"name": "Type",
						"key": "keywordType",
						"isSortable": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Brands",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "14%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" },
						"isNumber": true
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"style": { "width": "8%", "borderBottomColor": "#858585" },
						"isNumber": true
					},
					{
						"name": "Paid",
						"key": "spScore",
						"isSortable": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" },
						"isNumber": true
					},
					{
						"name": "Search Volume",
						"key": "searchVolume",
						"isSortable": true,
						"style": { "width": "10%" }
					}
				],
				"brandCompareHeader": [
					"Overall Score",
					"Organic",
					"Paid"
				]
			},
			"bestsellerDetails": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Keywords",
						"key": "keyword",
						"isSortable": true,
						"style": { "width": "25%" }
					},
					{
						"name": "Type",
						"key": "keywordType",
						"isSortable": true,
						"style": { "width": "15%" }
					},
					{
						"name": "Brands",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "20%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Paid",
						"key": "spScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Search Volume",
						"key": "searchVolume",
						"isSortable": true,
						"style": { "width": "10%" }
					}
				]
			}
		},
		"content": {
			"summaryChart": {
				"enable": true
			},
			"catalogHealth": {
				"enable": true
			},
			"bestSeller": {
				"enable": true
			},
			"attributes": {
				"enable": true
			},
			"brandsTable": {
				"enable": true
			},
			"catalogHealthDetails": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Name",
						"key": "productName",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "28.16%" }
					},
					{
						"name": "Category",
						"key": "subCategory",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "10.94%" }
					},
					{
						"name": "Score",
						"key": "score",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "5.2%" }
					},
					{
						"name": "Title",
						"key": "title",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.93%" }
					},
					{
						"name": "Image",
						"colSpan": 2,
						"subHeader": [
							{
								"name": "Pri.",
								"key": "primaryImage",
								"isSortable": true,
								"style": { "width": "6.7%", "paddingLeft": "2%" }
							},
							{
								"name": "Sec.",
								"key": "secondaryImage",
								"isSortable": true,
								"style": { "width": "5.8%" }
							}
						],
						"style": { "width": "12.35%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Product Desc",
						"key": "productDesc",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.71%" }
					}

				]
			}
		},
		"availability": {
			"summaryChart": {
				"enable": true
			},
			"catalogHealth": {
				"enable": false
			},
			"lostBuyBox": {
				"enable": false
			},
			"bestSeller": {
				"enable": true
			},
			"brandsTable": {
				"enable": true
			},
			"catalogHealthDetails": {
				"enable": false
			}
		},
		"price-and-promotion": {
			"summaryChart": {
				"enable": true
			},
			"bestSeller": {
				"enable": true
			},
			"promotionCountAndType": {
				"enable": true,
				"radarChart": false
			},
			"brandTable": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Name",
						"key": "brandName",
						"isSortable": true,
						"style": { "width": "15%" }
					},
					{
						"name": "Pricing Score",
						"key": "priceScore",
						"isSortable": true,
						"style": { "width": "36%" }
					},
					{
						"name": "Promotion Score",
						"key": "promotionScore",
						"isSortable": true,
						"style": { "width": "36%" }
					}
				]
			},
			"promotionCount": {
				"enable": true
			}
		},
		"sales": {
			"summaryChart": {
				"enable": true
			},
			"brandTable": {
				"enable": true
			}
		}
	},
	"us-target": {
		"summary": {
			"summaryChart": {
				"enable": true
			},
			"attributeScore": {
				"enable": true
			}
		},
		"bysearch": {
			"summaryChart": {
				"enable": true
			},
			"bestSeller": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Brand",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "20%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Paid",
						"key": "paidScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "12%" }
					},
					{
						"key": "empty",
						"style": { "width": "44%" }
					}
				]
			},
			"keywordsTable": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Keywords",
						"key": "keyword",
						"isSortable": true,
						"isCheckboxRequired": true,
						"style": { "width": "28%" }
					},
					{
						"name": "Type",
						"key": "keywordType",
						"isSortable": true,
						"style": { "width": "12%" }
					},
					{
						"name": "Brands",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "14%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" },
						"isNumber": true
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"style": { "width": "8%", "borderBottomColor": "#858585", "color": "#717171" },
						"isNumber": true
					},
					{
						"name": "Sponsored Products",
						"key": "spScore",
						"isSortable": true,
						"style": { "width": "10%", "borderBottomColor": "#858585", "color": "#717171" },
						"isNumber": true
					},
					{
						"name": "Sponsored Brands",
						"key": "sbScore",
						"isSortable": true,
						"style": { "width": "8%", "borderBottomColor": "#858585", "color": "#717171" },
						"isNumber": true
					},
					{
						"name": "Search Volume",
						"key": "searchVolume",
						"isSortable": true,
						"style": { "width": "10%" },
						"isNumber": true
					}
				],
				"brandCompareHeader": [
					"Overall Score",
					"Organic",
					"Sponsered Products",
					"Sponsered Brands"
				]
			},
			"bestsellerDetails": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Keywords",
						"key": "keyword",
						"isSortable": true,
						"style": { "width": "25%" }
					},
					{
						"name": "Type",
						"key": "keywordType",
						"isSortable": true,
						"style": { "width": "14%" }
					},
					{
						"name": "Brands",
						"key": "brand",
						"isSortable": true,
						"style": { "width": "18%" }
					},
					{
						"name": "Overall Score",
						"key": "overallScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "6%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Organic",
						"key": "organicScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "9%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Sponsered Products",
						"key": "spScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Sponsered Brands",
						"key": "sbScore",
						"isSortable": true,
						"isNumber": true,
						"style": { "width": "10%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Search Volume",
						"key": "searchVolume",
						"isSortable": true,
						"style": { "width": "9%" }
					}
				]
			}
		},
		"content": {
			"summaryChart": {
				"enable": true
			},
			"catalogHealth": {
				"enable": true
			},
			"bestSeller": {
				"enable": true
			},
			"attributes": {
				"enable": true
			},
			"brandsTable": {
				"enable": true
			},
			"catalogHealthDetails": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Name",
						"key": "productName",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "28.16%" }
					},
					{
						"name": "Category",
						"key": "subCategory",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "10.94%" }
					},
					{
						"name": "Score",
						"key": "score",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "5.2%" }
					},
					{
						"name": "Title",
						"key": "title",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.93%" }
					},
					{
						"name": "Image",
						"colSpan": 2,
						"subHeader": [
							{
								"name": "Pri.",
								"key": "primaryImage",
								"isSortable": true,
								"style": { "width": "6.7%", "paddingLeft": "2%" }
							},
							{
								"name": "Sec.",
								"key": "secondaryImage",
								"isSortable": true,
								"style": { "width": "5.8%" }
							}
						],
						"style": { "width": "12.35%", "borderBottomColor": "#858585" }
					},
					{
						"name": "Ratings",
						"key": "ratings",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.93%" }
					},
					{
						"name": "Reviews",
						"key": "reviews",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.71%" }
					},
					{
						"name": "Features & Benefits",
						"key": "featuresBullets",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "7.58%" }
					},
					{
						"name": "Product Desc",
						"key": "productDesc",
						"isSortable": true,
						"rowSpan": 2,
						"style": { "width": "6.71%" }
					}

				]
			}
		},
		"availability": {
			"summaryChart": {
				"enable": true
			},
			"catalogHealth": {
				"enable": true
			},
			"lostBuyBox": {
				"enable": false
			},
			"bestSeller": {
				"enable": true
			},
			"brandsTable": {
				"enable": true
			},
			"catalogHealthDetails": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Product",
						"key": "productName",
						"isSortable": true,
						"style": { "width": "50%" }
					},
					{
						"name": "Category",
						"key": "subCategory",
						"isSortable": true,
						"style": { "width": "20%" }
					},
					{
						"name": "Score",
						"key": "score",
						"isSortable": true,
						"style": { "width": "15%" }
					},
					{
						"name": "In-Stock Rate",
						"key": "instockRate",
						"isSortable": true,
						"style": { "width": "15%" }
					}
				]
			}
		},
		"price-and-promotion": {
			"summaryChart": {
				"enable": true
			},
			"bestSeller": {
				"enable": true
			},
			"promotionCountAndType": {
				"enable": true,
				"radarChart": false
			},
			"brandTable": {
				"enable": true,
				"tableHeader": [
					{
						"name": "Name",
						"key": "brandName",
						"isSortable": true,
						"style": { "width": "15%" }
					},
					{
						"name": "Average Discount",
						"key": "averageDiscount",
						"isSortable": true,
						"style": { "width": "13%" }
					},
					{
						"name": "Pricing Score",
						"key": "priceScore",
						"isSortable": true,
						"style": { "width": "36%" }
					},
					{
						"name": "Promotion Score",
						"key": "promotionScore",
						"isSortable": true,
						"style": { "width": "36%" }
					}
				]
			},
			"promotionCount": {
				"enable": true
			}
		},
		"sales": {
			"summaryChart": {
				"enable": true
			},
			"brandTable": {
				"enable": true
			}
		}
	}
};

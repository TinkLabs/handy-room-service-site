export function roundToDecimal(price, decimal_places = 2) {
	const num = 10 ** decimal_places;
	if (!num) {
		return Math.round(parseFloat(price));
	}
	return (Math.round((parseFloat(price)) * num) / num);
}
export function calculateTax(
	basePrice,
	serviceChargeFlat,
	serviceChargePercentage,
	taxCharge,
	serviceTaxChargeCalculation,
	currency_decimal_places,
) {
	const amount = parseFloat(basePrice);
	let serviceChargeAmount = 0;
	let taxChargeAmount = 0;

	if (serviceChargePercentage) {
		serviceChargeAmount += amount * (serviceChargePercentage / 100);
	}

	if (taxCharge) {
		switch (serviceTaxChargeCalculation) {
			case 1:
				// Both tax and service charge will be applied to the item price only
				taxChargeAmount += amount * (taxCharge / 100);
				break;
			default:
				// Tax will be applied to the item price with service charge applied
				taxChargeAmount += (amount + serviceChargeAmount) * (taxCharge / 100);
		}
	}

	if (serviceChargeFlat) {
		serviceChargeAmount += serviceChargeFlat;
	}

	return {
		tax: roundToDecimal(taxChargeAmount, currency_decimal_places),
		serviceCharge: roundToDecimal(serviceChargeAmount, currency_decimal_places),
	};
}
export function priceDisplay(currency_symbol = '$', price, decimal_places = 2) {
	return `${currency_symbol}${roundToDecimal(price, decimal_places).toFixed(decimal_places)}`;
}

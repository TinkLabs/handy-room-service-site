export function calculateTax(
	basePrice,
	serviceChargeFlat,
	serviceChargePercentage,
	taxCharge,
	serviceTaxChargeCalculation,
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
		tax: Math.round((taxChargeAmount) * 100) / 100,
		serviceCharge: Math.round((serviceChargeAmount) * 100) / 100,
	};
}
export function roundTo2Decimal(price) {
	return (Math.round((parseFloat(price)) * 100) / 100);
}
export function priceDisplay(currency_symbol = '$', price) {
	return `${currency_symbol}${roundTo2Decimal(price).toFixed(2)}`;
}

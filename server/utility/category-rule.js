export function ruleCategory(watt, wattPerKg, gender, type) {
	if (type === 'tour') {
		if (
			gender === 'женский' &&
			(wattPerKg * 0.9 > 3.7 || wattPerKg * 0.9 === 3.7) &&
			(watt * 0.9 > 250 || watt * 0.9 === 250)
		)
			return 'WA';
		if (gender === 'женский') return 'WB';
		if (
			(watt * 0.9 > 250 || watt * 0.9 === 250) &&
			(wattPerKg * 0.9 > 4 || wattPerKg * 0.9 === 4)
		)
			return 'A';
		return 'B';
	}

	if (gender === 'женский' && wattPerKg >= 3) return 'WA';
	if (gender === 'женский' && wattPerKg < 3) return 'WB';
	if (watt * 0.95 >= 250 && wattPerKg * 0.95 >= 4) return 'A';
	if (watt * 0.95 >= 200 && wattPerKg * 0.95 >= 3.2) return 'B';
	return 'C';
}

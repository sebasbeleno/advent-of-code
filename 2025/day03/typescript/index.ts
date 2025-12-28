import { readFile } from "../../../utils/bun.ts";

const banks = await readFile("../input.txt");
const highestBatteryValues: number[] = [];

for (const bank of banks) {
	const batteries = bank.split("").map(String);

	let highestBatteryValue = 0;
	let left = 0;
	let maxBankConcatenationSum = 0;

	while (left < batteries.length) {
		let right = left + 1;

		while (right < batteries.length) {
			const bankConcatenationSum = parseInt((batteries[left] + batteries[right]), 10);
			maxBankConcatenationSum = Math.max(maxBankConcatenationSum, bankConcatenationSum);

			right += 1;
		}
		highestBatteryValue = Math.max(highestBatteryValue, maxBankConcatenationSum);
		left += 1;
	}

	highestBatteryValues.push(highestBatteryValue);
}

console.log(`Highest battery values per bank: ${highestBatteryValues}`);
console.log(`Highest bank sum: ${highestBatteryValues.reduce((a, b) => a + b, 0)}`);
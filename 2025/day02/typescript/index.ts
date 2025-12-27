import { readFile } from "../../../utils/bun.ts";

const [line] = await readFile("../input.txt");
const idRangeList = line.split(",");
let sumOfInvalidIDs: number = 0;

/**
 * Check if the ID is made of at exactly two identical halves.
 * For example, "1212" is invalid (12 and 12), but "123123" is valid (123 and 123),
 * and "1234" is valid (12 and 34).
 */
const checkInvalidId = (id: string): boolean => {
	const n = id.length;

	if (n % 2 !== 0) {
		return false;
	}

	const half = n / 2;
	const firstHalf = id.slice(0, half);
	const secondHalf = id.slice(half);

	return firstHalf === secondHalf;
}

for (const idRange of idRangeList) {
	const [start, end] = idRange.split("-").map(Number);

	for (let id = start; id <= end; id++) {
		const isInvalidId = checkInvalidId(id.toString());

		if (isInvalidId) {
			sumOfInvalidIDs += id;
		}

	}
}


console.log(`Sum of invalid IDs: ${sumOfInvalidIDs}`);

import { readFile } from "../../../utils/bun.ts";

const [line] = await readFile("../input.txt");
const idRangeList = line.split(",");
let sumOfInvalidIDs: number = 0;


/**
 * Since we want to check if made of at least two identical halves,
 * we can use the trick of checking if the string appears in (str + str).slice(1, -1)
 * This works because if the string is made of two identical halves, it will appear
 * in the middle of the doubled string when we remove the first and last characters.
 */
const checkInvalidId = (id: string): boolean => {
	return (id + id).slice(1, -1).includes(id);
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

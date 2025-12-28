import { readFile } from "../../../utils/bun.ts";

const file = await readFile("../input.txt");

let currentPosition = 50;
const MAX_POSITION = 99;
const MIN_POSITION = 0;
let timerAtZero = 0;

for (const step of file) {
	const direction = step.charAt(0);
	const distance = parseInt(step.slice(1), 10);

	for (let move = 0; move < distance; move++) {
		if (direction === "L") {
			currentPosition -= 1;
		} else if (direction === "R") {
			currentPosition += 1;
		}

		if (currentPosition > MAX_POSITION) {
			currentPosition = MIN_POSITION;
		} else if (currentPosition < MIN_POSITION) {
			currentPosition = MAX_POSITION;
		}

		if (currentPosition === 0) {
			timerAtZero += 1;
		}
	}
}

console.log("Final Position:", currentPosition);
console.log("Timer at Zero Count:", timerAtZero);
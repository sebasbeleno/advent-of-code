import { readFile } from "../../../utils/bun.ts";

const file = await readFile("../input.txt");

let currentPosition = 50;
const MAX_POSITION = 99;
const MIN_POSITION = 0;
let timerAtZero = 0;

for (const step of file) {
	const direction = step.charAt(0);
	const distance = parseInt(step.slice(1), 10);
	let safeDistance = distance;

	if (distance > MAX_POSITION) {
		safeDistance = distance % (MAX_POSITION + 1);
	}

	if (direction === "L") {
		currentPosition -= safeDistance;
		if (currentPosition < MIN_POSITION) {
			currentPosition = MAX_POSITION + 1 + currentPosition; // wrap around
		}
	} else if (direction === "R") {
		currentPosition += safeDistance;
		if (currentPosition > MAX_POSITION) {
			currentPosition = currentPosition - (MAX_POSITION + 1); // wrap around
		}
	}

	if (currentPosition === 0) {
		timerAtZero += 1;
	}

	console.log(`Step: ${step}, Current Position: ${currentPosition}, Timer at Zero: ${timerAtZero}`);
}

console.log("Final Position:", currentPosition);
console.log("Timer at Zero Count:", timerAtZero);
export async function readFile(filePath: string): Promise<string[]> {
	const file = Bun.file(filePath);
	const text = await file.text();
	const lines = text.split("\n");

	// Remove empty last line if file ends with newline
	if (lines[lines.length - 1] === "") {
		lines.pop();
	}

	return lines;
}

export function replaceCharAt(str: string, index: number, replacement: string) {
	return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

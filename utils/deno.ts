export async function readFile(filePath:string): Promise<string[]> {
    const fileReader = await Deno.open(filePath);
    const lines: string[] = [];
    const decoder = new TextDecoder("utf-8");
    const buffer = new Uint8Array(1024);
    let remaining = "";

    try {
        while (true) {
            const bytesRead = await fileReader.read(buffer);
            if (bytesRead === null) {
                break;
            }

            const chunk = decoder.decode(buffer.subarray(0, bytesRead));
            const combined = remaining + chunk;

            const parts = combined.split("\n");

            remaining = parts.pop() || "";
            lines.push(...parts);
        }

        if (remaining) {
            lines.push(remaining);
        }
    } finally {
        fileReader.close();
    }


    return lines
}
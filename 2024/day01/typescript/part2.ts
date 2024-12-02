import { readFile } from "../../../utils/deno.ts";

export async function getList(): Promise<{
  leftList: number[];
  rightList: number[];
}> {
  const leftList: number[] = [];
  const rightList: number[] = [];
  const file = await readFile("../input.txt");

  file.forEach((line) => {
    const [left, right] = line.split(/\s+/);

    leftList.push(Number(left));
    rightList.push(Number(right));
  });

  return { leftList, rightList };
}

const { leftList, rightList } = await getList();

const rightMap = new Map()

for (let i = 0; i < rightList.length; i++) {
    const right = rightList[i];

    rightMap.set(right, rightMap.get(right) + 1 || 1);
}

let similarityScore = 0;

for (let i = 0; i < leftList.length; i++) {
    const left = leftList[i];
    const rightOccurences = rightMap.get(left);

    if (!rightOccurences) {
        continue;
    }

    const score = left * rightOccurences

    similarityScore += score;
}

console.log("Similarity score: ", similarityScore);
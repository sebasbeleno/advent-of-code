import { readFile } from "../../../utils/bun.ts";

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

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

const distance = leftList.map((left, index) => {
    return Math.abs(left - rightList[index]);
})

const sum = distance.reduce((acc, current) => acc + current, 0);

console.log("Total distance: ", sum);
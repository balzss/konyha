export default function getUniqueName(targetName: string, collidingNames: string[]): string {
  if (!collidingNames.length || !collidingNames.includes(targetName)) {
    return targetName;
  } else if (collidingNames.length === 1) {
    return `${targetName} (1)`;
  }

  // finding indexed duplicates
  const nameIndexes = collidingNames
    .map((r: string) => {
      // the exact match shouldn't be included
      if (r === targetName) return -1;

      // escaping special characters in the targe name
      const regexString = targetName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // matching the indexed duplicates: `Target Name (<index>)`
      const match = r.match(new RegExp(`${regexString} \\((?<n>\\d+)\\)\$`));
      return Number(match?.groups?.n) || -1;
    })
    .filter((r: number) => {
      return r > 0;
    })
    .sort((a: number, b: number) => a - b);

  // if there are no indexed duplicates
  if (!nameIndexes.length) {
    return `${targetName} (1)`;
  }

  // calculating the next appropriate index
  const nextIndex =
    (nameIndexes.find((n: number, i: number) => nameIndexes[i + 1] - n > 1) || Math.max(...nameIndexes)) + 1;
  return `${targetName} (${nextIndex})`;
}

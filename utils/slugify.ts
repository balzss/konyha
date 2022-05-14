export default function slugify(input: string): string {
  return input
    ?.trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export default function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

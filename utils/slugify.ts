export default function slugify(input: string): string {
  return input
    ?.trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

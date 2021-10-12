export const normalizeName = (name: string): string =>
  name
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/-/g, ' ')
    .replace(/[^\w\s]/gi, '')
    .split(' ')
    .filter((c) => Boolean(c) && c !== '')
    .join('-')
    .toLocaleLowerCase();

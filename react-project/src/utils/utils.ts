export function getImage(url: string) {
  const index = url.split('/')[5];
  return `https://starwars-visualguide.com/assets/img/characters/${index}.jpg`;
}

export function formatDate(date: Date) {
  const formatDate = new Date(date);
  const year = formatDate.getFullYear();
  const month = formatDate.getMonth();
  const day = formatDate.getDate();

  return `${day}/${month}/${year}`;
}

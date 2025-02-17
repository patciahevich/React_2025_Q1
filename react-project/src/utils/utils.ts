import { IPeople } from 'swapi-ts/src/SWApi';

export function getImage(url: string) {
  const index = url.split('/')[5];
  return `https://starwars-visualguide.com/assets/img/characters/${index}.jpg`;
}

export function convertToCSV(data: IPeople[]) {
  const header = [
    'Name',
    'Height',
    'Mass',
    'Hair_color',
    'Skin_color',
    'Eye_color',
    'Birth_year',
    'gender',
  ];

  const rows = data.map((item) => [
    item.name,
    item.height,
    item.mass,
    item.hair_color,
    item.skin_color,
    item.eye_color,
    item.birth_year,
    item.gender,
  ]);

  const csvContent = [
    header.join(', '),
    ...rows.map((row) => row.join(', ')),
  ].join('\n');

  return csvContent;
}

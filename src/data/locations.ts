export interface City {
  slug: string;
  name: string;
  zip?: string;
}

export interface County {
  slug: string;
  name: string;
  state: 'CA';
  intro: string;
  cities: City[];
}

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const c = (name: string, zip?: string): City => ({
  slug: slugify(name),
  name,
  ...(zip ? { zip } : {}),
});

export const COUNTIES: County[] = [
  {
    slug: 'los-angeles-county',
    name: 'Los Angeles County',
    state: 'CA',
    intro:
      'Los Angeles County is our largest service territory. From Malibu to Pasadena and the South Bay to the San Fernando Valley, we run same-day Samsung refrigerator repair calls across the entire metro.',
    cities: [
      c('Los Angeles'),
      c('Long Beach'),
      c('Glendale'),
      c('Santa Monica'),
      c('Burbank'),
      c('Pasadena'),
      c('Torrance'),
      c('Beverly Hills'),
      c('West Hollywood'),
      c('Sherman Oaks'),
      c('Woodland Hills'),
      c('Calabasas'),
      c('Malibu'),
      c('Santa Clarita'),
    ],
  },
  {
    slug: 'orange-county',
    name: 'Orange County',
    state: 'CA',
    intro:
      'Orange County coverage runs from the coast at Newport and Laguna inland to Anaheim, Irvine, and the Mission Viejo / Yorba Linda foothills. Most calls receive same-day service.',
    cities: [
      c('Anaheim'),
      c('Irvine'),
      c('Santa Ana'),
      c('Huntington Beach'),
      c('Newport Beach'),
      c('Costa Mesa'),
      c('Laguna Beach'),
      c('Mission Viejo'),
      c('Fullerton'),
      c('Garden Grove'),
      c('Yorba Linda'),
    ],
  },
  {
    slug: 'riverside-county',
    name: 'Riverside County',
    state: 'CA',
    intro:
      'Riverside County coverage spans the I-15 and I-215 corridors — Corona and Eastvale on the west side through Moreno Valley and Hemet, down to Temecula and Murrieta in the south.',
    cities: [
      c('Riverside'),
      c('Corona'),
      c('Moreno Valley'),
      c('Temecula'),
      c('Murrieta'),
      c('Eastvale'),
      c('Jurupa Valley'),
      c('Menifee'),
      c('Hemet'),
      c('Lake Elsinore'),
      c('Norco'),
    ],
  },
  {
    slug: 'san-bernardino-county',
    name: 'San Bernardino County',
    state: 'CA',
    intro:
      'San Bernardino County service covers the Inland Empire from Ontario and Chino on the west, through Rancho Cucamonga and Fontana, into Redlands, Yucaipa, and the city of San Bernardino itself.',
    cities: [
      c('San Bernardino'),
      c('Fontana'),
      c('Rancho Cucamonga'),
      c('Ontario'),
      c('Chino'),
      c('Chino Hills'),
      c('Upland'),
      c('Redlands'),
      c('Rialto'),
      c('Colton'),
      c('Yucaipa'),
      c('Loma Linda'),
    ],
  },
  {
    slug: 'ventura-county',
    name: 'Ventura County',
    state: 'CA',
    intro:
      'Ventura County coverage runs from Thousand Oaks and Simi Valley along the 101 corridor through Camarillo and Oxnard, out to Ventura and up into Ojai.',
    cities: [
      c('Ventura'),
      c('Oxnard'),
      c('Thousand Oaks'),
      c('Simi Valley'),
      c('Camarillo'),
      c('Moorpark'),
      c('Ojai'),
    ],
  },
];

export const findCounty = (slug: string): County | undefined =>
  COUNTIES.find((cty) => cty.slug === slug);

export const findCity = (
  countySlug: string,
  citySlug: string
): { county: County; city: City } | undefined => {
  const county = findCounty(countySlug);
  if (!county) return undefined;
  const city = county.cities.find((ct) => ct.slug === citySlug);
  if (!city) return undefined;
  return { county, city };
};

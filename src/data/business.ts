export interface Business {
  name: string;
  legalName: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  hoursDisplay: string;
  hoursMachine: { dayOfWeek: string[]; opens: string; closes: string };
  bookingNote: string;
  founded: string;
  serviceType: string;
  brand: string;
  areasServed: string[];
  siteUrl: string;
  priceRange: string;
  socials: { name: string; url: string }[];
}

export const BUSINESS: Business = {
  name: 'Samsung Refrigerator Repair',
  legalName: 'Samsung Refrigerator Repair',
  phoneDisplay: '424-407-1019',
  phoneTel: 'tel:+14244071019',
  email: 'info@samsungrefrigerator.repair',
  hoursDisplay: 'Mon–Sun 8:00 AM – 8:00 PM (booking 24/7)',
  hoursMachine: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '20:00',
  },
  bookingNote: 'Online booking available 24/7',
  founded: '2010',
  serviceType: 'Mobile / on-site Samsung refrigerator repair',
  brand: 'Samsung',
  areasServed: [
    'Los Angeles County',
    'Orange County',
    'Riverside County',
    'San Bernardino County',
    'Ventura County',
  ],
  siteUrl: 'https://samsungrefrigerator.repair',
  priceRange: '$$',
  socials: [],
};

export interface Model {
  slug: string;
  title: string;
  description: string;
  commonIssues: string[];
}

export const MODELS: Model[] = [
  {
    slug: 'family-hub',
    title: 'Samsung Family Hub Refrigerator Repair',
    description:
      'Samsung Family Hub refrigerators add a touchscreen and internal cameras on top of the standard French Door platform. Repairs span the cooling system, the ice maker, and the smart panel itself — all of which can fail independently.',
    commonIssues: [
      'Touchscreen frozen, blank, or unresponsive',
      'Wi-Fi or app pairing failures',
      'Internal cameras not loading in the app',
      'Ice maker freeze-ups (shared with all French Door models)',
      'Cooling fan or compressor failures',
    ],
  },
  {
    slug: 'bespoke',
    title: 'Samsung Bespoke Refrigerator Repair',
    description:
      'The Samsung Bespoke line uses modular, color-swappable door panels with the underlying French Door or 4-Door cooling platform. Most repair calls involve cooling, ice, or panel-mount sensors specific to the Bespoke chassis.',
    commonIssues: [
      'Door alignment shifting, breaking the panel seal',
      'Custom panel sensors triggering false door-open alarms',
      'Ice maker freeze-ups',
      'Compressor or evaporator fan failures',
      'Display flicker on the AutoFill water pitcher models',
    ],
  },
  {
    slug: 'french-door-4-door-flex',
    title: 'Samsung French Door & 4-Door FlexZone Repair',
    description:
      'Samsung French Door and 4-Door FlexZone refrigerators are the most common platform we service. The convertible FlexZone drawer adds a fifth temperature zone and its own dedicated control circuitry.',
    commonIssues: [
      'FlexZone drawer not holding its set temperature',
      'Ice maker freezing up in the fridge-section ice room',
      'Defrost system faults causing fridge-side warming',
      'Water leaks from the dispenser line',
      'Door-in-door switch failures',
    ],
  },
  {
    slug: 'side-by-side',
    title: 'Samsung Side-by-Side Refrigerator Repair',
    description:
      'Samsung side-by-side refrigerators put the freezer on the left and fridge on the right, with the ice maker mounted in the freezer door. Repairs lean toward dispenser, auger, and door-mounted components.',
    commonIssues: [
      'Auger motor jammed by an ice clump',
      'Water dispenser drips after each use',
      'Freezer door not closing flush, causing frost buildup',
      'Defrost timer or heater failure',
      'Compressor noise from worn mounts',
    ],
  },
  {
    slug: 'top-freezer',
    title: 'Samsung Top-Freezer Refrigerator Repair',
    description:
      'Samsung top-freezer refrigerators are the simplest platform — no ice maker on most models, fewer electronic controls. Most repair calls involve the defrost system or the basic cooling components.',
    commonIssues: [
      'Frost buildup on the rear freezer wall',
      'Defrost heater or thermostat failure',
      'Door gasket no longer sealing',
      'Compressor relay failure',
      'Thermostat knob no longer changing temperature',
    ],
  },
];

export interface Service {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  shortDescription: string;
  symptoms: string[];
  commonCauses: string[];
  relatedErrorCodes: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'not-cooling',
    title: 'Samsung Refrigerator Not Cooling Repair',
    h1: 'Samsung Refrigerator Not Cooling? Same-Day Repair',
    metaDescription:
      'Fast Samsung refrigerator not cooling repair across Southern California. Same-day service for fridges that are warm, lukewarm, or losing temperature. Call 424-407-1019.',
    shortDescription:
      'Diagnosis and repair when your Samsung fridge stops holding temperature, runs warm, or only the freezer cools.',
    symptoms: [
      'Fridge section is warm but freezer is cold',
      'Both compartments are warm',
      'Food spoiling faster than usual',
      'Inside temperature display reads higher than the set point',
      'Compressor running constantly without cooling',
    ],
    commonCauses: [
      'Failed evaporator fan motor in the freezer',
      'Frosted-over evaporator coil from a defrost-system fault',
      'Sealed-system leak (refrigerant)',
      'Faulty main control board (PCB)',
      'Damper assembly stuck closed between freezer and fridge',
    ],
    relatedErrorCodes: ['5E', '21E', '22E', '84C'],
  },
  {
    slug: 'ice-maker-repair',
    title: 'Samsung Ice Maker Repair',
    h1: 'Samsung Ice Maker Repair: Stop the Leaks, Freeze-Ups, and No-Ice Days',
    metaDescription:
      'Samsung ice maker repair for French Door, Family Hub, and side-by-side models. Fix freeze-ups, no ice, leaks, and ice maker errors. Call 424-407-1019.',
    shortDescription:
      'Specialized repair for the troublesome Samsung French Door ice maker — freeze-ups, no ice production, leaks, and ice maker error codes.',
    symptoms: [
      'Ice maker producing no ice',
      'Ice cubes are small, hollow, or stuck together',
      'Ice maker compartment iced over',
      'Water leaking from ice maker into fridge',
      'Loud grinding from the ice maker auger',
    ],
    commonCauses: [
      'Failed ice maker fill sensor',
      'Frosted-over ice maker due to a damaged duct seal',
      'Auger motor failure',
      'Clogged or kinked water line',
      'Failed water inlet valve',
    ],
    relatedErrorCodes: ['1E', '8E'],
  },
  {
    slug: 'water-leak',
    title: 'Samsung Refrigerator Water Leak Repair',
    h1: 'Samsung Refrigerator Leaking Water? We Find the Source',
    metaDescription:
      'Stop water leaks under or inside your Samsung refrigerator. We diagnose drain blockages, dispenser leaks, and ice maker leaks. Call 424-407-1019.',
    shortDescription:
      'Water on the floor, ice in the freezer floor, or puddles in the produce drawers — we trace the leak to its source.',
    symptoms: [
      'Water pooling on the floor in front of or under the fridge',
      'Ice sheet building up on the freezer floor',
      'Water in the bottom of the produce drawers',
      'Drips from the water dispenser',
      'Damp insulation around the door',
    ],
    commonCauses: [
      'Frozen or clogged defrost drain tube',
      'Cracked water inlet valve',
      'Failed water filter housing or O-ring',
      'Damaged or punctured water line behind the unit',
      'Cracked drain pan',
    ],
    relatedErrorCodes: [],
  },
  {
    slug: 'freezer-not-freezing',
    title: 'Samsung Freezer Not Freezing Repair',
    h1: 'Samsung Freezer Not Freezing? Diagnosis and Repair',
    metaDescription:
      'Fix Samsung freezers that are too warm, soft-freeze food, or have ice cream melting. Same-day Samsung freezer repair. Call 424-407-1019.',
    shortDescription:
      'Repair for Samsung freezers that no longer hold zero degrees — soft ice cream, frost-free food, or rising freezer temperature.',
    symptoms: [
      'Ice cream is soft or melting',
      'Frozen food is partially thawed',
      'Frost building up on packaging',
      'Freezer temperature display rising',
      'Compressor running but no cold air in the freezer',
    ],
    commonCauses: [
      'Failed evaporator fan motor',
      'Defrost heater or thermistor failure',
      'Iced-over evaporator coil',
      'Sealed-system leak',
      'Door gasket no longer sealing',
    ],
    relatedErrorCodes: ['21E', '5E'],
  },
  {
    slug: 'compressor-repair',
    title: 'Samsung Refrigerator Compressor Repair',
    h1: 'Samsung Linear & Inverter Compressor Repair',
    metaDescription:
      'Samsung compressor repair and replacement, including linear and digital inverter compressors. Diagnosis, parts, and labor. Call 424-407-1019.',
    shortDescription:
      'Diagnose compressor start failures, noisy compressors, and dead compressors on Samsung refrigerators — including digital inverter models.',
    symptoms: [
      'Compressor clicks on, then shuts off after a few seconds',
      'Loud humming or buzzing from the back of the fridge',
      'No cooling at all in either section',
      'Compressor is hot to the touch but not running',
      '84C error code or compressor start failure code',
    ],
    commonCauses: [
      'Failed compressor start relay or capacitor',
      'Inverter board failure (digital inverter models)',
      'Compressor motor windings open or shorted',
      'Refrigerant overcharge or undercharge',
      'Restricted condenser airflow causing thermal shutdown',
    ],
    relatedErrorCodes: ['84C'],
  },
  {
    slug: 'control-board-repair',
    title: 'Samsung Refrigerator Control Board Repair',
    h1: 'Samsung Refrigerator Control Board Repair & Replacement',
    metaDescription:
      'Samsung main PCB and display board repair. Fix communication errors, dead displays, and erratic temperature behavior. Call 424-407-1019.',
    shortDescription:
      'Replace failed main control boards (PCBs) and display boards causing communication errors, dead panels, and erratic behavior.',
    symptoms: [
      'Display panel is dead or showing garbled characters',
      'Communication error codes (41C, PC ER)',
      'Temperature settings reset themselves',
      'Compressor or fan running on the wrong cycle',
      'Touch buttons unresponsive',
    ],
    commonCauses: [
      'Failed main PCB on the back of the unit',
      'Failed display board behind the front panel',
      'Damaged ribbon cable between display and main board',
      'Surge or voltage spike damage',
      'Moisture intrusion into the control board housing',
    ],
    relatedErrorCodes: ['41C', 'PC ER'],
  },
  {
    slug: 'door-seal-repair',
    title: 'Samsung Refrigerator Door Seal & Gasket Repair',
    h1: 'Samsung Refrigerator Door Seal Replacement',
    metaDescription:
      'Replace torn, warped, or moldy Samsung refrigerator door gaskets. Stop frost buildup and energy waste. Call 424-407-1019.',
    shortDescription:
      'Replace damaged door gaskets that cause frost buildup, condensation, and forced compressor cycling.',
    symptoms: [
      'Visible gap between door and cabinet when closed',
      'Frost or condensation around the door edge',
      'Door drifts open after being closed',
      'Mold or staining on the gasket itself',
      'Higher-than-normal compressor run time',
    ],
    commonCauses: [
      'Gasket torn at the corner from heavy door pulls',
      'Magnetic strip inside the gasket has weakened',
      'Door alignment shifted (hinges loose or worn)',
      'Cabinet flange warped from a previous frost event',
      'Adhesive failure on a press-fit gasket',
    ],
    relatedErrorCodes: [],
  },
  {
    slug: 'noisy-refrigerator',
    title: 'Samsung Refrigerator Noise Repair',
    h1: 'Samsung Refrigerator Making Noise? Find the Source',
    metaDescription:
      'Stop buzzing, knocking, clicking, and grinding noises from your Samsung refrigerator. Same-day diagnosis. Call 424-407-1019.',
    shortDescription:
      'Identify and silence the source of buzzing, clicking, grinding, or knocking from your Samsung refrigerator.',
    symptoms: [
      'Loud buzzing or humming from the back',
      'Clicking sound every few minutes',
      'Grinding or scraping from inside the freezer',
      'Knocking sound when the compressor cycles on',
      'High-pitched whining from a fan',
    ],
    commonCauses: [
      'Evaporator or condenser fan blade hitting an ice buildup',
      'Worn compressor mounting grommets',
      'Failing inverter board',
      'Loose drain pan vibrating against the cabinet',
      'Ice maker auger motor straining against frozen ice',
    ],
    relatedErrorCodes: [],
  },
  {
    slug: 'error-code-repair',
    title: 'Samsung Refrigerator Error Code Repair',
    h1: 'Samsung Refrigerator Error Code Diagnosis & Repair',
    metaDescription:
      'Samsung refrigerator error code diagnosis and repair: 1E, 5E, 8E, 21E, 22E, 41C, 84C, OF OF, PC ER. Call 424-407-1019.',
    shortDescription:
      'Decode the error code on your Samsung display panel and get the underlying fault repaired the same day.',
    symptoms: [
      'Numeric or alphanumeric error code on the display',
      'Display alternating between temperature and a code',
      'Beeping accompanied by a code',
      'Cooling impaired alongside an error code',
      'Code returns after a power-cycle reset',
    ],
    commonCauses: [
      'Failed sensor (thermistor) — most common cause of E-series codes',
      'Failed evaporator or fridge fan motor',
      'Communication failure between main board and display',
      'Compressor start failure (inverter or relay)',
      'Demo mode or cooling-off mode accidentally enabled',
    ],
    relatedErrorCodes: ['1E', '5E', '8E', '21E', '22E', '41C', '84C', 'OF OF', 'PC ER'],
  },
];

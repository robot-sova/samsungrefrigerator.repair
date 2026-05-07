export interface ErrorCode {
  code: string;
  slug: string;
  title: string;
  meaning: string;
  whatToTry: string[];
  whenToCallPro: string;
}

export const ERROR_CODES: ErrorCode[] = [
  {
    code: '1E',
    slug: '1e',
    title: 'Samsung 1E Error — Ice Maker Fill Sensor',
    meaning:
      'The 1E code indicates the ice maker fill sensor is reporting an open circuit or out-of-range reading. The control board cannot confirm whether the ice mold is full of water.',
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 5 minutes.',
      'Check the ice maker housing for a visible frost block on the sensor.',
      'Confirm the ice maker is fully seated in its mount.',
    ],
    whenToCallPro:
      'If the code returns within 24 hours of a reset, the fill sensor or its harness needs replacement — call for service.',
  },
  {
    code: '5E',
    slug: '5e',
    title: 'Samsung 5E Error — Fridge Defrost / Fridge Sensor',
    meaning:
      'A 5E code points to the fridge-section defrost sensor (thermistor) reading out of range. Without it, the control board cannot run a proper defrost cycle.',
    whatToTry: [
      'Power-cycle for 5 minutes and watch for the code to return.',
      'Empty the fridge and check the rear inner wall for excessive frost.',
      'Verify the fridge is not in Demo mode.',
    ],
    whenToCallPro:
      'A persistent 5E almost always means the sensor or its wiring needs to be replaced. The board reports it but cannot fix it.',
  },
  {
    code: '8E',
    slug: '8e',
    title: 'Samsung 8E Error — Ice Maker Sensor',
    meaning:
      'The 8E code reports a fault on the ice maker temperature sensor. The board uses this sensor to time harvest cycles, so ice production stops when it fails.',
    whatToTry: [
      'Remove the ice bucket and check for a frost mass behind the ice maker.',
      'Power-cycle the refrigerator at the breaker for 5 minutes.',
      'Confirm the freezer is holding 0°F (-18°C).',
    ],
    whenToCallPro:
      'If 8E returns after a defrost and reset, the ice maker assembly typically needs replacement — this is one of the most common Samsung ice maker failures.',
  },
  {
    code: '21E',
    slug: '21e',
    title: 'Samsung 21E Error — Freezer Evaporator Fan',
    meaning:
      'A 21E code means the freezer evaporator fan motor is not turning at the speed the board expects. With no airflow over the cold coil, the freezer warms up.',
    whatToTry: [
      'Listen at the back of the freezer for a fan running.',
      'Check for ice buildup behind the rear freezer panel — but do not pry it.',
      'Power-cycle and confirm the code clears.',
    ],
    whenToCallPro:
      'If you hear no fan or the code returns, the evaporator fan motor needs replacement, often together with a defrost system inspection.',
  },
  {
    code: '22E',
    slug: '22e',
    title: 'Samsung 22E Error — Fridge Evaporator Fan',
    meaning:
      'A 22E code reports a fridge-side fan failure. On twin-cooling Samsung models the fridge has its own dedicated fan that pushes cold air across the fridge coil.',
    whatToTry: [
      'Check that nothing is blocking the rear vent inside the fridge.',
      'Power-cycle the unit for 5 minutes.',
      'Confirm Power Cool mode is not stuck on.',
    ],
    whenToCallPro:
      'A 22E that returns after a clear vent and reset means the fridge fan motor or its driver circuit needs service.',
  },
  {
    code: '41C',
    slug: '41c',
    title: 'Samsung 41C Error — Main Board to Display Communication',
    meaning:
      'The 41C code (sometimes shown as 14C) indicates the main control board on the back of the unit cannot communicate with the display board on the door. Cooling may continue, but the panel becomes unreliable.',
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 10 minutes.',
      'Check that the door is fully closed (some models suspend communication when the door is open).',
    ],
    whenToCallPro:
      'A persistent 41C usually traces to a damaged ribbon cable, a failed display board, or a failed main PCB. It needs hands-on diagnosis to isolate.',
  },
  {
    code: '84C',
    slug: '84c',
    title: 'Samsung 84C Error — Compressor Start Failure',
    meaning:
      'The 84C code reports that the digital inverter compressor failed to start, or that the inverter board cannot drive it. The fridge will not cool until this is resolved.',
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 10 minutes.',
      'Confirm the unit is on a properly grounded circuit, not a shared 15A line with other large appliances.',
    ],
    whenToCallPro:
      '84C almost always requires replacing either the inverter board or the compressor itself. This is not a DIY repair — sealed-system work needs EPA certification.',
  },
  {
    code: 'OF OF',
    slug: 'of-of',
    title: 'Samsung OF OF — Demo / Cooling-Off Mode',
    meaning:
      'OF OF (sometimes shown as O FF or O F) is not an error — it means the refrigerator is in showroom Demo mode. Lights and the panel work, but the compressor never runs.',
    whatToTry: [
      'On most Samsung models: hold Energy Saver + Lighting (or Power Cool + Power Freeze) for 8 seconds to exit Demo mode.',
      'For Family Hub models, exit through Settings → Cooling Off.',
      'Listen for the compressor to start within 10 minutes after exiting.',
    ],
    whenToCallPro:
      'If the compressor still does not start after exiting Demo mode, you likely have a real cooling fault and need service.',
  },
  {
    code: 'PC ER',
    slug: 'pc-er',
    title: 'Samsung PC ER — Panel to Control Communication',
    meaning:
      'PC ER reports a communication failure between the front display panel and the main control board. Often appears after a power surge or moisture event.',
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 10 minutes.',
      'Inspect the door wiring harness for visible damage if it routes through the hinge.',
    ],
    whenToCallPro:
      'PC ER that does not clear after a reset usually means the display board, the main board, or the harness between them needs replacement.',
  },
];

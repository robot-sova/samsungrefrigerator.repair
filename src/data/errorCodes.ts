export interface ErrorFaqItem {
  q: string;
  a: string;
}

export interface ErrorCode {
  code: string;
  slug: string;
  title: string;
  meaning: string;
  rootCauses: string[];
  whatToTry: string[];
  whenToCallPro: string;
  howWeFix: string;
  relatedServiceSlug?: string;
  faq: ErrorFaqItem[];
}

export const ERROR_CODES: ErrorCode[] = [
  {
    code: '1E',
    slug: '1e',
    title: 'Samsung 1E Error — Ice Maker Fill Sensor',
    meaning:
      "1E (sometimes shown as IE) means the ice maker fill sensor is reporting an open circuit or out-of-range value. The control board uses this sensor to confirm the ice mold is full of water before triggering the freeze-and-harvest cycle. Without a valid reading, the board never harvests, so no ice is produced even though everything else looks normal.",
    rootCauses: [
      'Failed optical fill sensor inside the ice maker assembly',
      'Damaged or pinched harness between the sensor and the main board',
      'Frost block on the sensor optics',
      'Failed main control board (rare, but possible)',
    ],
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 5 minutes.',
      'Confirm the ice maker is turned on via the front panel.',
      'Look at the ice maker — visible frost block on the sensor housing means the duct seal is failing and warm air is migrating in.',
    ],
    whenToCallPro:
      'If the code returns within 24 hours of a reset, the fill sensor or its harness needs replacement. If you also see the freeze-up pattern that drives most Samsung ice maker calls, plan on replacing the ice maker assembly with the redesigned part at the same time.',
    howWeFix:
      "We test the sensor harness for continuity, replace the sensor or the full ice maker assembly depending on the failure, clear the code at the panel, and run a full fill-freeze-harvest cycle to confirm. Most 1E repairs are single-visit jobs because we carry the parts on the truck for the affected models.",
    relatedServiceSlug: 'ice-maker-repair',
    faq: [
      {
        q: 'Will the 1E error affect my fridge cooling?',
        a: 'No — 1E is an ice maker subsystem code only. The fridge and freezer continue to cool normally. You can turn off the ice maker via the panel until the repair is done.',
      },
      {
        q: 'Can I just clear the code and ignore it?',
        a: "You can clear it, but it will return as soon as the ice maker tries to harvest again. Ice production won't resume until the underlying sensor is replaced.",
      },
      {
        q: 'How much does fixing 1E cost?',
        a: "Most 1E repairs fall into the typical sensor-replacement range. If the freeze-up is also present and the redesigned ice maker is needed, it's a larger repair but still a single visit.",
      },
    ],
  },
  {
    code: '5E',
    slug: '5e',
    title: 'Samsung 5E Error — Fridge Defrost / Fridge Sensor',
    meaning:
      "5E reports a fridge-section defrost sensor (thermistor) reading out of range. This sensor tells the main control board when the fridge-side coil reaches the temperature that should trigger end-of-defrost. Without it, the board can't run a normal defrost cycle, and over time the coil ices up and cooling drops.",
    rootCauses: [
      'Failed defrost thermistor on the fridge-section coil',
      'Damaged sensor harness',
      'Loose connection at the main board',
      'Demo mode accidentally enabled (rare false-positive trigger)',
    ],
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 5 minutes.',
      'Confirm the fridge is not in Demo mode (OF OF on the panel).',
      'Empty the fridge and check the rear inner wall for excessive frost.',
    ],
    whenToCallPro:
      'A persistent 5E almost always means the sensor or its wiring needs replacement. The board can report the fault but cannot fix it. Untreated, the coil eventually ices over and the fridge stops cooling.',
    howWeFix:
      'We test the thermistor for resistance vs temperature curve, verify the harness, and replace the failed component. The defrost cycle is verified before we leave to confirm the board runs end-of-defrost normally.',
    relatedServiceSlug: 'not-cooling',
    faq: [
      {
        q: 'Will my fridge stop cooling if I ignore 5E?',
        a: 'Eventually yes — without a working defrost sensor the cycle is incomplete, frost builds up on the coil over weeks, and airflow drops. Address it before it cascades into a not-cooling call.',
      },
      {
        q: 'Is 5E the same as 5C or 5R?',
        a: 'Different model series use slightly different display formats, but they all point to the same fridge thermistor circuit. The repair is the same.',
      },
    ],
  },
  {
    code: '8E',
    slug: '8e',
    title: 'Samsung 8E Error — Ice Maker Sensor',
    meaning:
      "8E reports a fault on the ice maker temperature sensor (thermistor). The board uses this sensor to time the harvest cycle — once the mold reaches the harvest threshold, the board triggers the eject motor. If the sensor reads out of range, no harvest happens.",
    rootCauses: [
      'Failed ice maker thermistor',
      'Frosted-over sensor (warm-air migration into the ice room)',
      'Damaged harness in the door hinge area',
      'Failed ice maker assembly',
    ],
    whatToTry: [
      'Remove the ice bucket and look for a frost mass behind the ice maker.',
      'Power-cycle the refrigerator at the breaker for 5 minutes.',
      'Confirm the freezer is holding 0°F (-18°C).',
    ],
    whenToCallPro:
      "If 8E returns after a defrost and reset, the ice maker assembly typically needs replacement. This is one of the most common Samsung ice maker failures and the redesigned assembly addresses both the sensor and the freeze-up issue.",
    howWeFix:
      "On the visit we thaw any ice block, replace the duct seal that lets warm air in, and install a new ice maker (the redesigned assembly when the model is affected). After installation we run a manual harvest cycle and verify the panel clears 8E.",
    relatedServiceSlug: 'ice-maker-repair',
    faq: [
      {
        q: 'My ice maker is also frozen solid. Are these the same problem?',
        a: 'Yes — the freeze-up and 8E are the same root cause. Warm humid air is reaching the ice room, frosting the sensor, and the board reports the sensor is out of range.',
      },
      {
        q: 'Can I disable the ice maker and just live with it?',
        a: "Yes — turn the ice maker off via the front panel. The 8E may continue to display until cleared, but cooling is unaffected.",
      },
    ],
  },
  {
    code: '21E',
    slug: '21e',
    title: 'Samsung 21E Error — Freezer Evaporator Fan',
    meaning:
      "21E means the freezer evaporator fan motor is not turning at the speed the main board expects, or is reporting no rotation at all. With no airflow over the cold coil, the freezer can't get cold even though the compressor is running.",
    rootCauses: [
      'Failed evaporator fan motor (most common)',
      'Ice buildup behind the rear freezer panel jamming the fan blade',
      'Damaged fan harness',
      'Failed main control board fan driver',
    ],
    whatToTry: [
      'Listen at the back of the freezer for a fan running.',
      'Check for ice buildup behind the rear freezer panel — but do not pry it open.',
      'Power-cycle and confirm the code clears.',
    ],
    whenToCallPro:
      'If you hear no fan sound or the code returns, the evaporator fan motor needs replacement. We also inspect the defrost system because a defrost fault often causes the ice that jams the fan in the first place.',
    howWeFix:
      "We pull the rear freezer panel, thaw any ice, test and replace the fan motor, and verify the defrost system is running normally so the failure does not return. Single-visit repair on most models.",
    relatedServiceSlug: 'freezer-not-freezing',
    faq: [
      {
        q: 'Why does my fan keep failing?',
        a: 'Usually because the defrost system is also weak — ice builds up behind the panel, contacts the blade, and burns out the fan motor. Replacing only the fan without addressing defrost is a temporary fix.',
      },
      {
        q: 'How fast does the freezer warm up after 21E appears?',
        a: 'Within hours the freezer drifts up to 10-25°F. Move ice cream and frozen food to a cooler if the repair is more than 4-6 hours away.',
      },
    ],
  },
  {
    code: '22E',
    slug: '22e',
    title: 'Samsung 22E Error — Fridge Evaporator Fan',
    meaning:
      "22E reports a fridge-side fan failure on Samsung Twin Cooling models. These units have a dedicated fridge-section fan that pushes air across the fridge coil. When it fails or stalls, the fridge warms up while the freezer stays cold.",
    rootCauses: [
      'Failed fridge fan motor',
      'Frosted fan blade from a defrost-system fault',
      'Damaged fan harness',
      'Vent blocked by stored food',
    ],
    whatToTry: [
      'Check that nothing is blocking the rear vent inside the fridge.',
      'Power-cycle the unit for 5 minutes.',
      'Confirm Power Cool mode is not stuck on (it forces continuous fan run).',
    ],
    whenToCallPro:
      'A 22E that returns after a clear vent and reset means the fridge fan motor or its driver circuit needs service. We also check the defrost cycle — fan failures are often a downstream symptom of a deeper defrost issue on Twin Cooling units.',
    howWeFix:
      'We pull the rear fridge panel, test the fan motor, replace if failed, and verify normal airflow at the upper fridge vent before closing.',
    relatedServiceSlug: 'not-cooling',
    faq: [
      {
        q: 'My fridge has Twin Cooling Plus — does that change the repair?',
        a: 'Yes — Twin Cooling models have separate fans for fridge and freezer, and 22E points specifically to the fridge fan. The repair is similar but the fan sits on the fridge side, not the freezer.',
      },
      {
        q: 'Can I keep using the fridge with 22E showing?',
        a: 'For a few hours, yes. The fridge warms up over the day. If repair is more than 24 hours away, move perishables to a cooler.',
      },
    ],
  },
  {
    code: '41C',
    slug: '41c',
    title: 'Samsung 41C Error — Main Board to Display Communication',
    meaning:
      "41C (sometimes 14C) indicates the main control board on the back of the unit cannot communicate with the display board on the door. Cooling continues because the main board runs the cooling cycle independently, but the panel becomes unreliable — settings may not save, codes flicker, and Power Cool may not engage.",
    rootCauses: [
      'Damaged ribbon cable between display and main board',
      'Failed display board',
      'Failed main PCB',
      'Moisture intrusion at the door hinge wiring',
    ],
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 10 minutes.',
      'Confirm the door is fully closed (some models suspend communication when the door is open).',
    ],
    whenToCallPro:
      'A persistent 41C usually traces to a damaged ribbon cable, a failed display board, or a failed main PCB. It needs hands-on diagnosis to isolate which one. Cheap problem (cable) or expensive problem (board) — only diagnosis tells the difference.',
    howWeFix:
      "We open the door hinge wiring channel, inspect the ribbon cable for damage or moisture corrosion, and test the data line voltages at both ends. Replace the cable, the display board, or the main PCB depending on what tests fail.",
    relatedServiceSlug: 'control-board-repair',
    faq: [
      {
        q: 'Is it safe to use the fridge while 41C is showing?',
        a: "Cooling is unaffected, but you can't trust the panel — Power Cool, ice maker on/off, temperature changes may not actually take effect. Address it within a couple of weeks rather than living with it.",
      },
      {
        q: 'Could a power surge cause 41C?',
        a: 'Yes — a surge can damage the data transceivers on either board. If 41C appeared right after a storm or grid event, surge damage is likely.',
      },
    ],
  },
  {
    code: '84C',
    slug: '84c',
    title: 'Samsung 84C Error — Compressor Start Failure',
    meaning:
      "84C reports that the digital inverter compressor failed to start, or that the inverter board cannot drive it. The fridge will not cool at all until this is resolved. It is the most serious of the common Samsung error codes because the underlying cause is in the cooling system itself.",
    rootCauses: [
      'Failed inverter board (most common)',
      'Failed compressor windings',
      'Open or damaged wiring between inverter and compressor',
      'Voltage drop on a shared circuit preventing start',
    ],
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 10 minutes.',
      'Confirm the unit is on a properly grounded dedicated circuit, not sharing with a microwave or AC.',
    ],
    whenToCallPro:
      "84C almost always requires replacing either the inverter board or the compressor. This is not a DIY repair — sealed-system work needs EPA certification and the inverter board carries lethal voltages until fully discharged. Call.",
    howWeFix:
      "We test the inverter board first because it's the more common failure and roughly an eighth of the cost of a compressor. If the board tests good, we test compressor windings. Replacement of either resolves 84C; on a confirmed bad compressor we present the cost vs. replacement decision honestly before any work starts.",
    relatedServiceSlug: 'compressor-repair',
    faq: [
      {
        q: 'My fridge shows 84C and is completely warm. How long do I have?',
        a: "The fridge holds about four hours, freezer 24-48 hours. Move perishables to a cooler. Same-day service is usually available.",
      },
      {
        q: 'Is the compressor under warranty?',
        a: "Samsung typically covers compressors for 10 years (parts only — labor is usually only first-year). Have model and serial ready and we will check warranty status before quoting.",
      },
      {
        q: 'Should I just replace the fridge?',
        a: "Depends on age and condition. On a 5-year-old unit a compressor or inverter board repair is usually worth it. On a 12-year-old unit, replacement often makes more sense. We give you both numbers and let you decide.",
      },
    ],
  },
  {
    code: 'OF OF',
    slug: 'of-of',
    title: 'Samsung OF OF — Demo / Cooling-Off Mode',
    meaning:
      "OF OF (sometimes shown as O FF or O F) is not an error — it means the refrigerator is in showroom Demo mode. Lights, panel, and fans work, but the compressor never runs. The fridge looks alive but never gets cold. Often activated accidentally by a button-combination press.",
    rootCauses: [
      'Demo mode accidentally enabled by a panel button combination',
      'Cooling Off mode enabled in Family Hub settings',
      'Power outage that left the unit in showroom state',
    ],
    whatToTry: [
      "On most Samsung models: hold Energy Saver + Lighting (or Power Cool + Power Freeze) for 8 seconds to exit Demo mode.",
      "On Family Hub models: exit through Settings → Cooling Off.",
      "Listen for the compressor to start within 10 minutes after exiting.",
    ],
    whenToCallPro:
      "If the compressor still does not start after exiting Demo mode, you have a real cooling fault — usually 84C territory — and need service.",
    howWeFix:
      "If exiting Demo mode does resolve it, no service is needed and we will tell you that on the phone. If it doesn't, we treat it as a no-cool diagnostic call and find the underlying fault on-site.",
    relatedServiceSlug: 'not-cooling',
    faq: [
      {
        q: "I hold the buttons but it won't exit Demo mode. What now?",
        a: "Different model years use different button combinations. Try Power Cool + Power Freeze for 8 seconds. Try Energy Saver + Fridge for 8 seconds. If none work, your model uses a unique combo and we can confirm over the phone.",
      },
      {
        q: 'Why would Demo mode activate by itself?',
        a: "It usually doesn't — most cases are accidental button presses (often by kids), or the previous owner left it in showroom mode and a power outage triggered the indicator.",
      },
    ],
  },
  {
    code: 'PC ER',
    slug: 'pc-er',
    title: 'Samsung PC ER — Panel to Control Communication',
    meaning:
      "PC ER reports a communication failure between the front display panel and the main control board. Symptom-wise it overlaps with 41C — panel becomes unreliable, settings may not stick, codes flicker. Often appears after a power surge or moisture event.",
    rootCauses: [
      'Damaged data line between panel and main board',
      'Failed display board',
      'Failed main PCB',
      'Moisture corrosion at the door hinge wiring channel',
    ],
    whatToTry: [
      'Power-cycle the refrigerator at the breaker for 10 minutes.',
      'Inspect the door wiring harness for visible damage if it routes through the hinge.',
    ],
    whenToCallPro:
      "PC ER that doesn't clear after a reset means the display board, the main board, or the harness between them needs replacement. Diagnosis on-site narrows down which.",
    howWeFix:
      "Same diagnostic path as 41C: open the hinge wiring channel, inspect the ribbon cable, test the data lines at both boards, and replace the failed component. Most PC ER repairs are single-visit jobs.",
    relatedServiceSlug: 'control-board-repair',
    faq: [
      {
        q: 'How is PC ER different from 41C?',
        a: "Both are panel-to-main-board communication errors. Different model years use different code formats — PC ER on some, 41C on others, occasionally both on the same unit. The diagnostic path and the repair are the same.",
      },
      {
        q: 'It started right after we lost power. Connection?',
        a: "Almost certainly — power surges damage the data transceivers on Samsung's boards. Surge protection on the dedicated fridge circuit prevents most of these.",
      },
    ],
  },
];

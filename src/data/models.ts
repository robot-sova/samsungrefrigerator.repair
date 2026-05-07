export interface ModelFaqItem {
  q: string;
  a: string;
}

export interface Model {
  slug: string;
  title: string;
  description: string;
  longIntro: string;
  commonIssues: string[];
  typicalRepairs: string[];
  faq: ModelFaqItem[];
}

export const MODELS: Model[] = [
  {
    slug: 'family-hub',
    title: 'Samsung Family Hub Refrigerator Repair',
    description:
      'Samsung Family Hub refrigerators add a 21-32 inch touchscreen, internal cameras, and Wi-Fi connectivity on top of the standard French Door cooling platform.',
    longIntro:
      "Samsung Family Hub refrigerators are essentially a French Door fridge with a tablet bolted onto the door. From a repair perspective that means two distinct subsystems: the underlying cooling platform (compressor, evaporators, fans, defrost system, ice maker) which behaves like any other Samsung French Door, and the smart panel (touchscreen, cameras, Wi-Fi, app integration) which has its own failure modes that are unique to Family Hub.\n\nThe cooling-side issues on a Family Hub are the same ones we see across every Samsung French Door — ice maker freeze-ups in the fridge-section ice room, defrost system faults causing fridge-warm-freezer-cold patterns, and the occasional inverter board failure. The smart-panel issues are different: touchscreens that freeze and need a hard reset, internal cameras that stop loading in the SmartThings app, Wi-Fi that drops every few days, and (less often) a dead panel that requires replacement of the whole display assembly.\n\nWe service both halves. The good news is that smart-panel failures rarely affect cooling — even with a completely dead Family Hub touchscreen, the fridge keeps cooling normally because the main control board on the back is independent. So a smart-panel issue is annoying but not urgent.",
    commonIssues: [
      'Touchscreen frozen, blank, or unresponsive',
      'Wi-Fi or SmartThings app pairing failures',
      'Internal cameras not loading in the app',
      'Ice maker freeze-ups (shared with all French Door models)',
      'Cooling fan or compressor failures',
      'Family Hub panel reboots itself randomly',
    ],
    typicalRepairs: [
      'Touchscreen / display assembly replacement',
      'Camera module replacement',
      'Wi-Fi module diagnosis and replacement',
      'Ice maker assembly replacement (redesigned part)',
      'Defrost system parts (heater, sensor, thermal fuse)',
      'Inverter board replacement',
    ],
    faq: [
      {
        q: 'My Family Hub screen is dead but the fridge is still cooling. Is that normal?',
        a: "Yes — the smart panel and the cooling system are independent. A dead touchscreen does not affect cooling. We replace the display assembly to restore the screen.",
      },
      {
        q: 'Can the camera issue be fixed without replacing the whole panel?',
        a: "Sometimes — the camera modules are individually replaceable on most Family Hub generations. We diagnose first and replace only what failed.",
      },
      {
        q: 'My Family Hub keeps disconnecting from Wi-Fi. Is that a hardware fault?',
        a: "Usually no — most Wi-Fi drops are router or network related. We check signal strength at the fridge first. If signal is fine and the issue persists, the Wi-Fi module on the panel may need replacement.",
      },
    ],
  },
  {
    slug: 'bespoke',
    title: 'Samsung Bespoke Refrigerator Repair',
    description:
      'The Samsung Bespoke line uses modular, color-swappable door panels with the underlying French Door or 4-Door cooling platform.',
    longIntro:
      "Samsung Bespoke refrigerators are built on the French Door or 4-Door FlexZone cooling platforms but add a modular, color-swappable door panel system. The interchangeable panels are the headline feature — homeowners can swap the door colors as their kitchen styling changes — and from a repair perspective they're mostly just a panel-attachment difference. The cooling platform underneath behaves identically to a non-Bespoke Samsung of the same generation.\n\nThe Bespoke-specific repair patterns are mostly mechanical: door alignment shifting (the panels are heavier than standard doors), custom-panel sensors triggering false door-open alarms, and the occasional alignment issue where the panel sits slightly proud of the cabinet. The cooling-side issues — ice maker freeze-ups, defrost faults, inverter board failures — are exactly the same as the rest of the Samsung lineup and are repaired the same way.\n\nThe AutoFill water pitcher Bespoke models have one extra failure point — the pitcher fill sensor and the water dispenser interlock — that we see occasionally. Display flicker on those models is also slightly more common than on non-Bespoke units.",
    commonIssues: [
      'Door alignment shifting, breaking the panel seal',
      'Custom panel sensors triggering false door-open alarms',
      'Ice maker freeze-ups',
      'Compressor or evaporator fan failures',
      'Display flicker on the AutoFill water pitcher models',
      'Door panel attachment hardware loosening',
    ],
    typicalRepairs: [
      'Door alignment and hinge replacement',
      'Door switch replacement',
      'Ice maker assembly replacement',
      'Defrost system parts (heater, sensor, thermal fuse)',
      'Inverter board or main control board replacement',
      'AutoFill pitcher sensor replacement',
    ],
    faq: [
      {
        q: 'Can I swap the door panels myself or does that need a technician?',
        a: "The panels are designed to be homeowner-swappable, and most owners do it themselves. If the swap reveals a worn hinge or a loose attachment plate, that's where we come in.",
      },
      {
        q: 'My Bespoke door is sagging. Is that a hinge issue?',
        a: "Almost always yes. The Bespoke panels are heavier than standard doors, and the hinges wear faster as a result. Replacement is a single-visit job.",
      },
      {
        q: 'Does the AutoFill pitcher work with regular tap water?',
        a: "Yes — the pitcher dispenses filtered water from the main supply and works with any standard household tap connection. No special adapter needed.",
      },
    ],
  },
  {
    slug: 'french-door-4-door-flex',
    title: 'Samsung French Door & 4-Door FlexZone Repair',
    description:
      'Samsung French Door and 4-Door FlexZone refrigerators are the most common platform we service.',
    longIntro:
      "Samsung French Door and 4-Door FlexZone refrigerators are the platform we see more than any other in the field. They're the largest fraction of the Samsung installed base in our five counties, and they have the most well-documented repair patterns. The French Door units are the standard two-up, two-down configuration. The 4-Door FlexZone models add a fourth compartment — a convertible drawer that can run as fridge, freezer, or in-between — which adds a fifth temperature zone with its own dedicated control circuitry.\n\nThe most common Samsung French Door call by a wide margin is the ice maker. The fridge-section ice room is famous for freezing up from warm-air migration past a worn duct seal. The fix is replacing the seal and (usually) installing the redesigned ice maker assembly that addresses the original design issue. The second-most-common pattern on this platform is the defrost-system fault that causes the fridge section to warm up while the freezer stays cold — a classic Samsung symptom and a straightforward repair once diagnosed.\n\nFlexZone-specific issues are the FlexZone drawer not holding its set temperature (damper or controller failure), and dispenser leaks tracing back to the icemaker fill tube routed through the door hinge. Both are single-visit fixes when properly diagnosed.",
    commonIssues: [
      'FlexZone drawer not holding its set temperature',
      'Ice maker freezing up in the fridge-section ice room',
      'Defrost system faults causing fridge-side warming',
      'Water leaks from the dispenser line',
      'Door-in-door switch failures',
      'Dispenser drips after each use',
    ],
    typicalRepairs: [
      'Ice maker assembly replacement (redesigned part)',
      'Duct seal replacement',
      'Defrost heater, sensor, and thermal fuse replacement',
      'FlexZone damper or controller replacement',
      'Water inlet valve replacement',
      'Door-in-door switch replacement',
    ],
    faq: [
      {
        q: "Why do Samsung French Door ice makers fail so often?",
        a: "The original design lets warm humid air migrate past the duct seal into the ice room. That moisture freezes around the ice maker and locks it up. Samsung's redesigned ice maker addresses the underlying issue and we install it as the standard replacement.",
      },
      {
        q: "What's the difference between French Door and 4-Door FlexZone in terms of repairs?",
        a: "Mostly identical. The 4-Door adds the FlexZone drawer with its own damper and (sometimes) its own evaporator, which adds a couple of failure modes specific to that compartment. Everything else is the same platform.",
      },
      {
        q: 'How long do these refrigerators typically last?',
        a: 'On average 10-15 years, with the ice maker and defrost system being the most-replaced parts along the way. Compressor failure on this platform is rare in the first decade.',
      },
    ],
  },
  {
    slug: 'side-by-side',
    title: 'Samsung Side-by-Side Refrigerator Repair',
    description:
      'Samsung side-by-side refrigerators put the freezer on the left and fridge on the right, with the ice maker mounted in the freezer door.',
    longIntro:
      "Samsung side-by-side refrigerators are simpler than the French Door / 4-Door units in some ways and harder in others. Simpler because there's no fridge-section ice room — the ice maker is mounted in the freezer door, which is the original location and a more reliable design. Harder because the door-mounted dispenser system has more moving parts, and the freezer narrow-tall layout means more door cycles per day, which wears on the door switches and the dispenser components.\n\nThe most common side-by-side calls in our area are auger motor failures (jams against an ice clump and burns out), water dispenser drips (worn dispenser solenoid or microswitch), and freezer door not closing flush. The freezer door issue is almost always either a worn gasket or a worn hinge — once the door doesn't seal, frost builds up on packaging and the freezer warms slightly. A fresh gasket and a hinge adjustment is a standard 30-minute fix.\n\nDefrost-system faults occur on side-by-side units too but less frequently than on French Door — the simpler airflow path is more forgiving. Compressor failures on side-by-side units are rare in the first decade of life.",
    commonIssues: [
      'Auger motor jammed by an ice clump',
      'Water dispenser drips after each use',
      'Freezer door not closing flush, causing frost buildup',
      'Defrost timer or heater failure',
      'Compressor noise from worn mounts',
      'Ice and water dispenser microswitch failure',
    ],
    typicalRepairs: [
      'Auger motor replacement',
      'Door gasket replacement',
      'Hinge adjustment or replacement',
      'Defrost heater and thermostat replacement',
      'Dispenser solenoid or microswitch replacement',
      'Compressor mount replacement',
    ],
    faq: [
      {
        q: 'My ice maker still works but the dispenser does nothing. Why?',
        a: "Almost always the auger motor or the dispenser microswitch. The ice maker can produce ice but if the auger can't move it to the dispenser chute, nothing comes out. Single-visit fix.",
      },
      {
        q: 'Are side-by-side Samsung fridges more reliable than French Door?',
        a: "Roughly equivalent overall, but with different failure patterns. Side-by-side units don't have the famous ice room freeze-up issue, but their dispensers and door switches see more wear because the doors are narrower and used more often.",
      },
    ],
  },
  {
    slug: 'top-freezer',
    title: 'Samsung Top-Freezer Refrigerator Repair',
    description:
      'Samsung top-freezer refrigerators are the simplest platform — fewer electronic controls, no ice maker on most models.',
    longIntro:
      "Samsung top-freezer refrigerators are the simplest and most reliable platform Samsung makes. Most models have no ice maker, no Twin Cooling fans, no FlexZone, no smart panel — just a single compressor, a single evaporator, a defrost system, and basic temperature controls. They're often the model of choice for rental properties and second refrigerators, and they last a long time when serviced.\n\nThe most common top-freezer call we run is frost buildup on the rear freezer wall — a classic symptom of a defrost system fault. The defrost cycle on these units uses a simple heater, thermostat, and timer (mechanical or electronic depending on year). When any one fails, frost accumulates on the freezer evaporator until airflow is blocked, then the fridge starts warming up. The fix is single-visit and the parts are inexpensive.\n\nThe second pattern is door gasket failure — top-freezer units have larger door surface area relative to their volume, and any gasket failure shows up as forced compressor cycling and frost buildup. Compressor failures on top-freezer Samsungs are rare; when they do happen the unit is usually old enough that replacement makes more sense than repair.",
    commonIssues: [
      'Frost buildup on the rear freezer wall',
      'Defrost heater or thermostat failure',
      'Door gasket no longer sealing',
      'Compressor relay failure',
      'Thermostat knob no longer changing temperature',
      'Drain pan cracked or leaking',
    ],
    typicalRepairs: [
      'Defrost heater replacement',
      'Defrost thermostat replacement',
      'Defrost timer (mechanical or electronic) replacement',
      'Door gasket replacement',
      'Thermostat replacement',
      'Drain pan replacement',
    ],
    faq: [
      {
        q: 'My top-freezer is more than 10 years old. Worth fixing?',
        a: "Usually yes for defrost system or gasket repairs — those are inexpensive fixes that buy years of life. Compressor or sealed-system work on a 10+ year unit is the point at which replacement starts to make more sense.",
      },
      {
        q: "I don't have an ice maker on this model. Can I add one?",
        a: "Most Samsung top-freezer models are not ice maker compatible — there's no water line and no provision for the harness. If you want ice production, the better path is a different model rather than retrofitting.",
      },
    ],
  },
];

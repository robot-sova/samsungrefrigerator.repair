export interface Cause {
  title: string;
  explanation: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  shortDescription: string;
  longIntro: string;
  symptoms: string[];
  commonCauses: string[];
  causes: Cause[];
  repairSteps: string[];
  diyVsCall: string;
  relatedErrorCodes: string[];
  faq: FaqItem[];
}

export const SERVICES: Service[] = [
  {
    slug: 'not-cooling',
    title: 'Samsung Refrigerator Not Cooling Repair',
    h1: 'Samsung Refrigerator Not Cooling? Same-Day Repair',
    metaDescription:
      'Samsung refrigerator not cooling repair across SoCal. Same-day service for fridges that are warm, lukewarm, or losing temperature. Call 424-407-1019.',
    shortDescription:
      'Diagnosis and repair when your Samsung fridge stops holding temperature, runs warm, or only the freezer cools.',
    longIntro:
      "A Samsung refrigerator that's no longer cooling is the most common call we run, and on Samsung the most common root cause is not what most homeowners expect. Nine times out of ten the freezer is still cold, the fridge section is creeping toward room temperature, and the front panel reads normal. That pattern almost always points to the defrost system on the freezer side — not the compressor.\n\nSamsung's twin-cooling and French Door designs route fresh-frozen air from the freezer evaporator up into the fridge through a small duct. When the evaporator coil ices over (failed defrost heater, defrost sensor, or main board defrost timer), airflow stops and the fridge goes warm while the freezer stays cold. Pulling the rear freezer panel almost always reveals a wall of frost.\n\nThe other common cooling failure on Samsung refrigerators is the evaporator fan motor. It's a small DC motor with a known failure mode — bearings dry out, the blade slows or stops, and you'll often hear a faint warble or clicking before it dies completely. Either way, the fix is straightforward when diagnosed correctly. Misdiagnosis (replacing the compressor when it's a $40 sensor) is what costs people money on Samsung repairs.",
    symptoms: [
      'Fridge section is warm but freezer is still cold',
      'Both compartments warm, compressor running constantly',
      'Food in the fridge spoiling within 24-48 hours',
      'Inside temperature display reads higher than the set point',
      'Ice buildup visible on the rear inside wall of the freezer',
      'Cold air no longer felt at the upper vent inside the fridge',
    ],
    commonCauses: [
      'Frosted-over evaporator coil from a defrost-system fault',
      'Failed evaporator fan motor in the freezer',
      'Sealed-system refrigerant leak',
      'Faulty main control board (PCB)',
      'Damper assembly stuck closed between freezer and fridge',
      'Failed defrost heater, sensor, or thermal fuse',
    ],
    causes: [
      {
        title: 'Frosted-over evaporator coil',
        explanation:
          "On Samsung French Door and 4-Door refrigerators this is by far the most common cause. The defrost cycle stops working, frost builds up on the evaporator coil over weeks, and once airflow is blocked the fridge can't cool. Hidden behind the rear freezer panel.",
      },
      {
        title: 'Failed evaporator fan motor',
        explanation:
          "The fan that pushes cold air across the evaporator coil. When it fails, no air moves into the fridge section even though refrigerant is cold. Often preceded by a warble or whine.",
      },
      {
        title: 'Sealed-system leak',
        explanation:
          "Less common on newer Samsung units, but still seen — typically a small leak at the freezer evaporator or in the suction line. Diagnosed with leak-detection equipment, requires EPA-certified repair.",
      },
      {
        title: 'Main control board (PCB)',
        explanation:
          "The board that runs the defrost cycle. When it fails the defrost heater never kicks on, the coil ices, and the fridge stops cooling. Often shows up alongside intermittent error codes.",
      },
      {
        title: 'Damper assembly stuck closed',
        explanation:
          "The motorized flap that controls cold airflow from freezer to fridge. When it sticks closed (or the motor fails) the fridge starves for cold air while the freezer stays cold.",
      },
      {
        title: 'Defrost heater, sensor, or thermal fuse',
        explanation:
          "Any of the three failing breaks the defrost cycle. The heater is most likely on units 5+ years old. The thermal fuse is one-time-use and pops if the system overheats.",
      },
    ],
    repairSteps: [
      'Confirm the symptom pattern — fridge warm vs both warm vs intermittent — and check for ice on the rear freezer wall.',
      'Pull the rear freezer panel to inspect the evaporator coil. A frost block confirms a defrost-system fault.',
      'Test the evaporator fan motor, defrost heater, defrost thermistor, and main board defrost output.',
      'Replace the failed component, restore the panel, and let the unit run a full cycle to verify cold air resumes at the upper fridge vent.',
      'Re-verify temperatures after 4-6 hours. Most cooling repairs settle into spec within that window.',
    ],
    diyVsCall:
      "Power-cycling the unit at the breaker for 5-10 minutes is a safe first step — it can clear a stuck defrost cycle and resume cooling. Past that, opening the rear freezer panel and probing the defrost system is professional work: the heater runs at line voltage, the thermal fuse is one-time-use, and a misdiagnosis here usually means buying a $400 main board you don't need. If a power-cycle didn't fix it, call.",
    relatedErrorCodes: ['5E', '21E', '22E', '84C'],
    faq: [
      {
        q: 'My freezer is fine but the fridge is warm — is the compressor dead?',
        a: "Almost certainly not. That exact pattern is the signature of a Samsung defrost-system fault. The compressor is doing its job — air just isn't reaching the fridge. The fix is usually a defrost heater, sensor, or main-board issue. Replacing the compressor on this symptom would be a waste.",
      },
      {
        q: 'How long can I keep food in a Samsung fridge that just stopped cooling?',
        a: 'Roughly four hours for the fridge section if you keep the door closed. The freezer holds 24-48 hours if undisturbed. Move perishables to a cooler if the repair will take longer.',
      },
      {
        q: 'Will defrosting it manually fix the problem permanently?',
        a: "No. A manual defrost (unplug, wait 24 hours, plug back in) will usually restore cooling for a few weeks because the coil thaws. But the underlying defrost-cycle fault hasn't been fixed and it will ice up again.",
      },
      {
        q: 'How much does a Samsung not-cooling repair cost?',
        a: 'Diagnostic + a typical defrost-system part is the most common bill. Compressor or sealed-system work is significantly higher. We always quote the exact repair cost on-site before any work starts.',
      },
    ],
  },
  {
    slug: 'ice-maker-repair',
    title: 'Samsung Ice Maker Repair',
    h1: 'Samsung Ice Maker Repair: Stop the Freeze-Ups, Leaks, and No-Ice Days',
    metaDescription:
      'Samsung ice maker repair for French Door, Family Hub, and side-by-side models. Fix freeze-ups, no ice, leaks, and 1E/8E errors. Call 424-407-1019.',
    shortDescription:
      'Specialized repair for the troublesome Samsung French Door ice maker — freeze-ups, no ice production, leaks, and ice maker error codes.',
    longIntro:
      "If you own a Samsung French Door refrigerator, there's a roughly even chance you'll need ice maker service in the first five years. The fridge-section ice rooms on those models have a known design issue — water vapor migrates into the ice compartment, freezes against the walls and around the auger, and the whole thing locks up. Symptoms range from no ice production to small-cube production to a slab of ice you can't pry out.\n\nThe second-most-common Samsung ice maker call is 1E or 8E on the panel — fill sensor or ice maker thermistor errors. Those are usually a sensor or harness issue, occasionally a frosted sensor that cleared itself but flagged the code. The third pattern is leaks: water dripping from the dispenser, water under the ice bucket, or pooling in the freezer floor. The leak source is usually one of three things — the fill tube, the inlet valve, or a cracked auger housing.\n\nThe good news is Samsung now sells a redesigned ice maker assembly that addresses the original freeze-up issue, and replacement is a same-visit job. We carry the redesigned units on the truck for the most-affected model series.",
    symptoms: [
      'Ice maker producing no ice',
      'Ice cubes are small, hollow, or stuck together in a clump',
      'Ice maker compartment iced over so the bucket will not slide out',
      'Water leaking from the dispenser line into the door',
      'Water pooling under the ice bucket inside the freezer',
      'Loud grinding or knocking from the ice maker auger',
      '1E or 8E error code on the panel',
    ],
    commonCauses: [
      'Failed ice maker fill sensor (1E)',
      'Frosted-over ice maker due to a damaged duct seal',
      'Auger motor failure',
      'Clogged or kinked water line',
      'Failed water inlet valve',
      'Ice maker thermistor failure (8E)',
    ],
    causes: [
      {
        title: 'Ice room frost migration (the famous Samsung issue)',
        explanation:
          "Warm humid air leaks past the duct seal into the fridge-section ice compartment. Vapor freezes on the walls and around the ice maker. Eventually the maker is encased in frost. Affects most French Door models built before the redesign.",
      },
      {
        title: 'Failed fill sensor (1E)',
        explanation:
          "The optical sensor that confirms the ice mold is full of water. When it fails the board never harvests, so no ice is produced even though everything else looks normal.",
      },
      {
        title: 'Ice maker thermistor failure (8E)',
        explanation:
          "The temperature sensor that times the harvest cycle. Fails about as often as the fill sensor. Code 8E on the panel is the most reliable indicator.",
      },
      {
        title: 'Auger motor failure',
        explanation:
          "The motor that pushes cubes from the bucket into the dispenser chute. When it fails or jams against an ice clump, you get loud grinding and no dispensing.",
      },
      {
        title: 'Failed water inlet valve',
        explanation:
          "The valve that lets water into the fill tube. When it sticks open you get a slow leak; when it fails closed you get no ice at all and often no dispensed water either.",
      },
      {
        title: 'Cracked auger housing or fill tube',
        explanation:
          "Less common but the source of most mystery freezer-floor leaks. Plastic fatigue from repeated freeze cycles eventually splits the housing.",
      },
    ],
    repairSteps: [
      'Confirm the symptom — no ice, freeze-up, leak, or error code — and pull the ice bucket to inspect.',
      'For freeze-ups: thaw the ice room, replace the duct seal, and install a redesigned ice maker assembly if the original is the affected revision.',
      'For 1E / 8E codes: test the relevant sensor, replace if out of spec, and clear the code.',
      'For leaks: trace the leak path back to inlet valve, fill tube, or auger housing and replace the failed part.',
      'Run a manual harvest cycle and watch a full fill-freeze-harvest sequence before closing the visit.',
    ],
    diyVsCall:
      "Cleaning a frosted ice maker with a hair dryer will get you a few weeks of ice but the frost will return — the underlying duct-seal issue is not solved. Resetting the ice maker via the front panel is harmless and worth trying. Anything beyond that — opening the duct, replacing sensors, swapping the assembly — is what we do every day, and the Samsung-specific parts are not stocked at typical big-box stores.",
    relatedErrorCodes: ['1E', '8E'],
    faq: [
      {
        q: 'My ice maker is frozen solid and the fridge is only two years old. Is this normal?',
        a: "Sadly yes — it's the most common Samsung complaint we see. The original ice room design lets warm humid air migrate in around the duct seal. The fix is to replace the seal and (often) install the redesigned ice maker.",
      },
      {
        q: "Should I just buy a countertop ice maker?",
        a: "It's a valid escape hatch, but the redesigned Samsung ice maker assembly addresses the freeze-up issue and most repairs hold up long-term. We'll tell you on the visit which is the better call for your specific unit.",
      },
      {
        q: 'How long does the repair take?',
        a: "A frozen-up ice maker repair is typically a single visit, 60-90 minutes, including thaw, seal replacement, and a fresh ice maker. We carry the parts on the truck for the most-affected models.",
      },
      {
        q: 'My panel shows 1E. Is it safe to keep using the fridge?',
        a: 'Yes — 1E is an ice maker fill sensor error and does not affect cooling. Turn off the ice maker via the panel until we can replace the sensor.',
      },
    ],
  },
  {
    slug: 'water-leak',
    title: 'Samsung Refrigerator Water Leak Repair',
    h1: 'Samsung Refrigerator Leaking Water? We Find the Source',
    metaDescription:
      'Stop water leaks under or inside your Samsung refrigerator. We diagnose drain blockages, dispenser leaks, and ice maker leaks. Call 424-407-1019.',
    shortDescription:
      'Water on the floor, ice on the freezer floor, or puddles in the produce drawers — we trace the leak to its source.',
    longIntro:
      "Water from a Samsung refrigerator usually comes from one of four sources, and the location of the puddle tells us which one. Water on the floor in front of the unit is almost always the dispenser line, the inlet valve, or — on French Door models — the icemaker fill tube. Water inside the fridge, pooling in the produce drawers, is the defrost drain backing up. An ice sheet on the freezer floor is the same defrost-drain problem, just frozen. Water behind the unit is the supply line itself.\n\nSamsung's defrost drain is one of the most clog-prone designs in the industry. It's narrow, runs through a heated grommet, and on Twin Cooling models it backs up because of a small ice plug forming in the grommet. Once it clogs, the meltwater from the defrost cycle has nowhere to go and overflows into the fridge or freezer. Once you see ice on the freezer floor, you'll see it again every two to four weeks until the drain is properly cleared and (often) the grommet is replaced with the upgraded part.\n\nWe diagnose leaks by location first, then by tracing the water path back. The actual repair is rarely complicated — but skipping the diagnosis and replacing the wrong part is expensive and the leak comes back.",
    symptoms: [
      'Water pooling on the floor in front of or under the fridge',
      'Ice sheet building up on the freezer floor',
      'Water in the bottom of the produce drawers',
      'Drips from the water dispenser between uses',
      'Damp insulation around the door frame',
      'Water behind the unit (supply line area)',
    ],
    commonCauses: [
      'Frozen or clogged defrost drain tube (Twin Cooling models)',
      'Cracked water inlet valve',
      'Failed water filter housing or O-ring',
      'Damaged or punctured water supply line',
      'Cracked drain pan',
      'Cracked icemaker fill tube',
    ],
    causes: [
      {
        title: 'Defrost drain clog',
        explanation:
          "The most common Samsung leak. The narrow drain channel from the freezer evaporator clogs with debris or freezes at the heater grommet, and meltwater overflows. Symptoms: ice on the freezer floor, water in the produce drawers, or both.",
      },
      {
        title: 'Cracked water inlet valve',
        explanation:
          "The solenoid valve that controls water flow into the dispenser and ice maker. When it cracks (or the body splits at a connection point) it leaks behind the unit, often onto the floor.",
      },
      {
        title: 'Failed water filter housing or O-ring',
        explanation:
          "The push-in filter housing on Samsung models has internal O-rings that fail with age. Symptoms: slow drip from the housing area, often noticed when changing the filter.",
      },
      {
        title: 'Damaged supply line',
        explanation:
          "The 1/4-inch line from the wall valve to the back of the fridge can pinch behind the unit when the fridge is pushed back, or split at the compression fitting.",
      },
      {
        title: 'Cracked drain pan',
        explanation:
          "The plastic pan under the unit that catches defrost water. On older units it cracks; meltwater drips onto the floor instead of evaporating off the compressor.",
      },
      {
        title: 'Cracked icemaker fill tube',
        explanation:
          "On French Door units the fill tube routes through the door hinge area. Plastic fatigue can split it; you get a slow drip down the door.",
      },
    ],
    repairSteps: [
      'Locate the leak: floor in front, inside the fridge, ice on freezer floor, or behind the unit.',
      'For ice-on-freezer-floor: clear the defrost drain and replace the upgraded heater grommet on Twin Cooling models.',
      'For dispenser drips: check the water inlet valve seat and replace if cracked.',
      'For under-unit leaks: inspect supply line, filter housing, and drain pan in that order.',
      'Run the dispenser, ice maker, and a defrost cycle to confirm the leak does not return.',
    ],
    diyVsCall:
      "If the leak is the supply line at the wall valve, that's a tighten-the-fitting fix you can handle. If it's a clogged defrost drain, the proper fix involves opening the freezer back panel and replacing the heater grommet — call. Don't keep mopping ice off the freezer floor for months; the underlying drain issue eventually causes warm-fridge problems too.",
    relatedErrorCodes: [],
    faq: [
      {
        q: 'There is ice forming on my freezer floor every couple of weeks. Is that the same problem?',
        a: 'Yes — it is the defrost drain backing up. Meltwater from the defrost cycle has nowhere to go, freezes into a sheet on the floor, and the cycle repeats. Until the drain is cleared and the grommet upgraded, it will keep coming back.',
      },
      {
        q: 'Can I just shut off the water supply to stop the leak?',
        a: "If the leak is at the supply line, valve, or ice maker — yes, that stops it temporarily. If it's a defrost drain leak, no, that water comes from the defrost cycle and shutting off the supply does nothing.",
      },
      {
        q: 'Will a leak damage the fridge if I leave it for a week?',
        a: 'A small drip — not in a week. A constant flow — yes, the floor and the cabinet bottom can warp. Place a towel and call us; same-day visits are usually available for active leaks.',
      },
    ],
  },
  {
    slug: 'freezer-not-freezing',
    title: 'Samsung Freezer Not Freezing Repair',
    h1: 'Samsung Freezer Not Freezing? Diagnosis and Repair',
    metaDescription:
      'Fix Samsung freezers that are too warm, soft-freezing food, or letting ice cream melt. Same-day Samsung freezer repair. Call 424-407-1019.',
    shortDescription:
      'Repair for Samsung freezers that no longer hold zero degrees — soft ice cream, frost-free food, or rising freezer temperature.',
    longIntro:
      "When the freezer side of a Samsung refrigerator stops freezing properly, the failure is almost always one of three things — airflow, sealed system, or controls. The trick is figuring out which without throwing parts at it. Soft ice cream and partially-thawed frozen food point to a freezer that's holding 15-25°F instead of zero. That kind of moderate-warm condition is usually airflow: failed evaporator fan, iced-over coil from a defrost fault, or a door that no longer seals. A freezer that's at or near room temperature points to either a compressor failure or a sealed-system leak.\n\nThe other Samsung-specific pattern is the FlexZone drawer not holding its set temperature. FlexZone is a converter compartment with its own evaporator and damper — when the FlexZone control or its damper fails, the rest of the freezer is fine but the FlexZone drifts warm. Worth checking if your model has one.\n\nWe diagnose with a thermometer on a real shelf, not the panel readout. The panel shows the set point and a sensor reading; the actual food temperature is what matters, and it's not always the same.",
    symptoms: [
      'Ice cream is soft or melting',
      'Frozen food is partially thawed',
      'Frost building up on packaging instead of in the freezer walls',
      'Freezer temperature display rising',
      'Compressor running but no cold air in the freezer',
      'FlexZone drawer not holding its set temperature',
    ],
    commonCauses: [
      'Failed evaporator fan motor',
      'Defrost heater or thermistor failure',
      'Iced-over evaporator coil',
      'Sealed-system leak',
      'Door gasket no longer sealing',
      'FlexZone damper or control failure',
    ],
    causes: [
      {
        title: 'Failed evaporator fan motor',
        explanation:
          "Without the fan blowing across the cold coil, the freezer can't get cold even though refrigerant is flowing. Often preceded by a noise change.",
      },
      {
        title: 'Defrost system fault',
        explanation:
          "Same root cause as the not-cooling issue — when the defrost cycle fails, ice builds on the evaporator coil, blocks airflow, and the freezer warms up.",
      },
      {
        title: 'Sealed-system leak',
        explanation:
          "Refrigerant leak somewhere in the closed loop. The compressor will run constantly but produce minimal cold. Requires EPA-certified repair.",
      },
      {
        title: 'Door gasket failure',
        explanation:
          "A torn or warped freezer gasket lets warm air in. Symptoms: frost on packaging, condensation around the door, longer compressor run times.",
      },
      {
        title: 'FlexZone damper or control',
        explanation:
          "The FlexZone compartment has its own air damper and (on some models) its own evaporator. Damper failure means warm FlexZone with a normal main freezer.",
      },
      {
        title: 'Compressor failure',
        explanation:
          "The least common cause but always possible on units 8+ years old. Compressor humming without cooling, or no compressor sound at all.",
      },
    ],
    repairSteps: [
      'Place a thermometer on a freezer shelf and verify actual temperature vs panel set point.',
      'Listen for the evaporator fan and the compressor. Silent compressor or fan is a clear failure.',
      'Inspect the door gasket and check for visible frost on packaging.',
      'Pull the rear freezer panel and inspect the evaporator coil for ice buildup.',
      'Replace the failed component, restore the panel, and verify the freezer pulls down to 0°F within 4 hours.',
    ],
    diyVsCall:
      "Cleaning the door gasket with warm soapy water and a bit of petroleum jelly is a fine DIY tune-up — sometimes that's the entire fix. Past that, the freezer compartment requires panel removal and electrical testing, which is not a typical DIY job.",
    relatedErrorCodes: ['21E', '5E'],
    faq: [
      {
        q: 'My freezer is at 20°F but the display says 0°F. Why?',
        a: "The display shows the set point and a sensor reading. If the freezer thermistor (sensor) has drifted, the panel can read 0°F while the actual air is 20°F. Replacing the thermistor is a common fix for this exact symptom.",
      },
      {
        q: 'How long should a Samsung freezer take to refreeze after a power outage?',
        a: 'A working freezer with a normal load pulls back to 0°F in about 4 hours. If yours has been off all night and still is not back to spec, something failed — call.',
      },
      {
        q: 'Is it worth fixing a 10-year-old Samsung freezer?',
        a: 'Depends on the failure. Defrost system, fan, sensor — yes, those are reasonable. Compressor or sealed-system on a 10-year-old unit is usually the point at which replacement makes more sense. We give you the math on the visit.',
      },
    ],
  },
  {
    slug: 'compressor-repair',
    title: 'Samsung Refrigerator Compressor Repair',
    h1: 'Samsung Linear & Inverter Compressor Repair',
    metaDescription:
      'Samsung compressor repair and replacement, including digital inverter compressors. Diagnosis, parts, and labor. Call 424-407-1019.',
    shortDescription:
      'Diagnose compressor start failures, noisy compressors, and dead compressors on Samsung refrigerators — including digital inverter models.',
    longIntro:
      "Samsung uses a digital inverter compressor on most modern refrigerators. The inverter board feeds the compressor a variable-frequency drive signal, so the compressor speeds up or slows down depending on cooling demand instead of cycling on and off. It's quieter and more efficient than a fixed-speed compressor, but it adds a failure mode — when the inverter board fails, the compressor doesn't run, and the symptom looks identical to a dead compressor.\n\nThe code that usually tells you something is wrong is 84C — compressor start failure. It can mean the inverter board is dead, the compressor is dead, the wiring between them is open, or (occasionally) a low-voltage condition is preventing start. The diagnostic order matters: test the inverter board first, then the compressor, because the board is roughly an eighth of the cost of a compressor and far more often the failure.\n\nWhen the compressor itself has failed, the math gets harder. Compressor + sealed-system labor is one of the most expensive refrigerator repairs. On a unit that's six years old or less and otherwise sound, it's usually worth it. On an older unit, replacement of the whole fridge often makes more sense — and we'll tell you that honestly on the visit.",
    symptoms: [
      'Compressor clicks on, then shuts off after a few seconds',
      'Loud humming or buzzing from the back of the fridge',
      'No cooling at all in either compartment',
      'Compressor is hot to the touch but not running',
      '84C error code on the panel',
      'Fridge tripping the breaker when it tries to start',
    ],
    commonCauses: [
      'Failed inverter board (digital inverter models)',
      'Compressor start relay or capacitor',
      'Compressor motor windings open or shorted',
      'Refrigerant overcharge or undercharge',
      'Restricted condenser airflow causing thermal shutdown',
      'Voltage drop on a shared circuit',
    ],
    causes: [
      {
        title: 'Failed inverter board',
        explanation:
          "The most common 84C cause. The board sits on the back of the unit near the compressor. Symptoms: 84C, no compressor noise, panel and lights work normally.",
      },
      {
        title: 'Failed compressor',
        explanation:
          "Less common than inverter board failure but always possible. Symptoms: hot compressor body, persistent buzzing without start, sometimes a tripped breaker.",
      },
      {
        title: 'Start relay or capacitor (older non-inverter Samsung models)',
        explanation:
          "On the few remaining non-inverter Samsung units, the start relay is the typical failure point. Cheap part, easy fix.",
      },
      {
        title: 'Refrigerant charge issue',
        explanation:
          "Overcharge or undercharge from a previous service can cause the compressor to overheat and shut down. Diagnosed with sealed-system pressure readings.",
      },
      {
        title: 'Restricted condenser airflow',
        explanation:
          "Dust mat behind the unit, or a built-in installation with no clearance for airflow. The compressor overheats and the thermal overload trips it offline.",
      },
      {
        title: 'Voltage drop on a shared circuit',
        explanation:
          "Refrigerator on the same 15A circuit as a microwave or space heater. Inrush current at compressor start drops below the start threshold and the compressor never gets going.",
      },
    ],
    repairSteps: [
      'Verify the breaker is fully on and the unit is on its own circuit, not shared with high-draw appliances.',
      'Pull the rear access panel and inspect the inverter board for visible damage (burn marks, swollen capacitors).',
      'Test the inverter board output — if it is not driving the compressor, replace it.',
      'If the inverter board is good, test the compressor windings for continuity and resistance to ground.',
      'On a confirmed bad compressor, present the cost of compressor + sealed-system labor vs. unit replacement before proceeding.',
    ],
    diyVsCall:
      "Verifying the unit has its own circuit and pulling out from the wall to clear the condenser coil — both safe DIY tasks that occasionally fix a thermal-shutdown issue. Anything beyond that requires testing high-voltage components and (for the compressor itself) sealed-system work that requires an EPA certification by law.",
    relatedErrorCodes: ['84C'],
    faq: [
      {
        q: 'My panel shows 84C. Is the compressor dead?',
        a: 'Maybe — but more often the inverter board is the failure, not the compressor. The board costs roughly an eighth of a compressor replacement, so we always test the board first.',
      },
      {
        q: 'How long does a compressor replacement take?',
        a: 'Typically a half-day on-site for a compressor swap, plus the recharge. Often we order the compressor on the diagnostic visit and complete the work on a follow-up.',
      },
      {
        q: 'Is a Samsung digital inverter compressor under warranty?',
        a: 'Compressors on Samsung refrigerators usually carry a 10-year limited warranty, but the labor is rarely covered after the first year. Have your model and serial number ready and we will check warranty status before quoting.',
      },
      {
        q: 'Should I replace a 12-year-old fridge instead of fixing the compressor?',
        a: "Usually yes. Compressor + sealed-system labor on a 12-year-old unit is a significant fraction of a new fridge, and the rest of the components have aged at the same rate. We'll give you both numbers and let you decide.",
      },
    ],
  },
  {
    slug: 'control-board-repair',
    title: 'Samsung Refrigerator Control Board Repair',
    h1: 'Samsung Refrigerator Control Board Repair & Replacement',
    metaDescription:
      'Samsung main PCB and display board repair. Fix communication errors, dead displays, and erratic temperature behavior. Call 424-407-1019.',
    shortDescription:
      'Replace failed main control boards (PCBs) and display boards causing communication errors, dead panels, and erratic behavior.',
    longIntro:
      "Samsung refrigerators have at least two control boards — the main PCB on the back of the unit and the display/control board behind the front panel. They communicate over a low-voltage data bus, and when communication fails (41C, PC ER) the panel becomes unreliable even though cooling may continue. Most calls in this category fall into one of three buckets: a dead panel, intermittent error codes, or symptoms where the fridge keeps doing something the panel says it shouldn't (compressor running while in Power Cool off, fans cycling oddly).\n\nDiagnostically, board failures are tricky because the symptoms can mimic sensor or motor failures. We always test the suspected sensor or motor first — boards are the expensive replacement and we don't want to swap one when the actual failure is a $30 thermistor reporting nonsense. When the board really is the culprit, replacement is usually a 60-90 minute job including programming the model-specific configuration the new board needs.\n\nA particular Samsung-specific pattern: power surges. The boards on Samsung refrigerators are not especially surge-tolerant, and a single nearby lightning strike or power-grid blip can take out the inverter board, the main PCB, and the display all at once. Surge protection on the dedicated fridge circuit is not paranoid; we recommend it routinely.",
    symptoms: [
      'Display panel is dead or showing garbled characters',
      'Communication error codes (41C, PC ER)',
      'Temperature settings reset themselves',
      'Compressor or fan running on the wrong cycle',
      'Touch buttons unresponsive',
      'Multiple unrelated symptoms appearing at once after a storm',
    ],
    commonCauses: [
      'Failed main PCB on the back of the unit',
      'Failed display board behind the front panel',
      'Damaged ribbon cable between display and main board',
      'Surge or voltage spike damage',
      'Moisture intrusion into the control board housing',
      'Failed door switch reporting wrong state to the board',
    ],
    causes: [
      {
        title: 'Main PCB failure',
        explanation:
          "The board on the back of the unit that runs the cooling cycle, defrost timing, and ice maker. Symptoms: erratic cooling, multiple error codes at once, defrost system not running.",
      },
      {
        title: 'Display board failure',
        explanation:
          "The board behind the front panel. Symptoms: dead or garbled display, unresponsive touch buttons, panel resets itself.",
      },
      {
        title: 'Communication failure (41C, PC ER)',
        explanation:
          "The data link between main PCB and display board. Often caused by a damaged ribbon cable in the door hinge area, or by a failure of either board's data transceiver.",
      },
      {
        title: 'Surge damage',
        explanation:
          "Lightning, power-grid spike, or a nearby high-current load (welder, AC startup). Often takes out multiple boards at once. Surge protector on the fridge circuit is the prevention.",
      },
      {
        title: 'Moisture intrusion',
        explanation:
          "The main PCB housing on Samsung units is not fully sealed. A leaking water line behind the unit can drip onto the board over months and corrode it.",
      },
      {
        title: 'Wrong-state sensor input',
        explanation:
          "A failed door switch or thermistor reports nonsense to the board, and the board responds with what looks like erratic behavior. Always rule out the simple input failure first.",
      },
    ],
    repairSteps: [
      'Reproduce the failure — code, dead panel, wrong cycle behavior — and document what works and what does not.',
      'Test the obvious sensor or switch inputs that could mimic a board failure (door switches, thermistors).',
      'For 41C / PC ER: inspect the ribbon cable in the door hinge, then test the data line at the main board.',
      'Replace the failed board. New boards usually require programming the model-specific configuration.',
      'Verify all panel functions, run a defrost cycle, and confirm the original symptom is gone before closing.',
    ],
    diyVsCall:
      "Power-cycling the unit at the breaker for 10 minutes is harmless and occasionally clears a soft fault. Cleaning the door switches with a contact cleaner is a fine DIY check. Past that — opening the back of the unit and probing high-voltage circuits — is what we do every day, and the boards themselves are not always available at retail.",
    relatedErrorCodes: ['41C', 'PC ER'],
    faq: [
      {
        q: 'My display went dark but the fridge is still cooling. Is that the board?',
        a: "Usually yes — that's a classic display board failure. Cooling continues because the main PCB is independent. Replacement is typically a single visit.",
      },
      {
        q: 'I keep seeing 41C come and go. Is it safe to ignore?',
        a: "Cooling-wise, yes. But the underlying communication issue means you can't trust panel settings (Power Cool, ice maker on/off, temperature changes). We'd recommend addressing it within a couple of weeks rather than living with it.",
      },
      {
        q: 'Will a surge protector prevent this in the future?',
        a: 'A whole-house surge protector at the panel, plus a dedicated point-of-use protector on the fridge circuit, will catch most damaging spikes. Not paranoid — recommended.',
      },
    ],
  },
  {
    slug: 'door-seal-repair',
    title: 'Samsung Refrigerator Door Seal & Gasket Repair',
    h1: 'Samsung Refrigerator Door Seal Replacement',
    metaDescription:
      'Replace torn, warped, or moldy Samsung refrigerator door gaskets. Stop frost buildup and energy waste. Call 424-407-1019.',
    shortDescription:
      'Replace damaged door gaskets that cause frost buildup, condensation, and forced compressor cycling.',
    longIntro:
      "A failed door gasket on a Samsung refrigerator is one of the few problems that gets steadily worse without ever making the fridge stop working entirely. Warm humid air leaks past the gasket continuously, the cooling system runs longer to compensate, frost builds up where it shouldn't, and the energy bill creeps up. Most homeowners notice the symptom (frost on the inside ceiling, water in the produce drawers, ice on the freezer floor) before they connect it to a torn or warped gasket.\n\nSamsung gaskets are typically magnetic press-fit. The magnet inside the gasket pulls the gasket against the cabinet flange and the seal forms. They fail in three ways: the gasket itself tears (usually at a corner from heavy door pulls), the magnet weakens and the seal stops forming reliably, or the gasket warps from a previous frost event and no longer sits flat. Less commonly, the door alignment shifts (loose hinges) and even a perfect gasket can't seal because the door sits crooked.\n\nReplacement is straightforward — about a 30-minute job per door, and we carry the common Samsung gasket profiles on the truck. The trickier work is on door alignment when the hinges have worn; that needs more time but is also a one-visit fix.",
    symptoms: [
      'Visible gap between door and cabinet when closed',
      'Frost or condensation around the door edge',
      'Door drifts open after being closed',
      'Mold or staining on the gasket itself',
      'Higher-than-normal compressor run time',
      'Frost on the inside ceiling of the fridge',
    ],
    commonCauses: [
      'Gasket torn at the corner from heavy door pulls',
      'Magnetic strip inside the gasket has weakened',
      'Door alignment shifted (hinges loose or worn)',
      'Cabinet flange warped from a previous frost event',
      'Adhesive failure on a press-fit gasket',
      'Mold growth weakening the gasket material',
    ],
    causes: [
      {
        title: 'Gasket torn at the corner',
        explanation:
          "The most common failure point. Years of pulling the door open at the corner causes the gasket material to fatigue and split. Visible if you flex the corner.",
      },
      {
        title: 'Weakened magnetic strip',
        explanation:
          "The magnet inside the gasket loses pull over time. The gasket looks fine but no longer pulls into the cabinet flange. Symptoms: door drifts open, frost on inside ceiling.",
      },
      {
        title: 'Door alignment shift',
        explanation:
          "Hinges wear, the door sits slightly crooked, and even a new gasket can't seal. Diagnosed by checking gap consistency around all four sides with the door closed.",
      },
      {
        title: 'Warped cabinet flange',
        explanation:
          "A past freeze-thaw event (defrost system fault) warped the metal flange the gasket presses against. Usually visible as a wave in the otherwise-flat flange.",
      },
      {
        title: 'Adhesive failure',
        explanation:
          "On press-fit gaskets the adhesive backing eventually fails and the gasket lifts away from its retainer. Re-adhesion usually fails too — replacement is the right call.",
      },
      {
        title: 'Mold growth',
        explanation:
          "Mold weakens the gasket material from the inside. Symptoms: black or pink staining inside the gasket folds, gasket feels soft or breaks easily. Replace, don't try to clean.",
      },
    ],
    repairSteps: [
      'Visual inspection of all four sides of the door for visible tears, gaps, or compression marks.',
      'Dollar-bill test: close the door on a bill and try to pull it out. Easy pull = gasket failure at that location.',
      'Check door alignment — measure gap consistency around the perimeter with the door closed.',
      'Replace the gasket (or gaskets — French Door units have two), seating into the retainer or attaching with new adhesive.',
      'Verify the seal with a fresh dollar-bill test on all four sides and watch the door close-and-stay-closed.',
    ],
    diyVsCall:
      "If you're handy and the gasket profile is in stock, gasket replacement is doable. The trick is getting the right profile (Samsung uses several depending on model and door), seating it consistently, and adjusting hinges if the door has shifted. We carry common profiles and tools; if you'd rather pay someone, this is a quick visit.",
    relatedErrorCodes: [],
    faq: [
      {
        q: 'How do I know if my gasket is bad without taking it apart?',
        a: "Close the door on a dollar bill and try to pull it out. If it slides out with no resistance, the gasket isn't sealing at that spot. Walk it around the perimeter — if any side fails, the gasket needs replacement.",
      },
      {
        q: 'Can mold on the gasket make us sick?',
        a: 'Surface mold on a refrigerator gasket is a hygiene issue more than a health one for most people, but if the mold has penetrated the gasket itself the only fix is replacement. Cleaning at that point is not effective.',
      },
      {
        q: 'How long do Samsung gaskets last?',
        a: 'Typically 7-10 years on a residential refrigerator. Heavy use (kids, frequent door pulls, hot kitchens) shortens that. Replacing one as a maintenance item before it fails is reasonable.',
      },
    ],
  },
  {
    slug: 'noisy-refrigerator',
    title: 'Samsung Refrigerator Noise Repair',
    h1: 'Samsung Refrigerator Making Noise? Find the Source',
    metaDescription:
      'Stop buzzing, knocking, clicking, and grinding noises from your Samsung refrigerator. Same-day diagnosis. Call 424-407-1019.',
    shortDescription:
      'Identify and silence the source of buzzing, clicking, grinding, or knocking from your Samsung refrigerator.',
    longIntro:
      "Refrigerator noises map cleanly to specific failed parts, and on Samsung the matching is consistent enough that we can usually narrow it down before opening the unit. A loud buzz from the back is the inverter compressor working hard or the inverter board itself failing. A clicking sound every few minutes is usually a relay cycling or — on French Door models — the FlexZone damper motor. Grinding or scraping inside the freezer is a fan blade hitting an ice buildup. Knocking when the compressor cycles on is worn compressor mounting grommets. A high-pitched whine is a fan motor with dry bearings.\n\nWhat noise is not, on a Samsung refrigerator, is something you can ignore and hope it stops. Most of these noises are early warnings of a bigger failure. The whining fan eventually seizes (then the freezer warms up). The clicking relay eventually gets stuck (then the compressor never starts). The grinding ice fan eventually breaks the blade off (then no airflow). Diagnosing the noise early and replacing the failing part is far cheaper than waiting for the cascading failure.\n\nWe'll typically arrive, listen for a few cycles, isolate the source, and quote the repair on the spot. Most noise repairs are single-visit jobs.",
    symptoms: [
      'Loud buzzing or humming from the back',
      'Clicking sound every few minutes',
      'Grinding or scraping from inside the freezer',
      'Knocking sound when the compressor cycles on',
      'High-pitched whining from a fan',
      'Rattling that comes and goes',
    ],
    commonCauses: [
      'Evaporator or condenser fan blade hitting an ice buildup',
      'Worn compressor mounting grommets',
      'Failing inverter board',
      'Loose drain pan vibrating against the cabinet',
      'Ice maker auger motor straining against frozen ice',
      'Failed defrost timer / relay clicking',
    ],
    causes: [
      {
        title: 'Fan blade hitting ice',
        explanation:
          "Most common cause of grinding inside the freezer. The evaporator fan blade contacts an ice buildup behind the rear panel. Often paired with reduced cooling.",
      },
      {
        title: 'Worn compressor mounts',
        explanation:
          "Rubber grommets that isolate the compressor from the frame harden and crack with age. Symptoms: knocking on compressor start, increased vibration transferring to the floor.",
      },
      {
        title: 'Failing inverter board',
        explanation:
          "A loud, constant buzz from the back of the unit, often louder than the compressor itself. The board's switching circuitry is failing.",
      },
      {
        title: 'Loose drain pan',
        explanation:
          "The plastic pan under the unit can shift and rattle against the chassis when the compressor runs. Easy fix once located.",
      },
      {
        title: 'Ice maker auger straining',
        explanation:
          "When the ice in the bucket clumps together, the auger motor strains and groans. Symptoms: noise from the door, often paired with no ice dispensing.",
      },
      {
        title: 'Defrost timer or relay clicking',
        explanation:
          "Loud, repeated clicks every few seconds usually indicate a relay trying to engage and failing. Symptoms: clicking, often paired with a non-starting compressor.",
      },
    ],
    repairSteps: [
      'Listen through a full cycle — compressor on, compressor off, defrost cycle if it triggers — and isolate when the noise occurs.',
      'For grinding inside the freezer: pull the rear panel and check for ice on the fan blade.',
      'For loud buzzing: inspect the inverter board for visible damage and test under load.',
      'For knocking on start: inspect compressor mounts and tighten or replace grommets.',
      'Verify the noise is gone through a complete cycle before closing the visit.',
    ],
    diyVsCall:
      "Pulling the unit out from the wall and checking for a loose drain pan or rattling object on top of the fridge is fair DIY. Anything inside the freezer, the back of the unit, or the door is professional work — partly because the parts aren't easy to source and partly because the diagnosis is faster when you've heard the noise a hundred times before.",
    relatedErrorCodes: [],
    faq: [
      {
        q: 'Is a buzzing fridge dangerous?',
        a: "Not in the short term, but a constant loud buzz usually means the inverter board is failing. Left alone, it eventually stops driving the compressor and the unit stops cooling. Address it within a couple of weeks rather than waiting.",
      },
      {
        q: 'Can I tighten the compressor mounts myself?',
        a: "Theoretically yes — they're accessible from the back. Practically, the new grommets need the right Samsung-spec parts and the compressor has to be lifted slightly to clear them. Doable for a confident DIYer; quick for us.",
      },
      {
        q: 'My fridge gets quiet when I close the freezer door. Is that normal?',
        a: "Slightly muffled, sure — the freezer compartment is where most noise originates. If it goes from loud-grinding to silent when you close the door, the noise source is inside the freezer (almost always the evaporator fan). Worth a service call.",
      },
    ],
  },
  {
    slug: 'error-code-repair',
    title: 'Samsung Refrigerator Error Code Repair',
    h1: 'Samsung Refrigerator Error Code Diagnosis & Repair',
    metaDescription:
      'Samsung refrigerator error code diagnosis and repair: 1E, 5E, 8E, 21E, 22E, 41C, 84C, OF OF, PC ER. Call 424-407-1019.',
    shortDescription:
      'Decode the error code on your Samsung display panel and get the underlying fault repaired the same day.',
    longIntro:
      "Samsung refrigerator panels report specific faults as alphanumeric codes, and once you know the code the diagnostic path is short. The E-series codes (1E, 5E, 8E, 21E, 22E) are sensor and fan faults — the panel is reporting that one of the data inputs it expected has gone out of range, or one of the motors it expected to be turning is not. Those are usually $30-$80 part repairs and single-visit fixes.\n\nThe C-series codes (41C, 84C, PC ER) are higher up the stack. 41C and PC ER are panel-to-board communication failures, often caused by a damaged ribbon cable, a failed display board, or a failed main PCB. 84C is compressor start failure — most often the inverter board, occasionally the compressor itself. OF OF is not a fault at all; it's Demo mode (showroom mode) accidentally activated, which disables the compressor.\n\nBelow we link to a dedicated page for each code with what it means, what to safely try first, and when to stop trying and call. If you have a code on your panel right now, jump straight to that page.",
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
      'Compressor start failure (inverter board or compressor)',
      'Demo mode or cooling-off mode accidentally enabled',
    ],
    causes: [
      {
        title: 'Sensor / thermistor failure (E-series codes)',
        explanation:
          "Most E codes (5E, 8E, 21E, 22E) point to a specific sensor or motor that has gone out of range. Sensor itself is cheap; getting to it sometimes requires panel removal.",
      },
      {
        title: 'Communication failure (41C, PC ER)',
        explanation:
          "The main PCB on the back of the unit cannot talk to the display board on the door. Usually a damaged ribbon cable, a failed board, or moisture intrusion.",
      },
      {
        title: 'Compressor start failure (84C)',
        explanation:
          "Inverter board or compressor itself. We always test the inverter board first — it's the more common failure and the cheaper fix.",
      },
      {
        title: 'Demo / cooling-off mode (OF OF)',
        explanation:
          "Showroom mode that disables the compressor while keeping the panel and lights working. Not a fault — just needs to be exited via the panel.",
      },
      {
        title: 'Ice maker subsystem (1E, 8E)',
        explanation:
          "1E is the fill sensor; 8E is the ice maker thermistor. Both fail at similar rates and both are usually paired with no-ice or freeze-up symptoms.",
      },
    ],
    repairSteps: [
      'Note the exact code (some look similar — 21E vs 22E, 8E vs 5E) and pair it with the symptom.',
      'Try a 5-10 minute power-cycle at the breaker. Some E codes clear on a soft fault.',
      'For codes that return: the dedicated error-code page tells you what to test and replace.',
      'Replace the failed sensor / motor / board and clear the code.',
      'Run the affected subsystem (defrost, ice maker, compressor) to verify the code does not return.',
    ],
    diyVsCall:
      "Power-cycling at the breaker is the safe first step for any code. For OF OF, exiting Demo mode via the panel is a 10-second fix you can do yourself (instructions on the OF OF page). Beyond that, the fix is component replacement and that's where we come in.",
    relatedErrorCodes: ['1E', '5E', '8E', '21E', '22E', '41C', '84C', 'OF OF', 'PC ER'],
    faq: [
      {
        q: 'My panel keeps showing different codes. Is the whole fridge dying?',
        a: 'Usually it means the main PCB is failing — when the board itself glitches, it can throw codes from multiple subsystems even though the underlying sensors and motors are fine. Worth an on-site diagnosis before assuming the worst.',
      },
      {
        q: 'Can I just put tape over the code and ignore it?',
        a: "You can — and for OF OF or a transient sensor flicker, that's not unreasonable. For 84C, 41C, or codes that come with cooling problems, ignoring it is how a $200 repair becomes a $700 one. Read the code's dedicated page first.",
      },
      {
        q: 'Where do I find the model number to look up the right code list?',
        a: "Inside the fridge on the left wall, or on a sticker behind the kick-plate at the bottom of the unit. Format is usually RF##XXXXX or RS##XXXXX. Have it ready when you call and we can confirm the code's meaning for your specific model.",
      },
    ],
  },
];

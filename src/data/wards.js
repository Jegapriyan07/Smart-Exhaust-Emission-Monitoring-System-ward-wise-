export const WARDS = [
  {
    id: "W-101",
    name: "Rohini Sector 9",
    type: "Traffic Corridor",
    baseline: 280, // High baseline for traffic zones [cite: 41]
    dominantSource: "Traffic",
    authority: "Traffic Police",
    action: "Signal diversion + enforcement"
  },
  {
    id: "W-102",
    name: "Okhla Ind. Area",
    type: "Industrial Zone",
    baseline: 220, // Industrial baseline [cite: 34]
    dominantSource: "Industry",
    authority: "PCB Enforcement Squad",
    action: "Check scrubber units"
  },
  {
    id: "W-103",
    name: "Dwarka Residential",
    type: "Residential",
    baseline: 180, // Lower baseline [cite: 43]
    dominantSource: "Biomass/Waste",
    authority: "Municipal Corporation",
    action: "Dispatch waste collection"
  }
];
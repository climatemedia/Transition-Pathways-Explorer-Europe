export const warnings = {
  "str_warning": {
    "orange": "Annual oversupply is 25% higher than the annual charging capacity of storage units.",
    "red": "Annual oversupply is 50% higher than the annual charging capacity of storage units.",
    "levers": ["lever_decom_fossil", "lever_capacity_nuclear", "lever_capacity_RES_wind" , "lever_capacity_RES_solar", "lever_capacity_RES_other", "lever_bioenergy-capacity"],
    "tabs": ["energy"]
  },
  "wat_warning": {
    "orange": "More than five regions suffer from water scarcity.",
    "red": "More than three regions suffer from severe water scarcity.",
    // maybe enable different levers for orange and red
    // levers are optional
    "levers": ["lever_climate-smart-crop", "lever_diet","lever_kcal-req", "lever_bioenergy-capacity", "lever_temp","lever_food-net-import", "lever_fuel-mix"],
    // maybe enable different tabs for orange and red
    "tabs": ["water"]
  },
  // "clm_drought-warning": {
  //   "orange": "Severe drought risk in Southern Europe and moderate drought risk throughout the rest of Europe",
  //   "red": "Extreme drought risk in Southern Europe and severe drought risk throughout the rest of Europe",
  //   "levers": ["lever_temp", "lever_ems-after-2050"],
  //   "tabs": ["climate"]
  // },
  "clm_flood-warning": {
    "orange": "Severely increased flood risk",
    "red": "Extreme flood risk",
    "levers": ["lever_temp", "lever_ems-after-2050"],
    "tabs": ["climate"]
  },
  "min_fossil-fuel_warning": {
    "orange": "Fossil Fuel supply risk.",
    "red": "Fossil Fuel extreme supply risk.",
    "levers": ["lever_capacity_RES_wind", "lever_capacity_RES_solar", "lever_capacity_RES_other", "lever_passenger_modal-share"],
    "tabs": ["materials"]
  },
  "min_mineral_warning": {
    "orange": "Mineral supply risk.",
    "red": "Mineral extreme supply risk.",
    "levers": ["lever_pkm","lever_passenger_modal-share","lever_occupancy_LDV" ],
    "tabs": ["materials"]
  },
  "tra_warning_efuels": {
    "orange": "Quantity of efuels too large for the foreseen production capacity in case of minimal policy support.",
    "red": "Quantity of efuels too large for the foreseen production capacity with high policy support",
    "levers": ["lever_fuel-mix","lever_passenger_technology-share_new","lever_passenger_veh-efficiency_new","lever_freight_tkm","lever_pkm","lever_passenger_modal-share","lever_passenger_occupancy","lever_passenger_utilization-rate"],
    "tabs": ["transport"]
  }
};

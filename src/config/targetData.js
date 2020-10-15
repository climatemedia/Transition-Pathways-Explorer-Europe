export const GlobalBudgets = {
  "1.5": 920,
  "2.0": 1900
};

export const BudgetShares = {
  "capability": {
    "title": "Capability",
    "shares": {
      "EU28+1": {
        "1.5": 30,
        "2.0": 60
      },
      "Rest of the World": {
        "1.5": 920 - 30,
        "2.0": 1900 - 60
      }
    },
  },
  "perCapita": {
    "title": "Per capita",
    "shares": {
      "EU28+1": {
        "1.5": 60,
        "2.0": 120
      },
      "Rest of the World": {
        "1.5": 920 - 60,
        "2.0": 1900 - 120
      }
    }
  }
};

export const RegionColors = {
  'EU28+1': '#77c046',
  'Rest of the World': '#9b9b9b',
};

export const LimitGHG = 350; //visual limit for GHG gauge

export const Produced2018 = 1100;

export interface EnergyData {
  generation: number;
  storage: number;
  consumption: number;
  exported: number;
  batteryPercentage: number;
  solarHealth: number;
  windHealth: number;
  irradiation: number;
  temperature: number;
  weatherCondition: string;
  sunlightHours: number;
}

export interface NotificationItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  icon: string;
}

export interface ChartDataPoint {
  time: string;
  generation: number;
  consumption: number;
  storage: number;
}

// Mock current energy data
export const currentEnergyData: EnergyData = {
  generation: 12.8,
  storage: 18.5,
  consumption: 8.2,
  exported: 4.6,
  batteryPercentage: 78,
  solarHealth: 92,
  windHealth: 85,
  irradiation: 85,
  temperature: 24,
  weatherCondition: 'Sunny',
  sunlightHours: 8.2,
};

// Mock notifications
export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Solar Panel Cleaning Due',
    message: 'Panel efficiency has dropped to 92%. Schedule cleaning soon.',
    timestamp: '2 hours ago',
    icon: '🌞'
  },
  {
    id: '2',
    type: 'info',
    title: 'Peak Generation Hour',
    message: 'Solar panels are generating maximum power.',
    timestamp: '4 hours ago',
    icon: '⚡'
  },
  {
    id: '3',
    type: 'critical',
    title: 'Low Battery Warning',
    message: 'Battery level has dropped below 20%.',
    timestamp: '1 day ago',
    icon: '🔋'
  }
];

// Mock chart data for different time periods
export const generateChartData = (period: 'day' | 'week' | 'month' | 'year'): ChartDataPoint[] => {
  const baseData = [];
  let points = 24;
  let timeUnit = 'hour';
  let generationBase = 12;
  let consumptionBase = 8;
  let storageBase = 15;
  
  switch (period) {
    case 'week':
      points = 7;
      timeUnit = 'day';
      generationBase = 180; // Weekly totals
      consumptionBase = 120;
      storageBase = 200;
      break;
    case 'month':
      points = 30;
      timeUnit = 'day';
      generationBase = 25; // Daily averages for month
      consumptionBase = 18;
      storageBase = 35;
      break;
    case 'year':
      points = 12;
      timeUnit = 'month';
      generationBase = 750; // Monthly totals for year
      consumptionBase = 540;
      storageBase = 950;
      break;
  }

  for (let i = 0; i < points; i++) {
    // Add seasonal variation for yearly data
    let seasonalMultiplier = 1;
    if (period === 'year') {
      // Higher generation in summer months (April-September in India)
      seasonalMultiplier = (i >= 3 && i <= 8) ? 1.3 + (Math.sin((i - 3) * Math.PI / 6) * 0.4) : 0.7 + (Math.random() * 0.3);
    }
    
    // Add weekly pattern for daily data
    let weekdayMultiplier = 1;
    if (period === 'day') {
      // Peak hours pattern for solar generation
      weekdayMultiplier = i >= 6 && i <= 18 ? 1.2 + (Math.sin((i - 6) * Math.PI / 12) * 0.8) : 0.1 + (Math.random() * 0.2);
    }
    
    const multiplier = seasonalMultiplier * weekdayMultiplier;
    
    baseData.push({
      time: `${i + 1}${timeUnit === 'hour' ? ':00' : timeUnit === 'day' ? ' Day' : ' Month'}`,
      generation: Math.max(0, (Math.random() * generationBase + generationBase * 0.5) * multiplier),
      consumption: Math.max(1, Math.random() * consumptionBase + consumptionBase * 0.7),
      storage: Math.max(5, Math.random() * storageBase + storageBase * 0.6),
    });
  }
  
  return baseData;
};

// Mock user settings
export const mockUserSettings = {
  name: 'Alex Johnson',
  role: 'Operator',
  lowStorageAlert: 20,
  minSolarHealth: 85,
  maxConsumption: 15,
  darkMode: false,
  language: 'English'
};

// Mock weather location
export const mockLocation = {
  city: 'Ramapur',
  region: 'Odisha',
  country: 'India'
};

// Mock energy data for different sources
export const getEnergyDataBySource = (source: 'solar' | 'wind' | 'grid') => {
  const baseData = { ...currentEnergyData };
  
  switch (source) {
    case 'solar':
      return {
        ...baseData,
        generation: 15.2,
        storage: 22.8,
        consumption: 9.1,
        exported: 6.1,
        batteryPercentage: 85,
        solarHealth: 94,
        windHealth: 0,
        irradiation: 92,
        temperature: 32,
        weatherCondition: 'Sunny',
        sunlightHours: 9.8,
      };
    case 'wind':
      return {
        ...baseData,
        generation: 8.4,
        storage: 14.2,
        consumption: 7.8,
        exported: 0.6,
        batteryPercentage: 58,
        solarHealth: 0,
        windHealth: 88,
        irradiation: 45,
        temperature: 28,
        weatherCondition: 'Cloudy',
        sunlightHours: 3.2,
      };
    case 'grid':
      return {
        ...baseData,
        generation: 0,
        storage: 8.5,
        consumption: 12.4,
        exported: 0,
        batteryPercentage: 32,
        solarHealth: 0,
        windHealth: 0,
        irradiation: 15,
        temperature: 26,
        weatherCondition: 'Rainy',
        sunlightHours: 1.5,
      };
    default:
      return baseData;
  }
};
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';

export interface EnergyData {
  generation: number;
  storage: number;
  consumption: number;
  batteryPercentage: number;
  solarHealth: number;
  irradiation: number;
  temperature: number;
  weatherCondition: string;
  sunlightHours: number;
}

export const useEnergyData = () => {
  const [energyData, setEnergyData] = useState<EnergyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const energyDataRef = ref(db, 'energyData');

    const unsubscribe = onValue(
      energyDataRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setEnergyData(snapshot.val());
        } else {
          setEnergyData(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { energyData, loading, error };
};

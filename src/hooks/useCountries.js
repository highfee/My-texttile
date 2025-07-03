import { useState, useEffect } from 'react';
import { GetCountries } from '@/pages/api/countries';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      try {
        const response = await GetCountries();
        const sortedCountries = response.sort((a, b) => {
          if (a.countryCode && b.countryCode) {
            return a.countryCode.localeCompare(b.countryCode);
          }
          return 0;
        });
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, isLoadingCountries };
};
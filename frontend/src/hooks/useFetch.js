import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
};

export default useFetch;
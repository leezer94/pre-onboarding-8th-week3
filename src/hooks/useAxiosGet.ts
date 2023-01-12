import axios from 'axios';
import { BASE_URL } from 'constant';
import { useState, useEffect } from 'react';

const useAxiosGet = (debouncedKeyword: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (!debouncedKeyword) {
        setData([]);

        return;
      }

      const { data } = await axios.get(`${BASE_URL}?q=${debouncedKeyword}`);

      setData(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedKeyword]);

  return { data, error, isLoading };
};

export default useAxiosGet;

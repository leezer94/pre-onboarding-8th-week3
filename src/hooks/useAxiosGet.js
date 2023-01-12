import axios from 'axios';
import { BASE_URL } from 'constant';
import { useState, useEffect } from 'react';

const cache = new Map();

const useAxiosGet = (keyword, cacheSize = 10, cacheTime = 3600 * 1000) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const removeOldestItem = () => {
    let oldestKey;
    let oldestTimestamp = Infinity;

    for (const [key, value] of cache) {
      if (value.timestamp < oldestTimestamp) {
        oldestKey = key;
        oldestTimestamp = value.timestamp;
      }
    }
    cache.delete(oldestKey);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const cacheKey = keyword;

        if (!keyword) {
          setData([]);
          setIsLoading(false);

          return;
        }

        if (cache.has(cacheKey) === true) {
          const cachedData = cache.get(cacheKey);

          console.log('cached', cachedData);

          if (cachedData.expires > Date.now()) {
            cachedData.timestamp = Date.now();
            setData(cachedData.data);
            setIsLoading(false);

            return;
          }
          cache.delete(cacheKey);
        }

        if (cache.size === cacheSize) {
          removeOldestItem();
        }

        const { data } = await axios.get(`${BASE_URL}?q=${keyword}`);

        cache.set(cacheKey, {
          data,
          expires: Date.now() + cacheTime,
          timestamp: Date.now(),
        });

        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [keyword, cacheSize, cacheTime]);

  return { data, error, isLoading };
};

export default useAxiosGet;

// import { useState, useEffect } from 'react';

// const useAxiosGet = (debouncedKeyword: string) => {
//   const cache = new Map();
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   if (cache.has(debouncedKeyword)) {
//     const cachedData = cache.get(debouncedKeyword);

//     console.log(cachedData);
//   }

//   const fetchData = async () => {
//     try {
//       if (!debouncedKeyword) {
//         setData([]);

//         return;
//       }

//       const { data } = await axios.get(`${BASE_debouncedKeyword}?q=${debouncedKeyword}`);

//       cache.set(debouncedKeyword, data);

//       setData(data);
//     } catch (error: any) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [debouncedKeyword]);

//   return { data, error, isLoading };
// };

// export default useAxiosGet;

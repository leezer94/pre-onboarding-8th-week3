import axios from 'axios';
import { BASE_URL } from 'constant';
import { useState, useEffect } from 'react';
import { CACHE_SIZE, CACHE_TIME } from 'utils';

const cache = new Map();

const useAxiosGet = (
  keyword,
  cacheSize = CACHE_SIZE,
  cacheTime = CACHE_TIME.THREE_MINS,
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const removeOldestItem = () => {
    let oldestKey;
    let oldestTimestamp = Infinity;

    for (const [key, value] of cache) {
      // 가장 오래된 타임스탬프를 가지고 있는 객체를 삭제한다.
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

        if (cache.has(cacheKey)) {
          // 캐싱된 키값이 있을 경우에는 캐싱된 값을 쓴다.
          const cachedData = cache.get(cacheKey);

          if (cachedData.expires > Date.now()) {
            cachedData.timestamp = Date.now();
            setData(cachedData.data);
            setIsLoading(false);

            return;
          }
          cache.delete(cacheKey);
        }

        if (cache.size === cacheSize) {
          // 캐싱된 데이터의 사이즈 초과시에 삭제
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

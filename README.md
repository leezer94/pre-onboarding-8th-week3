# π  κ²μμ΄ μΆμ²κΈ°λ₯ κ΅¬ννκΈ°

<!-- <p align="middle">
<img src="./screenshot.png" />
</p> -->

## πλͺ©μ°¨
---
  - [π μ¬μ© λΌμ΄λΈλ¬λ¦¬](#-μ¬μ©-λΌμ΄λΈλ¬λ¦¬)
  - [πββοΈ μ€νλ°©λ²](#οΈ-μ€νλ°©λ²)
  - [π‘ κ΅¬νλͺ©ν](#π‘-κ΅¬ν-λͺ©ν)
    - [1. μ§νλͺ κ²μμ API νΈμΆ ν΅ν΄μ κ²μμ΄ μΆμ² κΈ°λ₯ κ΅¬ν ](#1-μ§νλͺ-κ²μμ-api-νΈμΆ-ν΅ν΄μ-κ²μμ΄-μΆμ²-κΈ°λ₯-κ΅¬ν)
    - [2. API νΈμΆ μ΅μ ν](#2-api-νΈμΆ-μ΅μ ν)
    - [3. ν€λ³΄λλ§μΌλ‘ μΆμ² κ²μμ΄λ€λ‘ μ΄λ κ°λ₯νλλ‘ κ΅¬ν](#3-ν€λ³΄λλ§μΌλ‘-μΆμ²-κ²μμ΄λ€λ‘-μ΄λ-κ°λ₯νλλ‘-κ΅¬ν)

<br>

<br>

## π μ¬μ© λΌμ΄λΈλ¬λ¦¬
---
<div align="center">
  
<img src="https://img.shields.io/badge/Redux-7347B6?style=for-the-badge&logo=Redux&logoColor=white" />
<img src="https://img.shields.io/badge/ReduxToolkit-7347B6?style=for-the-badge&logo=Redux&logoColor=white" />
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
  
<br/>
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" />
</div>

<br>

## πββοΈ μ€νλ°©λ²
----
- μμ‘΄μ± package μ€μΉ
```
npm install
```
- λΈλΌμ°μ  μ€ν
```
npm start
```
- json-server μ€ν
```
npm server
```

<br>

## π‘ κ΅¬ν λͺ©ν
---
 <h3> 

 **[νκ΅­ μμ μ λ³΄](https://clinicaltrialskorea.com/) νμ΄μ§μ κ²μμμ­ ν΄λ‘ νκΈ°**
 </h3>

  - **μ§νλͺ κ²μμ API νΈμΆ ν΅ν΄μ κ²μμ΄ μΆμ² κΈ°λ₯ κ΅¬ν**

  - **API νΈμΆ μ΅μ ν**
  
  - **ν€λ³΄λλ§μΌλ‘ μΆμ² κ²μμ΄λ€λ‘ μ΄λ κ°λ₯νλλ‘ κ΅¬ν**
  <br>

---
<br>

### 1. μ§νλͺ κ²μμ API νΈμΆ ν΅ν΄μ κ²μμ΄ μΆμ² κΈ°λ₯ κ΅¬ν 

<br>
  
  * μ¬μ©μκ° μλ ₯ν νμ€νΈμ μΌμΉνλ λΆλΆ λ³Όλμ²λ¦¬
  * κ²μμ΄κ° μμ μ βκ²μμ΄ μμβ νμΆ

<br>

**Component**

  * κ° 'μΆμ² κ²μμ΄'μ λ¬Έμμ΄μ 'μ¬μ©μκ° μλ ₯ν νμ€νΈ( SearchWord )' λ₯Ό κΈ°μ€μΌλ‘  split λ©μλλ₯Ό μ¬μ©νμ¬ λλμ΄μ€ ν, SearchWord λΆλΆμλ§ CSS μ²λ¦¬λ₯Ό ν΄μ£Όμ΄ Bold ν¨κ³Όλ₯Ό μ€

```javascript

const RelatedSearchTerm = ({ name, idx }) => {
  const { searchWord, recommendWordIndex } = useSelector(state => state.search);
  const _name = name.split(searchWord);

  return (
    <List className={idx === recommendWordIndex ? 'over' : ''}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <Name>
        <span>{_name[0]}</span>
        {_name[0][_name[0].length - 1] === ' ' ? (
          <BoldName>&nbsp;{searchWord}</BoldName>
        ) : (
          <BoldName>{searchWord}</BoldName>
        )}
        <span>{_name[1]}</span>
      </Name>
    </List>
  );
};

```

<br>

### 2. API νΈμΆ μ΅μ ν

  - API νΈμΆλ³λ‘ λ‘μ»¬ μΊμ± κ΅¬ν
      β‘οΈ μΊμ± κΈ°λ₯μ μ κ³΅νλ λΌμ΄λΈλ¬λ¦¬ μ¬μ© κΈμ§(React-Query λ±)

  - μλ ₯λ§λ€ API νΈμΆνμ§ μλλ‘ API νΈμΆ νμλ₯Ό μ€μ΄λ μ λ΅ μλ¦½ λ° μ€ν

  - APIλ₯Ό νΈμΆν  λ λ§λ€ `console.info("calling api")` μΆλ ₯μ ν΅ν΄ μ½μμ°½μμ API νΈμΆ νμ νμΈμ΄ κ°λ₯νλλ‘ μ€μ 

<br>

**Component**
 
 * Map μ μ¬μ©νμ¬ μΈλ©λͺ¨λ¦¬μΊμ± κΈ°λ₯ κ΅¬ν

 * **Map**μ μ΄μ μ νΈμΆνμ¬ μ μ₯ν API URLκ³Ό νμ¬ μμ²­ν API URLμ λΉκ΅ν ν, λ URLμ΄ matching λ  κ²½μ° **μΊμ± λ°μ΄ν°**λ₯Ό μ¬μ©νκ³ , matching λμ§ μμ κ²½μ° **API νΈμΆ**νλλ‘ κ΅¬ν
  

```ts

const cache: any = new Map();

const useAxiosGet = (
  keyword: string,
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
      // κ°μ₯ μ€λλ νμμ€ν¬νλ₯Ό κ°μ§κ³  μλ κ°μ²΄λ₯Ό μ­μ νλ€.
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
          // μΊμ±λ ν€κ°μ΄ μμ κ²½μ°μλ μΊμ±λ κ°μ μ΄λ€.
          const cachedData = cache.get(cacheKey);

          console.log(`μΊμ±λ λ°μ΄ν° ''${cacheKey}'' (μ΄)κ° μ¬μ©λμμ`);

          if (cachedData.expires > Date.now()) {
            cachedData.timestamp = Date.now();
            setData(cachedData.data);
            setIsLoading(false);

            return;
          }
          cache.delete(cacheKey);
        }

        if (cache.size === cacheSize) {
          // μΊμ±λ λ°μ΄ν°μ μ¬μ΄μ¦ μ΄κ³Όμμ μ­μ 

          removeOldestItem();
        }

        const { data } = await axios.get(`${BASE_URL}?q=${keyword}`);

        console.info('calling api');

        cache.set(cacheKey, {
          data,
          expires: Date.now() + cacheTime,
          timestamp: Date.now(),
        });

        setData(data);
      } catch (err: any) {
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

```
* **'useSearch' Hook** μμ Debounce κΈ°λ₯μ λ£μ΄ κ° μλ ₯ μ¬μ΄μ delay(500ms)λ₯Ό μ£Όμ΄, API νΈμΆ νμλ₯Ό μ€μ


```ts
import useDebounce from './useDebounce';

const useSearchBar = () => {
  const [keywordValue, setKeywordValue] = useRecoilState(keywordState);
  const debouncedSearchValue = useDebounce(keywordValue, SEARCH_DELAY_IN_MS);

  return { keywordValue, setKeywordValue, debouncedSearchValue };
};
```

<br>

### 3. ν€λ³΄λλ§μΌλ‘ μΆμ² κ²μμ΄λ€λ‘ μ΄λ κ°λ₯νλλ‘ κ΅¬ν

<br>

**Component**

* κ²μμ°½μ **onKeyDown μ΄λ²€νΈ**λ₯Ό μ¬μ©νμ¬ ν€λ³΄λμ μ(ArrouUP), μλ(ArrowDown) λ²νΌμ μ΄λμ λ°λΌ **recommendWordIndex** State κ°μ λ°κΏμ£Όμ΄ μΆμ² κ²μμ΄μ ν€λ³΄λ μ΄λμ΄ κ°λ₯νλλ‘ κ΅¬ν

```js

const onKeyPress = e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      console.log(recommendWordIndex);
      // μ²« ν€ μλ ₯ μ
      if (recommendWordIndex === null) {
        dispatch(OPERATION_RECOMMEND_WORD_INDEX(0));
      }
      // λ§¨ μμμ μ, λ§¨ μλμμ μλλ₯Ό λλ μ λ μλ¬΄κ²λ μν¨
      else if (recommendWordIndex === 0 && e.key === 'ArrowUp') {
        return;
      } else if (recommendWordIndex === sickList.length - 1 && e.key === 'ArrowDown') {
        return;
      }
      // ν€ μλ ₯μ μ¦κ°
      else {
        dispatch(OPERATION_RECOMMEND_WORD_INDEX(e.key));
      }
    }
  };
  
```

<br>

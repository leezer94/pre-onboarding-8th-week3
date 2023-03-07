# 📝  검색어 추천기능 구현하기

<!-- <p align="middle">
<img src="./screenshot.png" />
</p> -->

## 📄목차
---
  - [📚 사용 라이브러리](#-사용-라이브러리)
  - [🏃‍♂️ 실행방법](#️-실행방법)
  - [💡 구현목표](#💡-구현-목표)
    - [1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현 ](#1-질환명-검색시-api-호출-통해서-검색어-추천-기능-구현)
    - [2. API 호출 최적화](#2-api-호출-최적화)
    - [3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현](#3-키보드만으로-추천-검색어들로-이동-가능하도록-구현)

<br>

<br>

## 📚 사용 라이브러리
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

## 🏃‍♂️ 실행방법
----
- 의존성 package 설치
```
yarn
```
- 브라우저 실행
```
yarn start
```
- json-server 실행
```
yarn server
```

<br>

## 💡 구현 목표
---
 <h3> 

 **[한국 임상 정보](https://clinicaltrialskorea.com/) 페이지의 검색영역 클론하기**
 </h3>

  - **질환명 검색시 API 호출 통해서 검색어 추천 기능 구현**

  - **API 호출 최적화**
  
  - **키보드만으로 추천 검색어들로 이동 가능하도록 구현**
  <br>

---
<br>

### 1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현 

<br>
  
  * 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
  * 검색어가 없을 시 “검색어 없음” 표출

<br>

**Component**

  * 각 '추천 검색어'의 문자열을 '사용자가 입력한 텍스트( SearchWord )' 를 기준으로  split 메서드를 사용하여 나누어준 후, SearchWord 부분에만 CSS 처리를 해주어 Bold 효과를 줌

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

### 2. API 호출 최적화

  - API 호출별로 로컬 캐싱 구현
      ➡️ 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)

  - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

  - API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

<br>

**Component**
 
 * Map 을 사용하여 인메모리캐싱 기능 구현

 * **Map**에 이전에 호출하여 저장한 API URL과 현재 요청한 API URL을 비교한 후, 두 URL이 matching 될 경우 **캐싱 데이터**를 사용하고, matching 되지 않을 경우 **API 호출**하도록 구현
  

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

          console.log(`캐싱된 데이터 ''${cacheKey}'' (이)가 사용되었음`);

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
* **'useSearch' Hook** 에서 Debounce 기능을 넣어 각 입력 사이에 delay(500ms)를 주어, API 호출 횟수를 줄임


```ts
import useDebounce from './useDebounce';

const useSearchBar = () => {
  const [keywordValue, setKeywordValue] = useRecoilState(keywordState);
  const debouncedSearchValue = useDebounce(keywordValue, SEARCH_DELAY_IN_MS);

  return { keywordValue, setKeywordValue, debouncedSearchValue };
};
```

<br>

### 3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

<br>

**Component**

* 검색창에 **onKeyDown 이벤트**를 사용하여 키보드의 위(ArrouUP), 아래(ArrowDown) 버튼의 이동에 따라 **recommendWordIndex** State 값을 바꿔주어 추천 검색어의 키보드 이동이 가능하도록 구현

```js

const onKeyPress = e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      console.log(recommendWordIndex);
      // 첫 키 입력 시
      if (recommendWordIndex === null) {
        dispatch(OPERATION_RECOMMEND_WORD_INDEX(0));
      }
      // 맨 위에서 위, 맨 아래에서 아래를 눌렀을 때 아무것도 안함
      else if (recommendWordIndex === 0 && e.key === 'ArrowUp') {
        return;
      } else if (recommendWordIndex === sickList.length - 1 && e.key === 'ArrowDown') {
        return;
      }
      // 키 입력시 증감
      else {
        dispatch(OPERATION_RECOMMEND_WORD_INDEX(e.key));
      }
    }
  };
  
```

<br>

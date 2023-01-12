const replaceStringToBoldedString = (subStr: string, keyword: string) =>
  subStr.includes(keyword)
    ? subStr.replace(keyword, '<b>' + keyword + '</b>')
    : subStr;

const MINS = 60 * 1000;

const CACHE_TIME = {
  FIVE_MINS: 5 * MINS,
  THREE_MINS: 3 * MINS,
  ONE_MINS: 1 * MINS,
} as const;

const CACHE_SIZE = 10 as const;

export { replaceStringToBoldedString, CACHE_TIME, CACHE_SIZE };

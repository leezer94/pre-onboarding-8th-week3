const BASE_URL = process.env.REACT_APP_SERVER_URL;

const TITLE = `국내 모든 임상시험 검색하고${'<br>'}온라인으로 참여하기`;

const MINS = 60 * 1000;

const CACHE_TIME = {
  FIVE_MINS: 5 * MINS,
  THREE_MINS: 3 * MINS,
  ONE_MINS: 1 * MINS,
} as const;

const CACHE_SIZE = 10 as const;

const DEFAULT_DELAY_IN_MS = 300 as const;

const SEARCH_DELAY_IN_MS = 150 as const;

const KEYBOARD = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
} as const;

export {
  BASE_URL,
  TITLE,
  CACHE_TIME,
  CACHE_SIZE,
  DEFAULT_DELAY_IN_MS,
  SEARCH_DELAY_IN_MS,
  KEYBOARD,
};

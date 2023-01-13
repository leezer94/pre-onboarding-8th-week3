const replaceStringToBoldedString = (subStr: string, keyword: string) =>
  subStr.includes(keyword)
    ? subStr.replace(keyword, '<b>' + keyword + '</b>')
    : subStr;

export { replaceStringToBoldedString };

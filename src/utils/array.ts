export const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const sample = (list: Array<any>) => {
  const rand = Math.floor(Math.random() * list.length);
  return list[rand];
};

export const sampleMultiple = (arr: Array<any>, count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
};

export const accumulate = (list: Array<number>, index: number) => {
  return list.reduce((prevSum, x, i) => prevSum + (i <= index ? x : 0), 0);
};

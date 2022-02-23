export function arrayInArray(array: any[][], target: any[]): boolean {
  return array.some((arr) => arr.every((val, i) => val === target[i]));
}

export const makeArray = (d1: number, d2: number) => {
  const arr = new Array(d1);
  for (let i = 0; i < d2; i++) {
    arr[i] = new Array(d1);
  }
  return arr;
};

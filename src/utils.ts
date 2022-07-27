export type rgbT = [r: number, g: number, b: number];

export const array = (length: number): null[] =>
  new Array(length).fill('').map(() => null);

export const getGridMatrix = (
  [r, g, b]: rgbT = [0, 0, 0],
  size: number = 16
): rgbT[][] => array(size).map(() => array(size).map(() => [r, g, b]));

export const arrayFlat = <T = any>(array: T[][]): T[] =>
  array.reduce((acc, current) => [...acc, ...current], []);

export const gridMatrixToNeopixelArray = (gridMatrix: rgbT[][]): number[] => {
  const size = gridMatrix.length;
  const ledMatrix: rgbT[][] = getGridMatrix();
  gridMatrix.map((col, rowIndex) =>
    col.map((pixel, colIndex) => {
      ledMatrix[rowIndex][rowIndex % 2 !== 1 ? size - colIndex - 1 : colIndex] =
        pixel;
    })
  );

  return arrayFlat<number>(arrayFlat<rgbT>(ledMatrix));
};

export const wait = (ms: number = 2000): Promise<void> =>
  new Promise((resolve) => window.setTimeout(() => resolve(), ms));

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

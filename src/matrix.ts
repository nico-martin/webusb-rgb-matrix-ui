import { getGridMatrix, gridMatrixToNeopixelArray, rgbT } from './utils';
import WebUSBController from './WebUSBController';

class Matrix {
  private $pixelArea: HTMLDivElement = null;
  private gridMatrix: rgbT[][] = getGridMatrix([0, 0, 0], 0);
  Controller: WebUSBController = null;
  private readonly matrixSize: number = 0;

  constructor(size: number) {
    this.Controller = new WebUSBController();
    this.$pixelArea = document.querySelector<HTMLDivElement>('#matrix');
    this.matrixSize = size;
    this.setUpMatrix();
  }

  private setUpMatrix(): void {
    this.$pixelArea.style[
      'grid-template-columns'
    ] = `repeat(${this.matrixSize}, 1fr)`;
    this.$pixelArea.style[
      'grid-template-rows'
    ] = `repeat(${this.matrixSize}, 1fr)`;
    this.$pixelArea
      .querySelectorAll('.matrix__pixel')
      .forEach((e) => e.remove());
    this.gridMatrix = getGridMatrix([0, 0, 0], this.matrixSize);

    let i = 0;
    this.gridMatrix.map((cols) =>
      cols.map(() => {
        const el = document.createElement('div');
        el.classList.add('matrix__pixel');
        el.setAttribute('data-pixelindex', String(i));
        this.$pixelArea.appendChild(el);
        i++;
      })
    );
  }

  async webUSBConnect() {
    await this.Controller.connect({ filters: [{ vendorId: 0x2e8a }] });
    await this.Controller.send(
      new Uint8Array(gridMatrixToNeopixelArray(this.gridMatrix))
    );
  }

  setLoading(loading: boolean) {
    this.$pixelArea.setAttribute('data-loading', loading ? 'true' : 'false');
  }

  setGridMatrixFromCanvas(ctx: CanvasRenderingContext2D) {
    this.gridMatrix = this.gridMatrix.map((cols, rowIndex) =>
      cols.map((pixel, colIndex) => {
        const canvasColor = ctx.getImageData(colIndex, rowIndex, 1, 1).data;
        return [canvasColor[0], canvasColor[1], canvasColor[2]];
      })
    );
  }

  setGridMatrixFromArray(array: rgbT[][]) {
    this.gridMatrix = this.gridMatrix.map((cols, rowIndex) =>
      cols.map((pixel, colIndex) => [
        array[rowIndex][colIndex][0],
        array[rowIndex][colIndex][1],
        array[rowIndex][colIndex][2],
      ])
    );
  }

  async reDrawMatrix() {
    let i = 0;
    this.gridMatrix.map((cols) =>
      cols.map(([r, g, b]) => {
        const el = document.querySelector<HTMLDivElement>(
          `[data-pixelindex="${i}"]`
        );
        el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        i++;
      })
    );

    await this.Controller.send(
      new Uint8Array(gridMatrixToNeopixelArray(this.gridMatrix))
    );
  }
}

export default Matrix;

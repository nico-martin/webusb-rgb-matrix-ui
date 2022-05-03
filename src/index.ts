import WebUSBController from './WebUSBController';
import DropArea from './DropArea';
import { rgbT, getGridMatrix, gridMatrixToNeopixelArray } from './utils';
import { loadImageFromSrc, srcFromFile } from './image';

const CANVAS_SIZE = 16;

(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    const Controller = new WebUSBController();
    const textDecoder = new TextDecoder('utf-8');
    const $canvas = document.querySelector<HTMLCanvasElement>('#image-canvas');
    const $pixelArea = document.querySelector<HTMLDivElement>('#matrix');
    const $connectArea =
      document.querySelector<HTMLDivElement>('#connect-area');
    const $connectButton =
      document.querySelector<HTMLButtonElement>('#connect');
    const $connectButtonSkip =
      document.querySelector<HTMLButtonElement>('#connect-skip');

    let gridMatrix: rgbT[][] = getGridMatrix([0, 0, 0], 0);

    /**
     * Methods
     */

    const setUpMatrix = (size: number): void => {
      $canvas.width = size;
      $canvas.height = size;
      $pixelArea.style['grid-template-columns'] = `repeat(${size}, 1fr)`;
      $pixelArea.style['grid-template-rows'] = `repeat(${size}, 1fr)`;
      gridMatrix = getGridMatrix([0, 0, 0], size);

      let html = '';
      let i = 0;
      gridMatrix.map((cols) =>
        cols.map(() => {
          html += `<div class="matrix__pixel" data-pixelindex="${i}" ></div>`;
          i++;
        })
      );

      $pixelArea.innerHTML = html;
    };

    const onFileChange = async (file: File) => {
      const src = await srcFromFile(file);
      const ctx = $canvas.getContext('2d');
      const image = await loadImageFromSrc(src);

      const imgSize: number = Math.min(image.width, image.height);
      const left: number = (image.width - imgSize) / 2;
      const top: number = (image.height - imgSize) / 2;
      ctx.drawImage(
        image,
        left,
        top,
        imgSize,
        imgSize,
        0,
        0,
        $canvas.width,
        $canvas.height
      );

      gridMatrix = gridMatrix.map((cols, rowIndex) =>
        cols.map((pixel, colIndex) => {
          const canvasColor = ctx.getImageData(colIndex, rowIndex, 1, 1).data;
          return [canvasColor[0], canvasColor[1], canvasColor[2]];
        })
      );

      await reDrawMatrix();
    };

    const reDrawMatrix = async () => {
      let i = 0;
      gridMatrix.map((cols) =>
        cols.map(([r, g, b]) => {
          const el = document.querySelector<HTMLDivElement>(
            `[data-pixelindex="${i}"]`
          );
          el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          i++;
        })
      );

      await Controller.send(
        new Uint8Array(gridMatrixToNeopixelArray(gridMatrix))
      );
    };

    /**
     * Setup
     */

    setUpMatrix(CANVAS_SIZE);

    new DropArea(
      document.querySelector<HTMLInputElement>('#drop'),
      onFileChange
    );

    $connectButton.addEventListener('click', async () => {
      await Controller.connect({ filters: [{ vendorId: 0x2341 }] });
      await Controller.send(
        new Uint8Array(gridMatrixToNeopixelArray(gridMatrix))
      );
    });

    $connectButtonSkip.addEventListener('click', async () => {
      $connectArea.style.display = 'none';
    });

    Controller.onReceive((data) => {
      console.log('received', { data, decoded: textDecoder.decode(data) });
    });

    Controller.onDeviceConnect((device) => {
      console.log(device);
      if (device) {
        $connectArea.style.display = 'none';
      } else {
        $connectArea.style.display = 'flex';
      }
    });
  });
})();

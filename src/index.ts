import DropArea from './DropArea';
import { getGridMatrix, rgbT, wait } from './utils';
import { loadImageFromSrc, srcFromFile } from './image';
import Matrix from './matrix';
import MatrixSnake, { DIRECTIONS } from './snake';

const CANVAS_SIZE = 16;

(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    const MatrixInstance = new Matrix(CANVAS_SIZE);
    const Snake = new MatrixSnake({
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      fps: 3,
    });
    const textDecoder = new TextDecoder('utf-8');
    const $canvas = document.querySelector<HTMLCanvasElement>('#image-canvas');
    const $connectArea =
      document.querySelector<HTMLDivElement>('#connect-area');
    const $connectButton =
      document.querySelector<HTMLButtonElement>('#connect');
    const $connectButtonSkip =
      document.querySelector<HTMLButtonElement>('#connect-skip');
    const $dropArea = document.querySelector<HTMLInputElement>('#drop');

    /**
     * Image
     */

    const onFileChange = async (file: File) => {
      const src = await srcFromFile(file);
      MatrixInstance.setLoading(true);
      $dropArea.style.backgroundImage = `url(${src})`;
      $canvas.width = CANVAS_SIZE;
      $canvas.height = CANVAS_SIZE;

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

      MatrixInstance.setGridMatrixFromCanvas(ctx);
      await wait(1000);
      await MatrixInstance.reDrawMatrix();
      MatrixInstance.setLoading(false);
    };

    /**
     * Snake
     */

    Snake.onStepupdate(async (step) => {
      document.body.classList.contains('snake')
        ? MatrixInstance.setGridMatrixFromArray(
            getGridMatrix([0, 0, 0], CANVAS_SIZE).map((cols, rowIndex) =>
              cols.map((pixel, colIndex) =>
                rowIndex === step.food.x && colIndex === step.food.y
                  ? [255, 0, 0]
                  : step.snake.findIndex(
                      (snakePixel) =>
                        snakePixel.x === rowIndex && snakePixel.y === colIndex
                    ) !== -1
                  ? [255, 255, 255]
                  : [0, 0, 0]
              )
            )
          )
        : Snake.stopGame();
      await MatrixInstance.reDrawMatrix();
    });

    document
      .querySelector<HTMLButtonElement>('#snake-button-restart')
      .addEventListener('click', () => Snake.restart());

    document
      .querySelector<HTMLButtonElement>('#snake-button-up')
      .addEventListener('click', () => Snake.setDirection(DIRECTIONS.UP));
    document
      .querySelector<HTMLButtonElement>('#snake-button-left')
      .addEventListener('click', () => Snake.setDirection(DIRECTIONS.LEFT));
    document
      .querySelector<HTMLButtonElement>('#snake-button-right')
      .addEventListener('click', () => Snake.setDirection(DIRECTIONS.RIGHT));
    document
      .querySelector<HTMLButtonElement>('#snake-button-down')
      .addEventListener('click', () => Snake.setDirection(DIRECTIONS.DOWN));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        Snake.setDirection(DIRECTIONS.UP);
      } else if (e.key === 'ArrowDown') {
        Snake.setDirection(DIRECTIONS.DOWN);
      } else if (e.key === 'ArrowLeft') {
        Snake.setDirection(DIRECTIONS.LEFT);
      } else if (e.key === 'ArrowRight') {
        Snake.setDirection(DIRECTIONS.RIGHT);
      }
    });

    /**
     * Setup
     */

    new DropArea(
      document.querySelector<HTMLInputElement>('#drop'),
      onFileChange
    );

    $connectButton.addEventListener(
      'click',
      async () => await MatrixInstance.webUSBConnect()
    );

    $connectButtonSkip.addEventListener('click', async () => {
      $connectArea.style.display = 'none';
    });

    MatrixInstance.Controller.onReceive((data) => {
      console.log('received', { data, decoded: textDecoder.decode(data) });
    });

    MatrixInstance.Controller.onDeviceConnect((device) => {
      if (device) {
        $connectArea.style.display = 'none';
      } else {
        $connectArea.style.display = 'flex';
      }
    });
  });
})();

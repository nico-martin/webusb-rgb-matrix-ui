import { randomIntFromInterval } from './utils';

const COLLISION_EVENT_KEY = 'nm-snake-collision-emitter';
const UPDATE_EVENT_KEY = 'nm-snake-update-emitter';
let INSTANCES = 0;

interface GameStepI {
  direction: DIRECTIONS;
  snake: Array<{
    x: number;
    y: number;
  }>;
  food: {
    x: number;
    y: number;
  };
}

export enum DIRECTIONS {
  UP = 'UP',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
}

const hasColision = (pixel, snake) =>
  snake.length >= 1 &&
  snake.find(
    (snakePixel) => snakePixel.x === pixel.x && snakePixel.y === pixel.y
  ) !== undefined;

class MatrixSnake {
  width: number = 16;
  height: number = 16;
  fps: number = 4;
  indexYMax: number = this.height - 1;
  indexXMax: number = this.width - 1;
  interval: number = 0;
  gameStep: GameStepI = null;
  screen: Array<Array<number>> = [];
  collisionEventKey: string = null;
  updateEventKey: string = null;

  constructor({
    width = 16,
    height = 16,
    fps = 4,
  }: {
    width: number;
    height: number;
    fps: number;
  }) {
    this.width = width;
    this.height = height;
    this.fps = fps;
    this.indexYMax = this.height - 1;
    this.indexXMax = this.width - 1;
    INSTANCES++;
    this.collisionEventKey = COLLISION_EVENT_KEY + '-' + INSTANCES;
    this.updateEventKey = UPDATE_EVENT_KEY + '-' + INSTANCES;
  }

  onCollision(callback: () => void) {
    document.addEventListener(this.collisionEventKey, ({}: CustomEvent<{}>) => {
      callback();
    });
  }

  setDirection(direction: DIRECTIONS) {
    this.gameStep = { ...this.gameStep, direction };
  }

  onStepupdate(callback: (gameStep: GameStepI) => void) {
    document.addEventListener(
      this.updateEventKey,
      ({ detail }: CustomEvent<GameStepI>) => {
        callback(detail);
      }
    );
  }

  restart() {
    this.stopGame();
    this.interval = window.setInterval(
      () => this.doStep(),
      Math.round((60 * 10) / this.fps)
    );
    this.gameStep = {
      direction: DIRECTIONS.RIGHT,
      snake: [
        {
          x: Math.round(this.width / 2),
          y: Math.round(this.height / 2),
        },
      ],
      food: this.generateFood(),
    };
    this.screen = Array(this.height).fill(Array(this.width).fill(0));
  }

  stopGame() {
    clearInterval(this.interval);
  }

  getNextPixel({ x, y }, direction) {
    const indexYMax: number = this.height - 1;
    const indexXMax: number = this.width - 1;
    switch (direction) {
      case DIRECTIONS.LEFT:
        return {
          x,
          y: y - 1 < 0 ? indexYMax : y - 1,
        };
      case DIRECTIONS.RIGHT:
        return {
          x,
          y: y + 1 > indexYMax ? 0 : y + 1,
        };
      case DIRECTIONS.UP:
        return {
          x: x - 1 < 0 ? indexXMax : x - 1,
          y,
        };
      case DIRECTIONS.DOWN:
        return {
          x: x + 1 > indexXMax ? 0 : x + 1,
          y,
        };
      default:
        console.log('none');
    }
  }

  generateFood(snake = null) {
    let food = {
      x: randomIntFromInterval(0, this.indexXMax),
      y: randomIntFromInterval(0, this.indexYMax),
    };
    return food;
    let validPositionFound = false;
    while (validPositionFound) {
      food = {
        x: randomIntFromInterval(0, this.indexXMax),
        y: randomIntFromInterval(0, this.indexYMax),
      };
      if (!hasColision(food, snake)) {
        validPositionFound = true;
      }
    }
    return food;
  }

  doStep() {
    const newGameStep = this.gameStep;
    const nextPixel = this.getNextPixel(
      newGameStep.snake[0],
      newGameStep.direction
    );
    const oldSnakeWithoutFood = newGameStep.snake.filter(
      (pixel, i, full) => i !== full.length - 1
    );
    const newSnake = [nextPixel, ...newGameStep.snake];
    const snakeWithoutFood = [nextPixel, ...oldSnakeWithoutFood];

    if (hasColision(nextPixel, oldSnakeWithoutFood)) {
      document.dispatchEvent(new CustomEvent(this.collisionEventKey));
      return;
    }

    const foundFood =
      nextPixel.x === newGameStep.food.x && nextPixel.y === newGameStep.food.y;

    const snake = foundFood ? newSnake : snakeWithoutFood;

    this.gameStep = {
      ...this.gameStep,
      snake,
      food: foundFood ? this.generateFood() : newGameStep.food,
    };

    document.dispatchEvent(
      new CustomEvent(this.updateEventKey, { detail: this.gameStep })
    );
  }
}

export default MatrixSnake;

import { NDArrayMath } from './math';
import { NDArray } from './ndarray';
export interface ActivationFunction {
    output<T extends NDArray>(math: NDArrayMath, input: T): T;
    der<T extends NDArray>(math: NDArrayMath, input: T, output: T): T;
    dispose(): void;
}
export declare class TanHFunc implements ActivationFunction {
    private one;
    output<T extends NDArray>(math: NDArrayMath, x: T): T;
    der<T extends NDArray>(math: NDArrayMath, x: T, y: T): T;
    dispose(): void;
}
export declare class ReLUFunc implements ActivationFunction {
    output<T extends NDArray>(math: NDArrayMath, x: T): T;
    der<T extends NDArray>(math: NDArrayMath, x: T, y: T): T;
    dispose(): void;
}
export declare class LeakyReluFunc implements ActivationFunction {
    private alpha;
    constructor(alpha: number);
    output<T extends NDArray>(math: NDArrayMath, x: T): T;
    der<T extends NDArray>(math: NDArrayMath, x: T, y: T): T;
    dispose(): void;
}
export declare class SigmoidFunc implements ActivationFunction {
    output<T extends NDArray>(math: NDArrayMath, x: T): T;
    der<T extends NDArray>(math: NDArrayMath, x: T, y: T): T;
    dispose(): void;
}
export declare class SquareFunc implements ActivationFunction {
    private two;
    output<T extends NDArray>(math: NDArrayMath, x: T): T;
    der<T extends NDArray>(math: NDArrayMath, x: T, y: T): T;
    dispose(): void;
}
export declare class EluFunc implements ActivationFunction {
    output<T extends NDArray>(math: NDArrayMath, x: T): T;
    der<T extends NDArray>(math: NDArrayMath, x: T, y: T): T;
    dispose(): void;
}

import { NDArray } from '../../ndarray';
import { GPGPUContext } from './gpgpu_context';
import { ShapeInfo } from './shader_compiler';
import { TextureData } from './tex_util';
export interface GPGPUProgram {
    variableNames: string[];
    outputShape: number[];
    userCode: string;
    supportsBroadcasting?: boolean;
}
export interface GPGPUBinary {
    webGLProgram: WebGLProgram;
    program: GPGPUProgram;
    uniformLocations: {
        [name: string]: WebGLUniformLocation;
    };
    attributeLocations: {
        [name: string]: number;
    };
    gpgpu: GPGPUContext;
    source: string;
    inShapeInfos: ShapeInfo[];
    outShapeInfo: ShapeInfo;
}
export interface ArrayData<T extends NDArray> {
    array: T;
    texData: TextureData;
}
export declare function compileProgram<T extends NDArray, K extends NDArray>(gpgpu: GPGPUContext, program: GPGPUProgram, inputs: Array<ArrayData<T>>, output: ArrayData<K>): GPGPUBinary;
export declare function runProgram<T extends NDArray, K extends NDArray>(binary: GPGPUBinary, inputs: Array<ArrayData<T>>, output: ArrayData<K>, customSetup?: (gpgpu: GPGPUContext, webGLProgram: WebGLProgram) => void): void;
export declare function makeShaderKey(program: GPGPUProgram, inputs: Array<ArrayData<NDArray>>, output: ArrayData<NDArray>): string;

import { MathBackend } from './math/backends/backend';
import { NDArrayMath } from './math/math';
export declare enum Type {
    NUMBER = 0,
    BOOLEAN = 1,
}
export interface Features {
    'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_ENABLED'?: boolean;
    'WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE'?: boolean;
    'WEBGL_VERSION'?: number;
    'WEBGL_FLOAT_TEXTURE_ENABLED'?: boolean;
    'WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED'?: boolean;
}
export declare const URL_PROPERTIES: URLProperty[];
export interface URLProperty {
    name: keyof Features;
    type: Type;
}
export declare type BackendType = 'webgl' | 'cpu';
export declare class Environment {
    private features;
    private globalMath;
    private backendRegistry;
    private prevBackendRegistry;
    constructor(features?: Features);
    get<K extends keyof Features>(feature: K): Features[K];
    getBestBackend(): MathBackend;
    private evaluateFeature<K>(feature);
    setFeatures(features: Features): void;
    reset(): void;
    setMath(math: NDArrayMath): void;
    getBackend(name: BackendType): MathBackend;
    registerBackend(name: BackendType, factory: () => MathBackend): boolean;
    readonly math: NDArrayMath;
    private empty();
}
export declare let ENV: Environment;

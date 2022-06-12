export type CloneType<T> = { [K in keyof T]: T[K] };

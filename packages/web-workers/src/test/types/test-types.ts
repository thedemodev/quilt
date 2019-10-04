import {createWorker} from '../../types';

const createWorkerApi = createWorker(() => import('./fixture/module'));

type ExpectedApi = {
  stringArgStringReturn: (arg: string) => Promise<string>;

  arrayArgArrayReturn: (arg: string[]) => Promise<string[]>;

  stringArgVoidReturn: (arg: string) => Promise<void>;

  multipleArgsStringReturn: (arg1: string, argTwo: number) => Promise<string>;

  stringArgFunctionReturn: (arg: string) => () => Promise<string>;

  // BROKEN
  functionArgStringReturn: (
    arg: () => string | Promise<string>,
  ) => Promise<string | Promise<string>>;

  functionArgFunctionReturn: (
    arg: () => Promise<string>,
  ) => () => Promise<string>;

  objectWithStringArgObjectReturn: (
    arg: {foo: string},
  ) => Promise<{foo: string}>;

  objectWithFunctionArgObjectReturn: (
    arg: {func: () => string | Promise<string>},
  ) => Promise<{func: () => Promise<string>}>;

  arrayOfObjectsWithFunctionsArg: (
    arg: {func: () => string | Promise<string>}[],
  ) => Promise<{func: () => Promise<string>}[]>;

  // BROKEN
  returnsFunctionReturningObjectWithFunction: () => Promise<
    () => Promise<{foo: () => Promise<string>}>
  >;
};

// Compilation will fail if any of properties in the returned api do not match the expected type.
export const workerApi: ExpectedApi = createWorkerApi();

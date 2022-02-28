import type { Config } from '@jest/types';
import { readFileSync } from 'fs';
import { dirname } from 'path';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import type { CompilerOptions } from 'typescript';
import { readConfigFile } from 'typescript';

interface TSConfig {
  compilerOptions: CompilerOptions;
}

export const buildJestConfig = (compilerOptions: CompilerOptions): Config.InitialOptions => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/tests/**/*.test.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {}, { prefix: '<rootDir>/' }),
    modulePathIgnorePatterns: [`<rootDir>/${compilerOptions.outDir ?? 'lib'}/`, '/node_modules/'],
  } as Config.InitialOptions;
};

export const buildJestConfigFromTSConfig = (config: TSConfig): Config.InitialOptions => {
  const compilerOptions = Reflect.get(config, 'compilerOptions') as CompilerOptions;
  return buildJestConfig(compilerOptions);
};

export const buildJestConfigFromTSConfigPath = (path = `${dirname(__filename)}/tsconfig.json`): Config.InitialOptions => {
  const result = readConfigFile(path, (p) => readFileSync(p).toString());
  return buildJestConfigFromTSConfig(result.config as TSConfig);
};

export default buildJestConfigFromTSConfigPath();

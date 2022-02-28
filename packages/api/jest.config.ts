import { dirname } from 'path';
import { buildJestConfigFromTSConfigPath } from '@kizicom/base/jest.config';

export default buildJestConfigFromTSConfigPath(`${dirname(__filename)}/tsconfig.json`);

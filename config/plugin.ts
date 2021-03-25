import { EggPlugin } from 'egg';
import 'tsconfig-paths/register';

const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};

export default plugin;

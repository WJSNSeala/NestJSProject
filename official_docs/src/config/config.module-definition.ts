import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigModuleOptions } from 'src/interface/config-module-options.interface';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ConfigModuleOptions>()
  .setFactoryMethodName('createConfigOptions')
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();

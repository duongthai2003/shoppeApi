import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { MainDBModels } from './main-db';

export class DB extends MongooseModule {
  static dbConnectAsync(
    env,
    dbName,
    connectionName,
    options?: MongooseModuleAsyncOptions,
  ): DynamicModule {
    return DB.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(env) + '/' + dbName,
      }),
      inject: [ConfigService],
      connectionName: connectionName,
      ...options,
    });
  }

  static getDbUri = (dbName: string) => {
    if (process.env.MONGO_DB_QUERY && process.env.MONGO_DB_QUERY !== '') {
      return `${dbName}${process.env.MONGO_DB_QUERY}`;
    }
  };

  static mainDb(): DynamicModule {
    return this.dbConnectAsync(
      'MONGODB_MAIN_DB_PATH',
      this.getDbUri(process.env.NAME_DATABASE),
      process.env.NAME_DATABASE,
    );
  }

  static forFeatureModels(
    modelNames: any[],
    models: any[],
    dbName: string,
  ): DynamicModule {
    const _models = models
      .filter((x) => modelNames.indexOf(x.name) > -1)
      .map((item) => ({
        ...item,
        collection: item.collection || item.name,
      }));

    return super.forFeature(_models, dbName);
  }

  static mainDbModules(modelNames): DynamicModule {
    return DB.forFeatureModels(
      modelNames,
      MainDBModels,
      process.env.NAME_DATABASE,
    );
  }
}

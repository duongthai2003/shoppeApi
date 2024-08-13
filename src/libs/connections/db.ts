import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { MainDBModel, MainDBModels } from './main-db';

export class DB extends MongooseModule {
  static mainDb(): DynamicModule {
    const as = this.dbConnectAsync(
      'MONGODB_MAIN_DB_PATH',
      this.getDbUri('Shoppee'),
      'Shoppee',
    );
    if (as) {
      console.log('krt noi thanh cong');
    } else {
      console.log('ko  ket noi');
    }
    return as;
  }

  static mainDbModules(modelNames: MainDBModel[]): DynamicModule {
    return DB.forFeatureModels(modelNames, MainDBModels, 'Shoppee');
  }

  static dbConnectAsync(
    env,
    dbName,
    connectionName,
    options?: MongooseModuleAsyncOptions,
  ): DynamicModule {
    return DB.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb://localhost:27017' + '/' + dbName,
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
    return dbName;
  };

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
}

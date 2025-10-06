import * as dotenv from 'dotenv';
import { SecretConfigInterface } from '../../domain/interface/secret-config.interface';
dotenv.config();

export default async () => {
  const isLocal = process.env.NODE_ENV !== 'production';
  if (isLocal) return getLocalEnvironment();

  //TODO: LOGIC FOR GET PRODUCTION ENVIRONMENT (E.J: AWS SECRET MANAGER)
}

const getLocalEnvironment = (): SecretConfigInterface => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  userMongoDBUri: process.env.USER_MONGO_DB_URI || 'mongodb://localhost:27017/user',
})
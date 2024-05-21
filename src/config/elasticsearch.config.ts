import { ElasticsearchModuleOptions } from '@nestjs/elasticsearch';
import * as dotenv from 'dotenv';

dotenv.config();

export const elasticsearchConfig: ElasticsearchModuleOptions = {
  node: `http://${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT}`,
};

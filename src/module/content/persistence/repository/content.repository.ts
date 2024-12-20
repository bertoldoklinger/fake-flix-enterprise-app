import { Inject, Injectable } from '@nestjs/common';
import { DefaultTypeOrmRepository } from '@src/module/content/infra/module/typeorm/repository/default-typeorm.repository';

import { DataSource } from 'typeorm';
import { Content } from '../entity/content.entity';

@Injectable()
export class ContentRepository extends DefaultTypeOrmRepository<Content> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(Content, dataSource);
  }
}

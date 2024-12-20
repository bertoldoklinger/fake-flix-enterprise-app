import { Movie } from '@contentModule/persistence/entity/movie.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DefaultTypeOrmRepository } from '@src/module/content/infra/module/typeorm/repository/default-typeorm.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class MovieRepository extends DefaultTypeOrmRepository<Movie> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(Movie, dataSource);
  }
}

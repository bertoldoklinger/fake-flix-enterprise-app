import { DefaultEntity } from '@src/module/content/infra/module/typeorm/entity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Thumbnail' })
export class Thumbnail extends DefaultEntity<Thumbnail> {
  @Column()
  url: string;
}

import { randomUUID } from 'crypto';
import { BaseEntity, BaseEntityProps } from './base.entity';

export type NewThumbnailEntity = Omit<
  ThumbnailEntityProps,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface ThumbnailEntityProps extends BaseEntityProps {
  url: string;
}

export class ThumbnailEntity extends BaseEntity {
  private url: ThumbnailEntityProps['url'];

  private constructor(data: ThumbnailEntityProps) {
    super(data);
  }

  static createNew(
    data: NewThumbnailEntity,
    id = randomUUID(),
  ): ThumbnailEntity {
    return new ThumbnailEntity({
      id,
      url: data.url,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: ThumbnailEntityProps): ThumbnailEntity {
    return new ThumbnailEntity({
      id: data.id,
      url: data.url,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  serialize() {
    return {
      id: this.id,
      url: this.url,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getUrl(): string {
    return this.url;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}

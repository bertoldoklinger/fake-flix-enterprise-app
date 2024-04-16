import { randomUUID } from 'crypto';
import { BaseEntity, BaseEntityProps } from './base.entity';
import { MovieEntity } from './movie.entity';

export interface ContentEntityProps extends BaseEntityProps {
  media?: MovieEntity;
  type: ContentType;
  title: string;
  description: string;
}

/*
 ** Fazemos como const e não como enum por conta do Prisma que mapeia dessa forma como tupla
 */
export const ContentType: { [x: string]: 'MOVIE' | 'TV_SHOW' } = {
  MOVIE: 'MOVIE',
  TV_SHOW: 'TV_SHOW',
};

export type ContentType = (typeof ContentType)[keyof typeof ContentType];

export class ContentEntity extends BaseEntity {
  private media?: ContentEntityProps['media'];
  private type: ContentEntityProps['type'];
  private title: ContentEntityProps['title'];
  private description: ContentEntityProps['description'];

  private constructor(data: ContentEntityProps) {
    super(data);
  }

  static createNew(
    data: Omit<ContentEntityProps, 'id' | 'createdAt' | 'updatedAt'>,
    id = randomUUID(),
  ): ContentEntity {
    return new ContentEntity({
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: ContentEntityProps): ContentEntity {
    return new ContentEntity({
      id: data.id,
      media: data.media,
      type: data.type,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  serialize(): Record<string, unknown> {
    return {
      id: this.id,
      media: this.media?.serialize(),
      type: this.type,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  addMedia(media: MovieEntity): void {
    this.media = media;
  }

  getMedia(): MovieEntity | undefined {
    return this.media;
  }

  getType(): ContentType {
    return this.type;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }
}

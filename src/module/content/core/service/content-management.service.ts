import { Content } from '@contentModule/persistence/entity/content.entity';
import { Movie } from '@contentModule/persistence/entity/movie.entity';
import { Thumbnail } from '@contentModule/persistence/entity/thumbnail.entity';
import { Video } from '@contentModule/persistence/entity/video.entity';
import { ContentRepository } from '@contentModule/persistence/repository/content.repository';
import { Injectable } from '@nestjs/common';
import { ExternalMovieClient } from '@src/module/content/http/rest/client/external-movie-rating/external-movie-rating.client';
import { ContentType } from '../enum/content-type.enum';

export interface CreateMovieData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  sizeInKb: number;
}

@Injectable()
export class ContentManagementService {
  constructor(
    private readonly externalMovieClient: ExternalMovieClient,
    private readonly contentRepository: ContentRepository,
  ) {}

  async createMovie(createMovieData: CreateMovieData): Promise<Content> {
    const externalRating = await this.externalMovieClient.getRating(
      createMovieData.title,
    );

    const contentEntity = new Content({
      title: createMovieData.title,
      description: createMovieData.description,
      type: ContentType.MOVIE,
      movie: new Movie({
        externalRating,
        video: new Video({
          url: createMovieData.url,
          duration: 10,
          sizeInKb: createMovieData.sizeInKb,
        }),
      }),
    });

    if (createMovieData.thumbnailUrl) {
      contentEntity.movie.thumbnail = new Thumbnail({
        url: createMovieData.thumbnailUrl,
      });
    }

    // Vantagem de possuir ORMs com classes é que podemos compor um aggregate com várias entities e persistir ele como uma transaction,
    // ao invés de abrir várias querys no banco e quebrar o estado do aggregate.
    const content = await this.contentRepository.save(contentEntity);

    // Aqui retornamos a entidade em si. Também é muito comum ter um DTO para comunicação entre as camadas
    return content;
  }
}

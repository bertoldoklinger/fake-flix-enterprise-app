import { Module } from '@nestjs/common';
import { ContentManagementService } from '@src/core/service/content-management.service';
import { MediaPlayerService } from '@src/core/service/media-player.service';
import { MediaPlayerController } from '@src/http/rest/controller/media-player.controller';
import { VideoUploadController } from '@src/http/rest/controller/video-upload.controller';
import { PersistenceModule } from '@src/persistence/persistence.module';
import { ContentRepository } from '@src/persistence/repository/content.repository';
import { VideoRepository } from '@src/persistence/repository/video.repository';
import { ExternalMovieClient } from './http/rest/client/external-movie-rating/external-movie-rating.client';
import { HttpClient } from './infra/http/client/http.client';
import { ConfigModule } from './infra/module/config/config.module';

@Module({
  imports: [PersistenceModule.forRoot(), ConfigModule.forRoot()],
  controllers: [VideoUploadController, MediaPlayerController],
  providers: [
    ContentManagementService,
    MediaPlayerService,
    ContentRepository,
    VideoRepository,
    ExternalMovieClient,
    HttpClient,
  ],
})
export class AppModule {}

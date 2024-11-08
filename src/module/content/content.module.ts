import { Module } from '@nestjs/common';
import { ContentManagementService } from '@src/module/content/core/service/content-management.service';
import { MediaPlayerService } from '@src/module/content/core/service/media-player.service';
import { MediaPlayerController } from '@src/module/content/http/rest/controller/media-player.controller';
import { VideoUploadController } from '@src/module/content/http/rest/controller/video-upload.controller';

import { ExternalMovieClient } from '@contentModule/http/rest/client/external-movie-rating/external-movie-rating.client';
import { HttpClient } from '@contentModule/infra/http/client/http.client';
import { PersistenceModule } from '@contentModule/persistence/persistence.module';
import { ContentRepository } from '@contentModule/persistence/repository/content.repository';
import { VideoRepository } from '@contentModule/persistence/repository/video.repository';
import { ConfigModule } from '@sharedModules/config/config.module';

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
export class ContentModule {}

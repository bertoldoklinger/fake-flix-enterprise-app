import { Module } from '@nestjs/common';

import { ContentManagementService } from './core/service/content-management.service';
import { MediaPlayerService } from './core/service/media-player.service';
import { ContentController } from './http/rest/controller/content.controller';
import { MediaPlayerController } from './http/rest/controller/media-player.controller';
import { ConfigModule } from './infra/module/config/config.module';
import { ContentRepository } from './persistence/repository/content.repository';
import { VideoRepository } from './persistence/repository/video.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ContentController, MediaPlayerController],
  providers: [
    ContentManagementService,
    MediaPlayerService,
    ContentRepository,
    VideoRepository,
  ],
})
export class AppModule {}

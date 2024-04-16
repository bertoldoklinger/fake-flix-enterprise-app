import { Module } from '@nestjs/common';

import { PrismaService } from './persistence/prisma/prisma.service';
import { ContentController } from './http/rest/controller/content.controller';
import { ContentManagementService } from './core/service/content-management.service';
import { MediaPlayerService } from './core/service/media-player.service';
import { PrepareStreamingUseCase } from './core/use-case/prepare-streaming.use-case';
import { VideoDAO } from './core/dao/video.dao.interface';
import { VideoDAO as VideoDAOImpl } from './persistence/dao/video.dao';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [
    PrismaService,
    ContentManagementService,
    MediaPlayerService,
    PrepareStreamingUseCase,
    {
      provide: VideoDAO,
      useClass: VideoDAOImpl,
    },
  ],
})
export class AppModule {}

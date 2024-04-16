import { Inject, Injectable } from '@nestjs/common';
import { VideoDAO, VideoDAOInterface } from '../dao/video.dao.interface';

export interface CreateContentData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  sizeInKb: number;
}

@Injectable()
export class ContentManagementService {
  constructor(@Inject(VideoDAO) private readonly videoDAO: VideoDAOInterface) {}

  async createContent(createContentData: CreateContentData) {
    const createdVideo = await this.videoDAO.create(createContentData);
    return createdVideo;
  }
}

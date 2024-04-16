import { CreateContentData } from '../service/content-management.service';

export interface VideoDAOInterface {
  create(videoData: CreateContentData): Promise<any>;
}

export const VideoDAO = Symbol('VideoDao');

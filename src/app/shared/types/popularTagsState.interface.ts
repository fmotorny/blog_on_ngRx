import {PopularTagType} from './popularTag.type';

export interface PopularTagsStateInterface {
  data: PopularTagType[];
  error: string | null;
  isLoading: boolean;
}

import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {ArticleInterface} from '../../shared/types/article.interface';

export interface EditArticleStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
  isLoading: boolean;
  article: ArticleInterface | null;
}

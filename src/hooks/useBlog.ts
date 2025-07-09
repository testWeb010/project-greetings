
import { useApi, usePagination } from './useApi';
import { blogService, BlogSearchParams } from '../services/blogService';
import { BlogPost } from '../types';

export function useBlogPosts(params: BlogSearchParams = {}) {
  return usePagination<BlogPost>(
    (page, limit, ...args) => blogService.getPosts({ page, limit, ...params, ...args[0] }),
    params.limit || 10
  );
}

export function useBlogPost(id: string) {
  return useApi<BlogPost>(
    () => blogService.getPostById(id),
    { immediate: !!id }
  );
}

export function useBlogCategories() {
  return useApi<string[]>(
    blogService.getCategories,
    { immediate: true }
  );
}

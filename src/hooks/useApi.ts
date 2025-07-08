import { useState, useEffect, useCallback } from 'react';
import { ApiError, isApiError } from '../services/api';

// Generic API hook state
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Options for API hooks
export interface ApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

// Generic API hook
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<any>,
  options: ApiOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options;
  
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null, success: false }));
      
      try {
        const response = await apiFunction(...args);
        const data = response.data;
        
        setState({
          data,
          loading: false,
          error: null,
          success: true,
        });
        
        if (onSuccess) {
          onSuccess(data);
        }
        
        return { data, success: true };
      } catch (error) {
        const errorMessage = isApiError(error) ? error.message : 'An unexpected error occurred';
        
        setState({
          data: null,
          loading: false,
          error: errorMessage,
          success: false,
        });
        
        if (onError) {
          onError(errorMessage);
        }
        
        return { error: errorMessage, success: false };
      }
    },
    [apiFunction, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
  };
}

// Mutation hook for POST/PUT/DELETE operations
export function useMutation<T>(
  apiFunction: (...args: any[]) => Promise<any>,
  options: ApiOptions = {}
) {
  return useApi<T>(apiFunction, { ...options, immediate: false });
}

// Query hook for GET operations with automatic execution
export function useQuery<T>(
  apiFunction: (...args: any[]) => Promise<any>,
  dependencies: any[] = [],
  options: ApiOptions = {}
) {
  const hook = useApi<T>(apiFunction, { ...options, immediate: true });
  
  useEffect(() => {
    if (dependencies.length > 0) {
      hook.execute();
    }
  }, dependencies);

  return hook;
}

// Pagination hook
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function usePagination<T>(
  apiFunction: (page: number, limit: number, ...args: any[]) => Promise<any>,
  initialLimit: number = 10
) {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const apiHook = useApi<T[]>(apiFunction);

  const loadPage = useCallback(
    async (page: number, ...args: any[]) => {
      const result = await apiHook.execute(page, pagination.limit, ...args);
      
      if (result.success && result.data) {
        const paginatedData = result.data as any;
        setPagination({
          page,
          limit: pagination.limit,
          total: paginatedData.total || 0,
          totalPages: paginatedData.totalPages || 0,
          hasNext: paginatedData.hasNext || false,
          hasPrev: paginatedData.hasPrev || false,
        });
      }
      
      return result;
    },
    [apiHook, pagination.limit]
  );

  const nextPage = useCallback(
    (...args: any[]) => {
      if (pagination.hasNext) {
        return loadPage(pagination.page + 1, ...args);
      }
    },
    [loadPage, pagination.hasNext, pagination.page]
  );

  const prevPage = useCallback(
    (...args: any[]) => {
      if (pagination.hasPrev) {
        return loadPage(pagination.page - 1, ...args);
      }
    },
    [loadPage, pagination.hasPrev, pagination.page]
  );

  const goToPage = useCallback(
    (page: number, ...args: any[]) => {
      if (page >= 1 && page <= pagination.totalPages) {
        return loadPage(page, ...args);
      }
    },
    [loadPage, pagination.totalPages]
  );

  const setLimit = useCallback((newLimit: number) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
  }, []);

  return {
    ...apiHook,
    pagination,
    loadPage,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
  };
}

// Infinite scroll hook
export function useInfiniteScroll<T>(
  apiFunction: (page: number, limit: number, ...args: any[]) => Promise<any>,
  limit: number = 10
) {
  const [allData, setAllData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(
    async (...args: any[]) => {
      if (loading || !hasMore) return;

      setLoading(true);
      setError(null);

      try {
        const response = await apiFunction(page, limit, ...args);
        const paginatedData = response.data;
        const newItems = paginatedData.data || [];

        setAllData(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setHasMore(paginatedData.hasNext || false);
      } catch (error) {
        const errorMessage = isApiError(error) ? error.message : 'An unexpected error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, page, limit, loading, hasMore]
  );

  const reset = useCallback(() => {
    setAllData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
  };
}

// Debounced API hook for search
export function useDebouncedApi<T>(
  apiFunction: (...args: any[]) => Promise<any>,
  delay: number = 300,
  options: ApiOptions = {}
) {
  const [debouncedArgs, setDebouncedArgs] = useState<any[]>([]);
  const apiHook = useApi<T>(apiFunction, options);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedArgs.length > 0) {
        apiHook.execute(...debouncedArgs);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [debouncedArgs, delay, apiHook]);

  const debouncedExecute = useCallback((...args: any[]) => {
    setDebouncedArgs(args);
  }, []);

  return {
    ...apiHook,
    execute: debouncedExecute,
  };
}
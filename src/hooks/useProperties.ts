import { useCallback } from 'react';
import { useApi, useMutation, usePagination, useDebouncedApi } from './useApi';
import { propertyService, PropertySearchParams, PropertyResponse } from '../services/propertyService';
import { PropertyFormData, SearchFilters } from '../types';

// Property hooks
export function useProperties(params: PropertySearchParams = {}) {
  return usePagination<PropertyResponse>(
    (page, limit, ...args) => propertyService.getProperties({ page, limit, ...params, ...args[0] }),
    params.limit || 10
  );
}

export function useProperty(id: string) {
  return useApi<PropertyResponse>(
    () => propertyService.getPropertyById(id),
    { immediate: !!id }
  );
}

export function useFeaturedProperties(limit: number = 6) {
  return useApi(
    () => propertyService.getFeaturedProperties(limit),
    { immediate: true }
  );
}

export function usePopularProperties(limit: number = 10) {
  return useApi(
    () => propertyService.getPopularProperties(limit),
    { immediate: true }
  );
}

export function usePropertiesByLocation(city: string, params: PropertySearchParams = {}) {
  return usePagination<PropertyResponse>(
    (page, limit) => propertyService.getPropertiesByLocation(city, { page, limit, ...params }),
    params.limit || 10
  );
}

export function useUserProperties(userId?: string) {
  return useApi(
    () => propertyService.getUserProperties(userId || ''),
    { immediate: !!userId }
  );
}

export function useCreateProperty() {
  return useMutation<PropertyResponse>(propertyService.createProperty, {
    onSuccess: (data) => {
      console.log('Property created successfully:', data);
    },
  });
}

export function useUpdateProperty() {
  return useMutation<PropertyResponse>(propertyService.updateProperty);
}

export function useDeleteProperty() {
  return useMutation(propertyService.deleteProperty, {
    onSuccess: () => {
      console.log('Property deleted successfully');
    },
  });
}

export function useTogglePropertyStatus() {
  return useMutation(propertyService.togglePropertyStatus);
}

export function useUploadPropertyMedia() {
  return useMutation(propertyService.uploadPropertyMedia);
}

export function useUniqueCities() {
  return useApi<string[]>(
    propertyService.getUniqueCities,
    { immediate: true }
  );
}

export function useSearchProperties() {
  return useApi<any>(propertyService.searchProperties);
}

export function useDebouncedPropertySearch(delay: number = 300) {
  return useDebouncedApi<any>(propertyService.searchProperties, delay);
}

export function usePropertyStats() {
  return useApi(
    propertyService.getPropertyStats,
    { immediate: true }
  );
}

export function usePropertiesNearby() {
  return useApi(propertyService.getPropertiesNearby);
}

export function useReportProperty() {
  return useMutation(propertyService.reportProperty, {
    onSuccess: () => {
      console.log('Property reported successfully');
    },
  });
}

export function useBookmarkProperty() {
  return useMutation(propertyService.bookmarkProperty);
}

export function useRemoveBookmark() {
  return useMutation(propertyService.removeBookmark);
}

export function useUserBookmarks() {
  return useApi<PropertyResponse[]>(
    propertyService.getUserBookmarks,
    { immediate: true }
  );
}

export function useContactOwner() {
  return useMutation(propertyService.contactOwner, {
    onSuccess: () => {
      console.log('Message sent to owner successfully');
    },
  });
}

export function useScheduleVisit() {
  return useMutation(propertyService.scheduleVisit, {
    onSuccess: () => {
      console.log('Visit scheduled successfully');
    },
  });
}

export function useRateProperty() {
  return useMutation(propertyService.rateProperty, {
    onSuccess: () => {
      console.log('Property rated successfully');
    },
  });
}

export function usePropertyReviews(propertyId: string) {
  return usePagination(
    (page, limit) => propertyService.getPropertyReviews(propertyId, page, limit),
    10
  );
}

export function useSimilarProperties(propertyId: string, limit: number = 5) {
  return useApi(
    () => propertyService.getSimilarProperties(propertyId, limit),
    { immediate: !!propertyId }
  );
}

export function useIncrementViews() {
  return useMutation(propertyService.incrementViews);
}

// Combined property management hook
export function usePropertyManagement() {
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const deleteProperty = useDeleteProperty();
  const toggleStatus = useTogglePropertyStatus();
  const uploadMedia = useUploadPropertyMedia();

  const handleCreate = useCallback(async (data: PropertyFormData) => {
    return await createProperty.execute(data);
  }, [createProperty]);

  const handleUpdate = useCallback(async (id: string, data: Partial<PropertyFormData>) => {
    return await updateProperty.execute(id, data);
  }, [updateProperty]);

  const handleDelete = useCallback(async (id: string) => {
    return await deleteProperty.execute(id);
  }, [deleteProperty]);

  const handleToggleStatus = useCallback(async (id: string, activate: boolean) => {
    return await toggleStatus.execute(id, activate);
  }, [toggleStatus]);

  const handleUploadMedia = useCallback(async (id: string, images: File[]) => {
    return await uploadMedia.execute(id, images);
  }, [uploadMedia]);

  return {
    create: {
      execute: handleCreate,
      loading: createProperty.loading,
      error: createProperty.error,
      success: createProperty.success,
    },
    update: {
      execute: handleUpdate,
      loading: updateProperty.loading,
      error: updateProperty.error,
      success: updateProperty.success,
    },
    delete: {
      execute: handleDelete,
      loading: deleteProperty.loading,
      error: deleteProperty.error,
      success: deleteProperty.success,
    },
    toggleStatus: {
      execute: handleToggleStatus,
      loading: toggleStatus.loading,
      error: toggleStatus.error,
      success: toggleStatus.success,
    },
    uploadMedia: {
      execute: handleUploadMedia,
      loading: uploadMedia.loading,
      error: uploadMedia.error,
      success: uploadMedia.success,
    },
  };
}

// Property filter hook
export function usePropertyFilters() {
  const searchProperties = useSearchProperties();
  const debouncedSearch = useDebouncedPropertySearch();

  const handleFilterChange = useCallback((filters: SearchFilters & PropertySearchParams) => {
    debouncedSearch.execute(filters);
  }, [debouncedSearch]);

  const handleImmediateSearch = useCallback((filters: SearchFilters & PropertySearchParams) => {
    searchProperties.execute(filters);
  }, [searchProperties]);

  return {
    search: handleImmediateSearch,
    debouncedSearch: handleFilterChange,
    results: searchProperties.data || debouncedSearch.data,
    loading: searchProperties.loading || debouncedSearch.loading,
    error: searchProperties.error || debouncedSearch.error,
  };
}
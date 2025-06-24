import { httpClient } from "../../lib/httpClient";
import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API functions for designs
const designApi = {
  // Get all designs for the current user
  getAllDesigns: async () => {
    const response = await httpClient.get("/designs/shop/view/");
    return response.data["response data"].result || [];
  },

  // Get a specific design by ID
  getDesignById: async (designId) => {
    const response = await httpClient.get(`/designs/${designId}`);
    return response.data.response_data;
  },

  // Create a new design
  createDesign: async (designData) => {
    const response = await httpClient.post("/designs", designData);
    return response.data.response_data;
  },

  // Update an existing design
  updateDesign: async ({ designId, designData }) => {
    const response = await httpClient.put(`/designs/${designId}`, designData);
    return response.data.response_data;
  },

  // Delete a design
  deleteDesign: async (designId) => {
    const response = await httpClient.delete(`/designs/${designId}`);
    return response.data.response_data;
  },

  // Publish a design
  publishDesign: async ({ designId, publishData }) => {
    const response = await httpClient.post(
      `/designs/${designId}/publish`,
      publishData
    );
    return response.data.response_data;
  },

  // Upload design image
  uploadDesignImage: async ({ designId, imageFile }) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await httpClient.post(
      `/designs/${designId}/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.response_data;
  },
};

// Zustand store for design-related state
export const useDesignApiStore = create((set) => ({
  // Loading states
  isLoading: false,
  isUploading: false,
  isPublishing: false,

  // Error states
  error: null,

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set uploading state
  setUploading: (isUploading) => set({ isUploading }),

  // Set publishing state
  setPublishing: (isPublishing) => set({ isPublishing }),

  // Set error state
  setError: (error) => set({ error }),

  // Clear error state
  clearError: () => set({ error: null }),
}));

// React Query hooks

// Hook to fetch all designs
export const useGetAllDesigns = () => {
  const setLoading = useDesignApiStore((state) => state.setLoading);
  const setError = useDesignApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["designs"],
    queryFn: designApi.getAllDesigns,
    onError: (error) => {
      setError(error.message || "Failed to fetch designs");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to fetch a specific design
export const useGetDesignById = (designId) => {
  const setLoading = useDesignApiStore((state) => state.setLoading);
  const setError = useDesignApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["design", designId],
    queryFn: () => designApi.getDesignById(designId),
    enabled: !!designId,
    onError: (error) => {
      setError(error.message || "Failed to fetch design");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to create a new design
export const useCreateDesign = () => {
  const queryClient = useQueryClient();
  const setLoading = useDesignApiStore((state) => state.setLoading);
  const setError = useDesignApiStore((state) => state.setError);

  return useMutation({
    mutationFn: designApi.createDesign,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to create design");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to update a design
export const useUpdateDesign = () => {
  const queryClient = useQueryClient();
  const setLoading = useDesignApiStore((state) => state.setLoading);
  const setError = useDesignApiStore((state) => state.setError);

  return useMutation({
    mutationFn: designApi.updateDesign,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["design", variables.designId],
      });
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to update design");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to delete a design
export const useDeleteDesign = () => {
  const queryClient = useQueryClient();
  const setLoading = useDesignApiStore((state) => state.setLoading);
  const setError = useDesignApiStore((state) => state.setError);

  return useMutation({
    mutationFn: designApi.deleteDesign,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to delete design");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to publish a design
export const usePublishDesign = () => {
  const queryClient = useQueryClient();
  const setPublishing = useDesignApiStore((state) => state.setPublishing);
  const setError = useDesignApiStore((state) => state.setError);

  return useMutation({
    mutationFn: designApi.publishDesign,
    onMutate: () => {
      setPublishing(true);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["design", variables.designId],
      });
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to publish design");
    },
    onSettled: () => {
      setPublishing(false);
    },
  });
};

// Hook to upload a design image
export const useUploadDesignImage = () => {
  const queryClient = useQueryClient();
  const setUploading = useDesignApiStore((state) => state.setUploading);
  const setError = useDesignApiStore((state) => state.setError);

  return useMutation({
    mutationFn: designApi.uploadDesignImage,
    onMutate: () => {
      setUploading(true);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["design", variables.designId],
      });
    },
    onError: (error) => {
      setError(error.message || "Failed to upload image");
    },
    onSettled: () => {
      setUploading(false);
    },
  });
};

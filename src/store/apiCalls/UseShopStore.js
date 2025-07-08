"use client";

import { toast } from "sonner";

import { httpClient } from "../../lib/httpClient";
import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const shopApi = {
  // List Shops with Filtering and Pagination (ADMIN)
  getAllShopByAdmin: async () => {
    const response = await httpClient.get("/shops/admin/view/");
    return response.data["response data"].result || [];
  },

  // Get Shop by ID (ADMIN)
  getShopByIdBydAdmin: async (id) => {
    const response = await httpClient.get(`/shops/admin/view/${id}`);
    return response.data["response data"].result || [];
  },

  // Get user's own shop
  getUserShop: async () => {
    const response = await httpClient.get(`/shops/profile`);
    return response.data["response data"] || [];
  },

  // Get all shops (USER)
  getALLShopUser: async () => {
    const response = await httpClient.get(`/shops/all/users/view/`);
    return response.data["response data"].result || [];
  },

  // Get shop by ID (USER)
  getShopByIdUser: async (id) => {
    const response = await httpClient.get(
      `/shops/all/users/view?shop_id=${id}`
    );
    return response.data["response data"] || [];
  },

  // Delete own shop
  deleteOwnShop: async () => {
    const response = await httpClient.delete(`/shops/delete`);
    return response.data["response data"].result || [];
  },

  // Create own shop
  createOwnShop: async (data) => {
    const response = await httpClient.post(`/shops/users/create/`, data);
    return response.data["response data"].result || [];
  },

  // Update own shop
  updateOwnShop: async (data) => {
    const response = await httpClient.put(`/shops/update/`, data);
    return response.data["response data"] || [];
  },

  // Update shop approval (ADMIN)
  updateShopApproval: async (data) => {
    const response = await httpClient.post(`/shops/admin/approval/`, data);
    return response.data["response data"].result || [];
  },
};

// Zustand store for shop API state
export const useShopApiStore = create((set) => ({
  // Loading states
  isLoading: false,
  isUploading: false,
  isPublishing: false,

  // Error state
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

// =====================
// React Query Hooks
// =====================

// Hook to fetch all shops (ADMIN)
export const useGetAllShopByAdmin = () => {
  const setLoading = useShopApiStore((state) => state.setLoading);
  const setError = useShopApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["shops", "admin"],
    queryFn: shopApi.getAllShopByAdmin,
    onError: (error) => {
      setError(error.message || "Failed to fetch shops");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to fetch a shop by ID (ADMIN)
export const useGetShopByIdBydAdmin = (id) => {
  const setLoading = useShopApiStore((state) => state.setLoading);
  const setError = useShopApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["shops", "admin", id],
    queryFn: () => shopApi.getShopByIdBydAdmin(id),
    onError: (error) => {
      setError(error.message || "Failed to fetch shop");
    },
    onSettled: () => {
      setLoading(false);
    },
    enabled: !!id,
  });
};

// Hook to fetch the current user's shop
export const useGetUserShop = () => {
  const setLoading = useShopApiStore((state) => state.setLoading);
  const setError = useShopApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["shops", "user", "profile"],
    queryFn: shopApi.getUserShop,
    onError: (error) => {
      setError(error.message || "Failed to fetch user shop");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to fetch all shops (USER)
export const useGetALLShopUser = () => {
  const setLoading = useShopApiStore((state) => state.setLoading);
  const setError = useShopApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["shops", "user", "all"],
    queryFn: shopApi.getALLShopUser,
    onError: (error) => {
      setError(error.message || "Failed to fetch shops");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to fetch a shop by ID (USER)
export const useGetShopByIdUser = (id) => {
  const setLoading = useShopApiStore((state) => state.setLoading);
  const setError = useShopApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["shops", "user", id],
    queryFn: () => shopApi.getShopByIdUser(id),
    onError: (error) => {
      setError(error.message || "Failed to fetch shop");
    },
    onSettled: () => {
      setLoading(false);
    },
    enabled: !!id,
  });
};

// Hook to delete own shop
export const useDeleteOwnShop = () => {
  const queryClient = useQueryClient();
  const setLoading = useShopApiStore((state) => state.setLoading);
  const setError = useShopApiStore((state) => state.setError);

  return useMutation({
    mutationFn: shopApi.deleteOwnShop,
    onMutate: () => setLoading(true),
    onError: (error) => {
      setError(error.message || "Failed to delete shop");
      setLoading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["shops", "user", "profile"]);
      setLoading(false);
    },
    onSettled: () => setLoading(false),
  });
};

// Hook to create own shop
export const useCreateOwnShop = () => {
  const queryClient = useQueryClient();
  const setUploading = useShopApiStore((state) => state.setUploading);
  const setError = useShopApiStore((state) => state.setError);

  return useMutation({
    mutationFn: shopApi.createOwnShop,
    onMutate: () => setUploading(true),
    onError: (error) => {
      setError(error.message || "Failed to create shop");
      setUploading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["shops", "user", "profile"]);
      setUploading(false);
      toast.message("Shop created successful");
    },
    onSettled: () => setUploading(false),
  });
};

// Hook to update own shop
export const useUpdateOwnShop = () => {
  const queryClient = useQueryClient();
  const setUploading = useShopApiStore((state) => state.setUploading);
  const setError = useShopApiStore((state) => state.setError);

  return useMutation({
    mutationFn: (data) => shopApi.updateOwnShop(data),
    onMutate: () => setUploading(true),
    onError: (error) => {
      setError(error.message || "Failed to update shop");
      setUploading(false);
      toast.message("Updating successful");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["shops", "user", "profile"]);
      setUploading(false);
    },
    onSettled: () => setUploading(false),
  });
};

// Hook to update shop approval (ADMIN)
export const useUpdateShopApproval = () => {
  const queryClient = useQueryClient();
  const setPublishing = useShopApiStore((state) => state.setPublishing);
  const setError = useShopApiStore((state) => state.setError);

  return useMutation({
    mutationFn: shopApi.updateShopApproval,
    onMutate: () => setPublishing(true),
    onError: (error) => {
      setError(error.message || "Failed to update shop approval");
      setPublishing(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["shops", "admin"]);
      setPublishing(false);
    },
    onSettled: () => setPublishing(false),
  });
};

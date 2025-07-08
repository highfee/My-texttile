import { httpClient } from "../../lib/httpClient";
import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/router";

const adminApi = {
  // Update shop approval status (ADMIN)
  adminApproveStore: async ({ shop_id, approval_status }) => {
    const response = await httpClient.post("/shops/admin/approval/", {
      shop_id,
      approval_status,
    });
    return response.data["response data"].result || [];
  },

  // Send admin notification
  sendAdminNotification: async ({ message }) => {
    const response = await httpClient.post("/users/admin/send/shop/notifications/", {
      message,
    });
    return response.data["response data"] || [];
  },

  // Get admin notifications
  getAdminNotifications: async () => {
    const response = await httpClient.get("/users/admin/view/notifications/");
    return response.data["response data"].result || [];
  },

  // Block/Unblock user
  blockAndUnblockUser: async ({ user_id, block }) => {
    const response = await httpClient.post("/users/admin/block/", {
      user_id,
      block,
    });
    return response.data["response data"] || [];
  },

  // Update tax rate
  updateTaxRate: async ({ tax_percentage }) => {
    const response = await httpClient.post("/orders/admin/tax-rate/update/", {
      tax_percentage,
    });
    return response.data["response data"] || [];
  },

  // Update shipping option
  updateShippingOption: async ({ shipping_option_id, shipper_name, shipping_rate_per_kg }) => {
    const response = await httpClient.put(`/orders/admin/shipping-options/update/${shipping_option_id}/`, {
      shipper_name,
      shipping_rate_per_kg,
    });
    return response.data["response data"] || [];
  },

  // Create shipping option
  createShippingOption: async ({ shipper_name, shipping_rate_per_kg }) => {
    const response = await httpClient.post("/orders/admin/shipping-options/create/", {
      shipper_name,
      shipping_rate_per_kg,
    });
    return response.data["response data"] || [];
  },

  // Get all orders
  getAllOrders: async () => {
    const response = await httpClient.get('/orders/admin/view/');
    return response.data;
  },

  // Get all shops
  getAllShops: async () => {
    const response = await httpClient.get('/shops/admin/view/');
    return response.data;
  },

  // Get all designs
  getAllDesigns: async () => {
    const response = await httpClient.get('/designs/admin/view/');
    return response.data;
  },

  // Update tier subscription price
  updateTierSubscriptionPrice: async (id, data) => {
    const response = await httpClient.put(`/shops/tiers/${id}/update/`, data);
    return response.data;
  },

  // Create tier
  createTier: async (data) => {
    const response = await httpClient.post('/shops/tiers/create/', data);
    return response.data;
  },

  // Delete shipping option
  deleteShippingOption: async (shipping_option_id) => {
    const response = await httpClient.delete(`/orders/shipping-options/${shipping_option_id}/delete/`);
    return response.data;
  },

  // Create tax rate
  createTaxRate: async ({ tax_percentage }) => {
    const response = await httpClient.post("/orders/admin/tax-rate/create/", {
      tax_percentage,
    });
    return response.data["response data"] || [];
  },

  // Toggle user staff status
  toggleUserStaffStatus: async ({ user_id, is_staff }) => {
    const response = await httpClient.post("/users/admin/make/staff/", {
      user_id,
      is_staff,
    });
    return response.data["response data"] || [];
  },

  // Update tier price
  updateTierPrice: async ({ tier, t_shirt_base_price, sweatshirt_base_price, hoodie_base_price }) => {
    const response = await httpClient.put("/designs/base/price/admin/update/", {
      tier,
      t_shirt_base_price,
      sweatshirt_base_price,
      hoodie_base_price,
    });
    return response.data["response data"] || [];
  },

  // Create tier price
  createTierPrice: async ({ tier, t_shirt_base_price, sweatshirt_base_price, hoodie_base_price }) => {
    const response = await httpClient.post("/designs/admin/tiers/create/", {
      tier,
      t_shirt_base_price,
      sweatshirt_base_price,
      hoodie_base_price,
    });
    return response.data["response data"] || [];
  },

  // Update design status
  updateDesignStatus: async ({ design_id, approval_status }) => {
    const response = await httpClient.post("/designs/admin/approve/decline/", {
      design_id,
      approval_status,
    });
    return response.data["response data"] || [];
  },

  // View all tiers
  viewAllTiers: async () => {
    const response = await httpClient.get("/designs/admin/all/base/price/view/");
    return response.data["response data"].result || [];
  },

  // Get all users
  getAllUsers: async () => {
    const response = await httpClient.get("/users/admin/view/");
    return response.data["response data"].result || [];
  },
};

// Zustand store for admin API state
export const useAdminApiStore = create((set) => ({
  // Loading states
  isLoading: false,
  isApproving: false,

  // Error state
  error: null,

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set approving state
  setApproving: (isApproving) => set({ isApproving }),

  // Set error state
  setError: (error) => set({ error }),

  // Clear error state
  clearError: () => set({ error: null }),
}));

// React Query hooks

// Hook to approve/reject stores (ADMIN)
export const useAdminApproveStore = () => {
  const queryClient = useQueryClient();
  const setApproving = useAdminApiStore((state) => state.setApproving);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.adminApproveStore,
    onMutate: () => {
      setApproving(true);
    },
    onSuccess: () => {
      toast("Store approval status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["allStores"] });
      queryClient.invalidateQueries({ queryKey: ["shops", "admin"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to update store approval");
      toast(error.message || "Error updating store approval");
    },
    onSettled: () => {
      setApproving(false);
    },
  });
};

// Hook to send admin notification
export const useSendAdminNotification = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.sendAdminNotification,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Notification sent successfully");
      queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to send notification");
      toast(error.message || "Error sending notification");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to get admin notifications
export const useGetAdminNotifications = () => {
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["adminNotifications"],
    queryFn: adminApi.getAdminNotifications,
    onError: (error) => {
      setError(error.message || "Failed to fetch notifications");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to block/unblock user
export const useBlockAndUnblockUser = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.blockAndUnblockUser,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (_, variables) => {
      const action = variables.block ? "blocked" : "unblocked";
      toast(`User ${action} successfully`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["allStores"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to update user status");
      toast(error.message || "Error updating user status");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to update tax rate
export const useUpdateTaxRate = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.updateTaxRate,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Tax rate updated successfully");
      queryClient.invalidateQueries({ queryKey: ["taxRate"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to update tax rate");
      toast(error.message || "Error updating tax rate");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to update shipping option
export const useUpdateShippingOption = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.updateShippingOption,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Shipping option updated successfully");
      queryClient.invalidateQueries({ queryKey: ["shippingOptions"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to update shipping option");
      toast(error.message || "Error updating shipping option");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to create shipping option
export const useCreateShippingOption = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.createShippingOption,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Shipping option created successfully");
      queryClient.invalidateQueries({ queryKey: ["shippingOptions"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to create shipping option");
      toast(error.message || "Error creating shipping option");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to create tax rate
export const useCreateTaxRate = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.createTaxRate,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Tax rate created successfully");
      queryClient.invalidateQueries({ queryKey: ["taxRate"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to create tax rate");
      toast(error.message || "Error creating tax rate");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to toggle user staff status
export const useToggleUserStaffStatus = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.toggleUserStaffStatus,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (_, variables) => {
      const action = variables.is_staff ? "promoted to staff" : "removed from staff";
      toast(`User ${action} successfully`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to update user staff status");
      toast(error.message || "Error updating user staff status");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to update tier price
export const useUpdateTierPrice = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.updateTierPrice,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Tier price updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tierPrices"] });
      queryClient.invalidateQueries({ queryKey: ["allTiers"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to update tier price");
      toast(error.message || "Error updating tier price");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to create tier price
export const useCreateTierPrice = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.createTierPrice,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast("Tier price created successfully");
      queryClient.invalidateQueries({ queryKey: ["tierPrices"] });
      queryClient.invalidateQueries({ queryKey: ["allTiers"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to create tier price");
      toast(error.message || "Error creating tier price");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to update design status
export const useUpdateDesignStatus = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.updateDesignStatus,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (_, variables) => {
      const action = variables.approval_status === "approved" ? "approved" : "declined";
      toast(`Design ${action} successfully`);
      queryClient.invalidateQueries({ queryKey: ["designs"] });
      queryClient.invalidateQueries({ queryKey: ["adminDesigns"] });
    },
    onError: (error) => {
      setError(error.message || "Failed to update design status");
      toast(error.message || "Error updating design status");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to view all tiers
export const useViewAllTiers = () => {
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["allTiers"],
    queryFn: adminApi.viewAllTiers,
    onError: (error) => {
      setError(error.message || "Failed to fetch tiers");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// Hook to get all users
export const useGetAllUsers = () => {
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useQuery({
    queryKey: ["allUsers"],
    queryFn: adminApi.getAllUsers,
    onError: (error) => {
      setError(error.message || "Failed to fetch users");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// TanStack Query hook for getting all orders
export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ['allOrders'],
    queryFn: adminApi.getAllOrders,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// TanStack Query hook for getting all shops
export const useGetAllShops = () => {
  return useQuery({
    queryKey: ['allShops'],
    queryFn: adminApi.getAllShops,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// TanStack Query hook for getting all designs
export const useGetAllDesigns = () => {
  return useQuery({
    queryKey: ['allDesigns'],
    queryFn: adminApi.getAllDesigns,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// TanStack Query hook for updating tier subscription price
export const useUpdateTierSubscriptionPrice = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: ({ id, ...data }) => adminApi.updateTierSubscriptionPrice(id, data),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast('Tier subscription price updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['allTiers'] });
      queryClient.invalidateQueries({ queryKey: ['allShops'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update tier subscription price';
      setError(errorMessage);
      toast(errorMessage);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// TanStack Query hook for creating tier
export const useCreateTier = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.createTier,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast('Tier created successfully!');
      queryClient.invalidateQueries({ queryKey: ['allTiers'] });
      queryClient.invalidateQueries({ queryKey: ['allShops'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create tier';
      setError(errorMessage);
      toast(errorMessage);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

// TanStack Query hook for deleting shipping option
export const useDeleteShippingOption = () => {
  const queryClient = useQueryClient();
  const setLoading = useAdminApiStore((state) => state.setLoading);
  const setError = useAdminApiStore((state) => state.setError);

  return useMutation({
    mutationFn: adminApi.deleteShippingOption,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast('Shipping option deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['shippingOptions'] });
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete shipping option';
      setError(errorMessage);
      toast(errorMessage);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../authStore';

const useAdminStore = () => {
  const { token } = useAuthStore.getState();

  const fetchAllStores = async () => {
    const response = await axios.get('http://23.88.47.163/prod/api/v1/shops/admin/view/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: stores, isLoading, isError } = useQuery({
    queryKey: ['allStores'],
    queryFn: fetchAllStores,
    enabled: !!token, // Only run the query if the token exists
  });

  return { stores, isLoading, isError };
};

export default useAdminStore;
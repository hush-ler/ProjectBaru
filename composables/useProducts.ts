interface Product {
  id: number;
  name: string;
  category: string;
  desc: string;
  price: number;
  image: string;
  created_by: string;
}

export function useProducts() {
  const { data, error, pending, refresh } = useFetch<{ products: Product[] }>(
    "/api/products"
  );

  const products = computed(() => data.value?.products || []);

  return {
    products,
    pending,
    error,
    refresh,
  };
}

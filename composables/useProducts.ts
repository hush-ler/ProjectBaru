interface Product {
  id: number;
  name: string;
  category: string;
  desc: string;
  price: number;
  image: string;
  created_by: string;
  is_favorite: boolean;
}

export function useProducts() {
  const userStore = useUserStore();
  const user = userStore.user;

  const nama = ref("");
  const deskripsi = ref("");
  const kategori = ref("");
  const favorite = ref(false);
  const imageUrl = ref("");

  const router = useRouter();

  const { data, error, pending, refresh } = useFetch<{ products: Product[] }>(
    "/api/products"
  );

  const products = computed(() => data.value?.products || []);

  const favorites = computed(() =>
    products.value.filter((p) => p.is_favorite === true)
  );

  const userProducts = computed(() => {
    if (!user?.username) return [];
    return products.value.filter((p) => p.created_by === user.username);
  });

  const tambahProduk = async () => {
    const res = await $fetch("/api/products", {
      method: "POST",
      body: {
        name: nama.value,
        desc: deskripsi.value,
        category: kategori.value,
        is_favorite: favorite.value,
        image_url: imageUrl.value,
        created_by: user?.username,
      },
    });

    if (res.success) {
      alert("Produk berhasil ditambahkan");
      router.push("/product/products");
    } else {
      const errorMessage =
        "message" in res ? res.message : "Gagal menambahkan produk";
      alert(errorMessage);
    }
  };

  return {
    nama,
    deskripsi,
    kategori,
    favorite,
    imageUrl,
    tambahProduk,
    products,
    favorites,
    userProducts,
    pending,
    error,
    refresh,
  };
}

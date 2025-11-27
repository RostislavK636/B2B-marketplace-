import productsData from "../data/products.json"
import sellersData from "../data/sellers.json"

// Simulating API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const productsService = {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    await delay(300)
    let products = [...productsData]

    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      products = products.filter(
        (p) => p.title.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
      )
    }

    // Filter by category
    if (filters.category && filters.category !== "all") {
      products = products.filter((p) => p.category === filters.category)
    }

    // Filter by material
    if (filters.material && filters.material !== "all") {
      products = products.filter((p) => p.material === filters.material)
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      products = products.filter((p) => p.price >= filters.minPrice)
    }
    if (filters.maxPrice !== undefined) {
      products = products.filter((p) => p.price <= filters.maxPrice)
    }

    // Filter by lot availability
    if (filters.inLot !== undefined) {
      products = products.filter((p) => p.inLot === filters.inLot)
    }

    // Sort products
    if (filters.sortBy === "price-asc") {
      products.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price-desc") {
      products.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating)
    } else if (filters.sortBy === "popular") {
      products.sort((a, b) => b.stock - a.stock)
    }

    return products
  },

  // Get single product by ID
  async getProductById(id) {
    await delay(200)
    return productsData.find((p) => p.id === Number.parseInt(id))
  },

  // Get related products
  async getRelatedProducts(productId, limit = 4) {
    await delay(200)
    const product = productsData.find((p) => p.id === Number.parseInt(productId))
    if (!product) return []

    return productsData
      .filter((p) => p.id !== product.id && (p.category === product.category || p.material === product.material))
      .slice(0, limit)
  },
}

export const sellersService = {
  // Get all sellers
  async getSellers() {
    await delay(300)
    return sellersData
  },

  // Get single seller by ID
  async getSellerById(id) {
    await delay(200)
    return sellersData.find((s) => s.id === Number.parseInt(id))
  },

  // Get products by seller
  async getProductsBySeller(sellerId) {
    await delay(300)
    return productsData.filter((p) => p.sellerId === Number.parseInt(sellerId))
  },
}

// Lot service
export const lotService = {
  // Mock lot data
  async getLotById(id) {
    await delay(200)
    const product = productsData.find((p) => p.id === Number.parseInt(id) && p.inLot)
    if (!product) return null

    return {
      id: Number.parseInt(id),
      productId: product.id,
      product: product,
      totalQuantity: 1000,
      currentQuantity: 650,
      progress: 65,
      pricePerUnit: product.priceWholesale[product.priceWholesale.length - 1].price,
      minShare: 5,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      participants: 13,
      sellerId: product.sellerId,
    }
  },
}

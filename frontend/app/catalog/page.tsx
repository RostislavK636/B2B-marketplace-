"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Тип для товара с бэкенда
interface ProductFromBackend {
  id: number
  name: string
  averageRating: number
  numberOfReviews: number
  availability: number
  description: string
  detailedDescription: string
  productDetails: {
    size: string
    weight: string
    material: string
    color: string
    loadCapacity: string
    minimumOrderStartsFrom: number
  }
  productPriceRanges: Array<{
    id: number
    initialQuantity: number
    finalQuantity: number | null
    pricePerRange: number
  }>
}

export default function CatalogPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [backendProducts, setBackendProducts] = useState<ProductFromBackend[]>([]) // Товары с бэкенда
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [material, setMaterial] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  
  // Проверка авторизации и загрузка товаров
  useEffect(() => {
    checkAuthAndLoadProducts()
  }, [])
  
  const checkAuthAndLoadProducts = async () => {
    try {
      console.log('=== НАЧАЛО ЗАГРУЗКИ ТОВАРОВ ===')
      
      // 1. Проверяем авторизацию
      const authResponse = await fetch('/api/v1/auth', {
        method: 'GET',
        credentials: 'include',
      })
      
      console.log('Статус auth:', authResponse.status)
      const authData = await authResponse.json()
      console.log('Данные auth:', authData)
      
      if (!authData.authenticated) {
        console.log('Не авторизован! Редирект...')
        router.push('/register')
        return
      }
      
      console.log('Успешно авторизован, sellerId:', authData.sellerId)
      setAuthChecked(true)
      
      // 2. Загружаем товары с бэкенда
      console.log('Загружаем товары с /api/v1/products...')
      const productsResponse = await fetch('/api/v1/products', {
        method: 'GET',
        credentials: 'include',
      })
      
      console.log('Статус products:', productsResponse.status)
      
      if (!productsResponse.ok) {
        const errorText = await productsResponse.text()
        console.error('Ошибка загрузки товаров:', errorText)
        setError(`Ошибка ${productsResponse.status}: ${errorText}`)
        setLoading(false)
        return
      }
      
      const productsData = await productsResponse.json()
      console.log('Полученные товары с бэкенда:', productsData)
      console.log('Количество товаров:', Array.isArray(productsData) ? productsData.length : 'не массив')
      
      if (Array.isArray(productsData)) {
        setBackendProducts(productsData)
        console.log(`Установлено ${productsData.length} товаров в состояние`)
      } else {
        console.error('Ответ не является массивом:', productsData)
        setError('Ошибка формата данных: ожидался массив товаров')
      }
      
    } catch (error) {
      console.error('Исключение при загрузке:', error)
      setError(`Ошибка сети: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      console.log('=== КОНЕЦ ЗАГРУЗКИ ===')
      setLoading(false)
    }
  }
  
  // Показываем загрузку
  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Загрузка товаров...</p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  // Преобразуем товары с бэкенда в формат для отображения
  const transformedProducts = backendProducts.map(product => {
    // Берем минимальную цену из первого диапазона
    const basePrice = product.productPriceRanges?.length > 0 
      ? product.productPriceRanges[0].pricePerRange 
      : 0
    
    // Определяем категорию по материалу
    const productMaterial = product.productDetails?.material || "Не указан"
    const productCategory = mapMaterialToCategory(productMaterial)
    
    // Рейтинг
    const rating = product.averageRating || 4.5
    
    // Изображение (пока заглушка)
    const image = getProductImage(product.name, productMaterial)
    
    return {
      id: product.id,
      name: product.name,
      price: basePrice,
      category: productCategory,
      material: productMaterial,
      image: image,
      rating: rating,
      availability: product.availability,
      description: product.description,
      originalProduct: product
    }
  })
  
  console.log('Преобразовано товаров:', transformedProducts.length)
  console.log('Пример товара:', transformedProducts[0])

  // Фильтрация
  const filteredProducts = transformedProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || product.category === category
    const matchesMaterial = material === "all" || product.material === material
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "low" && product.price < 100) ||
      (priceRange === "medium" && product.price >= 100 && product.price < 300) ||
      (priceRange === "high" && product.price >= 300)

    return matchesSearch && matchesCategory && matchesMaterial && matchesPrice
  })

  // Сортировка
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popular":
      default:
        return b.rating - a.rating
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Каталог продукции</h1>
          
          {/* Информация о загрузке */}
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm">
              Товаров загружено с сервера: <span className="font-bold">{backendProducts.length}</span> | 
              Отфильтровано: <span className="font-bold">{sortedProducts.length}</span>
            </p>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          {/* Search */}
          <div className="mb-8">
            <Input
              type="search"
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xl"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Категория</h3>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        <SelectItem value="Коробки">Коробки</SelectItem>
                        <SelectItem value="Пленка">Пленка</SelectItem>
                        <SelectItem value="Скотч">Скотч</SelectItem>
                        <SelectItem value="Пакеты">Пакеты</SelectItem>
                        <SelectItem value="Другое">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Материал</h3>
                    <Select value={material} onValueChange={setMaterial}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все материалы</SelectItem>
                        <SelectItem value="Картон">Картон</SelectItem>
                        <SelectItem value="Полиэтилен">Полиэтилен</SelectItem>
                        <SelectItem value="Полипропилен">Полипропилен</SelectItem>
                        <SelectItem value="Не указан">Не указан</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Цена</h3>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любая</SelectItem>
                        <SelectItem value="low">До 100 ₽</SelectItem>
                        <SelectItem value="medium">100-300 ₽</SelectItem>
                        <SelectItem value="high">Более 300 ₽</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setCategory("all")
                      setMaterial("all")
                      setPriceRange("all")
                      setSearchQuery("")
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Найдено товаров: {sortedProducts.length}
                  <span className="text-xs text-gray-500 ml-2">
                    (из {backendProducts.length} загруженных)
                  </span>
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">По популярности</SelectItem>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-primary">от {product.price} ₽</p>
                          <span className="text-sm text-muted-foreground">★ {product.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          В наличии: {product.availability} шт
                        </p>
                        <p className="text-xs text-gray-500">
                          Материал: {product.material}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Товары не найдены</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {backendProducts.length === 0 
                      ? "У вас еще нет товаров. Добавьте первый товар!"
                      : "Попробуйте изменить параметры фильтрации"}
                  </p>
                  {backendProducts.length === 0 && (
                    <Link href="/profile/add-product">
                      <Button className="mt-4">Добавить товар</Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={checkAuthAndLoadProducts}
                  >
                    Обновить список
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Вспомогательные функции
function getProductImage(productName: string, material?: string): string {
  const lowerName = productName.toLowerCase()
  const lowerMaterial = material?.toLowerCase() || ""
  
  if (lowerName.includes("короб") || lowerMaterial.includes("картон")) {
    return "/corrugated-box.jpg"
  } else if (lowerName.includes("пленк") || lowerMaterial.includes("полиэтилен")) {
    if (lowerName.includes("пузырчат")) {
      return "/bubble-wrap.png"
    }
    return "/stretch-film.jpg"
  } else if (lowerName.includes("скотч") || lowerMaterial.includes("полипропилен")) {
    return "/clear-packing-tape-roll.png"
  } else if (lowerName.includes("пакет")) {
    return "/bubble-mailer.jpg"
  }
  
  return "/placeholder.svg"
}

function mapMaterialToCategory(material: string): string {
  const lowerMaterial = material.toLowerCase()
  
  if (lowerMaterial.includes("картон")) {
    return "Коробки"
  } else if (lowerMaterial.includes("полиэтилен")) {
    return "Пленка"
  } else if (lowerMaterial.includes("полипропилен")) {
    return "Скотч"
  } else if (material === "Не указан") {
    return "Другое"
  }
  
  return material || "Другое"
}
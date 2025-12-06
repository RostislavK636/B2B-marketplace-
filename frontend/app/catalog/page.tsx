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

export default function CatalogPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")  // ← ВЫНЕСЕНО НАВЕРХ
  const [category, setCategory] = useState("all")     // ← ВЫНЕСЕНО НАВЕРХ
  const [material, setMaterial] = useState("all")     // ← ВЫНЕСЕНО НАВЕРХ
  const [priceRange, setPriceRange] = useState("all") // ← ВЫНЕСЕНО НАВЕРХ
  const [sortBy, setSortBy] = useState("popular")     // ← ВЫНЕСЕНО НАВЕРХ
  
  // Проверка авторизации при загрузке
  useEffect(() => {
    checkAuth()
  }, [])
  
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/v1/auth', {
        method: 'GET',
        credentials: 'include',  // Важно! Отправляем куки
      })
      
      const data = await response.json()
      
      if (!data.authenticated) {
        // Если не авторизован - на страницу регистрации
        router.push('/register')
      } else {
        // Если авторизован - показываем страницу
        setAuthChecked(true)
        console.log('Авторизован как:', data.sellerEmail || data.userEmail)
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error)
      router.push('/register')
    }
  }
  
  // Показываем загрузку пока проверяем авторизацию
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Проверка авторизации...</p>
        </div>
      </div>
    )
  }
  
  // Остальной код компонента
  const products = [
    {
      id: 1,
      name: "Картонная коробка 40x30x20",
      price: 25,
      category: "Коробки",
      material: "Картон",
      image: "/simple-cardboard-box.png",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Пузырчатая пленка рулон 100м",
      price: 450,
      category: "Пленка",
      material: "Полиэтилен",
      image: "/bubble-wrap.png",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Скотч упаковочный 50м",
      price: 85,
      category: "Скотч",
      material: "Полипропилен",
      image: "/clear-packing-tape-roll.png",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Стрейч-пленка 500мм",
      price: 320,
      category: "Пленка",
      material: "Полиэтилен",
      image: "/stretch-film.jpg",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Гофрокороб 60x40x40",
      price: 45,
      category: "Коробки",
      material: "Картон",
      image: "/corrugated-box.jpg",
      rating: 4.8,
    },
    {
      id: 6,
      name: "Воздушно-пузырчатые пакеты",
      price: 12,
      category: "Пакеты",
      material: "Полиэтилен",
      image: "/bubble-mailer.jpg",
      rating: 4.5,
    },
  ]

  const filteredProducts = products.filter((product) => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Каталог продукции</h1>

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
                <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
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
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-primary">{product.price} ₽</p>
                          <span className="text-sm text-muted-foreground">★ {product.rating}</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Товары не найдены</p>
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
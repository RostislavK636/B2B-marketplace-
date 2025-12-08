'use client'

import React, { useState, useEffect } from 'react'
import { Trash2, Plus, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

// Тип для отображения на фронтенде
type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  quantity: number
}

type Document = {
  id: string
  name: string
  verified: boolean
}

type AuthData = {
  authenticated: boolean
  sellerEmail?: string
  userEmail?: string
  sellerId?: string
}

export default function SellerDashboard({ params }: { params?: { id?: string } }) {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const sellerId = params?.id ?? '1'

  // Проверка авторизации и загрузка товаров
  useEffect(() => {
    checkAuthAndLoadProducts()
  }, [])

  const checkAuthAndLoadProducts = async () => {
    try {
      console.log('=== Загрузка SellerDashboard ===')
      
      // 1. Проверяем авторизацию
      const authResponse = await fetch('/api/v1/auth', {
        method: 'GET',
        credentials: 'include',
      })
      
      const authData = await authResponse.json()
      console.log('Auth данные:', authData)
      
      if (!authData.authenticated) {
        router.push('/register')
        return
      }
      
      setAuthData(authData)
      setAuthChecked(true)
      
      // 2. Загружаем товары продавца
      const productsResponse = await fetch('/api/v1/products', {
        method: 'GET',
        credentials: 'include',
      })
      
      console.log('Статус товаров:', productsResponse.status)
      
      if (productsResponse.ok) {
        const backendProducts: ProductFromBackend[] = await productsResponse.json()
        console.log('Получено товаров с сервера:', backendProducts.length)
        
        // Преобразуем товары из формата бэкенда в формат фронтенда
        const transformedProducts = backendProducts.map(product => {
          // Определяем статус на основе количества
          let status: 'in-stock' | 'low-stock' | 'out-of-stock'
          if (product.availability <= 0) {
            status = 'out-of-stock'
          } else if (product.availability < 50) {
            status = 'low-stock'
          } else {
            status = 'in-stock'
          }
          
          // Берем минимальную цену из первого диапазона
          const basePrice = product.productPriceRanges?.length > 0 
            ? product.productPriceRanges[0].pricePerRange 
            : 0
          
          // Определяем категорию по материалу
          const category = mapMaterialToCategory(product.productDetails?.material || "Другое")
          
          // Генерируем изображение на основе названия
          const image = getProductImage(product.name, product.productDetails?.material)
          
          return {
            id: product.id.toString(),
            name: product.name,
            price: basePrice,
            image: image,
            category: category,
            status: status,
            quantity: product.availability,
            originalProduct: product // сохраняем оригинальный объект
          }
        })
        
        console.log('Преобразовано товаров:', transformedProducts.length)
        setProducts(transformedProducts)
        
      } else {
        console.error('Ошибка загрузки товаров:', await productsResponse.text())
      }
      
    } catch (error) {
      console.error('Ошибка при загрузке:', error)
      router.push('/register')
    } finally {
      setLoading(false)
    }
  }

  // Показываем загрузку пока проверяем авторизацию
  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка товаров...</p>
        </div>
      </div>
    )
  }

  // Тестовые данные поставщика (можно заменить на данные из authData)
  const sellerInfo = {
    name: 'ООО "Оптовая база"',
    role: 'Поставщик',
    email: authData?.sellerEmail || 'info@optbase.ru',
    phone: '+7 (495) 123-45-67',
    avatar: 'https://via.placeholder.com/120/4F46E5/FFFFFF?text=ОБ',
    documents: [
      { id: 1, name: 'ИНН', verified: true },
      { id: 2, name: 'Устав организации', verified: true },
      { id: 3, name: 'Свидетельство о регистрации', verified: false },
      { id: 4, name: 'Лицензия', verified: true },
    ] as Document[],
  }

  async function deleteProduct(id: string) {
    if (typeof window !== 'undefined') {
      if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
        try {
          // TODO: Реализовать удаление на бэкенде
          // await fetch(`/api/v1/products/${id}`, {
          //   method: 'DELETE',
          //   credentials: 'include'
          // })
          
          // Пока просто удаляем из состояния
          setProducts((prev) => prev.filter((p) => p.id !== id))
          alert('Товар удален (пока только на фронтенде)')
        } catch (error) {
          console.error('Ошибка удаления:', error)
          alert('Ошибка при удалении товара')
        }
      }
    }
  }

  function getStatusBadge(status: Product['status']) {
    switch (status) {
      case 'in-stock':
        return { label: 'В наличии', color: 'bg-green-100 text-green-800', dotColor: 'bg-green-500' }
      case 'low-stock':
        return { label: 'Мало', color: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-500' }
      case 'out-of-stock':
        return { label: 'Нет в наличии', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ЛЕВЫЙ БЛОК - ИНФОРМАЦИЯ О ПОСТАВЩИКЕ */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-8 shadow-sm">
              <CardContent className="p-6 space-y-6">
                {/* Аватар */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {sellerInfo.avatar ? <img src={sellerInfo.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" /> : 'ОБ'}
                  </div>
                  <h2 className="text-lg font-semibold text-center">{sellerInfo.name}</h2>
                  <p className="text-sm text-gray-600 text-center">{sellerInfo.role}</p>
                  <p className="text-xs text-gray-500 mt-2 text-center">{authData?.sellerEmail || authData?.userEmail}</p>
                  <p className="text-xs text-gray-500">ID: {authData?.sellerId || 'неизвестен'}</p>
                </div>

                {/* Контактные данные */}
                <div className="border-t pt-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                    <a href={`mailto:${sellerInfo.email}`} className="text-sm text-indigo-600 hover:underline break-all">
                      {sellerInfo.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Телефон</p>
                    <a href={`tel:${sellerInfo.phone}`} className="text-sm text-indigo-600 hover:underline">
                      {sellerInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Документы */}
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold mb-3">Документы</h3>
                  <div className="space-y-2">
                    {sellerInfo.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{doc.name}</span>
                        <span className="text-lg">{doc.verified ? '✅' : '⏳'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* ПРАВЫЙ БЛОК - ТОВАРЫ */}
          <section className="lg:col-span-3">
            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-indigo-600" />
                <h1 className="text-3xl font-bold">Мои товары</h1>
                <Badge variant="secondary" className="text-lg">
                  {products.length}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={checkAuthAndLoadProducts}
                  disabled={loading}
                >
                  Обновить
                </Button>
                <Link href={`/profile/add-product`}>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Добавить товар
                  </Button>
                </Link>
              </div>
            </div>

            {/* Информация о загрузке */}
            {loading && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600">Загрузка товаров...</p>
              </div>
            )}

            {/* СЕТКА ТОВАРОВ */}
            {products.length === 0 ? (
              <Card className="shadow-sm">
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">У вас пока нет товаров</p>
                  <p className="text-sm text-gray-400 mb-4">Добавьте первый товар в каталог</p>
                  <Link href={`/profile/add-product`}>
                    <Button>Добавить первый товар</Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={checkAuthAndLoadProducts}
                  >
                    Проверить снова
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  const statusInfo = getStatusBadge(product.status)
                  return (
                    <Card key={product.id} className="shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                      {/* Изображение товара */}
                      <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg'
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                        </div>
                      </div>

                      <CardContent className="p-4 flex flex-col flex-grow">
                        {/* Категория */}
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>

                        {/* Название */}
                        <h3 className="font-semibold text-base mb-2 line-clamp-2">{product.name}</h3>

                        {/* Цена и количество */}
                        <div className="mb-4">
                          <p className="text-2xl font-bold text-indigo-600">{product.price}₽</p>
                          <p className="text-sm text-gray-500">В наличии: {product.quantity} шт</p>
                          {product.status === 'low-stock' && (
                            <p className="text-xs text-yellow-600 mt-1">⚠️ Заканчивается</p>
                          )}
                          {product.status === 'out-of-stock' && (
                            <p className="text-xs text-red-600 mt-1">⛔ Нет в наличии</p>
                          )}
                        </div>

                        {/* Кнопка удалить */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          className="w-full gap-2 mt-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                          Удалить
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
            
            {/* Информация о товарах */}
            {products.length > 0 && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  Показано товаров: <span className="font-bold">{products.length}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Товары загружены с сервера. Статус определяется автоматически по количеству.
                </p>
              </div>
            )}
          </section>
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
    return "https://via.placeholder.com/200/E8E8E8/666?text=Коробка"
  } else if (lowerName.includes("пленк") || lowerMaterial.includes("полиэтилен")) {
    if (lowerName.includes("пузырчат")) {
      return "https://via.placeholder.com/200/87CEEB/FFF?text=Пленка"
    }
    return "https://via.placeholder.com/200/ADD8E6/333?text=Пленка"
  } else if (lowerName.includes("скотч") || lowerMaterial.includes("полипропилен")) {
    return "https://via.placeholder.com/200/FFE4B5/333?text=Скотч"
  } else if (lowerName.includes("краск") || lowerName.includes("красок")) {
    return "https://via.placeholder.com/200/FF6B6B/FFF?text=Краска"
  } else if (lowerName.includes("цемент") || lowerName.includes("бетон")) {
    return "https://via.placeholder.com/200/B89968/FFF?text=Цемент"
  } else if (lowerName.includes("арматур") || lowerName.includes("металл")) {
    return "https://via.placeholder.com/200/555/FFF?text=Металл"
  } else if (lowerName.includes("утеплитель") || lowerName.includes("изоляция")) {
    return "https://via.placeholder.com/200/FFD700/333?text=Утеплитель"
  } else if (lowerName.includes("труб") || lowerName.includes("профиль")) {
    return "https://via.placeholder.com/200/808080/FFF?text=Труба"
  } else if (lowerName.includes("клей") || lowerName.includes("клея")) {
    return "https://via.placeholder.com/200/E8E0C0/333?text=Клей"
  }
  
  return "https://via.placeholder.com/200/4F46E5/FFF?text=Товар"
}

function mapMaterialToCategory(material: string): string {
  const lowerMaterial = material.toLowerCase()
  
  if (lowerMaterial.includes("картон")) {
    return "Коробки"
  } else if (lowerMaterial.includes("полиэтилен")) {
    return "Пленка"
  } else if (lowerMaterial.includes("полипропилен")) {
    return "Скотч"
  } else if (lowerMaterial.includes("краск") || lowerMaterial.includes("лак")) {
    return "ЛКМ"
  } else if (lowerMaterial.includes("металл") || lowerMaterial.includes("сталь")) {
    return "Металл"
  } else if (lowerMaterial.includes("цемент") || lowerMaterial.includes("бетон")) {
    return "Строительные материалы"
  } else if (lowerMaterial.includes("утеплитель") || lowerMaterial.includes("изоляция")) {
    return "Изоляция"
  }
  
  return "Другое"
}
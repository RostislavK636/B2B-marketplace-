'use client'

import React from 'react'
import { Trash2, Plus, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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

export default function SellerDashboard({ params }: { params?: { id?: string } }) {
  const sellerId = params?.id ?? '1'

  // Тестовые данные поставщика
  const sellerInfo = {
    name: 'ООО "Оптовая база"',
    role: 'Поставщик',
    email: 'info@optbase.ru',
    phone: '+7 (495) 123-45-67',
    avatar: 'https://via.placeholder.com/120/4F46E5/FFFFFF?text=ОБ',
    documents: [
      { id: 1, name: 'ИНН', verified: true },
      { id: 2, name: 'Устав организации', verified: true },
      { id: 3, name: 'Свидетельство о регистрации', verified: false },
      { id: 4, name: 'Лицензия', verified: true },
    ] as Document[],
  }

  // Тестовые товары (6+)
  const initialProducts: Product[] = [
    {
      id: '1',
      name: 'Гипсокартон ГКЛ 12.5мм',
      price: 350,
      image: 'https://via.placeholder.com/200/E8E8E8/666?text=Гипсокартон',
      category: 'Строительные материалы',
      status: 'in-stock',
      quantity: 500,
    },
    {
      id: '2',
      name: 'Краска акриловая 10л',
      price: 850,
      image: 'https://via.placeholder.com/200/FF6B6B/FFF?text=Краска',
      category: 'ЛКМ',
      status: 'in-stock',
      quantity: 120,
    },
    {
      id: '3',
      name: 'Цемент М400 50кг',
      price: 450,
      image: 'https://via.placeholder.com/200/B89968/FFF?text=Цемент',
      category: 'Строительные материалы',
      status: 'low-stock',
      quantity: 45,
    },
    {
      id: '4',
      name: 'Арматура стальная Ø12мм',
      price: 65,
      image: 'https://via.placeholder.com/200/555/FFF?text=Арматура',
      category: 'Металл',
      status: 'out-of-stock',
      quantity: 0,
    },
    {
      id: '5',
      name: 'Утеплитель минвата 50мм',
      price: 280,
      image: 'https://via.placeholder.com/200/FFD700/333?text=Утеплитель',
      category: 'Изоляция',
      status: 'in-stock',
      quantity: 300,
    },
    {
      id: '6',
      name: 'Профильная труба 40x40x2мм',
      price: 120,
      image: 'https://via.placeholder.com/200/808080/FFF?text=Труба',
      category: 'Металл',
      status: 'in-stock',
      quantity: 250,
    },
    {
      id: '7',
      name: 'Клей для плитки 25кг',
      price: 890,
      image: 'https://via.placeholder.com/200/E8E0C0/333?text=Клей',
      category: 'Отделочные материалы',
      status: 'in-stock',
      quantity: 80,
    },
  ]

  const [products, setProducts] = React.useState<Product[]>(initialProducts)

  function deleteProduct(id: string) {
    if (typeof window !== 'undefined') {
      if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
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
              <Link href={`profile/add-product`}>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить товар
                </Button>
              </Link>
            </div>

            {/* СЕТКА ТОВАРОВ */}
            {products.length === 0 ? (
              <Card className="shadow-sm">
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">У вас пока нет товаров</p>
                  <Link href={`/seller/${sellerId}/add-product`}>
                    <Button>Добавить первый товар</Button>
                  </Link>
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
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
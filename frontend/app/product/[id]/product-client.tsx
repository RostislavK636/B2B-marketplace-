"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ProductClientProps {
  product: {
    id: number
    name: string
    category: string
    material: string
    rating: number
    reviews: number
    inStock: number
    images: string[]
    description: string
    detailedDescription: string
    pricing: Array<{ min: number; max: number | null; price: number }>
    specs: Record<string, string>
    seller: {
      id: number
      name: string
      logo: string
      rating: number
      verified: boolean
      hasFinancialIssues: boolean
    }
    additionalServices: Array<{ name: string; description: string; available: boolean }>
  }
  relatedProducts: Array<{ id: number; name: string; price: number; image: string; rating: number }>
}

export function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            {" / "}
            <Link href="/catalog" className="hover:text-primary transition-colors">
              Каталог
            </Link>
            {" / "}
            <Link href="/catalog?category=boxes" className="hover:text-primary transition-colors">
              {product.category}
            </Link>
            {" / "}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Images */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === index ? "border-primary shadow-md" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt="" className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-3 text-balance">{product.name}</h1>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews} отзывов)</span>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    В наличии: {product.inStock} шт
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Оптовые цены</h3>
                  <div className="space-y-3">
                    {product.pricing.map((tier, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-border last:border-0"
                      >
                        <span className="text-muted-foreground font-medium">
                          {tier.min} — {tier.max ? `${tier.max} шт` : "∞"}
                        </span>
                        <span className="font-bold text-xl text-primary">{tier.price} ₽/шт</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button size="lg" className="w-full text-lg h-14 shadow-sm" asChild>
                  <Link href={`/lot-purchase/${product.id}`}>Купить </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full text-lg h-14 bg-transparent">
                  Добавить в запрос
                </Button>
                <Button size="lg" variant="secondary" className="w-full text-lg h-14" asChild>
                  <Link href={`/seller/${product.seller.id}`}>Связаться с продавцом</Link>
                </Button>
              </div>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={product.seller.logo || "/placeholder.svg"}
                      alt={product.seller.name}
                      className="w-16 h-16 rounded-lg border border-border"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">Продавец</h3>
                      <Link
                        href={`/seller/${product.seller.id}`}
                        className="text-primary hover:underline font-semibold"
                      >
                        {product.seller.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{product.seller.rating}</span>
                        </span>
                        {product.seller.verified && (
                          <Badge variant="default" className="text-xs">
                            Проверен
                          </Badge>
                        )}
                        {product.seller.hasFinancialIssues && (
                          <Badge variant="destructive" className="text-xs">
                            Финансовые проблемы
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/seller/${product.seller.id}`}>Профиль</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Характеристики товара</h2>
            <Card className="shadow-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground font-medium capitalize">
                        {key === "size" && "Размер"}
                        {key === "material" && "Материал"}
                        {key === "weight" && "Вес"}
                        {key === "color" && "Цвет"}
                        {key === "minOrder" && "Минимальный заказ"}
                        {key === "loadCapacity" && "Грузоподъемность"}
                      </span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Подробное описание</h2>
            <Card className="shadow-sm">
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed text-lg">{product.detailedDescription}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Дополнительные услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.additionalServices.map((service, index) => (
                <Card key={index} className={`shadow-sm ${service.available ? "border-primary/20" : "opacity-50"}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      {service.available ? (
                        <Badge variant="default" className="text-xs">
                          Доступно
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Недоступно
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Рекомендуемые товары</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/product/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full aspect-square object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 text-balance">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-primary">от {item.price} ₽</p>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          {item.rating}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

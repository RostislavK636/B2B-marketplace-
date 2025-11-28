import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]
}

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const seller = {
    id: Number.parseInt(id),
    name: 'ООО "УпакПром"',
    logo: "/packaging-company-logo.jpg",
    rating: 4.9,
    reviews: 342,
    verified: true,
    since: "2020",
    description:
      "Производитель упаковочных материалов с полным циклом производства. Работаем напрямую с заводами и гарантируем качество продукции.",
    fullDescription:
      "Компания УпакПром является одним из ведущих производителей упаковочных материалов в России. Мы специализируемся на производстве картонной и гофрированной упаковки для различных отраслей промышленности. Собственное производство позволяет нам контролировать качество на всех этапах и предлагать конкурентные цены. Наша миссия - обеспечить каждого клиента надежной и качественной упаковкой, которая защитит их товары и подчеркнет бренд.",
    hasFinancialIssues: false,
    location: {
      region: "Московская область",
      city: "г. Подольск",
      address: "ул. Промышленная, д. 15",
    },
    contacts: {
      phone: "+7 (495) 123-45-67",
      email: "info@upakprom.ru",
      website: "www.upakprom.ru",
    },
    stats: {
      orders: 1250,
      responseTime: "2 часа",
      delivery: "95%",
      yearsInBusiness: 5,
    },
    terms: {
      payment: ["Безналичный расчет", "Оплата по факту", "Отсрочка платежа до 30 дней"],
      shipping: ["Доставка по России", "Самовывоз со склада", "Международная доставка"],
      returns: ["Возврат бракованной продукции", "Гарантия качества", "Обмен в течение 14 дней"],
    },
    products: [
      {
        id: 1,
        name: "Картонная коробка 40x30x20",
        price: 25,
        image: "/simple-cardboard-box.png",
        rating: 4.8,
        inStock: true,
        lotAvailable: true,
      },
      {
        id: 2,
        name: "Гофрокороб 60x40x40",
        price: 45,
        image: "/corrugated-box.jpg",
        rating: 4.7,
        inStock: true,
        lotAvailable: true,
      },
      {
        id: 3,
        name: "Картонная коробка 30x30x30",
        price: 30,
        image: "/simple-cardboard-box.png",
        rating: 4.9,
        inStock: true,
        lotAvailable: false,
      },
      {
        id: 4,
        name: "Коробка для пиццы 40см",
        price: 18,
        image: "/pizza-box.jpg",
        rating: 4.6,
        inStock: false,
        lotAvailable: false,
      },
      {
        id: 5,
        name: "Гофротара 50x50x50",
        price: 55,
        image: "/corrugated-box.jpg",
        rating: 4.8,
        inStock: true,
        lotAvailable: true,
      },
      {
        id: 6,
        name: "Почтовая коробка Тип А",
        price: 22,
        image: "/simple-cardboard-box.png",
        rating: 4.7,
        inStock: true,
        lotAvailable: false,
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Logo */}
                <img
                  src={seller.logo || "/placeholder.svg"}
                  alt={seller.name}
                  className="w-32 h-32 rounded-2xl border-2 border-border shadow-sm"
                />

                {/* Main info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-4xl font-bold">{seller.name}</h1>
                    {seller.verified && (
                      <Badge variant="default" className="text-sm px-3 py-1">
                        Проверен
                      </Badge>
                    )}
                    {seller.hasFinancialIssues && (
                      <Badge variant="destructive" className="text-sm px-3 py-1">
                        Финансовые проблемы
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mb-4 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-yellow-500 text-xl">★</span>
                      <span className="font-bold text-lg">{seller.rating}</span>
                      <span className="text-muted-foreground">({seller.reviews} отзывов)</span>
                    </span>
                    <span className="text-muted-foreground">На платформе с {seller.since} года</span>
                    <span className="text-muted-foreground">
                      {seller.location.region}, {seller.location.city}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{seller.description}</p>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-3xl font-bold text-primary">{seller.stats.orders}+</p>
                      <p className="text-sm text-muted-foreground">Выполненных заказов</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">{seller.stats.responseTime}</p>
                      <p className="text-sm text-muted-foreground">Среднее время ответа</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">{seller.stats.delivery}</p>
                      <p className="text-sm text-muted-foreground">Доставка вовремя</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">{seller.stats.yearsInBusiness}</p>
                      <p className="text-sm text-muted-foreground">Лет на рынке</p>
                    </div>
                  </div>
                </div>

                {/* Contact button */}
                <div className="flex flex-col gap-3 w-full lg:w-auto">
                  <Button size="lg" className="w-full lg:w-48 h-12 text-lg shadow-sm">
                    Связаться
                  </Button>
                  <Button size="lg" variant="outline" className="w-full lg:w-48 h-12 text-lg bg-transparent">
                    Избранное
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="font-semibold mb-2">Адрес</p>
                    <p className="text-muted-foreground">{seller.location.address}</p>
                    <p className="text-muted-foreground">
                      {seller.location.city}, {seller.location.region}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Контакты</p>
                    <p className="text-muted-foreground">{seller.contacts.phone}</p>
                    <p className="text-muted-foreground">{seller.contacts.email}</p>
                    <p className="text-primary">{seller.contacts.website}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">График работы</p>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                    <p className="text-muted-foreground">Сб-Вс: выходной</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="products" className="text-lg px-6">
                Товары ({seller.products.length})
              </TabsTrigger>
              <TabsTrigger value="about" className="text-lg px-6">
                О продавце
              </TabsTrigger>
              <TabsTrigger value="terms" className="text-lg px-6">
                Условия работы
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-lg px-6">
                Отзывы ({seller.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {seller.products.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {product.inStock && (
                            <Badge variant="default" className="shadow-sm">
                              В наличии
                            </Badge>
                          )}
                          {product.lotAvailable && (
                            <Badge variant="secondary" className="shadow-sm">
                              Лот доступен
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg mb-3 line-clamp-2 text-balance">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-primary">от {product.price} ₽</p>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            {product.rating}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about">
              <Card className="shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">О компании</h3>
                  <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <p className="text-lg">{seller.fullDescription}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                      <div>
                        <h4 className="font-bold text-xl text-foreground mb-4">Наши преимущества</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>Собственное производство полного цикла</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>Контроль качества на всех этапах</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>Быстрая доставка по всей России</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>Гибкие условия сотрудничества</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>Индивидуальный подход к каждому клиенту</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-foreground mb-4">Сертификаты и награды</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">●</span>
                            <span>ISO 9001 - Система менеджмента качества</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">●</span>
                            <span>ГОСТ Р - Соответствие российским стандартам</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">●</span>
                            <span>FSC - Ответственное лесопользование</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">●</span>
                            <span>Победитель конкурса 'Лучший поставщик 2024'</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terms">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-xl mb-4">Условия оплаты</h4>
                    <ul className="space-y-3">
                      {seller.terms.payment.map((term, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">✓</span>
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-xl mb-4">Условия доставки</h4>
                    <ul className="space-y-3">
                      {seller.terms.shipping.map((term, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">✓</span>
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-xl mb-4">Возврат и гарантии</h4>
                    <ul className="space-y-3">
                      {seller.terms.returns.map((term, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">✓</span>
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="shadow-sm">
                <CardContent className="p-8">
                  <p className="text-muted-foreground text-center py-12">
                    Отзывы скоро появятся. Станьте первым, кто оставит отзыв о работе с этим продавцом!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

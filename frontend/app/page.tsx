import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const utps = [
    {
      title: "Низкие цены",
      description: "Покупайте партиями по оптовым ценам",
    },
    {
      title: "Разделяй и властвуй",
      description: "Делите крупные лоты с другими покупателями",
    },
    {
      title: "Проверенные продавцы",
      description: "Работайте только с сертифицированными поставщиками",
    },
    {
      title: "Быстрая доставка",
      description: "Получите заказ в течение 5-7 дней",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Картонная коробка 40x30x20",
      price: "25 ₽",
      image: "/simple-cardboard-box.png",
      category: "Картон",
    },
    {
      id: 2,
      name: "Пузырчатая пленка рулон",
      price: "450 ₽",
      image: "/bubble-wrap.png",
      category: "Пленка",
    },
    {
      id: 3,
      name: "Скотч упаковочный 50м",
      price: "85 ₽",
      image: "/clear-packing-tape-roll.png",
      category: "Скотч",
    },
    {
      id: 4,
      name: "Стрейч-пленка 500мм",
      price: "320 ₽",
      image: "/stretch-film.jpg",
      category: "Пленка",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Маркетплейс упаковки для B2B</h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Покупайте упаковку партиями по выгодным ценам. Делите крупные лоты с другими компаниями.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/catalog">Смотреть каталог</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">Как это работает</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* UTP Cards */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {utps.map((utp, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{utp.title}</h3>
                    <p className="text-sm text-muted-foreground">{utp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features for Buyers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Для покупателей</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Широкий ассортимент</h3>
                <p className="text-muted-foreground">Более 1000 видов упаковки от проверенных производителей</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Экономия до 40%</h3>
                <p className="text-muted-foreground">Покупайте лотами и делите затраты с другими компаниями</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
                <p className="text-muted-foreground">Все продавцы проходят верификацию и имеют рейтинг</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Preview */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Популярные товары</h2>
              <Button variant="outline" asChild>
                <Link href="/catalog">Все товары</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-lg font-bold ">{product.price}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features for Sellers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Для продавцов</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Новые клиенты</h3>
                <p className="text-muted-foreground">Доступ к тысячам потенциальных покупателей</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Аналитика продаж</h3>
                <p className="text-muted-foreground">Следите за статистикой и оптимизируйте предложения</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Быстрый старт</h3>
                <p className="text-muted-foreground">Начните продавать уже через 24 часа после регистрации</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-foreground">Готовы начать?</h2>
            <p className="text-xl mb-8 text-primary-foreground" >Зарегистрируйтесь и получите доступ к лучшим предложениям</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Зарегистрироваться бесплатно</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

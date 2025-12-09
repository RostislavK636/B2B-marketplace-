import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HowItWorksPage() {
  const buyerSteps = [
    {
      number: 1,
      title: "Регистрация",
      description: "Создайте аккаунт покупателя за 2 минуты",
      icon: "📝",
    },
    {
      number: 2,
      title: "Выбор товара",
      description: "Найдите нужную упаковку в каталоге",
      icon: "🔍",
    },
    {
      number: 3,
      title: "Участие в лоте",
      description: "Укажите нужное количество и условия",
      icon: "📦",
    },
    {
      number: 4,
      title: "Получение товара",
      description: "Оплатите и получите упаковку после сбора лота",
      icon: "🚚",
    },
  ]

  const sellerSteps = [
    {
      number: 1,
      title: "Регистрация",
      description: "Заполните форму продавца и пройдите верификацию",
      icon: "📝",
    },
    {
      number: 2,
      title: "Добавление товаров",
      description: "Загрузите каталог с фото и описаниями",
      icon: "📸",
    },
    {
      number: 3,
      title: "Создание лотов",
      description: "Установите условия и запустите продажи",
      icon: "🎯",
    },
    {
      number: 4,
      title: "Отправка и оплата",
      description: "Отправьте товар и получите оплату",
      icon: "💰",
    },
  ]

  const features = [
    {
      title: "Лотовая система",
      description: "Формируйте крупные партии вместе с другими покупателями для получения оптовых цен",
      icon: "🎲",
    },
    {
      title: "Безопасные сделки",
      description: "Все платежи защищены, средства переводятся продавцу после подтверждения получения",
      icon: "🔒",
    },
    {
      title: "Прозрачность",
      description: "Рейтинги продавцов, отзывы покупателей и полная история сделок",
      icon: "⭐",
    },
    {
      title: "Поддержка 24/7",
      description: "Наша команда всегда готова помочь решить любые вопросы",
      icon: "💬",
    },
  ]

  const testimonials = [
    {
      name: "Алексей М.",
      company: 'ООО "Логистика+"',
      text: "Отличная платформа! Сэкономили более 30% на закупке упаковки благодаря лотовой системе.",
      rating: 5,
    },
    {
      name: "Мария К.",
      company: 'Интернет-магазин "Подарки"',
      text: "Удобный каталог, быстрая доставка. Нашли всю необходимую упаковку в одном месте.",
      rating: 5,
    },
    {
      name: "Дмитрий С.",
      company: 'ООО "ПакЭксперт"',
      text: "Как продавец очень доволен. Много новых клиентов и удобные инструменты для работы.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Как это работает</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Простая и прозрачная система покупки и продажи упаковки оптом
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="buyer" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-12">
                <TabsTrigger value="buyer">Для покупателей</TabsTrigger>
                <TabsTrigger value="seller">Для продавцов</TabsTrigger>
              </TabsList>

              <TabsContent value="buyer">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {buyerSteps.map((step) => (
                    <Card key={step.number} className="text-center">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">{step.icon}</span>
                        </div>
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="seller">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sellerSteps.map((step) => (
                    <Card key={step.number} className="text-center">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">{step.icon}</span>
                        </div>
                        <div className="w-10 h-10 bg-accent text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Преимущества платформы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Отзывы пользователей</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">&quot;{testimonial.text}&quot;</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">Готовы начать?</h2>
            <p className="text-xl mb-8 text-primary-foreground">
              Присоединяйтесь к тысячам компаний, которые уже экономят на упаковке
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Зарегистрироваться</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-white hover:bg-white/10 text-primary-foreground"
                asChild
              >
                <Link href="/catalog"  >Смотреть каталог</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const requestData = {
      name: formData.get("firstName") as string,
      surname: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phone") as string,
      password: formData.get("password") as string,
      company: userType === "seller" ? formData.get("companyName") as string : null,
      taxpayerId: userType === "seller" ? formData.get("inn") as string : null,
      userType: userType
    }

    try {
      const response = await fetch('/api/v1/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        router.push("/profile")
      } else {
        try {
          const text = await response.text()
          setError(text || `Ошибка сервера: ${response.status}`)
        } catch {
          setError(`Ошибка сервера: ${response.status}`)
        }
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error)
      setError("Не удалось подключиться к серверу. Проверьте подключение.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8">Регистрация</h1>

          {!userType ? (
            <>
              <p className="text-center text-muted-foreground mb-8">Выберите тип аккаунта для начала работы</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buyer Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setUserType("buyer")}>
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🛒</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Я покупатель</h2>
                    <p className="text-muted-foreground mb-6">Ищу качественную упаковку по выгодным ценам</p>
                    <ul className="text-left space-y-2 text-sm mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Доступ к тысячам товаров</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Оптовые цены на партии</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Участие в лотовых закупках</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>Проверенные поставщики</span>
                      </li>
                    </ul>
                    <Button className="w-full">Зарегистрироваться</Button>
                  </CardContent>
                </Card>

                {/* Seller Card */}
                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setUserType("seller")}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🏭</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Я продавец</h2>
                    <p className="text-muted-foreground mb-6">Хочу продавать упаковку B2B клиентам</p>
                    <ul className="text-left space-y-2 text-sm mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">✓</span>
                        <span>Тысячи потенциальных клиентов</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">✓</span>
                        <span>Инструменты аналитики</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">✓</span>
                        <span>Лотовая система продаж</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">✓</span>
                        <span>Быстрый вывод средств</span>
                      </li>
                    </ul>
                    <Button className="w-full" variant="secondary">
                      Зарегистрироваться
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Уже есть аккаунт?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Войти
                </Link>
              </p>
            </>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {userType === "buyer" ? "Регистрация покупателя" : "Регистрация продавца"}
                  </h2>
                  <Button variant="ghost" onClick={() => setUserType(null)}>
                    Назад
                  </Button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя</label>
                      <Input
                        name="firstName"
                        placeholder="Иван"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Фамилия</label>
                      <Input
                        name="lastName"
                        placeholder="Иванов"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="ivan@example.com"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+7 (999) 123-45-67"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Пароль</label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Минимум 8 символов"
                      required
                      disabled={isLoading}
                      minLength={8}
                    />
                  </div>

                  {userType === "seller" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Название компании</label>
                        <Input
                          name="companyName"
                          placeholder='ООО "Моя компания"'
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">ИНН</label>
                        <Input
                          name="inn"
                          placeholder="1234567890"
                          required
                          disabled={isLoading}
                          pattern="[0-9]{10,12}"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" required disabled={isLoading} />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      Я согласен с{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        условиями использования
                      </Link>{" "}
                      и{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        политикой конфиденциальности
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
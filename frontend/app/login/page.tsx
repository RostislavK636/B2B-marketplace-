"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [isPasswordSent, setIsPasswordSent] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false)
  const router = useRouter()

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const requestData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      const response = await fetch('/api/v1/auth/login', {
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
          setError(text || `Ошибка входа: ${response.status}`)
        } catch {
          setError(`Ошибка входа: ${response.status}`)
        }
      }
    } catch (error) {
      console.error("Ошибка при входе:", error)
      setError("Не удалось подключиться к серверу. Проверьте подключение.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsForgotPasswordLoading(true)

    try {
      const response = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      })

      if (response.ok) {
        setIsPasswordSent(true)
      } else {
        setError("Не удалось отправить запрос на восстановление пароля")
      }
    } catch (error) {
      console.error("Ошибка при восстановлении пароля:", error)
      setError("Не удалось подключиться к серверу. Проверьте подключение.")
    } finally {
      setIsForgotPasswordLoading(false)
    }
  }

  const resetForgotPassword = () => {
    setIsPasswordSent(false)
    setForgotPasswordEmail("")
    setIsForgotPasswordOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-4xl font-bold text-center mb-2">Вход в аккаунт</h1>
          <p className="text-center text-muted-foreground mb-8">
            Введите email и пароль для входа
          </p>

          <Card>
            <CardContent className="p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="ivan@example.com"
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium mb-2">Пароль</label>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm"
                      onClick={() => setIsForgotPasswordOpen(true)}
                      disabled={isLoading}
                    >
                      Забыли пароль?
                    </Button>
                  </div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Вход..." : "Войти"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-center text-sm text-muted-foreground">
                  Нет аккаунта?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Зарегистрироваться
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Диалог восстановления пароля */}
      <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {!isPasswordSent ? (
            <>
              <DialogHeader>
                <DialogTitle>Восстановление пароля</DialogTitle>
                <DialogDescription>
                  Введите email, указанный при регистрации. Мы отправим на него новый пароль.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                      disabled={isForgotPasswordLoading}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsForgotPasswordOpen(false)}
                    disabled={isForgotPasswordLoading}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    disabled={isForgotPasswordLoading}
                  >
                    {isForgotPasswordLoading ? "Отправка..." : "Отправить новый пароль"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Пароль отправлен!</DialogTitle>
                <DialogDescription>
                  Новый пароль был отправлен на указанную почту. Проверьте ваш email.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Если письмо не пришло, проверьте папку "Спам"
                </p>
                <p className="text-sm text-muted-foreground">
                  После входа в личный кабинет рекомендуем сменить пароль в настройках профиля
                </p>
              </div>
              
              <DialogFooter>
                <Button onClick={resetForgotPassword}>
                  Понятно
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
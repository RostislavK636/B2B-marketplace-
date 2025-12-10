"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type AuthData = {
  authenticated: boolean
  sellerEmail?: string
  sellerId?: string
}

export function Header() {
  const router = useRouter()
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const [loading, setLoading] = useState(true)

  // Проверка авторизации при загрузке компонента
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Запрос к вашему Java-бэкенду
      const response = await fetch('/api/v1/auth', {
        method: 'GET',
        credentials: 'include', // Важно! Отправляем cookies с сессией
      })
      
      if (response.ok) {
        const data = await response.json()
        setAuthData(data)
      } else {
        setAuthData({ authenticated: false })
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error)
      setAuthData({ authenticated: false })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      // Вызываем эндпоинт выхода на Java-бэкенде
      const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include', // Важно для отправки session cookie
      })
      
      if (response.ok) {
        setAuthData({ authenticated: false })
        router.push('/')
        // Перезагружаем страницу для полного сброса состояния
        setTimeout(() => window.location.reload(), 100)
      } else {
        console.error('Ошибка выхода')
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  // Показываем скелетон во время загрузки
  if (loading) {
    return (
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary animate-pulse">
            MerxOptima
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </header>
    )
  }

  const isAuthenticated = authData?.authenticated || false

  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          MerxOptima
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/catalog" className="text-foreground hover:text-primary transition-colors">
            Каталог
          </Link>
          <Link href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            Как это работает
          </Link>
          
          {/* Показываем "Регистрация" только для неавторизованных пользователей */}
          {!isAuthenticated && (
            <Link href="/register" className="text-foreground hover:text-primary transition-colors">
              Регистрация
            </Link>
          )}
          
          {/* "Личный кабинет" показываем только для авторизованных */}
          {isAuthenticated && (
            <Link href="/profile" className="text-foreground hover:text-primary transition-colors">
              Личный кабинет
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            // Для авторизованных пользователей показываем кнопку "Выйти"
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              Выйти
            </Button>
          ) : (
            // Для неавторизованных пользователей показываем кнопки "Войти" и "Начать"
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Войти</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Начать</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
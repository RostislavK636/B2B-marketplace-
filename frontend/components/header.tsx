"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Pack&Roll
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/catalog" className="text-foreground hover:text-primary transition-colors">
            Каталог
          </Link>
          <Link href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            Как это работает
          </Link>
          <Link href="/register" className="text-foreground hover:text-primary transition-colors">
            Регистрация
          </Link>
          <Link href="/seller/1/dashboard" className="text-foreground hover:text-primary transition-colors">
          Личный кабинет
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/register">Войти</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Начать</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

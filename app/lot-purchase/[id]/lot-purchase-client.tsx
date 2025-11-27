"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface LotPurchaseClientProps {
  lot: {
    id: number
    product: {
      name: string
      image: string
      description: string
    }
    totalQuantity: number
    currentQuantity: number
    pricePerUnit: number
    minShare: number
    deadline: string
    seller: {
      id: number
      name: string
      rating: number
    }
    terms: string[]
  }
  productId: string
}

export function LotPurchaseClient({ lot, productId }: LotPurchaseClientProps) {
  const [selectedShare, setSelectedShare] = useState(10)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")

  const progress = (lot.currentQuantity / lot.totalQuantity) * 100
  const remainingQuantity = lot.totalQuantity - lot.currentQuantity
  const userQuantity = Math.floor((lot.totalQuantity * selectedShare) / 100)
  const userTotal = userQuantity * lot.pricePerUnit

  const deadline = new Date(lot.deadline)
  const timeRemaining = deadline.getTime() - Date.now()
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  const shareOptions = [5, 10, 15, 20, 25, 30]

  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link href={`/product/${productId}`} className="text-primary hover:underline mb-4 inline-block">
            ← Вернуться к товару
          </Link>
          <h1 className="text-4xl font-bold text-balance">Участие в лоте</h1>
        </div>

        <Card className="mb-8 shadow-md border-primary/20">
          <CardContent className="p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Прогресс сбора лота</h2>
              <Badge variant="default" className="text-lg px-4 py-2">
                {progress.toFixed(1)}% собрано
              </Badge>
            </div>
            <Progress value={progress} className="h-6 mb-4" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">{lot.currentQuantity.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Собрано единиц</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-muted-foreground">{remainingQuantity.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Осталось собрать</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">{lot.totalQuantity.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Всего в лоте</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={lot.product.image || "/placeholder.svg"}
                    alt={lot.product.name}
                    className="w-32 h-32 rounded-lg border border-border object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{lot.product.name}</h2>
                    <p className="text-muted-foreground mb-4">{lot.product.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Цена за единицу:</span>
                        <p className="font-bold text-xl text-primary">{lot.pricePerUnit} ₽</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Минимальная доля:</span>
                        <p className="font-bold text-xl">{lot.minShare}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Закрытие лота</h3>
                    <p className="text-sm text-muted-foreground">
                      {deadline.toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">
                      {daysRemaining}д {hoursRemaining}ч
                    </p>
                    <p className="text-sm text-muted-foreground">До закрытия</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4">Выберите вашу долю в лоте</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                  {shareOptions.map((share) => (
                    <Button
                      key={share}
                      variant={selectedShare === share ? "default" : "outline"}
                      className="h-16 text-lg font-bold"
                      onClick={() => setSelectedShare(share)}
                    >
                      {share}%
                    </Button>
                  ))}
                </div>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Ваше количество</p>
                      <p className="text-2xl font-bold text-primary">{userQuantity.toLocaleString()} шт</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Ваша сумма</p>
                      <p className="text-2xl font-bold text-primary">{userTotal.toLocaleString()} ₽</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4">Контактная информация</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон *</label>
                    <Input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Название компании *</label>
                    <Input
                      placeholder="ООО 'Ваша компания'"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4">Условия лота</h3>
                <ul className="space-y-3">
                  {lot.terms.map((term, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{term}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    Я согласен с условиями участия в лоте, подтверждаю достоверность указанных данных и принимаю
                    политику конфиденциальности
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-6">Итого</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted-foreground">Ваша доля:</span>
                    <span className="font-bold text-xl text-primary">{selectedShare}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted-foreground">Количество:</span>
                    <span className="font-semibold">{userQuantity.toLocaleString()} шт</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted-foreground">Цена за ед.:</span>
                    <span className="font-semibold">{lot.pricePerUnit} ₽</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-lg">Итого к оплате:</span>
                    <span className="font-bold text-2xl text-primary">{userTotal.toLocaleString()} ₽</span>
                  </div>
                </div>

                <Button
                  className="w-full h-14 text-lg shadow-md"
                  size="lg"
                  disabled={!agreedToTerms || !email || !phone || !company}
                >
                  Вступить в лот
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                  Оплата производится после полного сбора лота. Вы получите уведомление на email.
                </p>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">Продавец</h4>
                  <Link href={`/seller/${lot.seller.id}`} className="text-primary hover:underline font-medium">
                    {lot.seller.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-yellow-500">★</span>
                    <span className="text-sm font-medium">{lot.seller.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type PriceRange = {
  id: string
  min: number | ''
  max: number | '' | null
  price: number | ''
}

type AuthData = {
  authenticated: boolean
  sellerEmail?: string
  userEmail?: string
  sellerId?: string
}

export default function AddProductPage({ params }: { params?: { id?: string } }) {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [authData, setAuthData] = useState<AuthData | null>(null)

  const [name, setName] = useState('')
  const [availability, setAvailability] = useState<number | ''>('')
  const [description, setDescription] = useState('')
  const [detailedDescription, setDetailedDescription] = useState('')
  const [specs, setSpecs] = useState({
    size: '',
    weight: '',
    minOrder: '',
    material: '',
    color: '',
    loadCapacity: '',
  })
  const [ranges, setRanges] = useState<PriceRange[]>([
    { id: generateId(), min: '', max: '', price: '' },
  ])
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Проверка авторизации при загрузке
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/v1/auth', {
        method: 'GET',
        credentials: 'include',
      })
      
      const data = await response.json()
      
      if (!data.authenticated) {
        // Если не авторизован - на страницу регистрации
        router.push('/register')
      } else {
        // Если авторизован - показываем страницу
        setAuthData(data)
        setAuthChecked(true)
        console.log('Авторизован как:', data.sellerEmail || data.userEmail)
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error)
      router.push('/register')
    }
  }

  // Показываем загрузку пока проверяем авторизацию
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    )
  }

  function generateId() {
    return String(Date.now()) + '-' + Math.floor(Math.random() * 10000)
  }

  function addRange() {
    setRanges((s) => [...s, { id: generateId(), min: '', max: '', price: '' }])
  }

  function removeRange(id: string) {
    setRanges((s) => s.filter((r) => r.id !== id))
  }

  function updateRange(id: string, patch: Partial<PriceRange>) {
    setRanges((s) => s.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  function validate(): boolean {
    const e: Record<string, string> = {}

    if (!name.trim()) e.name = 'Название обязательно'
    if (availability === '' || Number.isNaN(Number(availability)) || Number(availability) < 0)
      e.availability = 'Укажите корректное количество'
    if (!description.trim()) e.description = 'Краткое описание обязательно'
    if (!detailedDescription.trim()) e.detailedDescription = 'Подробное описание обязательно'

    for (const key of Object.keys(specs)) {
      if (!(specs as any)[key].toString().trim()) {
        e['specs.' + key] = 'Обязательное поле'
      }
    }

    if (ranges.length === 0) {
      e.ranges = 'Добавьте хотя бы один диапазон'
    } else {
      ranges.forEach((r, idx) => {
        const base = `Диапазон ${idx + 1}`
        if (r.min === '' || Number.isNaN(Number(r.min)) || Number(r.min) <= 0)
          e[`range.${r.id}.min`] = `${base}: укажите начальное количество`
        if (r.price === '' || Number.isNaN(Number(r.price)) || Number(r.price) < 0)
          e[`range.${r.id}.price`] = `${base}: укажите цену`
        if (r.max !== '' && r.max !== null) {
          if (Number.isNaN(Number(r.max)) || Number(r.max) < Number(r.min))
            e[`range.${r.id}.max`] = `${base}: конец диапазона должен быть >= начала`
        }
      })
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
  e.preventDefault()
  if (!validate()) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  // Формируем данные для отправки на бэкенд
  const payload = {
    name: name.trim(),
    availability: Number(availability),
    description: description.trim(),
    detailedDescription: detailedDescription.trim(),
    productDetails: {
      size: specs.size,
      weight: specs.weight,
      minimumOrderStartsFrom: Number(specs.minOrder) || 1,
      material: specs.material,
      color: specs.color,
      loadCapacity: specs.loadCapacity
    },
    productPriceRanges: ranges.map((r) => ({
      initialQuantity: Number(r.min), // ← ИСПРАВЛЕНО: "min" → "initialQuantity"
      finalQuantity: r.max === '' || r.max === null ? null : Number(r.max), // ← "max" → "finalQuantity"
      pricePerRange: Number(r.price), // ← ИСПРАВЛЕНО: "price" → "pricePerRange"
    })),
    // sellerId не отправляем - он будет взят из куки на сервере
  }

  console.log('Create product payload', JSON.stringify(payload, null, 2))
  
  try {
    // Отправляем POST запрос на сервер
    const response = await fetch('/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    console.log('Response status:', response.status)
    
    if (response.ok) {
      // Успешный ответ
      window.location.href = '/profile'
    } else {
      // Ошибка от сервера
      const errorText = await response.text()
      console.error('Error response:', errorText)
      alert(`Ошибка ${response.status}: Не удалось добавить товар`)
    }
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error)
    alert('Произошла ошибка при отправке данных. Проверьте консоль для подробностей.')
    
    // На всякий случай сохраняем в localStorage для отладки
    try {
      localStorage.setItem('lastProductPayload', JSON.stringify(payload))
    } catch (err) {
      // Игнорируем ошибки localStorage
    }
  }
}

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Добавить товар</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label>Название товара *</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label>Количество в наличии (шт) *</Label>
                  <Input
                    type="number"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value === '' ? '' : Number(e.target.value))}
                    min={0}
                  />
                  {errors.availability && <p className="text-red-600 text-sm mt-1">{errors.availability}</p>}
                </div>

                <div>
                  <Label>Краткое описание *</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label>Подробное описание *</Label>
                  <Textarea value={detailedDescription} onChange={(e) => setDetailedDescription(e.target.value)} rows={6} />
                  {errors.detailedDescription && <p className="text-red-600 text-sm mt-1">{errors.detailedDescription}</p>}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Оптовые диапазоны и цены *</h3>

                {errors.ranges && <p className="text-red-600 text-sm mb-2">{errors.ranges}</p>}

                <div className="space-y-4">
                  {ranges.map((r, idx) => (
                    <div key={r.id} className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-3">
                        <Label>От (шт)</Label>
                        <Input
                          type="number"
                          value={r.min}
                          onChange={(e) => updateRange(r.id, { min: e.target.value === '' ? '' : Number(e.target.value) })}
                          min={1}
                        />
                        {errors[`range.${r.id}.min`] && <p className="text-red-600 text-sm">{errors[`range.${r.id}.min`]}</p>}
                      </div>

                      <div className="col-span-3">
                        <Label>До (шт)</Label>
                        <Input
                          type="number"
                          value={r.max ?? ''}
                          onChange={(e) =>
                            updateRange(r.id, {
                              max: e.target.value === '' ? '' : Number(e.target.value),
                            })
                          }
                          min={0}
                        />
                        {errors[`range.${r.id}.max`] && <p className="text-red-600 text-sm">{errors[`range.${r.id}.max`]}</p>}
                      </div>

                      <div className="col-span-3">
                        <Label>Цена за единицу (₽) *</Label>
                        <Input
                          type="number"
                          value={r.price}
                          onChange={(e) => updateRange(r.id, { price: e.target.value === '' ? '' : Number(e.target.value) })}
                          min={0}
                        />
                        {errors[`range.${r.id}.price`] && <p className="text-red-600 text-sm">{errors[`range.${r.id}.price`]}</p>}
                      </div>

                      <div className="col-span-3 flex gap-2">
                        <Button type="button" variant="outline" className="grow" onClick={() => addRange()}>
                          +
                        </Button>
                        <Button type="button" variant="destructive" onClick={() => removeRange(r.id)} disabled={ranges.length === 1}>
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Характеристики *</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Размер</Label>
                    <Input value={specs.size} onChange={(e) => setSpecs((s) => ({ ...s, size: e.target.value }))} />
                    {errors['specs.size'] && <p className="text-red-600 text-sm">{errors['specs.size']}</p>}
                  </div>
                  <div>
                    <Label>Вес</Label>
                    <Input value={specs.weight} onChange={(e) => setSpecs((s) => ({ ...s, weight: e.target.value }))} />
                    {errors['specs.weight'] && <p className="text-red-600 text-sm">{errors['specs.weight']}</p>}
                  </div>
                  <div>
                    <Label>Минимальный заказ (шт)</Label>
                    <Input value={specs.minOrder} onChange={(e) => setSpecs((s) => ({ ...s, minOrder: e.target.value }))} />
                    {errors['specs.minOrder'] && <p className="text-red-600 text-sm">{errors['specs.minOrder']}</p>}
                  </div>
                  <div>
                    <Label>Материал</Label>
                    <Input value={specs.material} onChange={(e) => setSpecs((s) => ({ ...s, material: e.target.value }))} />
                    {errors['specs.material'] && <p className="text-red-600 text-sm">{errors['specs.material']}</p>}
                  </div>
                  <div>
                    <Label>Цвет</Label>
                    <Input value={specs.color} onChange={(e) => setSpecs((s) => ({ ...s, color: e.target.value }))} />
                    {errors['specs.color'] && <p className="text-red-600 text-sm">{errors['specs.color']}</p>}
                  </div>
                  <div>
                    <Label>Грузоподъемность</Label>
                    <Input value={specs.loadCapacity} onChange={(e) => setSpecs((s) => ({ ...s, loadCapacity: e.target.value }))} />
                    {errors['specs.loadCapacity'] && <p className="text-red-600 text-sm">{errors['specs.loadCapacity']}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Отменить
              </Button>
              <Button type="submit">Опубликовать товар</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
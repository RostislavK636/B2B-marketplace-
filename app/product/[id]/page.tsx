import { ProductClient } from "./product-client"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = {
    id: Number.parseInt(id),
    name: "Картонная коробка 40x30x20 см",
    category: "Коробки",
    material: "Трехслойный гофрокартон",
    rating: 4.8,
    reviews: 127,
    inStock: 5000,
    images: [
      "/simple-cardboard-box.png",
      "/cardboard-box-side-view.jpg",
      "/cardboard-box-top-view.jpg",
      "/cardboard-box-stacked.jpg",
    ],
    description:
      "Прочная картонная коробка идеально подходит для транспортировки и хранения товаров. Изготовлена из трехслойного гофрокартона марки Т-22, обеспечивающего высокую прочность и защиту содержимого.",
    detailedDescription:
      "Коробки изготовлены из экологически чистого материала - трехслойного гофрокартона. Материал обеспечивает отличную защиту от механических повреждений при транспортировке. Идеально подходит для упаковки электроники, одежды, продуктов питания и других товаров. Коробки легко складываются и хранятся в разобранном виде, экономя пространство на складе.",
    pricing: [
      { min: 100, max: 499, price: 25 },
      { min: 500, max: 999, price: 22 },
      { min: 1000, max: 4999, price: 20 },
      { min: 5000, max: null, price: 18 },
    ],
    specs: {
      size: "40x30x20 см",
      material: "Гофрокартон Т-22 (трехслойный)",
      weight: "250 г",
      color: "Коричневый (натуральный)",
      minOrder: "100 шт",
      loadCapacity: "До 15 кг",
    },
    seller: {
      id: 1,
      name: 'ООО "УпакПром"',
      logo: "/generic-company-logo.png",
      rating: 4.9,
      verified: true,
      hasFinancialIssues: false,
    },
    additionalServices: [
      { name: "Быстрая доставка", description: "2-3 дня по России", available: true },
      { name: "Печать логотипа", description: "Нанесение вашего бренда", available: true },
      { name: "Индивидуальный размер", description: "Производство под заказ", available: true },
      { name: "Сборка коробок", description: "Доставка в собранном виде", available: false },
    ],
  }

  const relatedProducts = [
    { id: 2, name: "Гофрокороб 60x40x40", price: 45, image: "/corrugated-box.jpg", rating: 4.7 },
    { id: 3, name: "Картонная коробка 30x30x30", price: 30, image: "/simple-cardboard-box.png", rating: 4.9 },
    { id: 4, name: "Скотч упаковочный прозрачный", price: 85, image: "/clear-packing-tape-roll.png", rating: 4.8 },
    { id: 5, name: "Воздушно-пузырчатая пленка", price: 120, image: "/bubble-wrap.png", rating: 4.6 },
  ]

  return <ProductClient product={product} relatedProducts={relatedProducts} />
}

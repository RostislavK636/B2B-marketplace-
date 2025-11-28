import { ProductClient } from "./product-client"

// ДОБАВЬТЕ ЭТУ ФУНКЦИЮ
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = {
    id: Number.parseInt(id),
    // ... остальной ваш код
  }

  const relatedProducts = [
    // ... ваш массив relatedProducts
  ]

  return <ProductClient product={product} relatedProducts={relatedProducts} />
}

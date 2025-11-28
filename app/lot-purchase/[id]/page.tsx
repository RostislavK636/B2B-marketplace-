import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LotPurchaseClient } from "./lot-purchase-client"

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]
}

export default async function LotPurchasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const lot = {
    id: Number.parseInt(id),
    product: {
      name: "Картонная коробка 40x30x20 см",
      image: "/simple-cardboard-box.png",
      description: "Трехслойный гофрокартон, коричневый цвет",
    },
    totalQuantity: 10000,
    currentQuantity: 6500,
    pricePerUnit: 20,
    minShare: 5,
    deadline: new Date("2025-12-31T23:59:59").toISOString(),
    seller: {
      id: 1,
      name: 'ООО "УпакПром"',
      rating: 4.9,
    },
    terms: [
      "Оплата производится после полного сбора лота",
      "Доставка за счет покупателя или самовывоз",
      "Гарантия качества на всю партию",
      "Возможен возврат бракованных единиц",
      "Срок поставки: 7-10 дней после закрытия лота",
    ],
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <LotPurchaseClient lot={lot} productId={id} />
      <Footer />
    </div>
  )
}

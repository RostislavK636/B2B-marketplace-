import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LotPurchaseClient } from "./lot-purchase-client"

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

export default async function LotPurchasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const lot = {
    id: Number.parseInt(id),
    // ... остальной ваш код
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <LotPurchaseClient lot={lot} productId={id} />
      <Footer />
    </div>
  )
}

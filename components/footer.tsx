import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">PackMarket</h3>
            <p className="text-muted-foreground text-sm">B2B маркетплейс упаковки с лотовой закупкой</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-primary">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
                  Как купить
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Продавцам</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-primary">
                  Стать продавцом
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
                  Как продавать
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@packmarket.ru</li>
              <li>+7 (800) 123-45-67</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2025 PackMarket. Все права защищены.
        </div>
      </div>
    </footer>
  )
}

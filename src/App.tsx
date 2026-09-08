import { ArrowDown, ArrowRight, Search, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Header } from '@/components/Header'
import { getProducts } from '@/data/products'
import { CartDrawer } from '@/features/cart/CartDrawer'
import { useCart } from '@/features/cart/useCart'
import { ProductGrid } from '@/features/catalog/ProductGrid'
import type { Product, ProductCategory } from '@/types/product'

const CATEGORIES: Array<ProductCategory | '全部'> = ['全部', '音訊', '穿戴', '電力', '桌面']

export function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProductCategory | '全部'>('全部')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const noticeTimerRef = useRef<number | undefined>(undefined)
  const cart = useCart()

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then((data) => {
        setProducts(data)
        setLoadError(null)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadError('商品資料暫時無法載入，請稍後再試。')
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [loadAttempt])

  useEffect(() => () => window.clearTimeout(noticeTimerRef.current), [])

  const showNotice = useCallback((message: string) => {
    window.clearTimeout(noticeTimerRef.current)
    setNotice(message)
    noticeTimerRef.current = window.setTimeout(() => setNotice(null), 2600)
  }, [])

  const handleAdd = useCallback(
    (product: Product) => {
      cart.add(product)
      showNotice(`已將「${product.name}」放入購物袋`)
    },
    [cart, showNotice],
  )

  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('zh-TW')

    return products.filter((product) => {
      const matchesCategory = category === '全部' || product.category === category
      const matchesSearch =
        normalizedQuery.length === 0 ||
        `${product.name}${product.description}${product.category}`
          .toLocaleLowerCase('zh-TW')
          .includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [category, products, query])

  const handleSearchFocus = () => {
    document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' })
    window.setTimeout(() => searchInputRef.current?.focus(), 450)
  }

  const handleRetry = () => {
    setIsLoading(true)
    setLoadError(null)
    setLoadAttempt((attempt) => attempt + 1)
  }

  const handleCheckout = async () => {
    if (!cart.items.length) return

    setIsCheckingOut(true)
    await new Promise((resolve) => window.setTimeout(resolve, 900))
    cart.clear()
    setIsCheckingOut(false)
    setIsCartOpen(false)
    showNotice('訂單已成立，謝謝你的選擇！')
  }

  return (
    <div id="top" className="site-shell">
      <Header
        cartCount={cart.itemCount}
        isMenuOpen={isMenuOpen}
        onCartOpen={() => setIsCartOpen(true)}
        onMenuToggle={() => setIsMenuOpen((open) => !open)}
        onSearchFocus={handleSearchFocus}
      />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="section-kicker"><span /> Objects for slower days</p>
            <h1 id="hero-title">讓科技，<br />回到生活的<span>剛剛好。</span></h1>
            <p className="hero-intro">
              我們不追逐每一次更新，只挑選真正耐用、好看，並且願意陪你久一點的日常科技。
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#collection">探索本月選物 <ArrowRight size={18} /></a>
              <a className="quiet-link" href="#principles">讀我們的選物理念</a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <span className="hero-index">ISSUE<br />NO. 08</span>
            <div className="hero-sun" />
            <div className="hero-object hero-object-back" />
            <div className="hero-object hero-object-front">
              <Sparkles size={30} strokeWidth={1.1} />
              <span>LESS, BUT<br />BETTER</span>
            </div>
            <p>八件值得留在桌上的事物</p>
          </div>

          <a className="scroll-cue" href="#collection" aria-label="往下瀏覽商品">
            <ArrowDown size={18} /> SCROLL TO DISCOVER
          </a>
        </section>

        <section className="collection" id="collection" aria-labelledby="collection-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Curated collection · 08</p>
              <h2 id="collection-title">本月選物</h2>
            </div>
            <p>從日常裡最細小的使用感受出發，<br />找到功能與美感之間的平衡。</p>
          </div>

          <div className="catalog-tools">
            <div className="category-list" aria-label="商品分類">
              {CATEGORIES.map((item) => (
                <button
                  className={category === item ? 'is-active' : ''}
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={18} strokeWidth={1.8} />
              <span className="sr-only">搜尋商品</span>
              <input
                ref={searchInputRef}
                type="search"
                placeholder="搜尋選物"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && <span>{filteredProducts.length}</span>}
            </label>
          </div>

          {loadError ? (
            <div className="load-error" role="alert">
              <p>{loadError}</p>
              <button type="button" onClick={handleRetry}>重新載入</button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} isLoading={isLoading} onAdd={handleAdd} />
          )}
        </section>

        <section className="principles" id="principles" aria-labelledby="principles-title">
          <div className="principles-note">
            <span>OUR STANDARD</span>
            <span>01 — 03</span>
          </div>
          <div className="principles-copy">
            <p className="section-kicker">Why we choose</p>
            <h2 id="principles-title">買得少一點，<br />每一件都更喜歡。</h2>
          </div>
          <ol className="principles-list">
            <li><span>01</span><div><h3>耐用，而非一次性</h3><p>我們關心物件如何老去，也在意它能否被長久使用。</p></div></li>
            <li><span>02</span><div><h3>設計服務於日常</h3><p>不只漂亮，更要自然融入每一次拿起、放下與使用。</p></div></li>
            <li><span>03</span><div><h3>留下真正需要的</h3><p>少一些衝動，多一些與自己生活節奏相符的選擇。</p></div></li>
          </ol>
        </section>

        <section className="journal" id="journal" aria-labelledby="journal-title">
          <div className="journal-card">
            <p className="section-kicker">Journal · Vol. 12</p>
            <h2 id="journal-title">桌面，<br />也是生活的風景。</h2>
            <p>從光線、觸感到聲音，五個讓工作空間重新呼吸的小練習。</p>
            <a href="#collection">閱讀本期生活誌 <ArrowRight size={18} /></a>
          </div>
          <div className="journal-art" aria-hidden="true">
            <span className="journal-circle" />
            <span className="journal-table" />
            <span className="journal-vase" />
            <span className="journal-stem" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark">拾</span><span>拾光選物<small>SHIGUANG SUPPLY</small></span></a>
        <p>把真正喜歡的，留在日常裡。</p>
        <div><a href="#collection">商品</a><a href="#principles">關於</a><a href="mailto:hello@example.com">聯絡</a></div>
        <small>© 2026 SHIGUANG SUPPLY</small>
      </footer>

      <CartDrawer
        items={cart.items}
        isOpen={isCartOpen}
        isCheckingOut={isCheckingOut}
        total={cart.total}
        onClose={closeCart}
        onAdd={cart.add}
        onDecrement={cart.decrement}
        onRemove={cart.remove}
        onCheckout={handleCheckout}
      />

      <div className={notice ? 'toast is-visible' : 'toast'} role="status" aria-live="polite">
        <span /> {notice}
      </div>
    </div>
  )
}

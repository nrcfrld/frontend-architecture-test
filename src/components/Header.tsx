import { Menu, Search, ShoppingBag, X } from 'lucide-react'

interface HeaderProps {
  cartCount: number
  isMenuOpen: boolean
  onCartOpen: () => void
  onMenuToggle: () => void
  onSearchFocus: () => void
}

export function Header({
  cartCount,
  isMenuOpen,
  onCartOpen,
  onMenuToggle,
  onSearchFocus,
}: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="拾光選物首頁">
        <span className="brand-mark" aria-hidden="true">
          拾
        </span>
        <span>
          拾光選物
          <small>SHIGUANG SUPPLY</small>
        </span>
      </a>

      <nav className={isMenuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="主要導覽">
        <a href="#collection" onClick={onMenuToggle}>本月選物</a>
        <a href="#principles" onClick={onMenuToggle}>選物理念</a>
        <a href="#journal" onClick={onMenuToggle}>生活誌</a>
      </nav>

      <div className="header-actions">
        <button className="icon-button desktop-action" type="button" onClick={onSearchFocus}>
          <Search size={19} strokeWidth={1.8} />
          <span className="sr-only">前往搜尋</span>
        </button>
        <button className="cart-button" type="button" onClick={onCartOpen}>
          <ShoppingBag size={19} strokeWidth={1.8} />
          <span>購物袋</span>
          <span className="cart-badge" aria-label={`${cartCount} 件商品`}>
            {cartCount}
          </span>
        </button>
        <button
          className="icon-button menu-button"
          type="button"
          onClick={onMenuToggle}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
        >
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

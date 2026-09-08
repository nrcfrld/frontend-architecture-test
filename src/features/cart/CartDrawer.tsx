import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ProductVisual } from '@/features/catalog/ProductVisual'
import type { CartItem } from '@/types/product'

interface CartDrawerProps {
  items: CartItem[]
  isOpen: boolean
  isCheckingOut: boolean
  total: number
  onClose: () => void
  onAdd: (product: CartItem['product']) => void
  onDecrement: (productId: number) => void
  onRemove: (productId: number) => void
  onCheckout: () => void
}

export function CartDrawer({
  items,
  isOpen,
  isCheckingOut,
  total,
  onClose,
  onAdd,
  onDecrement,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div className={isOpen ? 'cart-layer is-open' : 'cart-layer'} aria-hidden={!isOpen}>
      <button className="cart-backdrop" type="button" onClick={onClose} tabIndex={-1} aria-label="關閉購物袋" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-heading">
          <div>
            <p className="section-kicker">Your selection</p>
            <h2 id="cart-title">購物袋</h2>
          </div>
          <button ref={closeButtonRef} className="icon-button" type="button" onClick={onClose}>
            <X size={21} />
            <span className="sr-only">關閉購物袋</span>
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <span><ShoppingBag size={30} strokeWidth={1.4} /></span>
              <h3>購物袋還是空的</h3>
              <p>慢慢逛，把適合日常的物件帶回家。</p>
              <button type="button" className="text-button" onClick={onClose}>繼續選物</button>
            </div>
          ) : (
            items.map((item) => (
              <article className={`cart-item palette-${item.product.palette}`} key={item.product.id}>
                <ProductVisual artwork={item.product.artwork} productName={item.product.name} compact />
                <div className="cart-item-copy">
                  <div>
                    <p>{item.product.name}</p>
                    <strong>NT$ {item.product.price.toLocaleString('zh-TW')}</strong>
                  </div>
                  <div className="quantity-control" aria-label={`${item.product.name} 數量`}>
                    <button type="button" onClick={() => onDecrement(item.product.id)} aria-label="減少數量">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onAdd(item.product)} aria-label="增加數量">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button className="remove-item" type="button" onClick={() => onRemove(item.product.id)} aria-label={`移除 ${item.product.name}`}>
                  <Trash2 size={16} />
                </button>
              </article>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div><span>運費</span><span>{items.length ? '免運' : '—'}</span></div>
          <div className="cart-total"><span>小計</span><strong>NT$ {total.toLocaleString('zh-TW')}</strong></div>
          <button className="checkout-button" type="button" disabled={!items.length || isCheckingOut} onClick={onCheckout}>
            {isCheckingOut ? '正在準備訂單…' : '前往結帳'}
          </button>
          <p>安全付款 · 7 日鑑賞期 · 全台配送</p>
        </div>
      </aside>
    </div>
  )
}

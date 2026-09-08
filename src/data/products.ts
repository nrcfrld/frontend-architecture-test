import type { Product } from '@/types/product'

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: '靜謐無線耳機',
    eyebrow: 'Quiet / 01',
    description: '輕盈貼耳，讓通勤與專注時刻保有自己的聲音邊界。',
    price: 2999,
    category: '音訊',
    artwork: 'earphones',
    palette: 'sage',
  },
  {
    id: 2,
    name: '日常智慧腕錶',
    eyebrow: 'Rhythm / 02',
    description: '一眼掌握日程與身體節奏，簡潔得恰到好處。',
    price: 8999,
    category: '穿戴',
    artwork: 'watch',
    palette: 'clay',
  },
  {
    id: 3,
    name: '掌心行動電源',
    eyebrow: 'Charge / 03',
    description: '小巧、可靠，為移動中的每一天多留一點餘裕。',
    price: 1299,
    category: '電力',
    artwork: 'powerbank',
    palette: 'blue',
  },
  {
    id: 4,
    name: '流線無線滑鼠',
    eyebrow: 'Flow / 04',
    description: '安靜回饋與順手曲線，讓工作桌少一點摩擦。',
    price: 899,
    category: '桌面',
    artwork: 'mouse',
    palette: 'amber',
  },
  {
    id: 5,
    name: '島嶼機械鍵盤',
    eyebrow: 'Type / 05',
    description: '清脆段落與溫潤配色，重新找回書寫的手感。',
    price: 3999,
    category: '桌面',
    artwork: 'keyboard',
    palette: 'clay',
  },
  {
    id: 6,
    name: '清晰網路攝影機',
    eyebrow: 'Frame / 06',
    description: '自然光感與俐落畫面，讓每次遠距見面更靠近。',
    price: 2199,
    category: '桌面',
    artwork: 'webcam',
    palette: 'blue',
  },
  {
    id: 7,
    name: '口袋雙介面隨身碟',
    eyebrow: 'Keep / 07',
    description: '在不同裝置之間，穩妥收納那些不能遺失的片刻。',
    price: 599,
    category: '電力',
    artwork: 'drive',
    palette: 'amber',
  },
  {
    id: 8,
    name: '桌面環繞揚聲器',
    eyebrow: 'Listen / 08',
    description: '緊湊體積蘊藏寬闊聲場，為空間添上一層情緒。',
    price: 1599,
    category: '音訊',
    artwork: 'speaker',
    palette: 'sage',
  },
]

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(resolve, 650)

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeout)
        reject(new DOMException('Request aborted', 'AbortError'))
      },
      { once: true },
    )
  })

  return PRODUCTS
}

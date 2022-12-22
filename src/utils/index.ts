import IconShoppingBagBold from '~icons/ph/shopping-bag-bold'
import IconFoundationMakeup from '~icons/icon-park-outline/foundation-makeup'
import IconBookOpenBlankVariant from '~icons/mdi/book-open-blank-variant'
import IconTeddyBear from '~icons/fluent-emoji-high-contrast/teddy-bear'

const iconMap = new Map([
  ['bagsFashion', IconShoppingBagBold],
  ['personalBeauty', IconFoundationMakeup],
  ['stationery', IconBookOpenBlankVariant],
  ['toys', IconTeddyBear],
])

export function getIconComponent(iconName: string) {
  const iconComponent = iconMap.get(iconName)

  return iconComponent
}

// 找到第一個斜線，替換成 base 的值 /online-store/
export function getPublicImgSrc(path: string) {
  return path.replace(/^\//, import.meta.env.BASE_URL)
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

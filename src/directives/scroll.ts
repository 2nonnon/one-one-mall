import { App, DirectiveBinding } from 'vue'

const handleScroll = (el: HTMLDivElement, className: string) => {
  const classList = el.classList
  let top = 0
  return () => {
    const cur = document.documentElement.scrollTop
    if (top > cur && classList.contains(className)) {
      classList.remove(className)
    } else if (top < cur && !classList.contains(className)) {
      classList.add(className)
    }
    top = cur
  }
}

export default {
  install(app: App): void {
    app.directive('scroll', {
      mounted(el: HTMLDivElement, binding: DirectiveBinding) {
        document.addEventListener('scroll', handleScroll(el, binding.value))
      },
      unmounted(el: HTMLDivElement, binding: DirectiveBinding) {
        document.removeEventListener('scroll', handleScroll(el, binding.value))
      },
    })
  },
}

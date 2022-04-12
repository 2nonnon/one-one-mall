import { App, DirectiveBinding } from 'vue'

// const handleScroll = (el: HTMLDivElement, className: string) => {
//   const classList = el.classList
//   let top = 0
//   return () => {
//     const cur = document.documentElement.scrollTop
//     if (top > cur && classList.contains(className)) {
//       classList.remove(className)
//     } else if (top < cur && !classList.contains(className)) {
//       classList.add(className)
//     }
//     top = cur
//   }
// }
type Binding = {
  className: string
  handleScroll: (el: HTMLDivElement, className: string) => () => void
}

export default {
  install(app: App): void {
    app.directive('scroll', {
      mounted(el: HTMLDivElement, binding: DirectiveBinding<Binding>) {
        document.addEventListener(
          'scroll',
          binding.value.handleScroll(el, binding.value.className)
        )
      },
      unmounted(el: HTMLDivElement, binding: DirectiveBinding<Binding>) {
        document.removeEventListener(
          'scroll',
          binding.value.handleScroll(el, binding.value.className)
        )
      },
    })
  },
}

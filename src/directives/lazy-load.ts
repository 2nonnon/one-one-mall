import { App, DirectiveBinding } from 'vue'

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        const img = entry.target as HTMLImageElement
        observer.unobserve(img)
        const tmp = new Image()
        tmp.src = img.dataset.src as string
        tmp.onload = () => {
          img.src = tmp.src
        }
      }
    })
  },
  {
    threshold: 0,
  }
)

export default {
  install(app: App): void {
    app.directive('lazyload', {
      mounted(el: HTMLImageElement, binding: DirectiveBinding) {
        el.src = binding.value
        observer.observe(el)
      },
      updated(el: HTMLImageElement, binding: DirectiveBinding) {
        el.src = binding.value
        observer.observe(el)
      },
    })
  },
}

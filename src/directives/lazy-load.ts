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
        // updated:在包含组件的 VNode 及其子组件的 VNode 更新之后调用
        // 判断binding.value是否更改，过滤无关更新
        if (binding.value === binding.oldValue) return;

        el.src = binding.value
        observer.observe(el)
      },
    })
  },
}

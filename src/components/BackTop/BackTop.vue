<template>
    <div class="backtop hidden" v-scroll="{className: 'hidden', handleScroll}">
        <div class="fixed-icon" @click="handleBackTop(250)">👆</div>
    </div>
</template>

<script setup lang="ts">
const handleBackTop = (duration: number) => {
    const frames = duration / 1000 * 60
    const html = document.documentElement
    let top = html.scrollTop
    const step = Math.round(top / frames)
    html.scrollTo({
        top: 0
    })
    const toTop = () => {
        requestAnimationFrame(() => {
            if (top <= step) {
                html.scrollTo({
                    top: 0
                })
            } else {
                top = top - step
                html.scrollTo({
                    top: top
                })
                toTop()
            }
        })
    }
    toTop()
}

const handleScroll = (el: HTMLDivElement, className: string) => {
    const classList = el.classList
    return () => {
        const cur = document.documentElement.scrollTop
        if (cur > 400 && classList.contains(className)) {
            classList.remove(className)
        } else if (cur < 400 && !classList.contains(className)) {
            classList.add(className)
        }
    }
}
</script>

<style scoped>
.backtop {
    position: fixed;
    z-index: 9;
    transition: opacity .3s;
    bottom: 140px;
    right: 0px;
    opacity: 1;
}
.hidden {
    opacity: 0;
    pointer-events: none;
}
.fixed-icon {
    width: 46px;
    height: 46px;
    background: #fff;
    border-radius: 8px;
    opacity: .9;
    border: 1px solid #eff1f4;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
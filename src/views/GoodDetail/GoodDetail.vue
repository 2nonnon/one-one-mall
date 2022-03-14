<template>
    <div class="loading">
        <div class="good_detail">
            <div class="detail_head">
                <div class="img_swiper">
                    <div class="swiper_main">
                        <img
                            src="/ShopList/1528e043a2cd396f884128ac2962c1fb_5817809896503403958.jpeg"
                        />
                    </div>
                    <div class="swiper_item">
                        <img
                            class="img_active"
                            src="/ShopList/1528e043a2cd396f884128ac2962c1fb_5817809896503403958.jpeg"
                        />
                    </div>
                </div>
                <div class="detail_info">
                    <div class="detail_title">
                        <div class="good_status">
                            <img
                                src="/Status/52a332d5a64c66bd3471f5ed39c35868_7340073586395887667.png"
                            />
                        </div>【原神】花语青风-蒙德主题系列服饰卫衣运动裤 Genshin
                    </div>
                    <div class="detail_prices">
                        <span class="unit">￥</span>
                        <span class="value">88</span>
                        <span class="value">-</span>
                        <span class="value">88</span>
                    </div>
                    <div class="sku">
                        <div class="sku_row">
                            <div class="sku_title">规格</div>
                            <div class="checkbox_group">
                                <label class="checkbox_item checked">
                                    <input type="checkbox" />
                                    【预售，预计4月中旬发货】运动裤
                                </label>
                                <label class="checkbox_item">
                                    <input type="checkbox" />
                                    【预售，预计4月中旬发货】运动裤
                                </label>
                            </div>
                        </div>
                        <div class="sku_row">
                            <div class="sku_title">尺码</div>
                            <div class="checkbox_group">
                                <label class="checkbox_item checked">
                                    <input type="checkbox" />
                                    XS
                                </label>
                                <label class="checkbox_item">
                                    <input type="checkbox" />
                                    XXL
                                </label>
                            </div>
                        </div>
                        <div class="sku_row">
                            <div class="sku_title">数量</div>
                            <div class="input_number">
                                <button class="disable">-</button>
                                <input step="1" type="number" autocomplete="off" />
                                <button>+</button>
                            </div>
                            <div class="stock">库存445件</div>
                        </div>
                    </div>
                    <div class="detail_btns">
                        <button class="buy" @click="handleToOrderConfirm(2333)">立即购买</button>
                        <button class="add">加入购物车</button>
                    </div>
                </div>
            </div>
            <div class="seperator"></div>
            <div class="detail_body">
                <img v-for="src, i in srcs" :key="i" :src="src" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';


const handleToOrderConfirm = (id: number): void => {
    router.push({
        name: 'OrderConfirm',
        params: {
            id
        }
    })
}
const srcs: string[] = [
    '/Detail/9c501a999922df6cb126f0f0a47c257d_7565886165060741013.webp',
    '/Detail/24af28bd8a458acfb06639c14a25df62_3348276678158040902.webp',
    '/Detail/60c289a2dd2a2937b3188e83ce0ffc59_7957895813646762571.webp',
    '/Detail/74dac6d66727207e7bf9695518ab0652_4462355820815659760.webp',
    '/Detail/496e4cad7cc3ad1dbecf8b736d05ac9f_7303600227754070654.webp',
    '/Detail/212886644adf69a80fe5fc4b0e6a5220_4708057767075243647.webp',
    '/Detail/de65c08265dbbbaf5730af72f7c15e90_7047280733937849189.png',
    '/Detail/e88adb1b8fb3e13c332c859c6c725f90_3249775645107742385.webp',
    '/Detail/fb04647c67c802775df13952cd898800_5103199142852994790.webp',
]
</script>

<style scoped>
.loading {
    margin: 24px auto;
    width: 1260px;
    min-height: 800px;
}
.good_detail {
    padding: 30px;
    background: #fff;
    border-radius: 6px;
}
.detail_head {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
.img_swiper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 486px;
    flex-direction: column;
    margin-right: 24px;
}
.swiper_main {
    display: flex;
    position: relative;
    overflow: hidden;
    width: 486px;
    height: 486px;
    border: 1px solid #eff1f4;
    cursor: pointer;
}
img {
    width: 100%;
    height: 100%;
}
.swiper_item {
    margin-top: 24px;
    overflow: auto;
    max-width: 100%;
    white-space: nowrap;
}
.swiper_item img {
    width: 78px;
    height: 78px;
    cursor: pointer;
    transition: border-color 150ms linear;
    border: 1px solid #eff1f4;
}
img.img_active {
    border: 4px solid #ff6d6d;
}
.detail_info {
    flex-grow: 1;
}
.detail_title {
    font-size: 28px;
    color: #1e1f20;
    line-height: 40px;
    margin-bottom: 24px;
    font-weight: 400;
}
.good_status {
    width: 64px;
    height: 33px;
    display: inline-block;
    vertical-align: sub;
}
.good_status img {
    width: 100%;
    height: auto;
    vertical-align: top;
}
.detail_prices {
    background: rgba(243, 243, 244, 0.5)
        linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
    padding: 12px 12px 13px 12px;
    transition: all 150ms ease-in-out;
    overflow: hidden;
    margin-left: -12px;
    display: inline-flex;
    font-weight: 700;
    color: #ff6d6d;
    font-size: 34px;
    line-height: 48px;
}
.unit {
    font-size: 24px;
    padding-right: 2px;
    line-height: 52px;
}
.sku {
    margin: 24px 0;
}
.sku_row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.sku_row + .sku_row {
    margin-top: 16px;
}
.sku_title {
    height: 32px;
    display: inline-flex;
    align-items: center;
    color: #9696a1;
    line-height: 20px;
    width: 72px;
    flex-shrink: 0;
    word-break: break-all;
    margin-right: 8px;
}
.checkbox_group {
    margin-bottom: -8px;
}
.checkbox_item {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin: 0 8px 8px 0;
    padding: 0 12px;
    min-width: 52px;
    height: 32px;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid #9696a1;
    font-size: 14px;
    color: #16162e;
    line-height: 20px;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}
.checkbox_item.checked {
    color: #ff6d6d;
    border-color: currentColor;
}
.checkbox_item input {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    pointer-events: none;
}
.input_number {
    display: inline-flex;
    align-items: stretch;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #f3f3f4;
    background-color: #fff;
}
.input_number input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    padding: 6px 7px;
    font-size: 14px;
    color: #16162e;
    line-height: 20px;
    border-left: 1px solid #f3f3f4;
    border-right: 1px solid #f3f3f4;
    border-top: none;
    border-bottom: none;
    border-radius: none;
    box-shadow: none;
    outline: none;
    appearance: none;
    text-align: center;
}
.input_number button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    color: #9696a1;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    background-color: transparent;
    vertical-align: initial;
    outline: none;
    border: none;
}
.input_number .disable {
    color: #f3f3f4;
    cursor: not-allowed;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.stock {
    color: #9696a1;
    line-height: 20px;
    margin: 0 12px;
}
.detail_btns {
    overflow: hidden;
    display: flex;
    margin-top: 24px;
}
.detail_btns button {
    width: 182px;
    min-width: 180px;
    height: 56px;
    font-size: 18px;
    line-height: 24px;
    border-radius: 8px;
    border: 2px solid #ff6d6d;
    padding: 0 28px;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.buy {
    color: #fff;
    background-color: #ff6d6d;
    position: relative;
}
.buy::after {
    content: '';
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0);
    border-radius: 8px;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.buy:hover::after {
    opacity: 1;
}
.add {
    margin-left: 12px;
    background-color: #fff;
    color: #ff6d6d;
}
.seperator {
    background-image: url(/Detail/de65c08265dbbbaf5730af72f7c15e90_7047280733937849189.png);
    margin: 30px 0 24px 0;
    height: 26px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
}
.detail_body {
    font-size: 0;
    text-align: center;
}
.detail_body img {
    width: 790px;
    height: auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}
</style>
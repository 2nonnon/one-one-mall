<template>
    <div class="loading">
        <div class="good_detail" v-if="data">
            <div class="detail_head">
                <div class="img_swiper">
                    <div class="swiper_main">
                        <img :data-src="data.cover_url" v-lazyload="'/Status/default.svg'" />
                        <!-- <img :src="currentImg.url" /> -->
                    </div>
                    <div class="swiper_item">
                        <img class="img_active" :data-src="data.cover_url" v-lazyload="'/Status/default.svg'" />
                    </div>
                    <!-- <div class="swiper_item">
                        <img
                            v-for="url, i in banner"
                            :key="i"
                            @mouseenter="handleMouseEnter(url, i)"
                            :class="{ img_active: currentImg.i === i }"
                            :src="url"
                        />
                    </div>-->
                </div>
                <div class="detail_info">
                    <div class="detail_title">
                        <div class="good_status">
                            <img :src="status[data?.tag]" />
                        </div>
                        {{ data?.name }}
                    </div>
                    <div class="detail_prices">
                        <price
                            :price="[data.market_price]"
                            :range="false"
                            :hasFix="false"
                            split="dash"
                            :numFont="34"
                            :curFont="24"
                        ></price>
                    </div>
                    <div class="sku">
                        <div class="sku_row">
                            <div class="sku_title">规格</div>
                            <div class="checkbox_group">
                                <label class="checkbox_item checked">
                                    <input type="checkbox" />
                                    {{ data.name }}
                                </label>
                            </div>
                        </div>
                        <!-- <div class="sku_row">
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
                        </div>-->
                        <div class="sku_row">
                            <div class="sku_title">数量</div>
                            <counter v-model="quantity"></counter>
                            <div class="stock">库存445件</div>
                        </div>
                    </div>
                    <div class="detail_btns">
                        <button class="buy" @click="handleValidate(handleToOrderConfirm)">立即购买</button>
                        <button class="add" @click="handleValidate(handleAddToCart)">加入购物车</button>
                    </div>
                </div>
            </div>
            <div class="seperator"></div>
            <div class="detail_body">
                <img v-for="url, i in main" :key="i" :data-src="url" v-lazyload="'/Status/default.svg'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Price from '../../components/Price/Price.vue'
import Counter from '../../components/Counter/Counter.vue'
import router from '@/router';
import { useRoute } from 'vue-router';
import { reactive, onMounted, ref } from 'vue';
import { emitter } from '@/util/emitter';
import { base } from '@/serve/base-http.service';


const quantity = ref(1)
const status: string[] = ['', '/Status/b62a22805ff37997c816cb91984d71be_1387051523058128219.png', '', '/Status/52a332d5a64c66bd3471f5ed39c35868_7340073586395887667.png']

// const banner = ["/ShopList/1528e043a2cd396f884128ac2962c1fb_5817809896503403958.jpeg", '/ShopList/15da4215c98796a8399492bf8fa3e62b_4584349108407072366.jpeg', '/ShopList/1ac56689afc06dc536d686f9b3e1daf4_4851491045914724997.jpeg']

const main = [
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

// const data = reactive({
//     banner: ["/ShopList/1528e043a2cd396f884128ac2962c1fb_5817809896503403958.jpeg", '/ShopList/15da4215c98796a8399492bf8fa3e62b_4584349108407072366.jpeg', '/ShopList/1ac56689afc06dc536d686f9b3e1daf4_4851491045914724997.jpeg'],
//     name: '【原神】花语青风-蒙德主题系列服饰卫衣运动裤 Genshin',
//     price: 8800,
//     skus: [{
//         "id": 68,
//         "attr": "【预售，预计3月中旬发货】卫衣-2XL",
//         "market_price": 28900,
//         "price": 28900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_3117940514605037149.jpeg",
//         "sale_attr1_key": "类型",
//         "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "2XL"
//     },
//     {
//         "id": 80,
//         "attr": "【预售，预计4月中旬发货】运动裤-M",
//         "market_price": 16900,
//         "price": 16900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_7772943545422900048.jpeg",
//         "sale_attr1_key": "a1775af7fcb309a6",
//         "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "M"
//     }, {
//         "id": 77,
//         "attr": "【预售，预计3月中旬发货】卫衣-3XL",
//         "market_price": 28900,
//         "price": 28900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_885488545817217120.jpeg",
//         "sale_attr1_key": "fc3201a66b78c0ca",
//         "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "3XL"
//     }, {
//         "id": 71,
//         "attr": "【预售，预计4月中旬发货】运动裤-L",
//         "market_price": 16900,
//         "price": 16900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_4474655492288973655.jpeg",
//         "sale_attr1_key": "a1775af7fcb309a6",
//         "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "L"
//     }, {
//         "id": 72,
//         "attr": "【预售，预计4月中旬发货】运动裤-2XL",
//         "market_price": 16900,
//         "price": 16900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_2797822829700822310.jpeg",
//         "sale_attr1_key": "a1775af7fcb309a6",
//         "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "2XL"
//     }, {
//         "id": 75,
//         "attr": "【预售，预计3月中旬发货】卫衣-M",
//         "market_price": 28900,
//         "price": 28900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_573648175200565088.jpeg",
//         "sale_attr1_key": "fc3201a66b78c0ca",
//         "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "M"
//     }, {
//         "id": 69,
//         "attr": "【预售，预计3月中旬发货】卫衣-L",
//         "market_price": 28900,
//         "price": 28900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_3462505051705178612.jpeg",
//         "sale_attr1_key": "fc3201a66b78c0ca",
//         "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "L"
//     }, {
//         "id": 81,
//         "attr": "【预售，预计4月中旬发货】运动裤-3XL",
//         "market_price": 16900,
//         "price": 16900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_9017073235929223059.jpeg",
//         "sale_attr1_key": "a1775af7fcb309a6",
//         "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "3XL"
//     }, {
//         "id": 74,
//         "attr": "【预售，预计3月中旬发货】卫衣-XS",
//         "market_price": 28900,
//         "price": 28900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_4787737299736529525.jpeg",
//         "sale_attr1_key": "fc3201a66b78c0ca",
//         "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "XS"
//     }, {
//         "id": 76,
//         "attr": "【预售，预计3月中旬发货】卫衣-S",
//         "market_price": 28900,
//         "price": 28900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_3624862993541767613.jpeg",
//         "sale_attr1_key": "fc3201a66b78c0ca",
//         "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "S"
//     }, {
//         "id": 73,
//         "attr": "【预售，预计3月中旬发货】卫衣-XL",
//         "market_price": 28900,
//         "price": 28900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_3210091565929206342.jpeg",
//         "sale_attr1_key": "fc3201a66b78c0ca",
//         "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "XL"
//     }, {
//         "id": 78,
//         "attr": "【预售，预计4月中旬发货】运动裤-XS",
//         "market_price": 16900,
//         "price": 16900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_4015239940410625682.jpeg",
//         "sale_attr1_key": "a1775af7fcb309a6",
//         "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "XS"
//     }, {
//         "id": 79,
//         "attr": "【预售，预计4月中旬发货】运动裤-S",
//         "market_price": 16900,
//         "price": 16900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_2556223372845980260.jpeg",
//         "sale_attr1_key": "a1775af7fcb309a6",
//         "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "S"
//     }, {
//         "id": 70,
//         "attr": "【预售，预计4月中旬发货】运动裤-XL",
//         "market_price": 16900,
//         "price": 16900,
//         "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_1747068721330264208.jpeg",
//         "sale_attr1_key": "a1775af7fcb309a6",
//         "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
//         "sale_attr2_key": "规格（具体见尺码表）",
//         "sale_attr2_val": "XL"
//     }
//     ],
//     tag: 1,
//     main: [
//         '/Detail/9c501a999922df6cb126f0f0a47c257d_7565886165060741013.webp',
//         '/Detail/24af28bd8a458acfb06639c14a25df62_3348276678158040902.webp',
//         '/Detail/60c289a2dd2a2937b3188e83ce0ffc59_7957895813646762571.webp',
//         '/Detail/74dac6d66727207e7bf9695518ab0652_4462355820815659760.webp',
//         '/Detail/496e4cad7cc3ad1dbecf8b736d05ac9f_7303600227754070654.webp',
//         '/Detail/212886644adf69a80fe5fc4b0e6a5220_4708057767075243647.webp',
//         '/Detail/de65c08265dbbbaf5730af72f7c15e90_7047280733937849189.png',
//         '/Detail/e88adb1b8fb3e13c332c859c6c725f90_3249775645107742385.webp',
//         '/Detail/fb04647c67c802775df13952cd898800_5103199142852994790.webp',
//     ]
// })
interface Attribute {
    id: number
    name: string
    parentId: number
}

interface Sku {
    id: number
    name: string
    img_url: string
    market_price: number
    price: number
    sold: number
    stock: number
    good: number
    attributes: Attribute[]
}

interface good {
    checked: boolean
    cover_url: string
    id: number
    total_stock: number
    market_price: number
    name: string
    price: number
    sale_time: string
    tag: number
    attributes: { [Propname: string]: string[] }
    skus: Sku[]
}

const data = reactive<good>({} as good)

// const currentImg = reactive({
//     url: banner,
//     i: 0
// })
// const handleMouseEnter = (url: string, i: number) => {
//     currentImg.url = url
//     currentImg.i = i
// }

type callback = () => void

const handleValidate = (cb: callback) => {
    if (base.loadToken()) {
        cb()
    } else {
        emitter.emit('toLogin', true)
    }
}

const handleToOrderConfirm = (): void => {
    base.post('orders', {
        paid: quantity.value * data.market_price,
        orderDetails: [{
            goodId: data.id,
            cover_url: data.cover_url,
            name: data.name,
            attr: data.name,
            quantity: quantity.value,
            market_price: data.market_price,
            paid: quantity.value * data.market_price,
        }]
    }).then(res => {
        console.log(res)
        router.push({
            name: 'OrderConfirm',
            params: {
                orderId: res?.data.id
            }
        })
    })
}

const handleAddToCart = () => {
    base.post('carts', {
        skuId: data?.skus[0].id,
        quantity: quantity.value
    }).then(res => {
        console.log('add to cart', res)
        emitter.emit('cart-change')
    })
}

const load = (id: string) => {
    base.get(`goods/detail/${id}`).then((res) => {
        console.log(res)
        document.title = res?.data.name
        Object.assign(data, res?.data)
    })
}

onMounted(() => {
    const route = useRoute()
    load(route.params.id as string)
})
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
.swiper_item > img + img {
    margin-left: 24px;
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
    width: 100%;
    line-height: 48px;
    color: #ff6d6d;
    font-weight: 700;
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
    content: "";
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
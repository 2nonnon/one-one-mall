<template>
    <div class="loading">
        <div class="good_detail">
            <div class="detail_head">
                <div class="img_swiper">
                    <div class="swiper_main">
                        <img :src="currentImg.url" />
                    </div>
                    <div class="swiper_item">
                        <img
                            v-for="url, i in data.banner"
                            :key="i"
                            @mouseenter="handleMouseEnter(url, i)"
                            :class="{ img_active: currentImg.i === i }"
                            :src="url"
                        />
                    </div>
                </div>
                <div class="detail_info">
                    <div class="detail_title">
                        <div class="good_status">
                            <img
                                src="/Status/52a332d5a64c66bd3471f5ed39c35868_7340073586395887667.png"
                            />
                        </div>
                        {{ data.name }}
                    </div>
                    <div class="detail_prices">
                        <price
                            :price="[data.price, data.price]"
                            :range="true"
                            :hasFix="true"
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
                <img v-for="url, i in data.main" :key="i" :src="url" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Price from '../../components/Price/Price.vue'
import router from '@/router';
import { reactive } from 'vue';

const data = reactive({
    banner: ["/ShopList/1528e043a2cd396f884128ac2962c1fb_5817809896503403958.jpeg", '/ShopList/15da4215c98796a8399492bf8fa3e62b_4584349108407072366.jpeg', '/ShopList/1ac56689afc06dc536d686f9b3e1daf4_4851491045914724997.jpeg'],
    name: '【原神】花语青风-蒙德主题系列服饰卫衣运动裤 Genshin',
    price: 8800,
    skus: {
        "fc3201a66b78c0ca_g805d9dc43aca013": {
            "id": 68,
            "attr": "【预售，预计3月中旬发货】卫衣-2XL",
            "market_price": 28900,
            "price": 28900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_3117940514605037149.jpeg",
            "sale_attr1_key": "fc3201a66b78c0ca",
            "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
            "sale_attr2_key": "g805d9dc43aca013",
            "sale_attr2_val": "2XL"
        },
        "a1775af7fcb309a6_b148d1ee08dfd87b": {
            "id": 80,
            "attr": "【预售，预计4月中旬发货】运动裤-M",
            "market_price": 16900,
            "price": 16900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_7772943545422900048.jpeg",
            "sale_attr1_key": "a1775af7fcb309a6",
            "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
            "sale_attr2_key": "b148d1ee08dfd87b",
            "sale_attr2_val": "M"
        },
        "fc3201a66b78c0ca_n1fedd771fe95ce4": {
            "id": 77,
            "attr": "【预售，预计3月中旬发货】卫衣-3XL",
            "market_price": 28900,
            "price": 28900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_885488545817217120.jpeg",
            "sale_attr1_key": "fc3201a66b78c0ca",
            "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
            "sale_attr2_key": "n1fedd771fe95ce4",
            "sale_attr2_val": "3XL"
        },
        "a1775af7fcb309a6_p85a0ab86d6c82ac": {
            "id": 71,
            "attr": "【预售，预计4月中旬发货】运动裤-L",
            "market_price": 16900,
            "price": 16900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_4474655492288973655.jpeg",
            "sale_attr1_key": "a1775af7fcb309a6",
            "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
            "sale_attr2_key": "p85a0ab86d6c82ac",
            "sale_attr2_val": "L"
        },
        "a1775af7fcb309a6_g805d9dc43aca013": {
            "id": 72,
            "attr": "【预售，预计4月中旬发货】运动裤-2XL",
            "market_price": 16900,
            "price": 16900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_2797822829700822310.jpeg",
            "sale_attr1_key": "a1775af7fcb309a6",
            "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
            "sale_attr2_key": "g805d9dc43aca013",
            "sale_attr2_val": "2XL"
        },
        "fc3201a66b78c0ca_b148d1ee08dfd87b": {
            "id": 75,
            "attr": "【预售，预计3月中旬发货】卫衣-M",
            "market_price": 28900,
            "price": 28900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_573648175200565088.jpeg",
            "sale_attr1_key": "fc3201a66b78c0ca",
            "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
            "sale_attr2_key": "b148d1ee08dfd87b",
            "sale_attr2_val": "M"
        },
        "fc3201a66b78c0ca_p85a0ab86d6c82ac": {
            "id": 69,
            "attr": "【预售，预计3月中旬发货】卫衣-L",
            "market_price": 28900,
            "price": 28900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_3462505051705178612.jpeg",
            "sale_attr1_key": "fc3201a66b78c0ca",
            "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
            "sale_attr2_key": "p85a0ab86d6c82ac",
            "sale_attr2_val": "L"
        },
        "a1775af7fcb309a6_n1fedd771fe95ce4": {
            "id": 81,
            "attr": "【预售，预计4月中旬发货】运动裤-3XL",
            "market_price": 16900,
            "price": 16900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_9017073235929223059.jpeg",
            "sale_attr1_key": "a1775af7fcb309a6",
            "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
            "sale_attr2_key": "n1fedd771fe95ce4",
            "sale_attr2_val": "3XL"
        },
        "fc3201a66b78c0ca_ic144d8ec6667098": {
            "id": 74,
            "attr": "【预售，预计3月中旬发货】卫衣-XS",
            "market_price": 28900,
            "price": 28900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_4787737299736529525.jpeg",
            "sale_attr1_key": "fc3201a66b78c0ca",
            "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
            "sale_attr2_key": "ic144d8ec6667098",
            "sale_attr2_val": "XS"
        },
        "fc3201a66b78c0ca_ge78bd6bd1321aaf": {
            "id": 76,
            "attr": "【预售，预计3月中旬发货】卫衣-S",
            "market_price": 28900,
            "price": 28900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_3624862993541767613.jpeg",
            "sale_attr1_key": "fc3201a66b78c0ca",
            "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
            "sale_attr2_key": "ge78bd6bd1321aaf",
            "sale_attr2_val": "S"
        },
        "fc3201a66b78c0ca_c434b0fba5876e45": {
            "id": 73,
            "attr": "【预售，预计3月中旬发货】卫衣-XL",
            "market_price": 28900,
            "price": 28900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/9ec84b2b782576bdadea21328a3c3fc4_3210091565929206342.jpeg",
            "sale_attr1_key": "fc3201a66b78c0ca",
            "sale_attr1_val": "【预售，预计3月中旬发货】卫衣",
            "sale_attr2_key": "c434b0fba5876e45",
            "sale_attr2_val": "XL"
        },
        "a1775af7fcb309a6_ic144d8ec6667098": {
            "id": 78,
            "attr": "【预售，预计4月中旬发货】运动裤-XS",
            "market_price": 16900,
            "price": 16900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_4015239940410625682.jpeg",
            "sale_attr1_key": "a1775af7fcb309a6",
            "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
            "sale_attr2_key": "ic144d8ec6667098",
            "sale_attr2_val": "XS"
        },
        "a1775af7fcb309a6_ge78bd6bd1321aaf": {
            "id": 79,
            "attr": "【预售，预计4月中旬发货】运动裤-S",
            "market_price": 16900,
            "price": 16900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_2556223372845980260.jpeg",
            "sale_attr1_key": "a1775af7fcb309a6",
            "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
            "sale_attr2_key": "ge78bd6bd1321aaf",
            "sale_attr2_val": "S"
        },
        "a1775af7fcb309a6_c434b0fba5876e45": {
            "id": 70,
            "attr": "【预售，预计4月中旬发货】运动裤-XL",
            "market_price": 16900,
            "price": 16900,
            "cover_url": "https://webstatic.mihoyo.com/upload/mall/2022/03/01/2f79a72ff34ca5cb6d407a537f163201_1747068721330264208.jpeg",
            "sale_attr1_key": "a1775af7fcb309a6",
            "sale_attr1_val": "【预售，预计4月中旬发货】运动裤",
            "sale_attr2_key": "c434b0fba5876e45",
            "sale_attr2_val": "XL"
        }
    },
    tag: 1,
    main: [
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
})

const currentImg = reactive({
    url: data.banner[0],
    i: 0
})

const handleMouseEnter = (url: string, i: number) => {
    currentImg.url = url
    currentImg.i = i
}

const handleToOrderConfirm = (id: number): void => {
    router.push({
        name: 'OrderConfirm',
        params: {
            id
        }
    })
}
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
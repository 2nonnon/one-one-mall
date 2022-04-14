<template>
    <div class="cart">
        <loading :is-loading="isLoading">
            <template v-slot>
                <div class="cart_head">
                    <div class="block"></div>
                    <div class="cart_goods">商品信息</div>
                    <div class="cart_price">单价</div>
                    <div class="cart_count">数量</div>
                    <div class="cart_total">金额</div>
                    <div class="cart_action">
                        <span class="end">操作</span>
                    </div>
                </div>
                <div class="cart_main">
                    <div class="main_head">
                        <checkbox v-model:checked="checkAll" @click="handleCheckAll"></checkbox>
                        <div class="main_title">
                            <div class="title_icon">
                                <svg t="1649937801927" class="title-icon x-icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="120032">
                                    <path
                                        d="M736.3584 847.4112H281.4464c-30.6176 0-55.3984-24.7808-55.3984-55.3984v-87.2448c0-30.6176 24.7808-55.3984 55.3984-55.3984h454.912c30.6176 0 55.3984 24.7808 55.3984 55.3984v87.2448c0 30.6176-24.832 55.3984-55.3984 55.3984z"
                                        fill="#ff6d6d" p-id="120033"></path>
                                    <path
                                        d="M901.9904 321.3312c-10.4448 0-20.224-6.4-24.0128-16.7936l-16.7936-45.7216a25.6512 25.6512 0 0 1 15.2064-32.8704c13.312-4.864 28.0064 1.9456 32.8704 15.2064l16.7936 45.7216a25.6512 25.6512 0 0 1-24.064 34.4576z"
                                        fill="#ff6d6d" p-id="120034"></path>
                                    <path
                                        d="M973.1072 415.232l-19.0464-51.8656a25.61536 25.61536 0 0 0-48.0768 17.664l19.0464 51.8656c8.0384 21.8112 7.7824 45.0048-0.6656 65.28a120.56576 120.56576 0 0 1-111.5648 74.3424c-66.6112 0-120.832-54.1696-120.832-120.832 0-14.1312-11.4688-25.6-25.6-25.6s-25.6 11.4688-25.6 25.6c0 66.6112-54.1696 120.832-120.832 120.832s-120.832-54.1696-120.832-120.832c0-14.1312-11.4688-25.6-25.6-25.6s-25.6 11.4688-25.6 25.6c0 66.6112-54.1696 120.832-120.832 120.832-48.8448 0-92.6208-29.1328-111.5136-74.1888-8.5504-20.3264-8.704-43.6736-0.5632-65.6384L212.1216 172.032a39.31136 39.31136 0 0 1 36.6592-25.4976H792.576c16.3328 0 31.1296 10.2912 36.7616 25.6512l7.168 19.456a25.63584 25.63584 0 0 0 32.8704 15.2064 25.61536 25.61536 0 0 0 15.2064-32.8704l-7.1168-19.456c-13.0048-35.4304-47.104-59.1872-84.7872-59.1872H248.832c-37.5296 0-71.5776 23.6544-84.6848 58.8288L67.1744 414.8224c-12.7488 34.2016-12.2368 70.8608 1.3312 103.2704a171.6736 171.6736 0 0 0 158.72 105.5744c61.7984 0 116.0704-32.768 146.432-81.8688 30.3104 49.0496 84.5824 81.8688 146.432 81.8688s116.0704-32.768 146.432-81.8688c30.3104 49.0496 84.5824 81.8688 146.432 81.8688 69.632 0 131.9936-41.5232 158.8224-105.7792 13.312-32.256 13.824-68.7104 1.3312-102.656z"
                                        fill="#ff6d6d" p-id="120035"></path>
                                    <path
                                        d="M776.0384 380.8256H247.6032c-14.1312 0-25.6-11.4688-25.6-25.6s11.4688-25.6 25.6-25.6h528.4352c14.1312 0 25.6 11.4688 25.6 25.6s-11.4176 25.6-25.6 25.6zM802.048 933.7856H216.7296c-52.224 0-94.72-42.496-94.72-94.72v-183.808c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v183.808c0 24.0128 19.5072 43.52 43.52 43.52h585.3184c24.0128 0 43.52-19.5072 43.52-43.52v-183.808c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v183.808c0 52.224-42.496 94.72-94.72 94.72z"
                                        fill="#ff6d6d" p-id="120036"></path>
                                </svg>
                            </div>
                            <div class="text">原神万有铺子</div>
                        </div>
                    </div>
                    <div class="checkbox_group">
                        <div class="goods_list" v-if="data.length > 0">
                            <div class="good_card" v-for="item in data" :key="item.id">
                                <checkbox v-model:checked="item.checked" @click="handleCheck"></checkbox>
                                <div class="cart_goods">
                                    <div class="good_img">
                                        <img :src="item.sku.img_url" />
                                    </div>
                                    <div class="good_info">
                                        <div class="good_name">{{ item.sku.name }}</div>
                                        <!-- <div class="good_attr">甘雨-璃月港的一夜</div> -->
                                    </div>
                                </div>
                                <div class="cart_price">
                                    <price :num-font="16" :cur-font="16" :has-fix="true"
                                        :price="[item.sku.market_price]"></price>
                                </div>
                                <div class="cart_count">
                                    <counter v-model="(item.quantity)"></counter>
                                </div>
                                <div class="cart_total">
                                    <price :num-font="16" :cur-font="16" :has-fix="true"
                                        :price="[item.sku.market_price * item.quantity]"></price>
                                </div>
                                <div class="cart_action">
                                    <div class="delete">
                                        <div class="delete_icon" @click="handleDelete(item.id)">
                                            <svg t="1649938247656" class="delete-icon x-icon" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="134323">
                                                <path
                                                    d="M385.962667 234.538667h479.573333c16.810667 0 30.464 13.952 30.464 31.146666 0 17.322667-13.653333 31.274667-30.464 31.274667H158.421333A30.805333 30.805333 0 0 1 128 265.728c0-17.237333 13.610667-31.189333 30.421333-31.189333h136.277334a38.570667 38.570667 0 0 0 37.461333-31.445334l10.154667-52.053333C352.554667 111.530667 385.877333 85.333333 423.765333 85.333333h176.469334c37.888 0 71.168 26.197333 80.981333 63.744a31.317333 31.317333 0 0 1-21.504 38.272 30.378667 30.378667 0 0 1-37.290667-22.101333 23.125333 23.125333 0 0 0-22.186666-17.450667H423.765333a23.125333 23.125333 0 0 0-22.186666 17.450667l-9.685334 50.048c-1.365333 6.741333-3.413333 13.056-5.930666 19.2z m-38.016 640c-39.125333-0.853333-61.269333-22.613333-65.792-64.725334-13.098667-120.448-35.456-405.674667-35.669334-408.533333a31.146667 31.146667 0 0 0-32.810666-28.672 30.976 30.976 0 0 0-27.861334 33.621333c0.213333 2.901333 22.613333 289.109333 35.797334 410.538667 7.850667 72.661333 55.765333 118.698667 125.056 120.192h0.64a30.848 30.848 0 0 0 30.464-30.549333 30.933333 30.933333 0 0 0-29.866667-31.872zM810.325333 372.608a31.146667 31.146667 0 0 0-32.810666 28.629333c-0.213333 2.858667-22.784 288.853333-35.712 408.362667-4.608 43.008-27.050667 64.298667-68.608 65.109333l-16.554667 0.298667c-52.778667 0.938667-77.354667 1.408-136.32 1.194667h-0.085333a30.762667 30.762667 0 0 0-30.421334 31.061333 30.848 30.848 0 0 0 30.293334 31.36l31.189333 0.042667c43.52 0 60.842667-0.341333 93.44-0.981334l29.568-0.597333c72.149333-1.322667 120.064-46.421333 128.042667-120.661333 13.056-120.32 35.626667-407.296 35.84-410.154667a31.018667 31.018667 0 0 0-27.861334-33.664z"
                                                    p-id="134324"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart_foot">
                    <div class="submit_bar">
                        <checkbox v-model:checked="checkAll" text="全选" @click="handleCheckAll"></checkbox>
                        <div class="submit_container">
                            <div class="submit_info">
                                <div class="submit_count">
                                    <span class="count_text">共</span>
                                    <span class="count_num">{{ total }}</span>
                                    <span class="count_text">件</span>
                                </div>
                                <div class="font-lg">合计（不含运费）：</div>
                                <div class="total_price">
                                    <price :price="[totalPrice]" :has-fix="true" :cur-font="24" :num-font="34"></price>
                                </div>
                            </div>
                            <div>
                                <button :disabled="btnDisabled" class="settle" @click="handleSettle">结算</button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </loading>
    </div>
</template>

<script setup lang="ts">
import Checkbox from '@/components/Checkbox/Checkbox.vue';
import Loading from '@/components/Loading/Loading.vue';
import Counter from '@/components/Counter/Counter.vue';
import Price from '@/components/Price/Price.vue'
import router from '@/router';
import { base } from '@/serve/base-http.service';
import { emitter } from '@/util/emitter';
import { ref, reactive, onMounted, computed } from 'vue';

interface Sku {
    attributes: string[]
    id: number
    img_url: string
    market_price: number
    name: string
    price: number
    sold: number
    stock: number
}

interface Cart {
    id: number
    quantity: number
    checked: boolean
    sku: Sku
}

const data = reactive<Cart[]>([])

const checkAll = ref(false)
const btnDisabled = ref(true)

const total = computed<number>(() => {
    return data.reduce((pre, cur) => {
        if (cur.checked) return pre + cur.quantity
        else return pre
    }, 0)
})
const totalPrice = computed<number>(() => {
    return data.reduce((pre, cur) => {
        if (cur.checked) return pre + cur.quantity * cur.sku.market_price
        else return pre
    }, 0)
})

const btnCheck = () => {
    const has = data.some((item) => item.checked)
    if (has) btnDisabled.value = false
    else btnDisabled.value = true
}

const handleCheck = () => {
    const isAll = data.every((item) => item.checked)
    if (isAll) checkAll.value = true
    else checkAll.value = false
    btnCheck()
}

const handleCheckAll = () => {
    data.forEach(item => item.checked = checkAll.value)
    btnCheck()
}

const isLoading = ref(true)

const handleSettle = () => {
    const ids: number[] = []
    const settleGoods = data.filter(item => item.checked)
    const paid = settleGoods.reduce((res, cur) => {
        ids.push(cur.id)
        return res + cur.quantity * cur.sku.market_price
    }, 0)
    const orderDetaile = settleGoods.map(item => {
        return {
            goodId: item.sku.id,
            cover_url: item.sku.img_url,
            name: item.sku.name,
            attr: item.sku.name,
            quantity: item.quantity,
            market_price: item.sku.market_price,
            paid: item.quantity * item.sku.market_price,
        }
    })
    base.post('orders', {
        paid: paid,
        orderDetails: orderDetaile
    }).then(res => {
        console.log('create order', res)
        console.log(ids)
        base.post('carts/delete/ids', { ids }).then(() => {
            emitter.emit('cart-change')
        })
        router.push({
            name: 'OrderConfirm',
            params: {
                orderId: res?.data.id
            }
        })
    })
}

const handleDelete = (id: number) => {
    base.delete(`carts/${id}`).then(res => {
        console.log('删除', res)
        emitter.emit('cart-change')
        load()
    })
}

const load = () => {
    base.get('carts').then((res) => {
        isLoading.value = false
        console.log('cart----', res)
        data.length = 0
        data.push(...res?.data.map((item: { checked: boolean }) => {
            item.checked = false
            return item
        }))
        console.log('data----', data)
    })
}

onMounted(() => {
    load()
})
</script>

<style scoped>
.cart {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 1260px;
    padding-top: 24px;
    padding-bottom: 24px;
}

/* .loading {
    position: relative;
    flex-grow: 1;
} */
.cart_head {
    border-radius: 6px;
    padding: 20px 30px;
    text-align: center;
    background-color: #fff;
    display: flex;
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 22px;
    color: #9696a1;
}

.cart_head>div,
.good_card>div {
    display: flex;
    align-items: center;
}

.block {
    width: 40px;
}

.cart_goods {
    flex: 1 1 0%;
}

.cart_price,
.cart_count,
.cart_total {
    width: 150px;
    justify-content: center;
}

div.cart_action {
    width: 120px;
    justify-content: flex-end;
}

.end {
    margin-right: 24px;
    width: 44px;
    text-align: center;
}

.cart_main {
    background-color: #fff;
    padding-bottom: 16px;
    border-radius: 6px;
    overflow: hidden;
}

.main_head {
    padding: 24px 30px 0 30px;
    background-color: #fff;
    display: flex;
}

.main_title {
    display: flex;
    align-items: center;
    flex: 1;
}

.title_icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
}

.title-icon {
    font-size: 24px;
}

.x-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.text {
    line-height: 22px;
    font-size: 16px;
    margin-left: 12px;
}

.checkbox_group {
    margin-bottom: -8px;
}

.goods_list {
    position: relative;
}

.good_card {
    position: relative;
    padding: 12px 30px;
    display: flex;
}

.good_img {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: #f3f3f4;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #c5c5cb;
    margin-right: 24px;
}

.good_img img {
    height: 100%;
    width: 100%;
}

.good_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 8px;
    height: 100%;
}

.good_name {
    width: 350px;
    line-height: 22px;
    font-size: 16px;
}

.good_attr {
    width: 350px;
    font-size: 14px;
    color: #9696a1;
}

.price {
    font-size: 16px;
}

.currency {
    padding-right: 2px;
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

.cart_total .price {
    color: #ff6d6d;
}

.delete {
    width: 44px;
    margin-right: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.delete:hover .delete_icon {
    color: #ff6d6d;
}

.delete_icon {
    color: #c5c5cb;
    width: 24px;
    height: 24px;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
}

.good_card+.good_card::after {
    content: "";
    position: absolute;
    left: 194px;
    right: 53px;
    top: 0;
    border-top: 1px solid #e7e7ea;
}

.cart_foot {
    position: sticky;
    bottom: 0px;
    z-index: 10;
    margin-top: 8px;
}

.submit_bar {
    background-color: #fff;
    padding: 0 30px;
    height: 100px;
    border-radius: 6px;
    border: 1px solid #f3f3f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.submit_bar .checkbox_item {
    width: auto;
    font-size: 16px;
    line-height: 22px;
}

.submit_container,
.submit_info {
    display: flex;
    align-items: center;
}

.submit_info {
    margin-right: 30px;
    align-items: flex-end;
}

.submit_count {
    font-size: 16px;
    line-height: 22px;
    margin-right: 30px;
}

.count_num {
    margin: 0 1px;
    color: #ff6d6d;
}

.font-lg {
    font-size: 16px;
    line-height: 22px;
}

.submit_price {
    font-size: 34px;
    line-height: 1;
    font-weight: 500;
    white-space: nowrap;
    color: #ff6d6d;
}

button.settle {
    width: 180px;
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

.settle {
    color: #fff;
    background-color: #ff6d6d;
    position: relative;
}

.settle::after {
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

.settle:not(:disabled):hover::after {
    opacity: 1;
}

.settle:disabled {
    color: #c5c5cb;
    background-color: #f3f3f4;
    border-color: #f3f3f4;
    cursor: not-allowed;
}

.total_price {
    font-weight: 500;
    color: #ff6d6d;
}
</style>
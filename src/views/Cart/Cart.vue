<template>
    <div class="cart">
        <div class="loading">
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
                        <div class="title_icon">M</div>
                        <div class="text">原神万有铺子</div>
                    </div>
                </div>
                <div class="checkbox_group">
                    <div class="goods_list">
                        <div class="good_card" v-for="item in data" :key="item.goodsId">
                            <checkbox v-model:checked="item.checked" @click="handleCheck"></checkbox>
                            <div class="cart_goods">
                                <div class="good_img">
                                    <img :src="item.coverUrl" />
                                </div>
                                <div class="good_info">
                                    <div class="good_name">{{ item.name }}</div>
                                    <!-- <div class="good_attr">甘雨-璃月港的一夜</div> -->
                                </div>
                            </div>
                            <div class="cart_price">
                                <price
                                    :num-font="16"
                                    :cur-font="16"
                                    :has-fix="true"
                                    :price="[item.marketPrice]"
                                ></price>
                            </div>
                            <div class="cart_count">
                                <counter v-model="(item.quantity)"></counter>
                            </div>
                            <div class="cart_total">
                                <price
                                    :num-font="16"
                                    :cur-font="16"
                                    :has-fix="true"
                                    :price="[item.marketPrice * item.quantity]"
                                ></price>
                            </div>
                            <div class="cart_action">
                                <div class="delete">
                                    <div class="delete_icon" @click="handleDelete(item.cartId)">N</div>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import Checkbox from '@/components/Checkbox/Checkbox.vue';
import Counter from '@/components/Counter/Counter.vue';
import Price from '@/components/Price/Price.vue'
import router from '@/router';
import request from '@/serve/request';
import { ref, reactive, onMounted, computed } from 'vue';

interface good {
    coverUrl: string
    goodsId: string
    id: number
    isSoldOut: number
    marketPrice: number
    name: string
    price: number
    saleTime: string
    tag: number
    quantity: number
    checked: boolean
    cartId: number
}

const data = reactive<good[]>([])

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
        if (cur.checked) return pre + cur.quantity * cur.marketPrice
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

const handleSettle = () => {
    const settleGoods = data.filter(item => item.checked)
    console.log(settleGoods)
    sessionStorage.setItem('order', JSON.stringify(settleGoods))
    router.push({
        name: 'OrderConfirm'
    })
}

const handleDelete = (id: number) => {
    request.delete(`/cart/${id}`).then(res => {
        console.log('删除', res)
        data.length = 0
        load()
    })
}

const load = () => {
    const id = JSON.parse(sessionStorage.getItem('user') as string).id
    request.get('/cart', { params: { userId: id } }).then((res) => {
        console.log('cart----', res)
        const quantities = new Map()
        res.data.forEach((item: { quantity: number, goodsId: number, id: number }) => {
            quantities.set(item.goodsId, {quantity: item.quantity, cartId: item.id})
        })
        const ids = res.data.map((item: { goodsId: number }) => item.goodsId)
        request.post('/goods/selectBatch', ids).then((res) => {
            console.log('商品===', res)
            const goods = res.data
            goods.forEach((item: { id: number, quantity?: number, checked?: boolean, cartId?: number }) => {
                item.quantity = quantities.get(item.id).quantity
                item.cartId = quantities.get(item.id).cartId
                item.checked = false
            })
            data.push(...goods)
            console.log(goods)
        })
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
.loading {
    position: relative;
    flex-grow: 1;
}
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
.cart_head > div,
.good_card > div {
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
    font-size: 24px;
    text-align: center;
    color: #ff6d6d;
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
.good_card + .good_card::after {
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
    color: #ff6d6d
}
</style>
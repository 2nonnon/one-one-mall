<template>
    <div class="user">
        <breadcrumb></breadcrumb>
        <div class="user_info">
            <div class="info_container">
                <img src="/Header/avatar40017.webp" class="avator" />
                <div class="info_content">
                    <div class="info_name">{{userInfo.username}}</div>
                    <div class="info_uid">{{userInfo.id}}</div>
                </div>
            </div>
        </div>
        <div class="user_container">
            <div class="user_side">
                <div class="side_head">
                    <div class="user_icon">G</div>
                    <div class="side_title">个人中心</div>
                </div>
                <div class="side_body">
                    <div class="user_nav">
                        <div class="nav_item active">
                            <div class="nav_icon">G</div>我的订单
                        </div>
                        <div class="nav_item">
                            <div class="nav_icon">G</div>退款售后
                        </div>
                        <div class="nav_item">
                            <div class="nav_icon">G</div>优惠券
                        </div>
                        <div class="nav_item">
                            <div class="nav_icon">G</div>地址管理
                        </div>
                    </div>
                </div>
            </div>
            <div class="user_main">
                <div class="loading">
                    <div class="main_item">
                        <div class="main_head">我的订单</div>
                        <div class="main_tab">
                            <div class="tab_item active">全部订单</div>
                            <div class="tab_item">待付款</div>
                            <div class="tab_item">待发货</div>
                            <div class="tab_item">待收货</div>
                        </div>
                    </div>
                    <div class="cart_body">
                        <div class="order_card" v-for="order in orderInfo" :key="order.orderId">
                            <div class="main_title">
                                <div class="title_icon">M</div>
                                <div class="text">原神万有铺子</div>
                            </div>
                            <div class="order_body">
                                <div class="good_list">
                                    <div
                                        class="good_card"
                                        v-for="item in order.goods"
                                        :key="item.goodsId"
                                    >
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
                                                :price="[item.marketPrice]"
                                                :has-fix="true"
                                                :cur-font="16"
                                                :num-font="16"
                                            ></price>
                                        </div>
                                        <div class="cart_count font-lg">x{{ item.quantity }}</div>
                                    </div>
                                </div>
                                <div class="order_item_col order_fee">
                                    <price
                                        :price="[order.cost]"
                                        :has-fix="true"
                                        :cur-font="16"
                                        :num-font="16"
                                    ></price>
                                </div>
                                <div class="order_item_col order_info">
                                    <span>订单详情</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue'
import Price from '@/components/Price/Price.vue'
// import router from '@/router';
import request from '@/serve/request';
import { onMounted, reactive } from 'vue'

interface good {
    checked: boolean
    coverUrl: string
    goodsId: string
    id: number
    isSoldOut: number
    marketPrice: number
    name: string
    price: number
    quantity: number
    saleTime: string
    tag: number
}

interface order {
    orderId: string
    cost: number
    goods: good[]
}

const orderInfo = reactive<order[]>([])

interface user {
    username: string
    id: string
}

const userInfo = reactive<user>({
    username: '',
    id: ''
})

onMounted(() => {
    const user = JSON.parse(sessionStorage.getItem('user') ?? '')
    const userId = user?.id
    userInfo.id = userId
    userInfo.username = user.username

    request.get('order', {params: {search: userId}}).then(res => {
        console.log('ordeeeeer', res.data.records)
        const orders = res.data.records
        Promise.all(res.data.records.map((item: { serialnumber: string; }) => {
            return request.get('/orderDetail', {params: {serialnumber: item.serialnumber}})
        })).then(result => {
            console.log('detaaaaail', result)
            Promise.all(result.map(item => {
                return request.post('/goods/selectBatch', item.data.map((detail: {goodsId: number}) => detail.goodsId))
            })).then(tmp => {
                console.log('goooood', tmp)
                for (let i = 0; i < orders.length; i++) {
                    const order = {} as order
                    order.orderId = orders[i].serialnumber
                    order.cost = orders[i].cost
                    tmp[i].data.forEach((item: {quantity: number}, index: number) => {
                        item.quantity = result[i].data[index].quantity
                    })
                    order.goods = [...tmp[i].data]
                    orderInfo.push(order)
                }
            })
        })
    }) 
})
</script>

<style scoped>
.user {
    margin: 0 auto;
    width: 1260px;
    padding-top: 12px;
    padding-bottom: 24px;
}
.user_info {
    border-radius: 6px;
    background-color: #fff;
    padding: 24px 30px;
}
.info_container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.avator {
    width: 76px;
    height: 76px;
    border: 1px solid #eff1f4;
    border-radius: 50%;
    object-fit: cover;
}
.info_content {
    margin-left: 24px;
}
.info_name {
    line-height: 24px;
    font-size: 18px;
    font-weight: 700;
    color: #1e1f20;
}
.info_uid {
    margin-top: 12px;
    line-height: 22px;
    font-size: 16px;
    color: #9696a1;
}
.user_container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 24px;
}
.user_side {
    flex-shrink: 0;
    margin-right: 24px;
    width: 210px;
}
.side_head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 24px;
    background: #fff;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 24px;
    border-radius: 6px 6px 0 0;
}
.user_icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    text-align: center;
    color: #ff6d6d;
    flex-shrink: 0;
    margin-right: 8px;
}
.side_title {
    font-size: 18px;
    font-weight: 700;
    color: #1e1f20;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.side_body {
    background: #fff;
    padding: 24px 30px;
    border-radius: 0 0 6px 6px;
}
.nav_item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #16162e;
    cursor: pointer;
}
.nav_item.active {
    color: #ff6d6d;
}
.nav_item:not(:first-child) {
    margin-top: 26px;
}
.nav_icon {
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    text-align: center;
    flex-shrink: 0;
    margin-right: 6px;
}
.user_main {
    flex-grow: 1;
    min-width: 0;
}
.main_head {
    background: #fff;
    padding: 24px 30px;
    font-size: 18px;
    font-weight: 700;
    color: #1e1f20;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 6px 6px 0 0;
}
.main_tab {
    padding: 12px 30px;
    padding-top: 24px;
    line-height: 20px;
    font-size: 14px;
    color: #16162e;
    border-bottom: 1px solid #f3f3f4;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
.tab_item.active {
    color: #ff6d6d;
}
.tab_item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.tab_item:not(:first-child) {
    margin-left: 40px;
}
.font-lg {
    font-size: 16px;
    line-height: 22px;
}
.good_card > div {
    display: flex;
    align-items: center;
}
.cart_goods {
    flex: 1 1 0%;
}
.cart_price {
    width: 146px;
    justify-content: center;
}
.cart_count {
    width: 72px;
    justify-content: center;
}
.good_card {
    position: relative;
    padding: 14px 0;
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
.main_title {
    display: flex;
    align-items: center;
    flex: 1;
    padding-top: 24px;
    line-height: 24px;
}
.order_card > div {
    background: #fff;
    padding-left: 30px;
    padding-right: 30px;
}
.title_icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    text-align: center;
    color: #ff6d6d;
    margin-right: 8px;
}
.text {
    line-height: 24px;
    font-size: 18px;
    font-weight: 700;
    color: #1e1f20;
}
.good_card + .good_card::after {
    content: "";
    position: absolute;
    left: 194px;
    right: 53px;
    top: 0;
    border-top: 1px solid #e7e7ea;
}
.red {
    color: #ff6d6d;
}
.order_card {
    min-height: 196px;
    font-size: 14px;
    line-height: 20px;
}
.order_card + .order_card {
    margin-top: 8px;
}
.order_body {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding-top: 24px;
    padding-bottom: 24px;
    display: flex;
    align-items: flex-start;
}
.good_list {
    flex: 1;
}
.order_item_col {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    text-align: center;
    min-height: 100px;
}
.order_fee {
    width: 146px;
    font-size: 16px;
    color: #9696a1;
    font-weight: 700;
}
.order_info {
    width: 132px;
    line-height: 24px;
}
.order_info > span {
    color: #519bde;
}
.good_card:first-child {
    padding-top: 0;
}
.good_card:last-child {
    padding-bottom: 0;
}
</style>
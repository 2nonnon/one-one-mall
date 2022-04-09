<template>
    <div class="loading">
        <div class="main_item">
            <div class="main_head">我的订单</div>
            <div class="main_tab">
                <div
                    class="tab_item"
                    :class="{ active: current === item.name }"
                    v-for="(item, index) in tabItems"
                    :key="index"
                    @click="handleChangeStatus(item)"
                >{{ item.name }}</div>
            </div>
        </div>
        <div class="cart_body" :class="{ 'order__list--empty': pages === 0 }">
            <div class="order_card" v-for="order in data" :key="order.id">
                <div class="main_title">
                    <div class="title_icon">M</div>
                    <div class="text">原神万有铺子</div>
                </div>
                <div class="order_body">
                    <div class="good_list">
                        <div class="good_card" v-for="item in order.orderDetails" :key="item.id">
                            <div class="cart_goods">
                                <div class="good_img">
                                    <img :src="`http://localhost:5091${item.cover_url}`" />
                                </div>
                                <div class="good_info">
                                    <div class="good_name">{{ item.name }}</div>
                                    <div class="good_attr">{{ item.attr }}</div>
                                </div>
                            </div>
                            <div class="cart_price">
                                <price
                                    :price="[item.market_price]"
                                    :has-fix="true"
                                    :cur-font="16"
                                    :num-font="16"
                                ></price>
                            </div>
                            <div class="cart_count font-lg">x{{ item.quantity }}</div>
                        </div>
                    </div>
                    <div class="order_item_col order_fee">
                        <price :price="[order.paid]" :has-fix="true" :cur-font="16" :num-font="16"></price>
                    </div>
                    <div class="order_item_col order_info">
                        <button type="button" class="order_info_btn button-m">付款</button>
                        <span @click="handleToOrderDetail(order.id)">订单详情</span>
                    </div>
                </div>
            </div>
            <div class="order__paginate-card" v-if="pages > 0">
                <div class="card__body">
                    <paginate
                        :total="total"
                        :page-size="pageSize"
                        :pages="pages"
                        :current-page="currentPage"
                        @page-change="handlePageChange"
                    ></paginate>
                </div>
            </div>
            <div class="empty--horizontal" v-else>
                <img
                    src="/Status/a6945b3ad80b13e7f43f8cea003d63f9_7131855251702464767.png"
                    alt="空"
                    class="empty__img"
                />
                <span class="empty__title">暂无订单</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Price from '@/components/Price/Price.vue'
import router from '@/router';
import { base } from '@/serve/base-http.service';
import { onMounted, reactive, ref, watch } from 'vue'
import Paginate from '@/components/Paginate/Paginate.vue';
import { useRoute } from 'vue-router';

enum OrderStatus {
    TO_PAID = 'TO_PAID',
    TO_SEND = 'TO_SEND',
    TO_DEAL = 'TO_DEAL',
    TO_SERVICE = 'TO_SERVICE',
    HAS_CLOSED = 'HAS_CLOSED',
}

interface TabItem {
    name: string,
    status?: OrderStatus
}

const tabItems = reactive<TabItem[]>([{ name: '全部订单' }, { name: '待付款', status: OrderStatus.TO_PAID }, { name: '待发货', status: OrderStatus.TO_SEND }, { name: '待收货', status: OrderStatus.TO_DEAL }])

const current = ref('全部订单')

const handleChangeStatus = (item: TabItem) => {
    current.value = item.name
    if (item.status) {
        router.push({
            path: '/user/order',
            query: {
                status: item.status
            }
        })
    } else {
        router.push({
            path: '/user/order'
        })
    }
}

interface OrderDetail {
    id: string;
    goodId: number;
    cover_url: string;
    name: string;
    attr: string;
    quantity: number;
    market_price: number;
    paid: number;
    status: OrderStatus;
    deal_time?: string;
}

interface Order {
    id: string;
    receive_info?: string;
    paid: number;
    status: OrderStatus;
    create_time: string;
    paid_time?: string;
    send_time?: string;
    deal_time?: string;
    orderDetails: OrderDetail[];
}
const data = reactive<Order[]>([])

const total = ref(0)
const pageSize = ref(10)
const pages = ref(1)
const currentPage = ref(1)

const handlePageChange = (next: number) => {
    currentPage.value = next
    load()
}

const handleToOrderDetail = (orderId: string) => {
    router.push({
        name: 'Order',
        params: {
            orderId
        }
    })
}

interface Option {
    current_page: number
    page_size: number
    status: OrderStatus
}

const route = useRoute()

const load = () => {
    const option = {} as Option
    option.current_page = currentPage.value
    option.page_size = pageSize.value
    if (route.query.status) option.status = route.query.status as OrderStatus
    base.post(`orders/page`, option).then((res) => {
        console.log('orders', res)
        total.value = res?.data.total
        pages.value = Math.ceil(res?.data.total / pageSize.value)
        console.log(pages.value)
        data.length = 0
        data.push(...res?.data.orders)
    })
}

watch(() => route.query, () => {
    load()
})

onMounted(() => {
    load()
    const status = route.query.status
    if (status) {
        tabItems.forEach((item) => {
            if (item.status === status) current.value = item.name
        })
    }
})
</script>

<style scoped>
.main_head {
    background: #fff;
    padding: 24px 30px;
    padding-bottom: 0;
    font-size: 18px;
    font-weight: 700;
    color: #1e1f20;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 6px 6px 0 0;
    line-height: 24px;
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
    cursor: pointer;
}
.tab_item:hover {
    color: #ff6d6d;
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
    cursor: pointer;
    color: #519bde;
}
.good_card:first-child {
    padding-top: 0;
}
.good_card:last-child {
    padding-bottom: 0;
}
.order_info_btn {
    color: #ff6d6d;
    margin-bottom: 8px;
    background-color: #fff;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    border: solid #ff6d6d;
    cursor: pointer;
}
.button-m {
    min-width: 102px;
    height: 40px;
    font-size: 16px;
    line-height: 22px;
    border-radius: 6px;
    border-width: 2px;
    padding: 0 10px;
    font-weight: 700;
}
.order__paginate-card {
    margin-top: 8px;
}
.card__body {
    padding: 20px;
    background: #fff;
    border-radius: 6px;
}
.order__list--empty {
    padding-top: 114px;
    min-height: 575px;
    background: #fff;
}
.empty--horizontal {
    display: flex;
    justify-content: center;
    align-items: center;
}
.empty__img {
    width: 176px;
    height: 160px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}
.empty__title {
    font-size: 16px;
    color: #9696a1;
    line-height: 22px;
}
</style>
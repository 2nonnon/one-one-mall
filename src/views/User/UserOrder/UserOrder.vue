<template>
    <div class="loading">
        <div class="main_item">
            <div class="main_head">我的订单</div>
            <div class="main_tab">
                <div class="tab_item" :class="{ active: current === item.name }" v-for="(item, index) in tabItems"
                    :key="index" @click="handleChangeStatus(item)">{{ item.name }}</div>
            </div>
        </div>
        <loading :is-loading="isLoading" style="min-height: 1000px;">
            <template v-slot>
                <div class="cart_body" :class="{ 'order__list--empty': pages === 0 }">
                    <div class="order_card" v-for="order in data" :key="order.id">
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
                        <div class="order_body">
                            <div class="good_list">
                                <div class="good_card" v-for="item in order.orderDetails" :key="item.id">
                                    <div class="cart_goods">
                                        <div class="good_img">
                                            <img :src="item.cover_url" />
                                        </div>
                                        <div class="good_info">
                                            <div class="good_name">{{ item.name }}</div>
                                            <div class="good_attr">{{ item.attr }}</div>
                                        </div>
                                    </div>
                                    <div class="cart_price">
                                        <price :price="[item.market_price]" :has-fix="true" :cur-font="16"
                                            :num-font="16"></price>
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
                            <paginate :total="total" :page-size="pageSize" :pages="pages" :current-page="currentPage"
                                @page-change="handlePageChange"></paginate>
                        </div>
                    </div>
                    <EmptyHorizontal src="/Status/a6945b3ad80b13e7f43f8cea003d63f9_7131855251702464767.png" title="暂无订单"
                        v-else></EmptyHorizontal>
                </div>
            </template>
        </loading>
    </div>
</template>

<script setup lang="ts">
import Price from '@/components/Price/Price.vue'
import Loading from '@/components/Loading/Loading.vue'
import EmptyHorizontal from '@/components/EmptyHorizontal/EmptyHorizontal.vue'
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

const isLoading = ref(true)
const route = useRoute()

const load = () => {
    isLoading.value = true
    const option = {} as Option
    option.current_page = currentPage.value
    option.page_size = pageSize.value
    if (route.query.status) option.status = route.query.status as OrderStatus
    base.post(`orders/page`, option).then((res) => {
        console.log('orders', res)
        isLoading.value = false
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

.good_card>div {
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

.order_card>div {
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

.good_card+.good_card::after {
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

.order_card+.order_card {
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

.order_info>span {
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
</style>
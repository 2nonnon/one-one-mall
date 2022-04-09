<template>
    <div class="order-detail__content">
        <h3 class="order-detail__title">订单详情</h3>
        <div class="loading-placeholder">
            <div class="order-detail__card order-detail__status">
                <div class="order-detail__status-title">待付款</div>
                <div class="steps">
                    <div class="progress-item progress-item--prev">
                        <div class="progress-item__progress">
                            <span class="progress-item__title">提交订单</span>
                            <span class="icon"></span>
                        </div>
                        <div class="progress-item__subtitle">{{ data.create_time }}</div>
                    </div>
                    <div class="progress-item progress-item--current">
                        <div class="progress-item__progress">
                            <span class="progress-item__title">付款</span>
                            <span class="icon"></span>
                        </div>
                        <div class="progress-item__subtitle">{{ data.paid_time }}</div>
                    </div>
                    <div class="progress-item progress-item--next">
                        <div class="progress-item__progress">
                            <span class="progress-item__title">发货</span>
                            <span class="icon"></span>
                        </div>
                        <div class="progress-item__subtitle">{{ data.send_time }}</div>
                    </div>
                    <div class="progress-item progress-item--next">
                        <div class="progress-item__progress">
                            <span class="progress-item__title">确认收货</span>
                            <span class="icon"></span>
                        </div>
                        <div class="progress-item__subtitle">{{ data.deal_time }}</div>
                    </div>
                </div>
            </div>
            <div class="order-detail__card order-detail__opt">
                <span class="order-detail__opt-no">订单号: {{data.id}}</span>
                <template v-if="data.status === OrderStatus.TO_PAID">
                    <span class="order-detail__opt-tip">待支付：</span>
                    <span class="order-detail__price">
                        <price :price="[data.paid]" :has-fix="true" :cur-font="18" :num-font="24"></price>
                    </span>
                    <button type="button" class="button--primary button-m buy">付款</button>
                    <button type="button" class="button--default button-m">取消订单</button>
                </template>
            </div>
            <div class="order-detail__card order-detail__goods">
                <div class="main_title">
                    <div class="title_icon">M</div>
                    <div class="text">原神万有铺子</div>
                </div>
                <div class="good_card" v-for="item in data.orderDetails" :key="item.id">
                    <div class="card_goods">
                        <div class="good_img">
                            <img :src="`http://localhost:5091${item.cover_url}`" />
                        </div>
                        <div class="good_info">
                            <div class="good_name">{{ item.name }}</div>
                            <div class="good_attr">{{ item.attr }}</div>
                        </div>
                    </div>
                    <div class="card_price">
                        <price
                            :price="[item.market_price]"
                            :has-fix="true"
                            :cur-font="16"
                            :num-font="16"
                        ></price>
                    </div>
                    <div class="card_count font-lg">x{{ item.quantity }}</div>
                    <div class="card_status">
                        <p class="ft-md">等待付款</p>
                    </div>
                </div>
                <div class="order-detail__goods-footer">
                    <div class="order-detail__goods-labels">
                        <p>运费：</p>
                        <p>需付款：</p>
                    </div>
                    <div class="order-detail__goods-prices">
                        <span class="price">
                            <price :price="[]" :has-fix="true" :cur-font="14" :num-font="14"></price>
                        </span>
                        <span class="price">
                            <price
                                :price="[data.paid]"
                                :has-fix="true"
                                :cur-font="18"
                                :num-font="18"
                            ></price>
                        </span>
                    </div>
                </div>
            </div>
            <div class="order-detail__card order-detail__footer">
                <div class="order-detail order-detail__footer-address">
                    <div class="order-detail__address-symbol">
                        <span class="icon"></span>
                        <span class="order-detail__address-symbol-tip">收货信息：</span>
                    </div>
                    <div class="order-detail__address-info">
                        <p class="order-detail__address">{{ data.receive_info }}</p>
                        <button
                            type="button"
                            class="order-detail__change-btn button button--primary button--s button--plain"
                        >修改地址</button>
                    </div>
                </div>
                <div class="order-detail__footer-title">
                    <span class="icon"></span>
                    <p class="order-detail__footer-title-tip">订单备注：</p>
                </div>
                <p class="order-detail__footer-comment">无</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Price from '@/components/Price/Price.vue'
import { base } from '@/serve/base-http.service';
import { onMounted, reactive, computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
import router from '@/router';

enum OrderStatus {
    TO_PAID = 'TO_PAID',
    TO_SEND = 'TO_SEND',
    TO_DEAL = 'TO_DEAL',
    TO_SERVICE = 'TO_SERVICE',
    HAS_CLOSED = 'HAS_CLOSED',
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
const data = reactive<Order>({} as Order)

const load = (id: string) => {
    base.get(`orders/${id}`).then((res) => {
        console.log(res)
        Object.assign(data, res?.data)
    })
}

onMounted(() => {
    const route = useRoute()
    load(route.params.orderId as string)
})
</script>

<style scoped>
.order-detail__content {
    width: 1260px;
    margin: 0 auto;
}
.order-detail__title {
    font-size: 18px;
    font-weight: bold;
    color: #1e1f20;
    line-height: 24px;
    margin: 12px 30px;
}
.loading-placeholder {
    min-height: 700px;
    position: relative;
}
.order-detail__card {
    background: #fff;
    border-radius: 6px;
}
.order-detail__card + .order-detail__card {
    margin-top: 8px;
}
.order-detail__status {
    padding: 24px 30px;
}
.order-detail__status-title {
    font-size: 18px;
    font-weight: bold;
    color: #ff6d6d;
    line-height: 24px;
    margin-bottom: 24px;
}
.steps {
    display: flex;
}
.progress-item {
    flex: 1 1;
}
.progress-item__progress {
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.progress-item:first-child .progress-item__progress {
    border-top-left-radius: 999rem;
    border-bottom-left-radius: 999rem;
}
.progress-item:last-child .progress-item__progress {
    border-top-right-radius: 999rem;
    border-bottom-right-radius: 999rem;
}
.progress-item__title {
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    margin-right: 5px;
}
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.progress-item__subtitle {
    font-size: 12px;
    color: #9696a1;
    line-height: 14px;
    margin-top: 6px;
    text-align: center;
}
.progress-item--prev .progress-item__progress {
    background-color: #60d99b;
}
.progress-item--current .progress-item__progress {
    background-color: #ffc562;
}
.progress-item--next .progress-item__progress {
    background-color: #f3f3f4;
    color: #9696a1;
}
.order-detail__opt {
    padding: 24px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.order-detail__opt-no {
    color: #9696a1;
    flex-grow: 1;
}
.order-detail__opt-tip {
    color: #16162e;
}
.order-detail__price {
    font-weight: bold;
    color: #ff6d6d;
    margin-right: 12px;
}
button {
    cursor: pointer;
    outline: none;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
}
.button--primary {
    color: #fff;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    border: solid #ff6d6d;
    background-color: #ff6d6d;
}
.button--default {
    color: #9696a1;
    border: solid #eff1f4;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    background-color: #fff;
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
.button--default:hover {
    color: #ff6d6d;
    border: 2px solid #ff6d6d;
}
button + button {
    margin-left: 12px;
}
.order-detail__goods {
    padding: 16px 30px 20px 30px;
}
.main_title {
    display: flex;
    align-items: center;
    flex: 1;
}
.title_icon {
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    text-align: center;
    color: #9696a1;
}
.text {
    font-size: 14px;
    margin-left: 8px;
}
.good_card + .good_card::after {
    content: "";
    position: absolute;
    left: 194px;
    right: 53px;
    top: 0;
    border-top: 1px solid #e7e7ea;
}
.good_card {
    position: relative;
    padding: 14px 0;
    display: flex;
}
.good_card::after {
    content: " ";
    position: absolute;
    bottom: 0;
    right: 0;
    left: 124px;
    height: 1px;
    background-color: #eff1f4;
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
    line-height: 20px;
    color: #9696a1;
}
.good_card > div {
    display: flex;
    align-items: center;
}
.card_goods {
    flex: 1 1 0%;
}
.card_price {
    width: 200px;
    justify-content: flex-start;
    font-weight: 700;
    color: #ff6d6d;
}
.card_count {
    width: 130px;
    justify-content: flex-start;
}
.card_status {
    width: 150px;
    justify-content: center;
}
.order-detail__goods-footer {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    line-height: 24px;
    margin-top: 20px;
}
.order-detail__goods-labels {
    font-size: 12px;
    color: #9696a1;
    margin-right: 7px;
}
.order-detail__goods-labels > p {
    text-align: right;
}
.order-detail__goods-prices {
    color: #ff6d6d;
    text-align: right;
    font-weight: bold;
}
.order-detail__footer {
    padding: 25px 30px 0 30px;
}
.order-detail {
    width: 100%;
    padding: 0;
    margin-bottom: 24px;
}
.order-detail__footer-address {
    padding-bottom: 6px;
}
.order-detail__address-symbol {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.order-detail__address-symbol-tip {
    margin-left: 8px;
    font-size: 16px;
    color: #9696a1;
    line-height: 22px;
}
.order-detail__address-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 9px 0 24px 0;
}
.order-detail__address {
    flex-grow: 1;
    color: #16162e;
}
.order-detail__change-btn {
    flex-shrink: 0;
    margin-left: 30px;
}
.button {
    cursor: pointer;
    outline: none;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
}
.button--primary {
    color: #fff;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    border: solid #ff6d6d;
    background-color: #ff6d6d;
}
.button--s {
    min-width: 52px;
    height: 32px;
    font-size: 14px;
    line-height: 20px;
    border-radius: 4px;
    border-width: 1px;
    padding: 0 10px;
}
.button--plain {
    background-color: #fff;
}
.button--primary.button--plain {
    color: #ff6d6d;
}
.order-detail__footer-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 9px;
}
.order-detail__footer-title-tip {
    font-size: 16px;
    color: #9696a1;
    line-height: 22px;
    margin-left: 8px;
}
.order-detail__footer-comment {
    font-size: 14px;
    color: #16162e;
    line-height: 20px;
    word-break: break-all;
    padding-bottom: 30px;
}
.price {
    white-space: nowrap;
}
.ft-md {
    font-size: 14px;
    line-height: 20px;
}
.buy {
    position: relative;
}
.buy::after {
    display: inline-block;
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    border: 3px solid rgba(255, 255, 255, 0);
    border-radius: 6px;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.buy:hover::after {
    opacity: 1;
}
</style>
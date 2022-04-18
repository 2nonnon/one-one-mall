<template>
  <div class="order-detail__content">
    <h3 class="order-detail__title">订单详情</h3>
    <loading :is-loading="isLoading" style="min-height: 700px">
      <template v-slot>
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
          <span class="order-detail__opt-no">订单号: {{ data.id }}</span>
          <template v-if="data.status === OrderStatus.TO_PAID">
            <span class="order-detail__opt-tip">待支付：</span>
            <span class="order-detail__price">
              <price
                :price="[data.paid]"
                :has-fix="true"
                :cur-font="18"
                :num-font="24"
              ></price>
            </span>
            <button type="button" class="button--primary button-m buy">
              付款
            </button>
            <button type="button" class="button--default button-m">
              取消订单
            </button>
          </template>
        </div>
        <div class="order-detail__card order-detail__goods">
          <div class="main_title">
            <div class="title_icon">
              <svg
                t="1649938974154"
                class="x-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="143600"
              >
                <path
                  d="M520.533333 597.333333c-46.933333 0-89.6-21.333333-153.6-64-102.4 72.533333-196.266667 76.8-264.533333 17.066667-21.333333-17.066667-38.4-42.666667-51.2-72.533333-8.533333-25.6-8.533333-64-4.266667-85.333334 4.266667-8.533333 12.8-42.666667 21.333334-59.733333 12.8-38.4 51.2-110.933333 89.6-187.733333C166.4 128 187.733333 85.333333 234.666667 85.333333h554.666666c46.933333 0 68.266667 42.666667 72.533334 59.733334 8.533333 17.066667 17.066667 29.866667 34.133333 72.533333 42.666667 89.6 59.733333 119.466667 68.266667 149.333333l4.266666 8.533334c8.533333 8.533333 12.8 21.333333 12.8 34.133333 0 21.333333-4.266667 42.666667-8.533333 55.466667-21.333333 42.666667-42.666667 72.533333-68.266667 93.866666-25.6 21.333333-55.466667 29.866667-85.333333 29.866667-46.933333 0-93.866667-21.333333-153.6-64-17.066667 21.333333-38.4 38.4-55.466667 51.2-34.133333 12.8-59.733333 21.333333-89.6 21.333333z m-153.6-170.666666l46.933334 34.133333c68.266667 46.933333 102.4 59.733333 140.8 38.4 12.8-8.533333 25.6-17.066667 38.4-34.133333l51.2-59.733334 64 46.933334c46.933333 34.133333 81.066667 46.933333 106.666666 46.933333 12.8 0 21.333333-4.266667 34.133334-12.8 12.8-8.533333 29.866667-29.866667 46.933333-59.733333v-17.066667-12.8c-12.8-21.333333-29.866667-55.466667-68.266667-140.8-21.333333-42.666667-29.866667-59.733333-38.4-72.533333-4.266667-4.266667-4.266667-8.533333-4.266666-8.533334H243.2s-4.266667 4.266667-8.533333 12.8C196.266667 256 157.866667 328.533333 145.066667 362.666667c-4.266667 17.066667-12.8 42.666667-17.066667 51.2v29.866666c8.533333 17.066667 17.066667 29.866667 29.866667 42.666667 38.4 34.133333 89.6 25.6 157.866666-21.333333l51.2-38.4zM793.6 947.2H230.4c-64 0-110.933333-55.466667-110.933333-119.466667v-157.866666c0-25.6 17.066667-42.666667 42.666666-42.666667s42.666667 17.066667 42.666667 42.666667v157.866666c0 21.333333 12.8 34.133333 25.6 34.133334h563.2c17.066667 0 29.866667-17.066667 29.866667-34.133334v-157.866666c0-25.6 17.066667-42.666667 42.666666-42.666667s42.666667 17.066667 42.666667 42.666667v157.866666c-4.266667 68.266667-51.2 119.466667-115.2 119.466667z"
                  p-id="143601"
                ></path>
                <path
                  d="M277.333333 281.6h469.333334c21.333333 0 38.4 17.066667 38.4 38.4s-17.066667 38.4-38.4 38.4h-469.333334c-21.333333 0-38.4-17.066667-38.4-38.4s17.066667-38.4 38.4-38.4z"
                  p-id="143602"
                ></path>
              </svg>
            </div>
            <div class="text">原神万有铺子</div>
          </div>
          <div
            class="good_card"
            v-for="item in data.orderDetails"
            :key="item.id"
          >
            <div class="card_goods">
              <div class="good_img">
                <img :src="item.cover_url" />
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
                <price
                  :price="[]"
                  :has-fix="true"
                  :cur-font="14"
                  :num-font="14"
                ></price>
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
              <span class="icon">
                <svg
                  t="1649939836045"
                  class="x-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="171845"
                >
                  <path
                    d="M512 1024c-8.533333 0-17.066667-4.266667-25.6-8.533333C469.333333 1002.666667 85.333333 725.333333 85.333333 418.133333 85.333333 187.733333 277.333333 0 512 0s426.666667 187.733333 426.666667 418.133333c0 307.2-384 588.8-401.066667 597.333334-8.533333 4.266667-17.066667 8.533333-25.6 8.533333z m0-938.666667C324.266667 85.333333 170.666667 234.666667 170.666667 418.133333c0 221.866667 260.266667 443.733333 341.333333 512 81.066667-64 341.333333-285.866667 341.333333-512C853.333333 234.666667 699.733333 85.333333 512 85.333333z"
                    p-id="171846"
                  ></path>
                  <path
                    d="M512 618.666667c-106.666667 0-192-85.333333-192-192s85.333333-192 192-192 192 85.333333 192 192-85.333333 192-192 192z m0-298.666667c-59.733333 0-106.666667 46.933333-106.666667 106.666667s46.933333 106.666667 106.666667 106.666666 106.666667-46.933333 106.666667-106.666666-46.933333-106.666667-106.666667-106.666667z"
                    p-id="171847"
                  ></path>
                </svg>
              </span>
              <span class="order-detail__address-symbol-tip">收货信息：</span>
            </div>
            <div class="order-detail__address-info">
              <p class="order-detail__address">{{ data.receive_info }}</p>
              <button
                type="button"
                class="order-detail__change-btn button button--primary button--s button--plain"
              >
                修改地址
              </button>
            </div>
          </div>
          <div class="order-detail__footer-title">
            <span class="icon">
              <svg
                t="1649939197191"
                class="x-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="155012"
              >
                <path
                  d="M1024 959c0 35.898-29.102 65-65 65H65c-35.898 0-65-29.102-65-65 0-35.898 29.102-65 65-65h894c35.898 0 65 29.102 65 65zM931.631 170.71L790.209 29.29C770.684 9.763 745.092 0 719.499 0s-51.185 9.763-70.71 29.29L127.534 550.543l0.004 0.004v281.375h284.323l0.003-0.023 519.767-519.767c39.053-39.052 39.053-102.369 0-141.422zM378.657 751.969H207.328V583.886l398.328-398.327 169.705 169.706-396.704 396.704z m496.406-496.406l-43.132 43.132L662.225 128.99l43.133-43.133C710.199 81.016 715.72 80 719.499 80s9.3 1.016 14.142 5.858l141.422 141.42c4.842 4.842 5.857 10.363 5.857 14.143 0 3.779-1.016 9.301-5.857 14.142z"
                  p-id="155013"
                ></path>
              </svg>
            </span>
            <p class="order-detail__footer-title-tip">订单备注：</p>
          </div>
          <p class="order-detail__footer-comment">无</p>
        </div>
      </template>
    </loading>
  </div>
</template>

<script setup lang="ts">
import Price from '@/components/Price/Price.vue'
import Loading from '@/components/Loading/Loading.vue'
import { base } from '@/serve/base-http.service'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

enum OrderStatus {
  TO_PAID = 'TO_PAID',
  TO_SEND = 'TO_SEND',
  TO_DEAL = 'TO_DEAL',
  TO_SERVICE = 'TO_SERVICE',
  HAS_CLOSED = 'HAS_CLOSED'
}

interface OrderDetail {
  id: string
  goodId: number
  cover_url: string
  name: string
  attr: string
  quantity: number
  market_price: number
  paid: number
  status: OrderStatus
  deal_time?: string
}

interface Order {
  id: string
  receive_info?: string
  paid: number
  status: OrderStatus
  create_time: string
  paid_time?: string
  send_time?: string
  deal_time?: string
  orderDetails: OrderDetail[]
}
const data = reactive<Order>({} as Order)
const isLoading = ref(true)
const load = (id: string) => {
  base.get(`orders/${id}`).then((res) => {
    console.log(res)
    isLoading.value = false
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

/* .loading-placeholder {
    min-height: 700px;
    position: relative;
} */
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
  color: #ff6d6d;
  font-size: 22px;
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
  content: '';
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
  content: ' ';
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
  content: '';
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

.x-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<template>
    <div class="order_confirm">
        <div class="page_title">确认订单</div>
        <div class="order_body">
            <div class="item_container">
                <div class="title">
                    <div class="address_icon">A</div>
                    <div class="title_text">收货地址</div>
                </div>
                <button class="select" v-if="hasAddress" @click="handleOpenChooseAddress">选择其他地址</button>
            </div>
            <div v-if="hasAddress">
                <div class="wrapper font-lg">
                    <span>{{ address.receiver }}</span>
                    <span>{{ `${address.mobile.slice(0, 3)}****${address.mobile.slice(7)}` }}</span>
                </div>
                <div class="font-lg address_info">{{ address.destination }}</div>
            </div>
            <div class="address_add font-lg" v-else  @click="handleOpenChooseAddress">
            <span>添加收货地址</span>
            </div>
        </div>
        <div class="order_body" v-if="data.id">
            <div class="item_container mb-16">
                <div class="title">
                    <div class="address_icon">H</div>
                    <div class="title_text">确认订单信息</div>
                </div>
            </div>
            <div>
                <div class="cart_head">
                    <div class="cart_goods">商品信息</div>
                    <div class="cart_price">单价</div>
                    <div class="cart_count">数量</div>
                    <div class="cart_total">小计</div>
                </div>
                <div class="main_title">
                    <div class="title_icon">M</div>
                    <div class="text">原神万有铺子</div>
                </div>
                <div>
                    <div class="good_card" v-for="item in data.orderDetails" :key="item.id">
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
                        <div class="cart_total red">
                            <price
                                :price="[item.paid]"
                                :has-fix="true"
                                :cur-font="16"
                                :num-font="16"
                            ></price>
                        </div>
                    </div>
                </div>
                <div class="order_remark">
                    <span class="remark_title">订单备注</span>
                    <div class="remark_box">
                        <textarea
                            rows="3"
                            label="备注"
                            maxlength="500"
                            showwordlimit="true"
                            placeholder="选填"
                            row="3"
                            class="remark_text"
                        ></textarea>
                    </div>
                    <div class="other_info">
                        <div class="info_row">
                            <div class="row_label">店铺优惠券：</div>
                            <div class="row_value">
                                <span class="value_text">暂无可用优惠券</span>
                            </div>
                        </div>
                        <div class="info_row">
                            <div class="row_label">运费：</div>
                            <div class="row_value red">
                                <price :price="[0]" :has-fix="true" :cur-font="14" :num-font="14"></price>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
            </div>
            <div class="confirm_foot">
                <div class="info_row">
                    <div class="row_label">总计：</div>
                    <div class="row_value red">
                        <price :price="[data.paid]" :has-fix="true" :cur-font="18" :num-font="18"></price>
                    </div>
                </div>
                <div class="mt-20 text-right" v-if="hasAddress">
                    <div class="truncate">
                        <span class="text-patch">寄送至</span>
                        <span>{{ address.receiver }} {{ `${address.mobile.slice(0, 3)}****${address.mobile.slice(7)}` }}</span>
                    </div>
                    <div>{{ address.destination }}</div>
                </div>
                <div class="mt-12">
                    <button class="buy" :disabled="!hasAddress" @click="handleSettle">提交订单</button>
                </div>
            </div>
        </div>
    </div>
    <ChooseAddressDialog @close-address="handleCloseChooseAddress" @choose-address="handleChooseAddress" v-if="showChooseAddressDialog"></ChooseAddressDialog>
</template>

<script lang="ts">
export default { name: 'OrderConfirm' }
</script>

<script setup lang="ts">
import Price from '@/components/Price/Price.vue'
import ChooseAddressDialog from '@/components/ChooseAddressDialog/ChooseAddressDialog.vue'
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

enum AddressIsDefault {
    IsDefault = 1,
    IsNotDefaylt = 0,
}

interface Address {
    id: string
    receiver: string
    mobile: string
    destination: string
    remark: string
    isDefault: AddressIsDefault
}

const showChooseAddressDialog = ref(false)

const handleOpenChooseAddress = () => {
    showChooseAddressDialog.value = true
}
const handleCloseChooseAddress = () => {
    showChooseAddressDialog.value = false
}

const address = reactive<Address>({} as Address)
const hasAddress = computed(() => Boolean(address.id))

const getDefaultAddress = () => {
    base.get('addresses/default').then((res) => {
        Object.assign(address, res?.data)
    })
}

const handleChooseAddress = (data: Address) => {
    console.log('choose address', data)
    Object.assign(address, data)
}

const handleSettle = () => {
    base.patch(`orders/${data.id}`, {
        receive_info: data.receive_info,
        status: OrderStatus.TO_PAID
    }).then(res => {
        console.log('settle', res)
        router.replace({
            name: 'User'
        })
    })
}

const load = (id: string) => {
    base.get(`orders/${id}`).then((res) => {
        console.log(res)
        Object.assign(data, res?.data)
    })
}

watchEffect(() => {
    data.receive_info = `${address.receiver} ${address.mobile} ${address.destination}`
})

onMounted(() => {
    const route = useRoute()
    load(route.params.orderId as string)
    getDefaultAddress()
})
</script>

<style scoped>
.order_confirm {
    padding-top: 12px;
    margin: 0 auto;
    width: 1260px;
    padding-bottom: 24px;
}
.page_title {
    padding-left: 30px;
    margin-bottom: 12px;
    color: #1e1f20;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
}
.order_body {
    margin-bottom: 8px;
    border-radius: 6px;
    background-color: #fff;
    padding: 24px 30px;
}
.item_container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.title {
    display: flex;
    align-items: center;
}
.address_icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 24px;
    color: #ff6d6d;
}
.title_text {
    margin-left: 12px;
    color: #1e1f20;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
}
.select {
    cursor: pointer;
    outline: none;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid #ff6d6d;
    min-width: 52px;
    height: 32px;
    font-size: 14px;
    line-height: 20px;
    border-radius: 4px;
    padding: 0 10px;
    color: #ff6d6d;
    background-color: #fff;
}
.wrapper {
    display: flex;
}
.wrapper > span + span {
    margin-left: 12px;
}
.font-lg {
    font-size: 16px;
    line-height: 22px;
}
.address_info {
    color: #9696a1;
    margin-top: 8px;
}
.address_add {
    position: relative;
    height: 62px;
    line-height: 62px;
    border: 1px solid #eff1f4;
    padding-left: 58px;
    color: #519bde;
    cursor: pointer;
}
.address_add::before,
.address_add::after {
    content: "";
    position: absolute;
    left: 36px;
    top: 50%;
    margin-top: -6px;
    width: 2px;
    background-color: #519bde;
    height: 12px;
}
.address_add::before {
    transform: rotate(90deg);
}
.mb-16 {
    margin-bottom: 16px;
}

.cart_head {
    border-radius: 6px;
    text-align: center;
    background-color: #fff;
    display: flex;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 22px;
    color: #9696a1;
}
.cart_head > div,
.good_card > div {
    display: flex;
    align-items: center;
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
.good_attr {
    width: 350px;
    font-size: 14px;
    color: #9696a1;
}
.main_title {
    display: flex;
    align-items: center;
    flex: 1;
}
.title_icon {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    text-align: center;
    color: #9696a1;
}
.text {
    line-height: 22px;
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
.order_remark {
    display: flex;
    margin-top: 20px;
}
.remark_title {
    margin-right: 12px;
    font-size: 16px;
    line-height: 22px;
    color: #9696a1;
}
.remark_box {
    border: 1px solid #eff1f4;
    padding: 6px 12px;
    border-radius: 6px;
}
.remark_text {
    width: 560px;
    border: 0;
    font-size: inherit;
    color: inherit;
}
.remark_text:focus {
    outline: none;
}
.other_info {
    margin-left: auto;
}
.info_row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.row_label {
    position: relative;
    font-size: 14px;
    line-height: 20px;
    color: #9696a1;
}
.row_value {
    font-weight: 700;
    text-align: right;
    min-width: 116px;
}
.row_value .price > span {
    font-size: 14px;
}
.confirm_foot .row_value .price > span {
    font-size: 18px;
}
.value_text {
    color: #9696a1;
    font-weight: 400;
}
.red {
    color: #ff6d6d;
}
.info_row + .info_row {
    margin-top: 4px;
}
.divider {
    height: 1px;
    background-color: #eff1f4;
    margin-top: 24px;
    margin-bottom: 12px;
}
.confirm_foot {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    padding-top: 30px;
}
.mt-12 {
    margin-top: 12px;
}
.mt-20 {
    margin-top: 20px;
}
.text-right {
    text-align: right;
}
.truncate {
    overflow: hidden;
    white-space: nowrap;
}
.text-patch {
    color: #9696a1;
}
button.buy {
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
.buy:hover:not(:disabled)::after {
    opacity: 1;
}
button:disabled {
    color: #c5c5cb;
    background-color: #f3f3f4;
    border-color: #f3f3f4;
    cursor: not-allowed;
}
</style>
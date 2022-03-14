<template>
    <div class="order_confirm">
        <div class="page_title">确认订单</div>
        <div class="order_body">
            <div class="item_container">
                <div class="title">
                    <div class="address_icon">A</div>
                    <div class="title_text">收货地址</div>
                </div>
                <button class="select">选择其他地址</button>
            </div>
            <div>
                <div class="wrapper font-lg">
                    <span>秋叶春海</span>
                    <span>166****1825</span>
                </div>
                <div class="font-lg address_info">辽宁省大连市甘井子区轻工苑1号大连工业大学</div>
            </div>
        </div>
        <div class="order_body">
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
                    <div class="good_card">
                        <div class="cart_goods">
                            <div class="good_img">
                                <img
                                    src="/ShopList/1528e043a2cd396f884128ac2962c1fb_5817809896503403958.jpeg"
                                />
                            </div>
                            <div class="good_info">
                                <div class="good_name">【原神】线下店系列周边 鼠标垫 Genshin</div>
                                <div class="good_attr">甘雨-璃月港的一夜</div>
                            </div>
                        </div>
                        <div class="cart_price">
                            <div class="price">
                                <span class="currency">¥</span>
                                <span class="integer">66</span>
                                <span class="decimal">.00</span>
                            </div>
                        </div>
                        <div class="cart_count font-lg">x1</div>
                        <div class="cart_total">
                            <div class="price" style="color: #ff6d6d;">
                                <span class="currency">¥</span>
                                <span class="integer">66</span>
                                <span class="decimal">.00</span>
                            </div>
                        </div>
                    </div>
                    <div class="good_card">
                        <div class="cart_goods">
                            <div class="good_img">
                                <img
                                    src="/ShopList/1528e043a2cd396f884128ac2962c1fb_5817809896503403958.jpeg"
                                />
                            </div>
                            <div class="good_info">
                                <div class="good_name">【原神】线下店系列周边 鼠标垫 Genshin</div>
                                <div class="good_attr">甘雨-璃月港的一夜</div>
                            </div>
                        </div>
                        <div class="cart_price">
                            <div class="price">
                                <span class="currency">¥</span>
                                <span class="integer">66</span>
                                <span class="decimal">.00</span>
                            </div>
                        </div>
                        <div class="cart_count font-lg">x1</div>
                        <div class="cart_total">
                            <div class="price" style="color: #ff6d6d;">
                                <span class="currency">¥</span>
                                <span class="integer">66</span>
                                <span class="decimal">.00</span>
                            </div>
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
                                <div class="price">
                                    <span class="currency">¥</span>
                                    <span class="integer">66</span>
                                    <span class="decimal">.00</span>
                                </div>
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
                        <div class="price">
                            <span class="currency">¥</span>
                            <span class="integer">66</span>
                            <span class="decimal">.00</span>
                        </div>
                    </div>
                </div>
                <div class="mt-20 text-right">
                    <div class="truncate">
                        <span class="text-patch">寄送至 </span>
                        <span>秋叶春海 166****1825</span>
                    </div>
                    <div>辽宁省大连市甘井子区轻工苑1号大连工业大学</div>
                </div>
                <div class="mt-12">
                    <button class="buy">提交订单</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute()

console.log(route)

onBeforeRouteUpdate((to, from) => {
    console.log(to, from)
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
.price {
    font-size: 16px;
}
.currency {
    padding-right: 2px;
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
.buy:hover::after {
    opacity: 1;
}
</style>
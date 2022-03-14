<template>
    <div class="goods_content">
        <breadcrumb></breadcrumb>
        <div class="order_panel">
            <div class="order_item order_active">新上市</div>
            <div class="order_item">畅销</div>
            <div class="order_item">价格</div>
        </div>
        <div class="goods_list">
            <div class="container">
                <template v-for="i in 40" :key="i">
                    <div class="good_card" @click="handleToDetail">
                        <div class="good_img">
                            <img
                                src="/ShopList/1ac56689afc06dc536d686f9b3e1daf4_3468461440685667644.jpeg"
                            />
                        </div>
                        <div class="good_info">
                            <div class="good_title">
                                <div class="good_status">
                                    <img
                                        src="/Status/52a332d5a64c66bd3471f5ed39c35868_7340073586395887667.png"
                                    />
                                </div>【原神】花语青风-蒙德主题系列服饰卫衣运动裤 Genshin
                            </div>
                            <div class="price">
                                <span class="unit">￥</span>
                                <span class="value">88</span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="paginate">
                <div class="paginate_nav">&lt;</div>
                <div class="paginate_item page_active">1</div>
                <div class="paginate_nav">&gt;</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import Breadcrumb from '../Breadcrumb/Breadcrumb.vue'

const handleToDetail = ():void => {
    router.push({
        name: 'Detail'
    })
}
</script>

<style scoped>
.goods_content {
    width: 1260px;
    margin: 0 auto;
}

.order_panel {
    font-size: 14px;
    font-weight: 400;
    color: #16162e;
    height: 64px;
    line-height: 64px;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    margin-bottom: 8px;
}
.order_item {
    position: relative;
    padding: 0 30px;
    transition: all 150ms ease-in;
    cursor: pointer;
}
.order_active {
    color: #ff6d6d;
}
.order_item:not(:first-child)::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 1px;
    height: 12px;
    background: #eff1f4;
    transform: translateY(-50%);
}
.goods_list {
    padding: 24px 30px;
    border-radius: 6px;
    background-color: #fff;
}
.container {
    padding-top: 6px;
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
.good_card {
    flex-shrink: 0;
    margin: 24px 24px 0 0;
    background: #fff;
    color: #16162e;
    width: 282px;
    border: 1px solid #f3f3f4;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1),
        -webkit-box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}
.good_card:hover {
    box-shadow: 0 0 8px 2px #eff1f4;
}
.good_card:nth-child(-n + 4) {
    margin-top: 0;
}
.good_card:nth-child(4n) {
    margin-right: 0;
}
.good_img {
    width: 280px;
    height: 280px;
    position: relative;
}
img {
    width: 100%;
    height: 100%;
}
.good_info {
    border-top: 1px solid #f3f3f4;
    padding: 16px 20px 20px;
}
.good_title {
    color: #16162e;
    height: 44px;
    line-height: 22px;
    font-size: 16px;
    word-break: break-all;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.good_status {
    display: inline-block;
    width: 48px;
    height: 18px;
    vertical-align: -2px;
}
.price {
    margin-top: 13px;
    height: 32px;
    color: #ff6d6d;
    font-weight: 700;
    line-height: 32px;
    font-size: 24px;
}
.unit {
    font-size: 18px;
    padding-right: 2px;
}
.paginate {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
}
.paginate > * + * {
    margin-left: 16px;
}
.paginate_item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    color: #16162e;
    background: #fff;
    border: 1px solid #c5c5cb;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.245s;
}
.page_active {
    color: #fff;
    background: #ff6d6d;
    border-color: #ff6d6d;
}
</style>
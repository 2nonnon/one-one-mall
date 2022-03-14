<template>
    <div class="user">
        <breadcrumb></breadcrumb>
        <div class="user_info">
            <div class="info_container">
                <img src="/Header/profile.png" class="avator" />
                <div class="info_content">
                    <div class="info_name">秋葉春海</div>
                    <div class="info_uid">AID: 158835580</div>
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
                    <div class="nagivate_card"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
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
.tab_item.active{
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
</style>
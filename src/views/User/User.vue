<template>
    <div class="user">
        <breadcrumb default-text="个人中心"></breadcrumb>
        <div class="user_info">
            <div class="info_container">
                <img src="/Header/avatar40017.webp" class="avator" />
                <div class="info_content">
                    <div class="info_name">{{ userInfo.username }}</div>
                    <div class="info_uid">AID: {{ userInfo.id }}</div>
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
                        <div
                            class="nav_item"
                            :class="{active: item.path === currentPath}"
                            v-for="item in navItems"
                            :key="item.path"
                            @click="handleChangeSubView(item.path)"
                        >
                            <div class="nav_icon">G</div>
                            {{item.name}}
                        </div>
                        <div class="nav_item">
                            <div class="nav_icon">G</div>地址管理
                        </div>
                    </div>
                </div>
            </div>
            <div class="user_main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue'
import { base } from '@/serve/base-http.service';
import { onMounted, reactive, ref } from 'vue'

interface NavItem {
    name: string
    path: string
}

const navItems = reactive<NavItem[]>([{ name: '我的订单', path: '/order' }, { name: '退款售后', path: '/service' }, { name: '优惠券', path: '/coupon' }])
const currentPath = ref('/order')

const handleChangeSubView = (path: string) => {
    console.log(path)
}

interface user {
    username: string
    id: string
}

const userInfo = reactive<user>({
    username: '',
    id: ''
})

const getUserInfo = () => {
    base.get('users').then((res) => {
        console.log('user', res)
        Object.assign(userInfo, res?.data)
    })
}

onMounted(() => {
    getUserInfo()
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
.nav_item:hover {
    color: #ff6d6d;
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
</style>
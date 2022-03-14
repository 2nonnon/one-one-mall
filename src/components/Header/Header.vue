<template>
    <header class="navbar">
        <div class="navbar_container">
            <div class="info">
                <div class="brand" @click="handleToHome">
                    <img
                        src="/Header/2cac505fff45659450cb223041e7eb5c_1539795377150607708.png"
                        alt="米游铺"
                    />
                </div>
                <div class="divider"></div>
                <div class="shop_icon" @click="handleToHome">
                    <img
                        src="/Header/6fc386b329c4b3726cc011c7a0ac85f5_3901303110715729633.png"
                        alt="原神"
                    />
                </div>
                <div class="shop_name" @click="handleToHome">万有铺子</div>
            </div>
            <div class="func">
                <div class="search">
                    <input type="text" />
                    <div class="search_icon">O</div>
                </div>
                <div class="user">
                    <div class="profile">
                        <img src="/Header/profile.png" alt="原神" />
                    </div>
                    <div class="menu">
                        <div class="menu_item" @click="handleToUser">
                            <div class="icon">R</div>
                            <div class="text">个人中心</div>
                        </div>
                        <div class="menu_item">
                            <div class="icon">R</div>
                            <div class="text">退出登录</div>
                        </div>
                    </div>
                </div>
                <div class="cart" @click="handleToCart">
                    <div class="cart_icon">O</div>
                    <div class="cart_text">购物车</div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import router from '@/router';

const handleToUser = ():void => {
    router.push({
        name: 'User'
    })
}
const handleToCart = ():void => {
    router.push({
        name: 'Cart'
    })
}
const handleToHome = ():void => {
    router.push({
        name: 'Home'
    })
}
</script>

<style scoped>
.navbar {
    position: sticky;
    top: 0;
    z-index: 11;
    min-width: 1260px;
    height: 5rem;
    background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
    font-size: 14px;
}
.navbar_container {
    margin: 0 auto;
    width: 1260px;
    height: 100%;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.info {
    display: flex;
    align-items: center;
}
.brand {
    height: 82px;
    width: 99px;
}
.shop_icon {
    height: 82px;
    width: 82px;
    margin-right: 20px;
}
img {
    width: 100%;
    height: 100%;
}
.divider {
    width: 3px;
    height: 22px;
    background: #f1f1f1;
    border-radius: 2px;
    margin: 18px;
}
.func {
    display: flex;
    align-items: center;
}
.search {
    margin-right: 30px;
    margin-top: -4px;
    display: flex;
}
.search input {
    width: 190px;
    border-radius: 6px 0 0 6px;
    padding: 10px;
    height: 40px;
    caret-color: #ff6d6d;
    border: 1px solid #e7e7ea;
    border-right-width: 0;
    font-size: 14px;
    line-height: 20px;
    color: #16162e;
    transition: all 0.4s;
}
input:focus {
    outline: 0;
}
.search_icon {
    height: 40px;
    width: 40px;
    background-color: #f8f8f8;
    border-radius: 0px 6px 6px 0px;
    color: #9696a1;
    border: 1px solid #e7e7ea;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
}
.search input:hover,
.search input:hover + .search_icon {
    border-color: #9696a1;
}
.search input:focus {
    width: 450px;
    border-color: #9696a1;
}
.search input:focus + .search_icon {
    border-top-color: #9696a1;
    border-right-color: #9696a1;
    border-bottom-color: #9696a1;
}
.user {
    height: 68px;
    margin-right: 24px;
    position: relative;
    display: flex;
    align-items: center;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.user:hover .menu {
    display: block;
}
.menu {
    left: -44px;
    bottom: 0px;
    display: none;
    color: #2f3f56;
    position: absolute;
    z-index: 9;
    background: #fff;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #eff1f4;
    transform: translateY(100%);
}
.menu_item {
    display: flex;
    align-items: center;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    padding: 0 11px;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border-radius: 8px;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.menu_item:hover {
    color: #ff6d6d;
    background-color: rgba(255, 109, 109, 0.1);
}
.icon {
    color: rgb(150, 150, 161);
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    margin-right: 8px;
}
.menu_item:hover .icon {
    color: #ff6d6d;
}
.text {
    flex: 1;
}
.profile {
    width: 32px;
    height: 32px;
}
.cart {
    display: flex;
    justify-content: center;
}
.cart_icon {
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cart_text {
    height: 24px;
    color: #9696a1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
}
</style>
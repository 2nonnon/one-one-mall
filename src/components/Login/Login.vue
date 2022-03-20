<template>
    <div class="dialog_container" v-if="isLogin">
        <div class="dialog_content">
            <div class="dialog_login">
                <img src="/Login/logo.png" class="logo" />
                <img src="/Login/close_icon.png" class="close_icon" @click="handleClose" />
                <div class="tabs">
                    <div class="tab_item">验证码登录</div>
                    <div class="tab_item active">密码登录</div>
                </div>
                <form class="login_form">
                    <div class="form_input">
                        <div class="input_container">
                            <input
                                type="text"
                                placeholder="手机号/邮箱"
                                @blur="handleBlurA"
                                v-model="loginForm.account"
                            />
                        </div>
                        <p class="error_text" v-if="isEmptyA">*内容不能为空</p>
                    </div>
                    <div class="form_input">
                        <div class="input_container">
                            <input
                                type="password"
                                placeholder="密码"
                                @blur="handleBlurP"
                                v-model="loginForm.password"
                            />
                        </div>
                        <p class="error_text" v-if="isEmptyP">*密码不能为空</p>
                    </div>
                    <div class="form_button">
                        <button type="submit" @click.prevent="handleLogin">登录</button>
                    </div>
                </form>
                <div class="register_bar">
                    <span class="to_register" @click="handleToReg">立即注册</span>
                </div>
            </div>
            <div class="login_error" v-if="isError">{{ errorText }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import request from '@/serve/request';
import { emitter } from '../../util/emitter'
import { ref, reactive } from 'vue'

const isEmptyA = ref(false)
const isEmptyP = ref(false)
const isError = ref(false)
const isLogin = ref(false)
const errorText = ref('账号或密码错误')

emitter.on('toLogin', (flag: boolean) => {
    isLogin.value = flag
})

interface form {
    [propName: string]: string
}
const loginForm = reactive<form>({
    account: '',
    password: ''
})

const handleBlurA = () => {
    if (loginForm.account === '') isEmptyA.value = true
    else isEmptyA.value = false
}
const handleBlurP = () => {
    if (loginForm.password === '') isEmptyP.value = true
    else isEmptyP.value = false
}
const handleClose = () => {
    isLogin.value = false
}
const trigError = (msg: string) => {
    errorText.value = msg
    isError.value = true
    setTimeout(() => {
        isError.value = false
    }, 1000)
}
const handleLogin = () => {
    request.post('/user/login', loginForm).then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = res
        if (data.code === '0') {
            sessionStorage.setItem('user', JSON.stringify(data.data))
            emitter.emit('logined')
            handleClose()
        } else {
            trigError(data.msg)
        }
    })
}
const handleToReg = () => {
    console.log('=======注册========')
}
</script>

<style scoped>
.dialog_container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, miui, Helvetica, Arial,
        sans-serif;
    color: #3c4044;
}
.dialog_content {
    width: 450px;
}
.dialog_login {
    padding: 30px 40px 50px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    margin-top: 58px;
}
.logo {
    width: 107px;
    height: 38px;
    position: absolute;
    top: -58px;
    left: 0;
    right: 0;
    margin: auto;
}
.close_icon {
    width: 16px;
    height: 16px;
    margin: 10px;
    cursor: pointer;
    top: 5px;
    right: 5px;
    padding: 5px;
    position: absolute;
    box-sizing: content-box;
}
.tabs {
    display: flex;
    width: 100%;
    font-size: 18px;
    border-bottom: 1px solid #f6f6f6;
    position: relative;
    color: #7f858a;
}
.tab_item {
    text-align: center;
    padding: 10px;
    cursor: pointer;
    display: inline-block;
    flex: 1;
    position: relative;
}

.tab_item.active {
    font-weight: 700;
    color: #3c4044;
}
.tab_item.active::before {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    border-radius: 2px;
    background-color: #ff6d6d;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
}
.form_input {
    padding-top: 15px;
    font-size: 12px;
    position: relative;
}
.form_input:first-child {
    margin-top: 10px;
}
.input_container {
    display: flex;
    position: relative;
    border-radius: 6px;
    border: 1px solid #ebebeb;
}
.input_container:focus {
    border: 1px solid #c7c7c7;
}
.input_container input {
    position: relative;
    flex: 1;
    border: none;
    min-width: 0;
    width: 100%;
    color: #3c4044;
    padding: 10px 12px;
    background-color: transparent;
    outline: none;
    line-height: 26px;
    font-size: 16px;
}
.error_text {
    color: #f96149;
    font-size: 12px;
    line-height: 22px;
}
.form_button {
    margin-top: 26px;
}
.form_button button {
    display: block;
    width: 100%;
    border: 1px solid #ff6d6d;
    border-radius: 6px;
    background-color: #ff6d6d;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    outline: none;
    line-height: 48px;
    font-size: 18px;
    cursor: pointer;
}
.register_bar {
    font-size: 16px;
    margin-top: 12px;
    text-align: end;
}
.to_register {
    cursor: pointer;
    color: #7f858a;
}
.login_error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    padding: 10px;
    font-size: 16px;
    background-color: #919396;
    border-radius: 6px;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<template>
    <div class="login_body">
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
                        v-model="loginForm.username"
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
</template>

<script setup lang="ts">
import { emitter } from '@/util/emitter'
import { ref, reactive, defineEmits } from 'vue'
import { base } from '@/serve/base-http.service'

const isEmptyA = ref(false)
const isEmptyP = ref(false)
const errorText = ref('账号或密码错误')
const emit = defineEmits(['to-register', 'login-failed'])

interface form {
    [propName: string]: string
}
const loginForm = reactive<form>({
    username: '',
    password: ''
})

const handleBlurA = () => {
    if (loginForm.username === '') isEmptyA.value = true
    else isEmptyA.value = false
}
const handleBlurP = () => {
    if (loginForm.password === '') isEmptyP.value = true
    else isEmptyP.value = false
}

const handleLogin = () => {
    base.post('auth/signin', loginForm).then((res) => {
        console.log(res)
        if (res?.data.accessToken) {
            base.saveToken(res?.data.accessToken)
            emitter.emit('logined')
        } else {
            emit('login-failed', errorText.value)
        }
    })
}
const handleToReg = () => {
    emit('to-register')
}
</script>

<style scoped>
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
</style>
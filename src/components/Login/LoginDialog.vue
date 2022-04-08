<template>
    <div class="dialog_container" v-if="isLogin">
        <div class="dialog_content">
            <div class="dialog_login">
                <img src="/Login/logo.png" class="logo" />
                <img src="/Login/close_icon.png" class="close_icon" @click="handleClose" />
                <LoginBody v-if="LR" @login-failed="handleFailed" @to-register="handleToReg"></LoginBody>
                <RegisterBody v-else></RegisterBody>
            </div>
            <div class="login_error" v-if="isError">{{ errorText }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { emitter } from '../../util/emitter'
import { ref } from 'vue'
import LoginBody from './DialogBody/Login/LoginBody.vue'
import RegisterBody from './DialogBody/Register/RegisterBody.vue'

const LR = ref(true)
const isError = ref(false)
const isLogin = ref(false)
const errorText = ref('')

const handleFailed = (msg: string) => {
    errorText.value = msg
    isError.value = true
    setTimeout(() => {
        isError.value = false
    }, 1000)
}
const handleClose = () => {
    isLogin.value = false
    LR.value = true
}
const handleToReg = () => {
    LR.value = !LR.value
}

emitter.on('toLogin', (flag: boolean) => {
    isLogin.value = flag
})
emitter.on('logined', () => {
    handleClose()
})
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
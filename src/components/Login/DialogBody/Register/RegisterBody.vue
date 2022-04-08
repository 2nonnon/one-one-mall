<template>
    <div class="login_body">
        <div class="tabs">
            <div class="tab_item active">注册账号</div>
        </div>
        <form class="login_form">
            <div class="form_input">
                <div class="input_container">
                    <input
                        type="text"
                        placeholder="用户名"
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
            <div class="form_input">
                <div class="input_container">
                    <input
                        type="password"
                        placeholder="确认密码"
                        @blur="handleBlurC"
                        v-model="confirmPasswod"
                    />
                </div>
                <p class="error_text" v-if="isEmptyC">{{ confirmTip }}</p>
            </div>
            <div class="form_button">
                <button type="submit" @click.prevent="handleRegister" :disabled="isDisabled">注册</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { emitter } from '@/util/emitter'
import { ref, reactive, defineEmits } from 'vue'
import { base } from '@/serve/base-http.service'

const isEmptyA = ref(false)
const isEmptyP = ref(false)
const isEmptyC = ref(false)
const isDisabled = ref(true)
const errorText = ref('账号或密码错误')
const confirmTip = ref('*密码不能为空')
const confirmPasswod = ref('')
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
const handleBlurC = () => {
    if (confirmPasswod.value === '') {
        isEmptyP.value = true
        confirmTip.value = '*密码不能为空'
    } else if (loginForm.password !== confirmPasswod.value) {
        isEmptyP.value = true
        confirmTip.value = '*两次密码不相同'
    }
    else {
        isEmptyP.value = false
        isDisabled.value = false
    }
}

const handleRegister = () => {
    base.post('auth/signup', loginForm).then((res) => {
        console.log('signup', res)
        if (res?.data.accessToken) {
            base.saveToken(res?.data.accessToken)
            emitter.emit('logined')
        } else {
            emit('login-failed', errorText.value)
        }
    })
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
.form_button button:disabled {
    color: #c5c5cb;
    background-color: #f3f3f4;
    border-color: #f3f3f4;
    cursor: not-allowed;
}
</style>
<template>
  <div class="login_body">
    <div class="tabs">
      <div class="tab_item active">注册账号</div>
    </div>
    <form class="login_form">
      <div class="form_input" v-for="(item, i) in registerForm" :key="i">
        <div class="input_container">
          <input
            :type="item.type"
            :placeholder="item.title"
            @blur="handleBlur(item)"
            v-model="item.content"
          />
        </div>
        <p class="error_text" v-if="!item.isValidate">{{ item.tipText }}</p>
      </div>
      <div class="form_button">
        <button type="submit" @click.prevent="handleRegister">注册</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits } from "vue";
import { base } from "@/serve/base-http.service";

const emit = defineEmits(["register-success", "register-failed"]);

enum Tips {
  LOGIN_SUCCESS = "登录成功",
  LOGIN_FAILED = "账号或密码错误",
  REGISTER_SUCCESS = "注册成功",
  USERNAME_EMPTY = "*用户名不能为空",
  PASSWORD_EMPTY = "*密码不能为空",
  CONFIRM_EMPTY = "*确认密码不能为空",
  USERNAME_ERROR = "*用户名长度应大于4小于20",
  PASSWORD_ERROR = "*密码长度应大于6小于16",
  CONFIRM_ERROR = "*两次输入的密码不相同",
}

interface IFormItem {
  title: string;
  content: string;
  tipText: Tips;
  type: string;
  validate: () => boolean;
  isValidate: boolean;
}

interface IRegisterForm {
  username: IFormItem;
  password: IFormItem;
  confirmPassword: IFormItem;
}

const registerForm = reactive<IRegisterForm>({
  username: {
    title: "用户名",
    content: "",
    type: "text",
    tipText: Tips.USERNAME_EMPTY,
    validate: usernameValiFunc,
    isValidate: true,
  },
  password: {
    title: "密码",
    content: "",
    type: "password",
    tipText: Tips.PASSWORD_EMPTY,
    validate: passwordValiFunc,
    isValidate: true,
  },
  confirmPassword: {
    title: "确认密码",
    content: "",
    type: "password",
    tipText: Tips.CONFIRM_EMPTY,
    validate: confirmValiFunc,
    isValidate: true,
  },
});

function usernameValiFunc(this: IFormItem) {
  let res = false;
  if (this.content === "") {
    this.tipText = Tips.USERNAME_EMPTY;
    this.isValidate = false;
  } else {
    if (this.content.length <= 4 || this.content.length >= 20) {
      this.tipText = Tips.USERNAME_ERROR;
      this.isValidate = false;
    } else {
      this.isValidate = true;
      res = true;
    }
  }
  return res;
}
function passwordValiFunc(this: IFormItem) {
  let res = false;
  if (this.content === "") {
    this.tipText = Tips.PASSWORD_EMPTY;
    this.isValidate = false;
  } else {
    if (this.content.length <= 6 || this.content.length >= 16) {
      this.tipText = Tips.PASSWORD_ERROR;
      this.isValidate = false;
    } else {
      this.isValidate = true;
      res = true;
    }
  }
  return res;
}
function confirmValiFunc(this: IFormItem) {
  let res = false;
  if (this.content === "") {
    this.tipText = Tips.CONFIRM_EMPTY;
    this.isValidate = false;
  } else {
    if (this.content !== registerForm.password.content) {
      this.tipText = Tips.CONFIRM_ERROR;
      this.isValidate = false;
    } else {
      this.isValidate = true;
      res = true;
    }
  }

  return res;
}

const handleBlur = (item: IFormItem) => {
  item.validate();
};

const validation = (): boolean => {
  return Object.values(registerForm).every((item) => item.validate());
};

const handleRegister = () => {
  if (validation()) {
    const form = {
      username: registerForm.username.content,
      password: registerForm.password.content,
    };
    base.post("auth/signup", form).then((res) => {
      console.log("signup", res);
      if (res?.status === 201) {
        emit("register-success", Tips.REGISTER_SUCCESS);
      } else {
        emit("register-failed", res?.data);
      }
    });
  }
};
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

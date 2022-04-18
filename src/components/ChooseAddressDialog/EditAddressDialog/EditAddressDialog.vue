<template>
  <div class="address-wrapper">
    <div class="address-header">
      <div class="address-title">
        {{ isEdit ? '编辑收货地址' : '新增收货地址' }}
      </div>
      <img
        src="/Address/close.png"
        alt="关闭"
        class="address-close-icon"
        @click="handleClose"
      />
    </div>
    <div class="address-form">
      <div class="address-field">
        <div class="address-key">收货人</div>
        <div class="address-value">
          <div class="address-input">
            <input
              type="text"
              placeholder="请填写收货人姓名"
              class="input"
              v-model="address.receiver"
            />
          </div>
        </div>
      </div>
      <div class="address-field">
        <div class="address-key">选择地区</div>
        <div class="address-value">
          <div class="address-city-picker">
            <div class="address-dropdown-menu">
              <input
                type="text"
                placeholder="省份"
                class="input"
                v-model="location.province"
              />
            </div>
            <div class="address-dropdown-menu">
              <input
                type="text"
                placeholder="城市"
                class="input"
                v-model="location.city"
              />
            </div>
            <div class="address-dropdown-menu">
              <input
                type="text"
                placeholder="区县"
                class="input"
                v-model="location.town"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="address-field">
        <div class="address-key">详细地址</div>
        <div class="address-value">
          <div class="address-input">
            <input
              type="text"
              placeholder="街道、楼牌号等"
              class="input"
              v-model="location.detail"
            />
          </div>
        </div>
      </div>
      <div class="address-field mb35">
        <div class="address-key">手机号码</div>
        <div class="address-value">
          <div class="address-input">
            <input
              type="text"
              placeholder="请填写收货人手机号"
              class="input"
              v-model="address.mobile"
            />
          </div>
        </div>
      </div>
      <div class="address-field">
        <div class="address-key">默认选择</div>
        <div class="address-value radio" @click="hanldeToggleDefault">
          <div
            class="address-radio"
            :class="{ active: address.isDefault }"
          ></div>
          <div class="address-radio-text">设为默认地址</div>
        </div>
      </div>
    </div>
    <div class="address-button-wrapper">
      <div class="address-button line" v-if="isEdit">
        <div class="address-button-text" @click="handleDeleteAddress">
          删除地址
        </div>
      </div>
      <div class="address-button" :class="{ disabled: !isValidate }">
        <div class="address-button-text" @click="handleSaveAddress">
          保存地址
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { base } from '@/serve/base-http.service'
import { computed, onMounted, reactive, watchEffect } from 'vue'

interface Address {
  id: string
  receiver: string
  mobile: string
  destination: string
  remark: string
  isChoosed: boolean
  isDefault: boolean
}

enum EditStatus {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

interface Props {
  id?: string
  status: EditStatus
}

const props = defineProps<Props>()
const isEdit = computed(() => {
  return props.status === EditStatus.UPDATE
})

const address = reactive<Address>({
  id: '',
  receiver: '',
  mobile: '',
  destination: '',
  remark: '',
  isChoosed: false,
  isDefault: false
})

const isValidate = computed(() => {
  return address.destination && address.receiver && address.mobile
})

interface Location {
  province: string
  city: string
  town: string
  detail: string
}

const location = reactive<Location>({} as Location)

const emit = defineEmits(['close-edit', 'close-address'])

const handleClose = () => {
  emit('close-edit')
}
const hanldeToggleDefault = () => {
  address.isDefault = !address.isDefault
}
const handleDeleteAddress = () => {
  base.delete(`addresses/${props.id}`).then((res) => {
    console.log('delete', res)
    handleClose()
  })
}
interface AddressDto {
  receiver: string
  mobile: string
  destination: string
  isDefault: boolean
}
const policies = {
  [EditStatus.CREATE]: (data: AddressDto) => {
    base.post('addresses', data).then((res) => {
      console.log('create address', res)
      handleClose()
    })
  },
  [EditStatus.UPDATE]: (data: AddressDto) => {
    base.patch(`addresses/${address.id}`, data).then((res) => {
      console.log('update address', res)
      handleClose()
    })
  }
}
const handleSaveAddress = () => {
  const data: AddressDto = {
    receiver: address.receiver,
    mobile: address.mobile,
    destination: address.destination,
    isDefault: address.isDefault
  }
  policies[props.status](data)
}
const initLocation = () => {
  const tmp = address.destination.split(' ')
  if (tmp?.length === 4) {
    location.province = tmp[0]
    location.city = tmp[1]
    location.town = tmp[2]
    location.detail = tmp[3]
  }
}
watchEffect(() => {
  address.destination = Object.values(location).join(' ')
})
onMounted(() => {
  if (props.id) {
    base.get(`addresses/${props.id}`).then((res) => {
      Object.assign(address, res?.data)
      initLocation()
    })
  }
})
</script>

<style scoped>
.address-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 700px;
  height: 519px;
  background-color: #fff;
  border-radius: 16px;
}
.address-header {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 25px;
  margin-bottom: 28px;
}
.address-title {
  font-size: 20px;
  font-family: MicrosoftYaHei, sans-serif;
  color: #1e1f20;
  line-height: 28px;
}
.address-close-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 28px;
  top: 28px;
}
.address-form {
  height: 343px;
  padding: 0 40px;
}
.address-field {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: MicrosoftYaHei, sans-serif;
  color: #333;
  line-height: 14px;
}
.address-key {
  flex-shrink: 0;
  width: 76px;
}
.address-value {
  flex: 1;
}
.address-input {
  position: relative;
  z-index: 20;
}
.input {
  border: 1px solid #e6e6e6;
  padding: 0 20px;
  height: 48px;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  color: #333;
  outline: none;
  font: inherit;
}
.input::placeholder {
  color: #ccc;
}
.input:focus {
  border-color: #ff6d6d;
}
.address-city-picker {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.address-dropdown-menu {
  width: 168px;
  height: 48px;
  border-radius: 4px;
  /* border: 1px solid #e6e6e6; */
  position: relative;
  z-index: 1000;
  cursor: pointer;
}
.radio {
  display: flex;
  align-items: center;
}
.address-radio {
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10px;
}
.address-radio.active {
  background: #fff;
  border: 5px solid #ff6d6d;
}
.address-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-button {
  background-color: #ff6d6d;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  width: 180px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.address-button.disabled {
  background-color: #f1f1f1;
  cursor: not-allowed;
}
.address-button.line {
  border: 1px solid #ff6d6d;
  background-color: #fff;
  margin-right: 20px;
}
.address-button-text {
  font-size: 16px;
  font-family: MicrosoftYaHei, sans-serif;
  color: #fff;
  line-height: 20px;
}
.address-button.line .address-button-text {
  color: #ff6d6d;
}
.mb35 {
  margin-bottom: 35px;
}
</style>

<template>
    <div class="goods_content">
        <breadcrumb></breadcrumb>
        <order-panel></order-panel>
        <div class="goods_list">
            <div class="container">
                <template v-for="item in goods" :key="item.id">
                    <div class="good_card" @click="handleToDetail">
                        <div class="good_img">
                            <img :src="item.coverUrl" />
                        </div>
                        <div class="good_info">
                            <div class="good_title">
                                <div class="good_status" v-if="item.tag">
                                    <img :src="status[item.tag]" />
                                </div>
                                &nbsp;{{ item.name }}
                            </div>
                            <div class="price_wrapper">
                                <price :price="[item.price]"></price>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <paginate
                :total="total"
                :page-size="pageSize"
                :pages="pages"
                :current-page="currentPage"
                @page-change="handlePageChange"
            ></paginate>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import Breadcrumb from '../Breadcrumb/Breadcrumb.vue'
import OrderPanel from '../OrderPanel/OrderPanel.vue'
import Price from '../Price/Price.vue'
import Paginate from '../Paginate/Paginate.vue'
import request from '@/serve/request';
import { ref, Ref, reactive, inject, watchEffect, onMounted } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router'

interface good {
    coverUrl: string
    goodsId: string
    id: number
    isSoldOut: number
    marketPrice: number
    name: string
    price: number
    saleTime: string
    tag: number
}

const total = ref(0)
const pageSize = ref(40)
const pages = ref(1)
const currentPage = ref(1)

const search = ref('')

const goods = reactive<good[]>([])

const status: string[] = ['', '/Status/b62a22805ff37997c816cb91984d71be_1387051523058128219.png', '', '/Status/52a332d5a64c66bd3471f5ed39c35868_7340073586395887667.png']

const currentCategory = inject<Ref<string>>('currentCategory', ref<string>('全部商品'))

watchEffect(() => {
    console.log(currentCategory.value)
})

const load = () => {
    request.get('/goods', {
        params: {
            pageSize: pageSize.value,
            pageNum: currentPage.value,
            search: search.value
        }
    }).then(res => {
        total.value = res.data.total
        pages.value = res.data.pages
        goods.length = 0
        goods.push(...res.data.records)
        console.log(res);
    })
}

const handlePageChange = (next: number) => {
    currentPage.value = next
    load()
}

const handleToDetail = (): void => {
    router.push({
        name: 'Detail'
    })
}

onMounted(() => {
    load()
})

onBeforeRouteUpdate((to) => {
    console.log('route update ', to.params.search)
})
</script>

<style scoped>
.goods_content {
    width: 1260px;
    margin: 0 auto;
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
    cursor: pointer;
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
.price_wrapper {
    margin-top: 13px;
    line-height: 32px;
}
</style>
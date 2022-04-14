<template>
    <div class="goods_content">
        <breadcrumb default-text="全部商品"></breadcrumb>
        <sort-panel></sort-panel>
        <div class="goods_list">
            <loading :is-loading="isLoading" :class="{ 'loading-active': isLoading }">
                <template v-slot>
                    <div class="container">
                        <template v-for="item in goods" :key="item.id">
                            <div class="good_card" @click="handleToDetail(item.id)">
                                <div class="good_img">
                                    <img :data-src="item.cover_url" v-lazyload="'/Status/default.svg'" />
                                </div>
                                <div class="good_info">
                                    <div class="good_title">
                                        <div class="good_status" v-if="item.tag">
                                            <img :src="status[item.tag]" />
                                        </div>
                                        {{ item.name }}
                                    </div>
                                    <div class="price_wrapper">
                                        <price :price="[item.price]"></price>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="mt-24" v-if="pages > 0">
                        <paginate :total="total" :page-size="pageSize" :pages="pages" :current-page="currentPage"
                            @page-change="handlePageChange"></paginate>
                    </div>
                    <EmptyHorizontal src="/Status/f5f2cc4fe8253c706d0f69dd7ba23326_5226366700752376093.png"
                        title="没有找到相关商品" v-else></EmptyHorizontal>
                </template>
            </loading>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '../../../router';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.vue'
import SortPanel from '../../../components/SortPanel/SortPanel.vue'
import Price from '../../../components/Price/Price.vue'
import Paginate from '../../../components/Paginate/Paginate.vue'
import Loading from '../../../components/Loading/Loading.vue'
import EmptyHorizontal from '../../../components/EmptyHorizontal/EmptyHorizontal.vue'
import { ref, reactive, onMounted, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { base } from '../../../serve/base-http.service';

const isLoading = ref(true)

interface good {
    cover_url: string
    id: number
    total_stock: number
    market_price: number
    name: string
    price: number
    sale_time: string
    tag: number
}

const total = ref(0)
const pageSize = ref(40)
const pages = ref(1)
const currentPage = ref(1)

const goods = reactive<good[]>([])

const status: string[] = ['', '/Status/b62a22805ff37997c816cb91984d71be_1387051523058128219.png', '', '/Status/52a332d5a64c66bd3471f5ed39c35868_7340073586395887667.png']

interface Option {
    search?: string;
    current_page: number;
    page_size: number;
    category?: string;
    sort?: Sort;
}
const route = useRoute()
const load = () => {
    isLoading.value = true
    const option = {} as Option
    if (route.query.page) currentPage.value = parseInt(route.query.page as string, 10)
    option.current_page = currentPage.value
    option.page_size = pageSize.value
    option.sort = Sort.TIME
    if (route.query.search) option.search = route.query.search as string
    if (route.query.sort) option.sort = route.query.sort as Sort
    if (route.query.categoryId) option.category = route.query.categoryId as string
    base.post('goods', option).then((res) => {
        console.log(option.sort, res);
        total.value = res?.data.total
        pages.value = Math.ceil(res?.data.total / pageSize.value)
        goods.length = 0
        goods.push(...res?.data.goods)
    }).finally(() => {
        isLoading.value = false
    })
}
enum Sort {
    TIME = 'time',
    SOLED = 'soled',
    PRICE = 'price',
    PRICE_DES = '-price',
}

const handlePageChange = (next: number) => {
    const query = Object.assign({ page: next }, route.query)
    query.page = next
    router.push({
        path: '/main',
        query: query
    })
}

const handleToDetail = (id: number): void => {
    console.log(id)
    router.push({
        name: 'GoodDetail',
        params: {
            id
        }
    })
}

onMounted(() => {
    load()
})

watch(() => route.query, () => {
    load()
})

onBeforeRouteUpdate(() => {
    currentPage.value = 1
})
</script>

<style scoped>
.loading-active {
    min-height: 4380px;
}

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
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
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
    color: #ff6d6d;
    font-weight: 700;
}

.mt-24 {
    margin-top: 24px;
}
</style>
<template>
    <van-row>
        <div class="product-list">
            <!-- 可滑动的全表格 -->
            <div class="table-scroll-container" ref="tableScrollBox">
                <table class="table-scroll" border="0" cellpadding="0" cellspacing="0" :style="{ width: tableWidth }">
                    <tbody class="tbody">
                        <tr class="title-tr">
                            <th class="ta-c" v-for="(item,index) in headData" :key="index" :class="{ 'first-col': index == 0 }">
                                {{ item.name }}
                                <van-icon name="info" v-if="item.isInfo" @click="onInfo(item)" />
                                <span class="sort" v-if="item.isSort" @click="onSort(item)">
                                    <van-icon class="up" :class="{ active: item.SortType == 'Asc' }" name="play" />
                                    <van-icon class="down" :class="{ active: item.SortType == 'Desc' }" name="play" />
                                </span>
                            </th>
                        </tr>
                        <template v-if="bodyData.length > 0 && !tdSlot">
                            <tr class="tbody-content" v-for="(item, index) in bodyData" :key="index">
                                <td
                                    class="info-box" 
                                    v-for="(colItem, colIndex) in headData" 
                                    v-if="colItem.prop"
                                    :class="[{ 'first-col clearfix': colIndex == 0 },colItem.class]">
                                        {{ item[colItem.prop] }}
                                </td>

                                <td class="operation" :key="colIndex" v-else @click.stop.capture="doThis($event, item, index)">
                                    <slot></slot>
                                </td>
                            </tr>
                        </template>
                        <template v-if="bodyData.length > 0 && tdSlot">
                            <slot></slot>
                        </template>
                    </tbody>
                </table>
            </div>
            <!-- 覆盖的左侧表格 -->
            <div class="table-left-container" v-if="isTableLeft">
                <table class="table-left" :class="{ 'norem-table-fixed-left': isLeft }" border="0" cellpadding="0" cellspacing="0">
                    <tbody class="tbody">
                        <tr class="title-tr">
                            <th class="first-col">{{ headData[0].name }}</th>
                        </tr>
                        <template>
                            <tr class="tbody-content" v-for="(item, index) in bodyData" :key="index">
                                <td class="info-box" v-if="headData[0].prop">{{ item[headData[0].prop] }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="arrow" v-if="bodyData.length != 0 && !arrow_left"></div>

        <!-- 无数据 -->
        <div class="no_data" style="top: 54%;" v-if="bodyData.length == 0">
            <img src="../assets/img/no_data.png">
            <p>还没有任何{{ noDataText }}</p>
        </div>
    </van-row>
</template>

<script>
    export default {
        props: {
            headData: {
                type: Array,
                default: () => []
            },
            bodyData: {
                type: Array,
                default: () => []
            },
            noDataText: {
                type: String,
                default: () => ''
            },
            isTableLeft: {
                type: Boolean,
                default: () => true
            },
            tableWidth: {
                type: String,
                default: () => ''
            },
            tdSlot: {
                type: Boolean,
                default: () => false
            },
            arrow_left: {
                type: Boolean,
                default: () => false
            }
        },
        data() {
            return {
                isLeft: false,
            };
        },
        methods: {
            doThis(e, item, index) {
                console.log(item)
                this.$emit(e.target.dataset.func, item)
            },
            onInfo(item){
                this.$emit(item.id)
            },
            // 排序
            onSort(item){
                for(var i = 0; i < this.headData.length; i++){
                    if(this.headData[i].prop != item.prop){
                        this.headData[i].SortType = ''
                    }
                }

                if(item.SortType == ''){
                    item.SortType = 'Asc'
                }else if(item.SortType == 'Asc'){
                    item.SortType = 'Desc'
                }else{
                    item.SortType = ''
                }
                this.$emit('goSort', item)
            }
        },
        mounted() {
            this.$refs.tableScrollBox.addEventListener(
                "scroll",
                () => {
                    this.$refs.tableScrollBox.scrollLeft
                    if(this.$refs.tableScrollBox.scrollLeft > 0){
                        this.isLeft = true;
                    }else{
                        this.isLeft = false;
                    }
                },
                true
            );
        },
    };
</script>

<style scoped lang="less">
    .arrow {
        display: block;
        width: 10px;
        height: 10px;
        position: fixed;
        top: 50%;
        right: 0;
        margin-left: -11px;
        border: 3px solid transparent;
        border-top: 3px solid @primary_color;
        border-left: 3px solid @primary_color;
        z-index: 99;
        opacity: .8;
        transform: rotate(313deg);
        animation: arrow 1.5s infinite ease-in-out;
    }
    
    @keyframes arrow {
        0% {
            opacity:0.2;
            transform:translate(0, 0px) rotate(313deg)
        }
        50% {
            opacity:1;
            transform:translate(-5px, 0) rotate(313deg)
        }
        100% {
            opacity:0.2;
            transform:translate(-10px, 0) rotate(313deg)
        }
    }
</style>
<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { mapPathToMenu } from '@/utils/map-menus'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const router = useRouter()
const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}

const route = useRoute()
const defaultActive = computed(() => {
  return mapPathToMenu(route.path, userMenus).id + ''
})
</script>

<template>
  <div class="main-menu">
    <!-- 1. logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">Liwenyu-CMS</h2>
    </div>
    <!-- 2. menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="String(subitem.id)" @click="handleItemClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 13px 8px 13px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 5px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
    margin-left: 10px;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>

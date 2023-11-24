/**
* 左边菜单
*/
<template>
  <!--  background-color="#304156"-->
  <!--    active-background-color="#304156"-->
  <div>
    <el-menu
        :default-active="route.meta.index"
        :collapse="collapsed"
        collapse-transition
        router
        class="el-menu-vertical-demo"
        background-color="var(--l-header-bg)"
        active-background-color="var(--l-header-bg)"
        text-color="#ffffff"
        active-text-color="#247af3">
      <div v-if="menuTitle" class="menu-nav-title">
        {{ menuTitle }}
      </div>
      <div v-for="menu in allmenu" :key="menu.id">
        <el-sub-menu v-if="menu.hasChildren" :index="menu.text" :key="menu.id">
          <template #title>
            <el-icon v-if="menu.attributes.icon!==''">
              <component :is="menu.attributes.icon"/>
            </el-icon>
            <span>{{ menu.text }}</span>
          </template>
          <el-menu-item-group v-if="menu.hasChildren">
            <el-menu-item v-for="chmenu in menu.children" :index="'/'+chmenu.attributes.url" :key="chmenu.id">
              <el-icon>
                <component :is="chmenu.attributes.icon?chmenu.attributes.icon:'Menu'"/>
              </el-icon>
              <!--            <span v-else style="height: 1em;width: 1em;"></span>-->
              <span>{{ chmenu.text }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="'/'+menu.attributes.url" :key="menu.id">
          <el-icon v-if="menu.attributes.icon!==''">
            <component :is="menu.attributes.icon"/>
          </el-icon>
          <span>{{ menu.text }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script setup>
import {uniqueId} from 'lodash'
import {systemTree} from "@/utils/menuTree.js"
import {ref, reactive} from 'vue'
import {watch} from 'vue'
import {useRoute} from 'vue-router'
import {useStore, mapActions} from 'vuex'

import {getCurrentInstance} from 'vue'

const instance = getCurrentInstance()

const route = useRoute()
const store = useStore()

const collapsed = ref(false)
const allmenu = reactive([])
const menuTitle = ''

getMenu()

instance.appContext.config.globalProperties.$Bus.on("toggle", value => {
  collapsed.value = !value;
})

function getMenu() {
  //加载menutree文件的静态菜单，启用动态后这一段要注释掉
  // console.log(11111,systemTree)
  allmenu.push(...systemTree)
}

const supplementPath = (menu) => {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('ly-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

const {handleOpen2} = mapActions(['editableTabs'])

watch(() => route, (to, from) => {
  if (store.getters.isAuthenticated) {
    getMenu()
  }
})

</script>
<style lang="scss" scoped>

.el-menu.el-menu--horizontal {
  border-bottom: 0;
}

.menu-nav-title {
  height: 56px;
  line-height: 56px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
  background: #eff6ff;
  color: var(--el-color-primary);
  border-bottom: 1px solid #c9e0ff;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}

.el-menu-vertical-demo {
  i {
    margin-right: 5px;
    font-size: 18px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}

::v-deep(.el-menu-item-group__title) {
  padding: 0px !important;
}

.el-menu-item.is-active {
  position: relative;
  //background-color: #0091E3;
  //text-color: #ffffff;
  background-color: var(--l-main-sidebar-menu-active-bg) !important;

  &:before {
    width: 2px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: var(--l-main-sidebar-menu-hover-bg);
    display: block;
  }
}

.el-menu-bg {
  background-color: #1f2d3d !important;
}

.el-menu {
  border: none;
  overflow: hidden;

}

.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 10px 0px;
}

.logoimg {
  /*height: 40px;*/
}

.router-link-active {
  color: #ffd04b;
}

.aside span {
  display: none;
}

.el-menu--collapse {
  ::v-deep(.el-sub-menu__icon-arrow) {
    display: none !important;
  }
}

.el-sub-menu {
  /*width: 180px;*/
  width: 100%
}
</style>

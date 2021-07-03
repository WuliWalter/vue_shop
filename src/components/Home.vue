<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle_menu" @click="toggleMenu()">|||</div>
        <el-menu
          :default-active="currentIndex"
          background-color="#313743"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="fontIcon[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + childItem.path"
              v-for="childItem in item.children"
              :key="childItem.id"
              @click="getIndex('/' + childItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ childItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenuData } from '../network/home'
export default {
  data() {
    return {
      menuList: [],
      fontIcon: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      currentIndex: ''
    }
  },
  created() {
    this.getMenuList()
    this.currentIndex = window.sessionStorage.getItem('currentIndex')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },

    // 获取所有菜单
    async getMenuList() {
      const { data: res } = await getMenuData()
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // console.log(this.menuList)
    },

    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },

    getIndex(currentIndex) {
      window.sessionStorage.setItem('currentIndex', currentIndex)
      this.currentIndex = currentIndex
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #363d3f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  padding-left: 0;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 20px;
  }
}
.el-aside {
  background-color: #313743;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #e9edf0;
}
.toggle_menu {
  background-color: #4a5064;
  font-size: 12px;
  color: #fff;
  letter-spacing: 5px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
</style>

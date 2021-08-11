<template>
  <el-container>
    <el-container>
      <el-aside width="200px">
        <el-menu
          mode="vertical"
          style="height: 100vh"
          :default-active="$route.path"
          router
        >
          <el-submenu
            v-for="(item, index) in menu.item"
            :index="String(index + 1)"
            :key="`menu-item-${index}`"
          >
            <template slot="title">{{ item.title }}</template>
            <el-menu-item
              v-for="(subItem, subIndex) in item.item"
              :index="subItem.path"
              :key="`menu-item-${index}-${subIndex}`"
            >
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container direction="vertical">
        <el-header class="head">
          <h1>steppyplus后台管理</h1>
          <div class="name">{{ user.username }}</div>
          <div class="out" @click="out()">退出</div>
        </el-header>
        <el-main height="">
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      menu: {
        item: [
          {
            title: "内容管理",
            item: [
              { title: "首页", path: "/" },
              { title: "资源管理", path: "/resource/list" },
              { title: "视频管理", path: "/media/list" },
              { title: "文章管理", path: "/articles/list" },
              { title: "文章分类管理", path: "/category/list" },
            ],
          },
          {
            title: "移动端内容管理",
            item: [{ title: "轮播图", path: "/carousel/list" }],
          },
          {
            title: "运营管理",
            item: [
              { title: "用户管理", path: "/users/list" },
              { title: "管理员", path: "/adminuser/list" },
            ],
          },
        ],
      },
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("auth/user");
      this.user = res.data;
    },
    out() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
}
.head h1 {
  flex-grow: 2;
}
.head div {
  margin-right: 4px;
}
.out:hover {
  cursor: pointer;
}
</style>

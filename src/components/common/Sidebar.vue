<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
            <template v-for="menu in menus">
                <!-- 包含子菜单的一级菜单-->
                <template v-if="menu.subMenus">
                    <el-submenu :index="menu.url" :key="menu.url">
                        <template slot="title">
                            <i :class="menu.icon"></i>{{ menu.title }}
                        </template>
                        <template v-for="subMenu in menu.subMenus">
                            <!-- 包含子菜单的二级菜单 -->
                            <template v-if="subMenu.subMenus">
                                <el-submenu :key="subMenu.url" :index="subMenu.url">
                                    <template slot="title">
                                        <i :class="subMenu.icon"></i>{{ subMenu.title }}
                                    </template>
                                    <template v-for="subSubMenu in subMenu.subMenus">
                                        <!-- 包含子菜单的三级菜单 -->
                                        <template v-if="subSubMenu.subMenus">
                                            <el-submenu :index="subSubMenu.url" :key="subSubMenu.url" :title="subSubMenu.title">
                                                <template slot="title">
                                                    <i :class="subSubMenu.icon"></i>{{ subSubMenu.title }}
                                                </template>
                                                <!-- 四级菜单 -->
                                                <el-menu-item v-for="item in subSubMenu.subMenus" :index="item.url" :key="item.url">
                                                    {{ item.title }}
                                                </el-menu-item>
                                            </el-submenu>
                                        </template>
                                        <!-- 无子菜单的三级菜单 -->
                                        <template v-else>
                                            <el-menu-item :index="subSubMenu.url" :key="subSubMenu.url">
                                                {{ subSubMenu.title }}
                                            </el-menu-item>
                                        </template>
                                    </template>
                                </el-submenu>
                            </template>
                            <!-- 无子菜单的二级菜单 -->
                            <template v-else>
                                <el-menu-item :index="subMenu.url" :key="subMenu.url">
                                    <i :class="subMenu.icon"></i>{{ subMenu.title }}
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <!-- 无子菜单的一级菜单-->
                <template v-else>
                    <el-menu-item :index="menu.url" :key="menu.url">
                        <i :class="menu.icon"></i>{{ menu.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menus: []
        }
    },
    created () {
        const self = this
        let userId = localStorage.getItem('userId')
        let input = { 'userId': userId }
        self.$http
            .post('/eops/menu/get_user_menus', input)
            .then(function (response) {
                let pkgOut = response.data
                let menuArray = pkgOut.data
                if (menuArray != null && menuArray.length > 0) {
                    for (let index = 0; index < menuArray.length; index++) {
                        const element = menuArray[index];
                        if (element.deep == 0) {
                            let node = {}
                            node.id = element.id
                            node.menuCode = element.menuCode
                            node.title = element.title
                            node.fatherCode = element.fatherCode
                            node.rootCode = element.rootCode
                            node.deep = element.deep
                            node.seq = element.seq
                            node.url = element.url
                            node.icon = element.icon
                            node.state = element.state
                            //构造菜单树的子树
                            node.subMenus = self.getSubMenus(node, menuArray)
                            self.menus.push(node)
                        }
                    }
                }
            })
            .catch(function (err) {
                console.log(err)
                self.$alert(err, '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
            })
    },
    computed: {
        onRoutes () {
            let index = this.$route.path
            let crumbs = this.getCrumbs(this.menus, index)
            this.$emit('transferCrumb', crumbs)
            return index
        }
    },
    methods: {
        getCrumbs (menus, index) {
            let crumbs = []
            for (let i = 0; i < menus.length; i++) {
                const menu = menus[i]
                let flag = false
                if (menu.subMenus != undefined && menu.subMenus.length > 0) {
                    for (let j = 0; j < menu.subMenus.length; j++) {
                        const subMenu = menu.subMenus[j]
                        if (subMenu.itemGroups != undefined && subMenu.itemGroups.length > 0) {
                            for (let k = 0; k < subMenu.itemGroups.length; k++) {
                                const itemGroup = subMenu.itemGroups[k]
                                if (itemGroup.items != undefined && itemGroup.items.length > 0) {
                                    for (let l = 0; l < itemGroup.items.length; l++) {
                                        const item = itemGroup.items[l]
                                        if (item.url == index) {
                                            crumbs = [item].concat(crumbs)
                                            flag = true
                                            break
                                        }
                                    }
                                }
                                if (flag || itemGroup.url == index) {
                                    crumbs = [itemGroup].concat(crumbs)
                                    flag = true
                                    break
                                }
                            }
                        }
                        if (flag || subMenu.url == index) {
                            crumbs = [subMenu].concat(crumbs)
                            flag = true
                            break
                        }
                    }
                }
                if (flag || menu.url == index) {
                    crumbs = [menu].concat(crumbs)
                    break
                }
            }
            return crumbs
        },
        getSubMenus (node, menuArray) {
            let subArray = null
            if (menuArray != null && menuArray.length > 0) {
                for (let index = 0; index < menuArray.length; index++) {
                    const element = menuArray[index];
                    if (node.menuCode == element.fatherCode) {
                        let item = {}
                        item.id = element.id
                        item.menuCode = element.menuCode
                        item.title = element.title
                        item.fatherCode = element.fatherCode
                        item.rootCode = element.rootCode
                        item.deep = element.deep
                        item.seq = element.seq
                        item.url = element.url
                        item.icon = element.icon
                        item.state = element.state
                        item.subMenus = this.getSubMenus(item, menuArray)
                        if (subArray == null) {
                            subArray = []
                        }
                        subArray.push(item)
                    }
                }
            }
            return subArray
        }
    }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  /* background: #2e363f; */
  background: #409eff;
  overflow-y: scroll;
}
.sidebar > ul {
  height: 100%;
}
</style>

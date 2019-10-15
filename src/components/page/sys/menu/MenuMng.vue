<template>
    <div class="menuMng">
        <el-row :gutter="10">
            <el-col :span="9">
                <el-card class="tree-card">
                    <span>
                        <i class="el-icon-search"></i>
                        菜单树:
                    </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                菜单名称:
                            </el-col>
                            <el-col :span="12">
                                <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" maxlength="60">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="2">
                            <el-col :span="24">
                                <div class="tree">
                                    <el-tree class="menu-tree" :data="treeData" :props="defaultProps" default-expand-all
                                             :filter-node-method="filterNode" ref="tree" @node-click="selectOne"
                                             :highlight-current="true" :expand-on-click-node="false" style="overflow:auto">
                                        <span class="custom-tree-node" slot-scope="{ node, data }">
                                            <span>{{ node.label }}</span>
                                            <span style="margin-left: 40px"></span>
                                            <span>
                                                <el-tooltip effect="dark" content="增加子菜单" placement="top" open-delay=1000>
                                                    <el-button style="margin-right: 0px;padding-right: 0px"
                                                               type="text"
                                                               size="mini"
                                                               icon="el-icon-circle-plus-outline"
                                                               circle
                                                               @click="() => append(data)">
                                                    </el-button>
                                                </el-tooltip>
                                                <el-tooltip effect="dark" content="修改" placement="top" open-delay=1000>
                                                    <el-button style="margin-left: 0px;padding-left: 0px;padding-right: 0px"
                                                               type="text"
                                                               size="mini"
                                                               icon="el-icon-k-update"
                                                               circle
                                                               @click="() => update(data)">
                                                    </el-button>
                                                </el-tooltip>
                                                <el-tooltip effect="dark" content="删除" placement="top" open-delay=1000>
                                                    <el-button style="margin-left: 0px;padding-left: 0px"
                                                               type="text"
                                                               size="mini"
                                                               icon="el-icon-delete"
                                                               circle
                                                               @click="() => remove(node, data)">
                                                    </el-button>
                                                </el-tooltip>
                                            </span>
                                        </span>
                                    </el-tree>

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="15">
                <el-card class="tree-card">
                    <span>
                        <i class="el-icon-view"></i>
                        菜单信息:
                    </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="4">
                                菜单编码:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.menuCode" size="small" readonly></el-input>
                            </el-col>
                            <el-col :span="4">
                                菜单名称:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.title" size="small" readonly></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="4">
                                上级菜单:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.fatherCode" size="small" readonly></el-input>
                            </el-col>
                            <el-col :span="4">
                                根菜单:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.rootCode" size="small" readonly></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="4">
                                深度:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.deep" size="small" readonly></el-input>
                            </el-col>
                            <el-col :span="4">
                                序号:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.seq" size="small" readonly></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="4">
                                请求url:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.url" size="small" readonly></el-input>
                            </el-col>
                            <el-col :span="4">
                                视图路径:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.viewPath" size="small" readonly></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="4">
                                图标:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.icon" size="small" readonly></el-input>
                            </el-col>
                            <el-col :span="4">
                                状态:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.state_str" size="small" readonly></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showAdd">增加根菜单</el-button>
            </el-col>
        </el-row>
        <add-menu :visible.sync="addFormVisible" :add-info="addInfo" :not-add-root="notAddRoot"
                  @afterClose="refresh"></add-menu>
        <update-menu :visible.sync="updateFormVisible" :update-info="updateInitInfo"
                     @afterClose="refresh"></update-menu>
    </div>
</template>
<script>
    import addMenu from './Add'
    import updateMenu from './Update'

    export default {
        components: {addMenu, updateMenu},
        data() {
            return {
                treeData: [],
                defaultProps: {
                    children: 'subMenus',
                    label: 'title'
                },
                filterText: '',
                menuInfo: {},
                selectedInfo: {},
                addInfo: {},
                updateInitInfo: {},
                addFormVisible: false,
                updateFormVisible: false,
                notAddRoot: false
            }
        },
        created() {
            this.init()
            this.query()
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            init() {
                this.selectedInfo = {}
                this.addFormVisible = false
                this.updateFormVisible = false
            },
            refresh() {
                this.query()
            },
            query() {
                let self = this
                self.treeData = []
                let input = {}
                self.$http
                    .post('/eops/menu/get_menu_tree', input)
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
                                    node.viewPath = element.viewPath
                                    node.icon = element.icon
                                    node.state = element.state
                                    node.state_str = self.stateStr(node.state)
                                    node.subMenus = self.getSubMenus(node, menuArray)
                                    self.treeData.push(node)
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
            filterNode(value, data) {
                if (!value) return true;
                return data.title.indexOf(value) !== -1
            },
            selectOne(val) {
                this.selectedInfo = val
            },
            getSubMenus(node, menuArray) {
                let subArray = []
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
                            item.viewPath = element.viewPath
                            item.icon = element.icon
                            item.state = element.state
                            item.state_str = this.stateStr(node.state)
                            item.subMenus = this.getSubMenus(item, menuArray)
                            subArray.push(item)
                        }
                    }
                }
                return subArray
            },
            showAdd() {
                this.addInfo = {};
                this.notAddRoot = false
                this.addFormVisible = true
            },
            showUpdate() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    return
                }
                self.updateInitInfo = Object.assign({}, self.selectedInfo)
                self.updateFormVisible = true
            },
            append(data) {
                this.notAddRoot = true
                this.addInfo = {};
                this.addInfo.rootCode = data.rootCode
                this.addInfo.fatherCode = data.menuCode
                this.addInfo.deep = data.deep + 1
                this.addFormVisible = true
            },
            update(data) {
                let self = this
                self.updateInitInfo = Object.assign({}, data)
                self.updateFormVisible = true
            },
            remove(node, data) {
                let self = this
                self.$confirm('是否删除菜单[' + data.title + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        menuCode: data.menuCode
                    }
                    self.$http
                        .post('/eops/menu/delete', input)
                        .then((res) => {
                            self.init()
                            self.query()
                            self.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                            self.$alert(err, '提示', {
                                confirmButtonText: '确定',
                                type: 'error'
                            })
                        })
                }).catch((erro) => {
                })
            },
            del() {
                let self = this
                self.$confirm('是否删除菜单[' + self.selectedInfo.title + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        menuCode: self.selectedInfo.menuCode
                    }
                    self.$http
                        .post('/eops/menu/delete', input)
                        .then((res) => {
                            self.init()
                            self.query()
                            self.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                            self.$alert(err, '提示', {
                                confirmButtonText: '确定',
                                type: 'error'
                            })
                        })
                }).catch((erro) => {
                })
            },
            stateStr(state) {
                let stateStr = ''
                if (state == 1) {
                    stateStr = '正常'
                } else if (state == 2) {
                    stateStr = '关闭'
                }
                return stateStr;
            }
        }
    }
</script>
<style scoped>
</style>

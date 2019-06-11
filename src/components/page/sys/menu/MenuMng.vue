<template>
    <div class="menuMng">
        <el-row :gutter="10">
            <el-col :span="9">
                <el-card class="tree-card">
                    <span>
                        <i class="el-icon-search"></i> 菜单树: </span>
                    <hr class="split" />
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
                        <el-row :gutter="10">
                            <el-col :span="24">
                                <el-tree class="menu-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="selectOne" :highlight-current="true">
                                </el-tree>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="15">
                <el-card class="tree-card">
                    <span>
                        <i class="el-icon-view"></i> 菜单信息:</span>
                    <hr class="split" />
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
                                <el-input v-model="selectedInfo.fatMenu" size="small" readonly></el-input>
                            </el-col>
                            <el-col :span="4">
                                根菜单:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.rootMenu" size="small" readonly></el-input>
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
                                视图url:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.index" size="small" readonly></el-input>
                            </el-col>
                            <el-col :span="4">
                                图标:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.icon" size="small" readonly></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="4">
                                状态:
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="selectedInfo.state_G" size="small" readonly></el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="增加菜单" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 菜单信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="菜单编码:" prop="menuCode">
                                    <el-input v-model="addInfo.menuCode" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="上级菜单:" prop="fatMenu">
                                    <el-input v-model="addInfo.fatMenu" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="深度:" prop="deep">
                                    <el-input v-model.number="addInfo.deep" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="视图url:" prop="index">
                                    <el-input v-model="addInfo.index" size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="addInfo.state" size="small" clearable>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="菜单名称:" prop="title">
                                    <el-input v-model="addInfo.title" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="根菜单:" prop="rootMenu">
                                    <el-input v-model="addInfo.rootMenu" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="序号:" prop="seq">
                                    <el-input v-model.number="addInfo.seq" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="图标:" prop="icon">
                                    <el-input v-model="addInfo.icon" size="small" maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="add">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="addFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改菜单" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 菜单信息:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="菜单编码:" prop="menuCode">
                                    <el-input v-model="updateInfo.menuCode" size="small" maxlength="8" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="上级菜单:" prop="fatMenu">
                                    <el-input v-model="updateInfo.fatMenu" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="深度:" prop="deep">
                                    <el-input v-model.number="updateInfo.deep" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="视图url:" prop="index">
                                    <el-input v-model="updateInfo.index" size="small" maxlength="100"></el-input>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="updateInfo.state" size="small" clearable>
                                        <el-option label="A-正常" value="A"></el-option>
                                        <el-option label="C-关闭" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="菜单名称:" prop="title">
                                    <el-input v-model="updateInfo.title" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="根菜单:" prop="rootMenu">
                                    <el-input v-model="updateInfo.rootMenu" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="序号:" prop="seq">
                                    <el-input v-model.number="updateInfo.seq" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="图标:" prop="icon">
                                    <el-input v-model="updateInfo.icon" size="small" maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="update">确 定</el-button>
                <el-button size="small" icon="el-icon-close" @click="updateFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('ADD')">增加</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="editForm('UPDATE')" :disabled="isDisabled">修改</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除</el-button>
            </el-col>
        </el-row>

    </div>
</template>
<script>
export default {
    data () {
        return {
            treeData: [],
            defaultProps: {
                children: 'subMenus',
                label: 'title'
            },
            filterText: '',
            menuInfo: {
            },
            selectedInfo: {},
            addInfo: {},
            addRules: {
                menuCode: [
                    { required: true, message: '请输入菜单编码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                fatMenu: [
                    { max: 8, message: '最大长度8', trigger: 'blur' }
                ],
                rootMenu: [
                    { required: true, message: '请输入根菜单', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                deep: [
                    { required: true, message: '请输入深度', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    { type: 'number', min: 0, message: '最小值0', trigger: 'blur' }
                ],
                seq: [
                    { required: true, message: '请输入序号', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    { type: 'number', min: 0, message: '最小值0', trigger: 'blur' }
                ],
                index: [
                    { max: 100, message: '最大长度100', trigger: 'blur' }
                ],
                icon: [
                    { max: 100, message: '最大长度100', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
                ],
            },
            addFormVisible: false,
            updateInfo: {},
            updateRules: {
                menuCode: [
                    { required: true, message: '请输入菜单编码', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    { max: 60, message: '最大长度60', trigger: 'blur' }
                ],
                fatMenu: [
                    { max: 8, message: '最大长度8', trigger: 'blur' }
                ],
                rootMenu: [
                    { required: true, message: '请输入根菜单', trigger: 'blur' },
                    { min: 8, max: 8, message: '最大长度8最小长度8', trigger: 'blur' }
                ],
                deep: [
                    { required: true, message: '请输入深度', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    { type: 'number', min: 0, message: '最小值0', trigger: 'blur' }
                ],
                seq: [
                    { required: true, message: '请输入序号', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    { type: 'number', min: 0, message: '最小值0', trigger: 'blur' }
                ],
                index: [
                    { max: 100, message: '最大长度100', trigger: 'blur' }
                ],
                icon: [
                    { max: 100, message: '最大长度100', trigger: 'blur' }
                ],
                state: [
                    { required: true, message: '请输入状态', trigger: 'change' }
                ],
            },
            updateFormVisible: false,
            isDisabled: true,
            labelPosition: 'left'
        }
    },
    created () {
        this.init()
        this.query()
    },
    watch: {
        filterText (val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        query () {
            let self = this
            self.treeData = []
            let input = {}
            self.$http
                .post('/sys/menu/queryMenuTree', input)
                .then(function (response) {
                    let pkgOut = response.data
                    let menuArray = pkgOut.SYMENUTREEZ
                    if (menuArray != null && menuArray.length > 0) {
                        for (let index = 0; index < menuArray.length; index++) {
                            const element = menuArray[index];
                            if (element.deep == 0) {
                                let node = {}
                                node.menuCode = element.menuCode
                                node.title = element.title
                                node.fatMenu = element.fatMenu
                                node.rootMenu = element.rootMenu
                                node.deep = element.deep
                                node.seq = element.seq
                                node.index = element.index
                                node.icon = element.icon
                                node.state = element.state
                                node.state_G = element.state_G
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
        filterNode (value, data) {
            if (!value) return true;
            return data.title.indexOf(value) !== -1
        },
        selectOne (val) {
            this.selectedInfo = val
            if (val == null) {
                this.isDisabled = true
            } else {
                this.isDisabled = false
            }
        },
        getSubMenus (node, menuArray) {
            let subArray = []
            if (menuArray != null && menuArray.length > 0) {
                for (let index = 0; index < menuArray.length; index++) {
                    const element = menuArray[index];
                    if (node.menuCode == element.fatMenu) {
                        let item = {}
                        item.menuCode = element.menuCode
                        item.title = element.title
                        item.fatMenu = element.fatMenu
                        item.rootMenu = element.rootMenu
                        item.deep = element.deep
                        item.seq = element.seq
                        item.index = element.index
                        item.icon = element.icon
                        item.state = element.state
                        item.state_G = element.state_G
                        item.subMenus = this.getSubMenus(item, menuArray)
                        subArray.push(item)
                    }
                }
            }
            return subArray
        },
        editForm (formType) {
            let self = this
            if (formType === 'ADD') {
                self.addInfo = {}
                self.addFormVisible = true
            } else if (formType === 'UPDATE') {
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.isDisabled = true
                    return
                }
                self.updateInfo = JSON.parse(JSON.stringify(self.selectedInfo))
                self.updateFormVisible = true
            } else {
                console.log('表单类型错误')
                self.$alert('表单类型错误', '提示', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
                return
            }
        },
        add () {
            let self = this
            let validRet = false
            self.$refs['addForm'].validate((valid) => {
                validRet = valid
            })
            if (validRet == false) {
                return
            }
            let input = {
                SYMENUINFY: [self.addInfo]
            }
            self.$http
                .post('/sys/menu/addMenu', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.init()
                    self.query()
                    self.$message({
                        message: '增加信息成功',
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
        },
        update () {
            let self = this
            let validRet = false
            self.$refs['updateForm'].validate((valid) => {
                validRet = valid
            })
            if (validRet == false) {
                return
            }
            let input = {
                SYMENUINFY: [self.updateInfo]
            }
            self.$http
                .post('/sys/menu/updateMenu', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.init()
                    self.query()
                    self.$message({
                        message: '修改信息成功',
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
        },
        del () {
            let self = this
            self.$confirm('是否删除菜单[' + self.selectedInfo.title + ']?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    SYMENUCODEX: [self.selectedInfo]
                }
                self.$http
                    .post('/sys/menu/deleteMenu', input)
                    .then((res) => {
                        let pkgOut = res.data
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
        init () {
            this.addInfo = {}
            this.updateInfo = {}
            this.selectedInfo = {}
            this.isDisabled = true
            this.addFormVisible = false
            this.updateFormVisible = false
        }
    }
}
</script>
<style scoped>
</style>

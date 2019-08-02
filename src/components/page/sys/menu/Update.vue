<template>
    <el-dialog title="修改菜单" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" label-position="left" label-width="120px">
            <el-card>
                <span>
                    <i class="el-icon-edit"></i>
                    菜单信息:
                </span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="菜单id:" prop="id">
                                <el-input v-model="updateInfo.id" size="small" maxlength="10" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="菜单编码:" prop="menuCode">
                                <el-input v-model="updateInfo.menuCode" size="small" maxlength="10" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="上级菜单:" prop="fatherCode">
                                <el-input v-model="updateInfo.fatherCode" size="small" maxlength="10"></el-input>
                            </el-form-item>
                            <el-form-item label="深度:" prop="deep">
                                <el-input v-model.number="updateInfo.deep" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="请求url:" prop="url">
                                <el-input v-model="updateInfo.url" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="视图路径:" prop="viewPath">
                                <el-input v-model="updateInfo.viewPath" size="small" maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="菜单名称:" prop="title">
                                <el-input v-model="updateInfo.title" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="根菜单:" prop="rootMenu">
                                <el-input v-model="updateInfo.rootCode" size="small" maxlength="10"></el-input>
                            </el-form-item>
                            <el-form-item label="序号:" prop="seq">
                                <el-input v-model.number="updateInfo.seq" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="图标:" prop="icon">
                                <el-input v-model="updateInfo.icon" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="状态:" prop="state">
                                <el-select v-model="updateInfo.state" size="small" clearable>
                                    <el-option label="1-正常" value="1"></el-option>
                                    <el-option label="2-关闭" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="update">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Update",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            updateInfo: {}
        },
        data() {
            return {
                updateRules: {
                    menuCode: [
                        {required: true, message: '请输入菜单编码', trigger: 'blur'},
                        {max: 10, message: '最大长度10', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    fatherCode: [
                        {max: 10, message: '最大长度10', trigger: 'blur'}
                    ],
                    rootCode: [
                        {required: true, message: '请输入根菜单', trigger: 'blur'},
                        {max: 10, message: '最大长度10', trigger: 'blur'}
                    ],
                    deep: [
                        {required: true, message: '请输入深度', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'},
                        {type: 'number', min: 0, message: '最小值0', trigger: 'blur'}
                    ],
                    seq: [
                        {required: true, message: '请输入序号', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'},
                        {type: 'number', min: 0, message: '最小值0', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入请求路径', trigger: 'blur'},
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    viewPath: [
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    icon: [
                        {max: 100, message: '最大长度100', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请输入状态', trigger: 'change'}
                    ],
                }
            }
        },
        methods: {
            update() {
                let self = this
                let validRet = false
                self.$refs['updateForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.updateInfo
                self.$http
                    .post('/eops/menu/modify', input)
                    .then((res) => {
                        self.modalClose()
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
            modalClose() {
                let afterUpdateInfo = JSON.parse(JSON.stringify(this.updateInfo))
                this.$emit('afterClose', afterUpdateInfo)
                this.$emit('update:visible', false)
            }
        }
    }
</script>

<style scoped>

</style>

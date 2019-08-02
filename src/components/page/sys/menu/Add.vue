<template>
    <el-dialog title="增加菜单" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-form :model="addInfo" :rules="addRules" ref="addForm" label-position="left" label-width="120px">
            <el-card>
                <span>
                    <i class="el-icon-edit"></i>
                    菜单信息:
                </span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="菜单编码:" prop="menuCode">
                                <el-input v-model="addInfo.menuCode" size="small" maxlength="10"></el-input>
                            </el-form-item>
                            <el-form-item label="上级菜单:" prop="fatherCode">
                                <el-input v-model="addInfo.fatherCode" size="small" maxlength="10"></el-input>
                            </el-form-item>
                            <el-form-item label="深度:" prop="deep">
                                <el-input v-model.number="addInfo.deep" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="请求url:" prop="url">
                                <el-input v-model="addInfo.url" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="视图路径:" prop="viewPath">
                                <el-input v-model="addInfo.viewPath" size="small" maxlength="100"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="菜单名称:" prop="title">
                                <el-input v-model="addInfo.title" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="根菜单:" prop="rootCode">
                                <el-input v-model="addInfo.rootCode" size="small" maxlength="10"></el-input>
                            </el-form-item>
                            <el-form-item label="序号:" prop="seq">
                                <el-input v-model.number="addInfo.seq" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="图标:" prop="icon">
                                <el-input v-model="addInfo.icon" size="small" maxlength="100"></el-input>
                            </el-form-item>
                            <el-form-item label="状态:" prop="state">
                                <el-select v-model="addInfo.state" size="small" clearable>
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
            <el-button type="primary" size="small" icon="el-icon-check" @click="add">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="modalClose">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Add",
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                addInfo: {
                    menuCode: '',
                    fatherCode: '',
                    deep: '',
                    url: '',
                    viewPath: '',
                    title: '',
                    rootCode: '',
                    seq: '',
                    icon: '',
                    state: ''
                },
                addRules: {
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
            add() {
                let self = this
                let validRet = false
                self.$refs['addForm'].validate((valid) => {
                    validRet = valid
                })
                if (validRet == false) {
                    return
                }
                let input = self.addInfo
                self.$http
                    .post('/eops/menu/add', input)
                    .then((res) => {
                        self.modalClose()
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
            modalClose() {
                let afterAddInfo = JSON.parse(JSON.stringify(this.addInfo))
                this.addInfo = {}
                this.$emit('afterClose', afterAddInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>

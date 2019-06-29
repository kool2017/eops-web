<template>
    <div class="deviceMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                设备名称:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.deviceName" size="small" maxlength="8"></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="query">查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="list-card">
                <span>
                        <i class="el-icon-tickets"></i> 列表: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-table :data="retList" border style="width: 100%" ref="retTable" highlight-current-row
                                  @current-change="selectOne" height="386">
                            <el-table-column prop="id" label="序号" width="80"></el-table-column>
                            <el-table-column prop="deviceName" label="设备名称" width="150"></el-table-column>
                            <el-table-column prop="deviceType" label="设备类型" width="100"></el-table-column>
                            <el-table-column prop="location" label="位置" width="150"></el-table-column>
                            <el-table-column prop="startTime" label="开始使用时间" width="150"></el-table-column>
                            <el-table-column prop="repairTimes" label="维修次数" width="100"></el-table-column>
                            <el-table-column prop="state_str" label="状态" width="80"></el-table-column>
                            <el-table-column prop="createdTime" label="创建时间" width="160"></el-table-column>
                            <el-table-column prop="updatedTime" label="更新时间" width="160"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper"
                                           @size-change="handleSizeChange"
                                           @current-change="handleCurrentChange" :page-size="page.pageSize"
                                           :total="page.total" :page-count="page.pageCount"
                                           :current-page="page.currentPage"
                                           :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="增加设备信息" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition"
                     label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 设备信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="设备名称:" prop="autCode">
                                    <el-input v-model="addInfo.deviceName" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="设备类型:" prop="name">
                                    <el-input v-model="addInfo.deviceType" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="addInfo.state" size="small" clearable>
                                        <el-option label="正常" value="1"></el-option>
                                        <el-option label="关闭" value="0"></el-option>
                                    </el-select>
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
        <el-dialog title="修改设备信息" :visible.sync="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="updateInfo" :rules="updateRules" ref="updateForm" :label-position="labelPosition"
                     label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 设备信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="设备名称:" prop="autCode">
                                    <el-input v-model="updateInfo.deviceName" size="small" maxlength="8"
                                              readonly></el-input>
                                </el-form-item>
                                <el-form-item label="设备类型:" prop="name">
                                    <el-input v-model="updateInfo.deviceType" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="状态:" prop="state">
                                    <el-select v-model="updateInfo.state" size="small" clearable>
                                        <el-option label="正常" value="1"></el-option>
                                        <el-option label="关闭" value="0"></el-option>
                                    </el-select>
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
                <el-button type="primary" size="small" icon="el-icon-edit" @click="editForm('UPDATE')"
                           :disabled="isDisabled">修改
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="del" :disabled="isDisabled">删除
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "DeviceMng",
        data() {
            return {
                condition: {},
                retList: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                },
                selectedInfo: {},
                addInfo: {},
                addRules: {
                    deviceName: [
                        {required: true, message: '请输入设备名称', trigger: 'blur'}
                    ]
                },
                addFormVisible: false,
                updateInfo: {},
                updateRules: {
                    deviceName: [
                        {required: true, message: '请输入设备名称', trigger: 'blur'}
                    ]
                },
                updateFormVisible: false,
                isDisabled: true,
                labelPosition: 'left'
            }
        },
        created() {
            this.init()
            this.query()
        },
        methods: {
            init() {
                this.addInfo = {}
                this.updateInfo = {}
                this.selectedInfo = {}
                this.isDisabled = true
                this.addFormVisible = false
                this.updateFormVisible = false
            },
            queryPage() {
                let self = this
                var input = self.condition
                input['pageSize'] = self.page.pageSize
                input['total'] = self.page.total
                input['pageCount'] = self.page.pageCount
                input['currentPage'] = self.page.currentPage
                self.$http
                    .post('/eops/device/get_page', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.pageSize = pkgOut.pageSize
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                        self.page.currentPage = pkgOut.currentPage
                        for (let index = 0; index < self.retList.length; index++) {
                            let element = self.retList[index]
                            element.createdTime = self.$moment(element.createdTime).format('YYYY-MM-DD HH:mm:ss')
                            element.updatedTime = self.$moment(element.updatedTime).format('YYYY-MM-DD HH:mm:ss')
                            element.state_str = self.stateStr(element.state)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            query() {
                this.page = {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                }
                this.queryPage();
            },
            handleSizeChange(pageSize) {
                let self = this
                self.page.pageSize = pageSize
                self.page.currentPage = 1
                self.queryPage()
            },
            handleCurrentChange(currentPage) {
                let self = this
                self.page.currentPage = currentPage
                self.queryPage()
            },
            selectOne(val) {
                this.selectedInfo = val
                if (val == null) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
            },
            editForm(formType) {
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
                    self.updateInfo['id'] = self.selectedInfo['id']
                    self.updateInfo['deviceName'] = self.selectedInfo['deviceName']
                    self.updateInfo['deviceType'] = self.selectedInfo['deviceType']
                    self.updateInfo['state'] = self.selectedInfo['state']
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
                    .post('/eops/device/add', input)
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
                    .post('/eops/device/modify', input)
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
            del() {
                let self = this
                self.$confirm('是否删除设备信息[' + self.selectedInfo.deviceName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = self.selectedInfo
                    self.$http
                        .post('/eops/device/delete', input)
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
            stateStr(state){
                let stateStr = ''
                if (state==1) {
                    stateStr = '正常'
                }else if (state == 2) {
                    stateStr = '维修中'
                }else if (state == 3) {
                    stateStr = '损坏'
                }else if (state == 4) {
                    stateStr = '报废'
                }
                return stateStr;
            }
        }
    }

</script>

<style scoped>

</style>

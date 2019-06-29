<template>
    <div class="orderMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                报修人电话:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.submitPhone" size="small" maxlength="8"></el-input>
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
                            <el-table-column prop="title" label="标题" width="150"></el-table-column>
                            <el-table-column prop="submitName" label="报修人姓名" width="100"></el-table-column>
                            <el-table-column prop="submitPhone" label="报修人电话" width="150"></el-table-column>
                            <el-table-column prop="deviceName" label="设备名称" width="150"></el-table-column>
                            <el-table-column prop="repairUserName" label="维修人姓名" width="100"></el-table-column>
                            <el-table-column prop="repairPhone" label="维修人电话" width="80"></el-table-column>
                            <el-table-column prop="description" label="描述信息" width="150"></el-table-column>
                            <el-table-column prop="evaluation" label="评价" width="100"></el-table-column>
                            <el-table-column prop="score" label="评分" width="80"></el-table-column>
                            <el-table-column prop="state" label="状态" width="80"></el-table-column>
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
        <el-dialog title="提交维修工单" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" :rules="addRules" ref="addForm" :label-position="labelPosition"
                     label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 设备信息:</span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="标题:" prop="title">
                                    <el-input v-model="addInfo.title" size="small" maxlength="8"></el-input>
                                </el-form-item>
                                <el-form-item label="报修人姓名:" prop="submitName">
                                    <el-input v-model="addInfo.submitName" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="报修人电话:" prop="submitPhone">
                                    <el-input v-model="addInfo.submitPhone" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="设备id:" prop="deviceId">
                                    <el-input v-model="addInfo.deviceId" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="设备名称:" prop="deviceName">
                                    <el-input v-model="addInfo.deviceName" size="small" maxlength="60"></el-input>
                                </el-form-item>
                                <el-form-item label="描述信息:" prop="description">
                                    <el-input v-model="addInfo.description" size="small" maxlength="60" type="textarea" autosize></el-input>
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
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('ADD')">报修</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('schedule')" :disabled="isDisabled">派单</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('reschedule')" :disabled="isDisabled">转派</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="accept" :disabled="isDisabled">接单</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('repair')" :disabled="isDisabled">维修登记</el-button>
                <el-button type="danger" size="small" icon="el-icon-k-add" @click="editForm('stopRepair')" :disabled="isDisabled">停工</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('noteInfo')" :disabled="isDisabled">备注</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('finishRepair')" :disabled="isDisabled">完工</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="editForm('score')" :disabled="isDisabled">评价</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="editForm('cancel')" :disabled="isDisabled">关闭工单</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "OrderMng",
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
            },
            accept(){

            },
            cancel(){

            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div class="scheduleMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="2">
                                工作流流水号:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.wkfNbr" size="small" maxlength="16"> </el-input>
                            </el-col>
                            <!-- <el-col :span="2">
                                上一执行人用户编号:
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="condition.lastUserCid" size="small" maxlength="10"> </el-input>
                            </el-col>
                            <el-col :span="2">
                                状态:
                            </el-col>
                            <el-col :span="3">
                                <el-select v-model="condition.state" size="small" clearable>
                                    <el-option label="CHK-签收" value="CHK"></el-option>
                                    <el-option label="CLS-关闭" value="CLS"></el-option>
                                    <el-option label="FIN-完成" value="FIN"></el-option>
                                    <el-option label="RDY-待办" value="RDY"></el-option>
                                    <el-option label="WAT-等待" value="WAT"></el-option>
                                </el-select>
                            </el-col> -->
                            <el-col :span="2">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="query">查询</el-button>
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
                    <hr class="split" />
                    <div class="card-context">
                        <el-table :data="retList" border style="width: 100%" ref="retTable" highlight-current-row @current-change="selectOne" height="386">
                            <el-table-column prop="scheduleCid" label="待办编号" width="120"></el-table-column>
                            <el-table-column prop="wkfNbr" label="工作流流水号" width="120"></el-table-column>
                            <el-table-column prop="lastNodeName" label="上一结点名称" width="150"></el-table-column>
                            <el-table-column prop="lastLoginName" label="上一执行人用户登录名" width="150"></el-table-column>
                            <el-table-column prop="scheduleNodeName" label="待办结点名称" width="150"></el-table-column>
                            <el-table-column prop="wgCid" label="待办工作组ID" width="150"></el-table-column>
                            <el-table-column prop="wgName" label="工作组名称" width="150"></el-table-column>
                            <el-table-column prop="scheduleLoginName" label="签收人登录名" width="150"></el-table-column>
                            <el-table-column prop="state_G" label="状态" width="150"></el-table-column>
                            <el-table-column prop="createTime_T" label="创建时间" width="160"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="审批" :visible.sync="approveFormVisible" :close-on-click-modal="false">
            <el-form :model="approveInfo" :rules="approveRules" ref="addForm" :label-position="labelPosition" label-width="120px">
                <el-card>
                    <span>
                        <i class="el-icon-edit"></i> 请输入审批意见:</span>
                    <hr class="split" />
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="24">
                                <el-form-item label="审批意见:" prop="eventDsp">
                                    <el-input v-model="approveInfo.eventDsp" type="textarea" autosize maxlength="256"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" icon="el-icon-check" @click="approveSubmit('Y')">通 过</el-button>
                <el-button type="danger" size="small" icon="el-icon-close" @click="approveSubmit('N')">否 决</el-button>
            </div>
        </el-dialog>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-checkSubmit" @click="check" :disabled="isDisabled">签收</el-button>
                <!-- <el-button type="primary" size="small" icon="el-icon-view" @click="showDtl" :disabled="isDisabled">详情</el-button> -->
                <el-button type="primary" size="small" icon="el-icon-k-approveSubmit" @click="approve" :disabled="isDisabled">审批</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data () {
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
            isDisabled: true,
            labelPosition: 'left',
            approveFormVisible: false,
            approveInfo: {},
            approveRules: {
                eventDsp: [
                    { max: 256, message: '最大长度256', trigger: 'blur' }
                ]
            },
            detailFormVisible: false,
            viewInfo: {}
        }
    },
    created () {
        this.init()
        this.query()
    },
    methods: {
        queryPage () {
            let self = this
            var input = {
                CMQRYSCHEDULEX: [self.condition],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/comm/wkf/queryScheduleListPage', input)
                .then((res) => {
                    var pkgOut = res.data
                    self.retList = pkgOut.CMQRYSCHEDULEZ
                    for (let index = 0; index < pkgOut.CMQRYSCHEDULEZ.length; index++) {
                        const element = pkgOut.CMQRYSCHEDULEZ[index];
                        if (element.createTime != null) {
                            element.createTime_T = self.$moment(Number(element.createTime)).format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                    self.page = pkgOut.SYPAGEINFOY[0]
                })
                .catch((err) => {
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定'
                    })
                })
        },
        query () {
            this.page = {
                pageSize: 10,
                total: 0,
                pageCount: 0,
                currentPage: 1
            }
            this.queryPage();
        },
        handleSizeChange (pageSize) {
            let self = this
            self.page.pageSize = pageSize
            self.page.currentPage = 1
            self.queryPage()
        },
        handleCurrentChange (currentPage) {
            let self = this
            self.page.currentPage = currentPage
            self.queryPage()
        },
        selectOne (val) {
            this.selectedInfo = val
            if (val == null) {
                this.isDisabled = true
            } else {
                this.isDisabled = false
            }
        },
        check () {
            let self = this
            self.$confirm('是否签收待办?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                let input = {
                    CMCHECKX: [self.selectedInfo]
                }
                self.$http
                    .post('/comm/wkf/check', input)
                    .then((res) => {
                        let pkgOut = res.data
                        self.init()
                        self.query()
                        self.$message({
                            message: '签收成功',
                            type: 'success'
                        })
                    })
                    .catch((err) => {
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定'
                        })
                    })
            }).catch((erro) => {
            })
        },
        showDtl () {
            this.detailFormVisible = true
            console.log('showDetail')
        },
        approve () {
            this.approveFormVisible = true
        },
        approveSubmit (val) {
            let self = this
            let input = {
                CMAPPROVEX: [{
                    scheduleCid: self.selectedInfo.scheduleCid,
                    wkfNbr: self.selectedInfo.wkfNbr,
                    eventFlag: val,
                    eventDsp: self.approveInfo.eventDsp
                }]
            }
            self.$http
                .post('/comm/wkf/approve', input)
                .then((res) => {
                    let pkgOut = res.data
                    self.init()
                    self.query()
                    self.$message({
                        message: '审批完成',
                        type: 'success'
                    })
                })
                .catch((err) => {
                    self.$alert(err, '提示', {
                        confirmButtonText: '确定'
                    })
                })
        },
        init () {
            this.selectedInfo = {}
            this.isDisabled = true
            this.approveFormVisible = false
            this.approveInfo = {}
            this.detailFormVisible = false
            this.showDetail = {}
        }
    }
}
</script>
<style scoped>
</style>

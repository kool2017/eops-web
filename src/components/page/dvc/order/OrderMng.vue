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
                            <el-col :span="3">
                                报修人电话:
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="condition.submitPhone" size="small" maxlength="11"></el-input>
                            </el-col>
                            <el-col :span="2">
                                状态:
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="condition.state" size="small" clearable>
                                    <el-option v-for="item in stateEnum" :key="item.code" :label="item.desc"
                                               :value="item.code"></el-option>
                                </el-select>
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
                                  @current-change="selectOne" height="400" @row-dblclick="showDetail">
                            <el-table-column prop="id" label="序号" width="80"></el-table-column>
                            <el-table-column prop="title" label="标题" width="150"></el-table-column>
                            <el-table-column prop="submitName" label="报修人姓名" width="100"></el-table-column>
                            <el-table-column prop="submitPhone" label="报修人电话" width="150"></el-table-column>
                            <el-table-column prop="deviceName" label="设备名称" width="150"></el-table-column>
                            <el-table-column prop="repairUserName" label="维修人姓名" width="100"></el-table-column>
                            <el-table-column prop="repairPhone" label="维修人电话" width="150"></el-table-column>
                            <el-table-column prop="description" label="描述信息" width="150"></el-table-column>
                            <el-table-column prop="evaluation" label="评价" width="100"></el-table-column>
                            <el-table-column prop="score" label="评分" width="80"></el-table-column>
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
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showSubmit">报修</el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showSchedule"
                           :disabled="isDisabledSchedule">派单
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showReschedule"
                           :disabled="isDisabledReschedule">转派
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="accept"
                           :disabled="isDisabledAccept">接单
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showRepair"
                           :disabled="isDisabledRepair">
                    维修登记
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-k-add" @click="stopRepair"
                           :disabled="isDisabledStopRepair">
                    停工
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="noteInfo"
                           :disabled="isDisabledNoteInfo">
                    备注
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="finishRepair"
                           :disabled="isDisabledFinishRepair">完工
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showScore"
                           :disabled="isDisabledScore">
                    评价
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="cancel"
                           :disabled="isDisabledCancel">
                    关闭工单
                </el-button>
            </el-col>
        </el-row>
        <add-order :visible.sync="addFormVisible" @afterClose="refresh"></add-order>
        <schedule-order :visible.sync="scheduleFormVisible" :schedule-info="orderInfo"
                        @afterClose="refresh"></schedule-order>
        <reschedule-order :visible.sync="rescheduleFormVisible" :reschedule-info="orderInfo"
                          @afterClose="refresh"></reschedule-order>
        <repair :visible.sync="repairFormVisible" :repair-info="orderInfo"
                @afterClose="refresh"></repair>
        <stop-repair :visible.sync="stopRepairFormVisible" :repair-info="orderInfo"
                     @afterClose="refresh"></stop-repair>
        <note-info :visible.sync="noteInfoFormVisible" :repair-info="orderInfo"
                   @afterClose="refresh"></note-info>
        <finish-repair :visible.sync="finishRepairFormVisible" :repair-info="orderInfo"
                       @afterClose="refresh"></finish-repair>
        <score :visible.sync="scoreFormVisible" :score-info="orderInfo"
               @afterClose="refresh"></score>
        <cancel :visible.sync="cancelFormVisible" :repair-info="orderInfo"
                @afterClose="refresh"></cancel>
        <show-detail :visible.sync="showDetailFormVisible" :order-info="orderInfo"
                     @afterClose="refresh" ref="showDetailForm"></show-detail>
    </div>
</template>

<script>
    import addOrder from './SubmitOrder'
    import scheduleOrder from './ScheduleOrder'
    import rescheduleOrder from './RescheduleOrder'
    import repair from './Repair'
    import stopRepair from './StopRepair'
    import noteInfo from './NoteInfo'
    import finishRepair from './FinishRepair'
    import score from './Score'
    import cancel from './Cancel'
    import showDetail from './Detail'
    import {getOrderStateEnum, getOrderStateDesc} from '../../../../enum/DvcEnum'

    export default {
        components: {
            addOrder,
            scheduleOrder,
            rescheduleOrder,
            repair,
            stopRepair,
            noteInfo,
            finishRepair,
            score,
            cancel,
            showDetail
        },
        name: "OrderMng",
        data() {
            return {
                stateEnum: getOrderStateEnum(),
                condition: {
                    submitPhone: "",
                    state: ""
                },
                retList: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                },
                selectedInfo: {},
                orderInfo: {},
                addFormVisible: false,
                scheduleFormVisible: false,
                rescheduleFormVisible: false,
                repairFormVisible: false,
                stopRepairFormVisible: false,
                noteInfoFormVisible: false,
                finishRepairFormVisible: false,
                scoreFormVisible: false,
                cancelFormVisible: false,
                showDetailFormVisible: false,
                isDisabledSchedule: true,
                isDisabledReschedule: true,
                isDisabledAccept: true,
                isDisabledRepair: true,
                isDisabledStopRepair: true,
                isDisabledNoteInfo: true,
                isDisabledFinishRepair: true,
                isDisabledScore: true,
                isDisabledCancel: true
            }
        },
        created() {
            this.init()
            this.query()
        },
        methods: {
            init() {
                this.selectedInfo = {}
                this.isDisabledSchedule = true
                this.isDisabledReschedule = true
                this.isDisabledAccept = true
                this.isDisabledRepair = true
                this.isDisabledStopRepair = true
                this.isDisabledNoteInfo = true
                this.isDisabledFinishRepair = true
                this.isDisabledScore = true
                this.isDisabledCancel = true
                this.addFormVisible = false
                this.scheduleFormVisible = false
                this.rescheduleFormVisible = false
                this.repairFormVisible = false
                this.stopRepairFormVisible = false
                this.noteInfoFormVisible = false
                this.finishRepairFormVisible = false
                this.scoreFormVisible = false
                this.cancelFormVisible = false
            },
            refresh() {
                this.query()
            },
            queryPage() {
                let self = this
                var input = self.condition
                input.pageSize = self.page.pageSize
                input.total = self.page.total
                input.pageCount = self.page.pageCount
                input.currentPage = self.page.currentPage
                self.$http
                    .post('/eops/device/get_order_page', input)
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
                            element.state_str = getOrderStateDesc(element.state)
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
                this.init()
                this.selectedInfo = val
                if (val == null) {
                } else {
                    if (val.state == "1") {
                        this.isDisabledSchedule = false
                        this.isDisabledCancel = false
                        this.isDisabledNoteInfo = false
                    } else if (val.state == "2") {
                        this.isDisabledReschedule = false
                        this.isDisabledAccept = false
                        this.isDisabledCancel = false
                        this.isDisabledNoteInfo = false
                    } else if (val.state == "3") {
                        this.isDisabledRepair = false
                        this.isDisabledStopRepair = false
                        this.isDisabledNoteInfo = false
                        this.isDisabledFinishRepair = false
                    } else if (val.state == "4") {
                        this.isDisabledReschedule = false
                        this.isDisabledCancel = false
                        this.isDisabledNoteInfo = false
                    } else if (val.state == "5") {
                        this.isDisabledNoteInfo = false
                        this.isDisabledScore = false
                    }
                }
            },
            showSubmit() {
                this.addFormVisible = true
            },
            showSchedule() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.selectOne(null)
                    return
                }
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.scheduleFormVisible = true
            },
            showReschedule() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.selectOne(null)
                    return
                }
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.rescheduleFormVisible = true
            },
            accept() {
                let self = this
                self.$confirm('是否接单[' + self.selectedInfo.title + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        orderId: self.selectedInfo.id
                    }
                    self.$http
                        .post('/eops/device/accept', input)
                        .then((res) => {
                            self.init()
                            self.query()
                            self.$message({
                                message: '接单成功',
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
            showRepair() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.selectOne(null)
                    return
                }
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.orderInfo.description = ''
                self.repairFormVisible = true
            },
            stopRepair() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.selectOne(null)
                    return
                }
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.orderInfo.description = ''
                self.stopRepairFormVisible = true
            },
            noteInfo() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.selectOne(null)
                    return
                }
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.orderInfo.content = ''
                self.noteInfoFormVisible = true
            },
            finishRepair() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.selectOne(null)
                    return
                }
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.orderInfo.description = ''
                self.finishRepairFormVisible = true
            },
            showScore() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.selectOne(null)
                    return
                }
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.scoreFormVisible = true
            },
            cancel() {
                let self = this
                if (self.selectedInfo == null) {
                    self.$alert('请选择一条记录', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    self.selectOne(null)
                    return
                }
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.orderInfo.description = ''
                self.cancelFormVisible = true
            },
            showDetail(row, column, event) {
                let self = this
                self.init()
                self.selectedInfo = row
                self.orderInfo = Object.assign({}, self.selectedInfo)
                self.orderInfo.orderId = self.orderInfo.id
                self.showDetailFormVisible = true
                self.$refs.showDetailForm.query()
            }
        }
    }
</script>

<style scoped>

</style>

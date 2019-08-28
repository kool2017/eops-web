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
                                状态:
                            </el-col>
                            <el-col :span="3"> <el-select v-model="condition.state" size="small" clearable>
                                <el-option label="1-已提交" value="1"></el-option>
                                <el-option label="2-待施工" value="2"></el-option>
                                <el-option label="3-施工中" value="3"></el-option>
                                <el-option label="4-停工" value="4"></el-option>
                                <el-option label="5-完工" value="5"></el-option>
                                <el-option label="6-结束" value="6"></el-option>
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
                                  @row-click="selectOne" height="400">
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
                           :disabled="isDisabled">派单
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showReschedule"
                           :disabled="isDisabled">转派
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="accept" :disabled="isDisabled">接单
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showRepair" :disabled="isDisabled">
                    维修登记
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-k-add" @click="stopRepair" :disabled="isDisabled">
                    停工
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="noteInfo" :disabled="isDisabled">
                    备注
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="finishRepair"
                           :disabled="isDisabled">完工
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showScore" :disabled="isDisabled">
                    评价
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="cancel" :disabled="isDisabled">
                    关闭工单
                </el-button>
            </el-col>
        </el-row>
        <add-order :visible.sync="addFormVisible" @afterClose="refresh"></add-order>
    </div>
</template>

<script>
    import addOrder from './SubmitOrder'

    export default {
        components: {addOrder},
        name: "OrderMng",
        data() {
            return {
                condition: {
                    submitPhone:"",
                    state:""
                },
                retList: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                },
                selectedInfo: {},
                addFormVisible: false,
                isDisabled: true
            }
        },
        created() {
            this.init()
            this.query()
        },
        methods: {
            init() {
                this.selectedInfo = {}
                this.isDisabled = true
                this.addFormVisible = false
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
            showSubmit() {
                this.addFormVisible = true
            },
            showSchedule() {
            },
            showReschedule() {
            },
            accept() {

            },
            showRepair() {
            },
            stopRepair() {
            },
            noteInfo() {
            },
            finishRepair() {
            },
            showScore() {
            },
            cancel() {

            },
            stateStr(state) {
                let stateStr = ''
                if (state == 1) {
                    stateStr = '已提交'
                } else if (state == 2) {
                    stateStr = '待施工'
                } else if (state == 3) {
                    stateStr = '施工中'
                } else if (state == 4) {
                    stateStr = '停工'
                } else if (state == 5) {
                    stateStr = '完工'
                } else if (state == 6) {
                    stateStr = '结束'
                }
                return stateStr;
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div class="reportMng">
        <el-row :gutter="5">
            <el-col :span="9">
                <el-card class="tree-card">
                    <span>
                        <i class="el-icon-search"></i>
                        报表
                    </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                报表名称:
                            </el-col>
                            <el-col :span="12">
                                <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" maxlength="60">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="24">
                                <div class="tree">
                                    <el-tree class="report-tree" :data="treeData" :props="defaultProps"
                                             default-expand-all
                                             :filter-node-method="filterNode" ref="tree" @node-click="selectOne"
                                             :highlight-current="true" :expand-on-click-node="false">
                                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                        <span>{{ node.label }}</span><span style="margin-left: 40px"></span>
                                        <span>
                                                <el-tooltip effect="dark" content="生成报表" placement="top"
                                                            :open-delay="tooltipOpenDelay">
                                            <el-button style="margin-left: 0px;padding-left: 0px"
                                                       type="text"
                                                       size="mini"
                                                       icon="el-icon-download"
                                                       circle
                                                       @click="() => showCreate(node, data)">
                                            </el-button>
                                                </el-tooltip>
                                                <el-tooltip effect="dark" content="修改报表" placement="top"
                                                            :open-delay="tooltipOpenDelay">
                                            <el-button style="margin-left: 0px;padding-left: 0px"
                                                       type="text"
                                                       size="mini"
                                                       icon="el-icon-k-update"
                                                       circle
                                                       @click="() => showUpdate(node, data)">
                                            </el-button>
                                                </el-tooltip>
                                            <el-tooltip effect="dark" content="授权报表" placement="top"
                                                        :open-delay="tooltipOpenDelay">
                                            <el-button style="margin-left: 0px;padding-left: 0px"
                                                       type="text"
                                                       size="mini"
                                                       icon="el-icon-k-management"
                                                       circle
                                                       @click="() => showAuth(node, data)">
                                            </el-button>
                                            </el-tooltip>
                                                <el-tooltip effect="dark" content="删除报表" placement="top"
                                                            :open-delay="tooltipOpenDelay">
                                            <el-button style="margin-left: 0px;padding-left: 0px"
                                                       type="text"
                                                       size="mini"
                                                       icon="el-icon-remove-outline"
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
                <div class="report-info">
                    <el-row :gutter="10">
                        <el-col>
                            <el-card class="info-card">
                                <span><i class="el-icon-view"></i>报表信息:</span>
                                <hr class="split"/>
                                <div class="card-context">
                                    <div v-if="selectedReportInfo.reportType == '1'">
                                        <report-table :title-date-flag="selectedReportInfo.titleDateFlag"
                                                      :title="selectedReportInfo.title"
                                                      :report-no-flag="selectedReportInfo.reportNoFlag"
                                                      :create-date-flag="selectedReportInfo.createDateFlag"
                                                      :create-user-flag="selectedReportInfo.createUserFlag"
                                                      :seq-flag="selectedReportInfo.seqFlag"
                                                      :columns="selectedReportInfo.columns"></report-table>
                                    </div>
                                    <div v-else-if="selectedReportInfo.reportType == '2'">
                                        <report-form :title-date-flag="selectedReportInfo.titleDateFlag"
                                                     :title="selectedReportInfo.title"
                                                     :report-no-flag="selectedReportInfo.reportNoFlag"
                                                     :create-date-flag="selectedReportInfo.createDateFlag"
                                                     :create-user-flag="selectedReportInfo.createUserFlag"
                                                     :columns="selectedReportInfo.columns"></report-form>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col>
                            <el-card class="info-card">
                                <span><i class="el-icon-view"></i>报表生成记录:</span>
                                <hr class="split"/>
                                <div class="card-context">
                                    <el-table :data="retList" border style="width: 100%" ref="retTable"
                                              highlight-current-row height="200">
                                        <el-table-column prop="reportNumber" label="报表编号" width="120"></el-table-column>
                                        <el-table-column prop="reportTitle" label="报表标题" width="300"></el-table-column>
                                        <el-table-column prop="createUserName" label="制表人"
                                                         width="120"></el-table-column>
                                        <el-table-column prop="createdTime_str" label="创建时间"
                                                         width="160"></el-table-column>
                                        <el-table-column prop="state_str" label="状态" width="80"></el-table-column>
                                        <el-table-column
                                            fixed="right" label="操作" width="100">
                                            <template slot-scope="scope">
                                                <el-tooltip v-if="scope.row.state === 1" effect="dark" content="下载"
                                                            placement="top"
                                                            :open-delay="tooltipOpenDelay">
                                                    <el-button @click="download(scope.row)" type="text"
                                                               icon="el-icon-k-download">
                                                    </el-button>
                                                </el-tooltip>
                                                <el-tooltip v-if="scope.row.state === 1" effect="dark" content="删除"
                                                            placement="top"
                                                            :open-delay="tooltipOpenDelay">
                                                    <el-button @click="deleteRecord(scope.row)" type="text"
                                                               icon="el-icon-delete">
                                                    </el-button>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="pagination">
                                        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                                                       @size-change="handleSizeChange"
                                                       @current-change="handleCurrentChange" :page-size="page.pageSize"
                                                       :total="page.total"
                                                       :page-count="page.pageCount"
                                                       :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
                                        </el-pagination>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row class="cmd">
            <el-col>
                <el-button type="primary" size="small" icon="el-icon-k-add" @click="showAdd">增加报表</el-button>
            </el-col>
        </el-row>
        <add-report :visible.sync="addFormVisible" @afterClose="refresh"></add-report>
        <update-report :visible.sync="updateFormVisible" :update-info="updateInitInfo"
                       @afterClose="refresh"></update-report>
        <create-report :visible.sync="createFormVisible" :report-info="selectedReportInfo"
                       @afterClose="refreshRecord"></create-report>
        <auth-report :visible.sync="authFormVisible" :auth-info="authInfo"></auth-report>
    </div>
</template>

<script>
    import AddReport from './AddReport'
    import UpdateReport from './UpdateReport'
    import CreateReport from './CreateReport'
    import AuthReport from "./AuthReport"
    import reportForm from "./ReportForm"
    import reportTable from "./ReportTable"

    export default {
        components: {AddReport, UpdateReport, CreateReport, AuthReport, reportForm, reportTable},
        name: "reportMng",
        data() {
            return {
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'reportName'
                },
                filterText: '',
                selectedReportInfo: {},
                retList: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                },
                addFormVisible: false,
                updateFormVisible: false,
                updateInitInfo: {},
                tooltipOpenDelay: 1000,
                createFormVisible: false,
                authFormVisible: false,
                authInfo: {
                    reportId: null,
                    userAuthBit: [],
                    allUsersBit: []
                }
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
                this.selectedReportInfo = {}
            },
            refresh() {
                this.init()
                this.query()
            },
            refreshRecord() {
                this.queryRecord()
            },
            query() {
                let self = this
                self.treeData = []
                let input = {}
                self.$http
                    .post('/eops/bi/report/getMyReports', input)
                    .then(function (response) {
                        let pkgOut = response.data
                        self.treeData = pkgOut.data
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
                return data.reportName.indexOf(value) !== -1
            },
            selectOne(val) {
                this.selectedReportInfo = val
                this.selectedReportInfo.reportType = val.reportType.toString()
                const json = JSON.parse(this.selectedReportInfo.json)
                const columns = json.col
                this.selectedReportInfo.columns = columns
                this.selectedReportInfo.titleDateFlag = json.titleDate.flag
                this.selectedReportInfo.reportNoFlag = json.reportNoFlag
                this.selectedReportInfo.createDateFlag = json.createDateFlag
                this.selectedReportInfo.createUserFlag = json.createUserFlag
                this.selectedReportInfo.seqFlag = json.seqFlag
                this.queryRecord()
            },
            showAdd() {
                this.addFormVisible = true
            },
            showCreate(node, data) {
                this.selectedReportInfo = Object.assign({}, data)
                this.createFormVisible = true
            },
            showUpdate(node, data) {
                let json = JSON.parse(data.json)
                this.updateInitInfo = {
                    id: data.id,
                    reportType: data.reportType.toString(),
                    reportCode: data.reportCode,
                    reportName: data.reportName,
                    titleDateFlag: json.titleDate.flag,
                    titleDateType: json.titleDate.type,
                    title: json.title,
                    reportNoFlag: json.reportNoFlag,
                    createDateFlag: json.createDateFlag,
                    createUserFlag: json.createUserFlag,
                    seqFlag: json.seqFlag,
                    columns: json.col,
                    params: Object.assign([], data.reportParams),
                    sql: data.sql
                }
                for (let i = 0; i < this.updateInitInfo.params.length; i++) {
                    this.updateInitInfo.params[i].paramType_str = this.paramTypeStr(this.updateInitInfo.params[i].paramType)
                }
                this.updateFormVisible = true
            },
            showAuth(node, data) {
                this.authInfo.reportId = data.id
                this.queryAllUsersWithAuth(data.id)
                this.queryAuthUsersWithAuth(data.id)
                this.authFormVisible = true
            },
            queryAllUsersWithAuth(reportId) {
                let self = this
                let input = {
                    reportId: reportId
                }
                self.$http
                    .post('/eops/bi/report/getAllUsersWithAuth', input)
                    .then(function (response) {
                        let pkgOut = response.data
                        let allUsersBit = pkgOut.data
                        for (let i = 0; i < allUsersBit.length; i++) {
                            allUsersBit[i].userBitKey = allUsersBit[i].userId + '_' + allUsersBit[i].code
                            allUsersBit[i].userBitName = allUsersBit[i].userName + '-' + allUsersBit[i].desc
                        }
                        self.authInfo.allUsersBit = allUsersBit

                        console.log(allUsersBit)
                    })
                    .catch(function (err) {
                        console.log(err)
                        self.$alert(err, '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    })
            },
            queryAuthUsersWithAuth(reportId) {
                let self = this
                let input = {
                    reportId: reportId
                }
                self.$http
                    .post('/eops/bi/report/getAuthUsersWithAuth', input)
                    .then(function (response) {
                        let pkgOut = response.data
                        let result = pkgOut.data
                        for (let i = 0; i < result.length; i++) {
                            const userBitKey = result[i].userId + '_' + result[i].code
                            self.authInfo.userAuthBit.push(userBitKey)
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
            remove(node, data) {
                let self = this
                self.$confirm('是否删除报表[' + data.reportName + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        id: data.id,
                        reportCode: data.reportCode
                    }
                    self.$http
                        .post('/eops/bi/report/delete', input)
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
            queryRecord() {
                this.page = {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                }
                this.queryRecordPage();
            },
            queryRecordPage() {
                let self = this
                var input = {
                    reportId: self.selectedReportInfo.id
                }
                input.currentPage = self.page.currentPage
                input.pageSize = self.page.pageSize
                self.$http
                    .post('/eops/bi/report/getGenerateRecordPage', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                        for (let index = 0; index < self.retList.length; index++) {
                            const element = self.retList[index];
                            element.createdTime_str = self.$moment(element.createdTime).format('YYYY-MM-DD HH:mm:ss')
                            if (element.state != null) {
                                element.state_str = self.stateStr(element.state)
                            }
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
            handleSizeChange(pageSize) {
                let self = this
                self.page.pageSize = pageSize
                self.page.currentPage = 1
                self.queryRecordPage()
            },
            handleCurrentChange(currentPage) {
                let self = this
                self.page.currentPage = currentPage
                self.queryRecordPage()
            },
            download(val) {
                window.open(process.env.BASE_URL + '/eops/bi/report/download?id=' + val.id, '_blank')
            },
            deleteRecord(val) {
                let self = this
                self.$confirm('是否删除报表记录[' + val.reportNumber + ']?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let input = {
                        id: val.id
                    }
                    self.$http
                        .post('/eops/bi/report/deleteGenerateRecord', input)
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
            paramTypeStr(paramType) {
                let paramTypeStr = ''
                if (paramType == 1) {
                    paramTypeStr = '文本框'
                } else if (paramType == 2) {
                    paramTypeStr = '文本域'
                } else if (paramType == 3) {
                    paramTypeStr = '日期'
                } else if (paramType == 4) {
                    paramTypeStr = '单选框'
                } else if (paramType == 5) {
                    paramTypeStr = '复选框'
                }
                return paramTypeStr
            },
            stateStr(state) {
                let stateStr = ''
                if (state == 1) {
                    stateStr = '已生成'
                } else if (state == 2) {
                    stateStr = '已删除'
                } else if (state == 3) {
                    stateStr = '生成中'
                }
                return stateStr
            }
        }
    }
</script>

<style scoped>
    .report-info {
        overflow-y: auto;
        height: 750px;
        padding-right: 5px;
    }
</style>

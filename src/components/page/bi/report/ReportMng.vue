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
                                                            open-delay="1000">
                                            <el-button style="margin-left: 0px;padding-left: 0px"
                                                       type="text"
                                                       size="mini"
                                                       icon="el-icon-download"
                                                       circle
                                                       @click="() => createReport(data)">
                                            </el-button>
                                                </el-tooltip>
                                                <el-tooltip effect="dark" content="修改报表" placement="top"
                                                            open-delay="1000">
                                            <el-button style="margin-left: 0px;padding-left: 0px"
                                                       type="text"
                                                       size="mini"
                                                       icon="el-icon-k-update"
                                                       circle
                                                       @click="() => showUpdate(node, data)">
                                            </el-button>
                                                </el-tooltip>
                                                <el-tooltip effect="dark" content="删除报表" placement="top"
                                                            open-delay="1000">
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
                                              highlight-current-row height="400">
                                        <el-table-column prop="reportNumber" label="报表编号" width="120"></el-table-column>
                                        <el-table-column prop="reportTitle" label="报表标题" width="150"></el-table-column>
                                        <el-table-column prop="createUserName" label="制表人"
                                                         width="150"></el-table-column>
                                        <el-table-column prop="createdTime_str" label="创建时间"
                                                         width="120"></el-table-column>
                                        <el-table-column prop="state_str" label="状态" width="200"></el-table-column>
                                        <el-table-column
                                            fixed="right" label="操作" width="200">
                                            <template slot-scope="scope">
                                                <el-tooltip effect="dark" content="下载" placement="top"
                                                            open-delay="1000">
                                                    <el-button @click="download(scope.row)" type="text"
                                                               icon="el-icon-k-download">
                                                    </el-button>
                                                </el-tooltip>
                                                <el-tooltip effect="dark" content="删除" placement="top"
                                                            open-delay="1000">
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
                                                       @current-change="handleCurrentChange"
                                                       :page-size="page.pageSize" :total="page.total"
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
    </div>
</template>

<script>
    import addReport from './AddReport'
    import updateReport from './UpdateReport'

    export default {
        components: {addReport, updateReport},
        name: "reportMng",
        data() {
            return {
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'reportName'
                },
                filterText: '',
                reportInfo: {},
                selectedInfo: {},
                retList: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                },
                addFormVisible: false,
                updateFormVisible: false,
                updateInitInfo: {}
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
            },
            refresh() {
                this.query()
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
                this.selectedInfo = val
                this.queryRecord()
            },
            createReport(data) {

            },
            showUpdate(node, data) {

            },
            remove(node, data) {

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
                    recordId: self.selectedInfo.id
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
            download(row) {

            },
            deleteRecord(row) {

            },
            showAdd() {
                this.addFormVisible = true
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
    .report-info {
        overflow-y: auto;
        height: 750px;
        padding-right: 5px;
    }
</style>

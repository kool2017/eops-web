<template>
    <div class="recordMng">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-card class="condition-card">
                    <span>
                        <i class="el-icon-search"></i> 查询条件: </span>
                    <hr class="split"/>
                    <div class="card-context">
                        <el-row :gutter="20">
                            <el-col :span="3">
                                工单id:
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="condition.orderId" size="small" maxlength="11"></el-input>
                            </el-col>
                            <el-col :span="3">
                                记录类型:
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="condition.recordType" size="small" clearable>
                                    <el-option v-for="item in recordTypeEnum" :key="item.code" :label="item.desc"
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
                                  @current-change="selectOne" height="400">
                            <el-table-column prop="id" label="序号" width="80"></el-table-column>
                            <el-table-column prop="recordType_str" label="记录类型" width="100"></el-table-column>
                            <el-table-column prop="orderId" label="工单id" width="100"></el-table-column>
                            <el-table-column prop="submitName" label="报修人" width="150"></el-table-column>
                            <el-table-column prop="submitPhone" label="报修人手机号" width="150"></el-table-column>
                            <el-table-column prop="repairUserName" label="维修人" width="150"></el-table-column>
                            <el-table-column prop="repairPhone" label="维修人手机号" width="150"></el-table-column>
                            <el-table-column prop="content" label="描述信息" width="150"></el-table-column>
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
    </div>
</template>

<script>
    import {getRecordTypeEnum, getRecordTypeDesc} from '../../../../enum/DvcEnum'

    export default {
        name: "RecordMng",
        data() {
            return {
                recordTypeEnum: getRecordTypeEnum(),
                condition: {},
                retList: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                },
                selectedInfo: {}
            }
        },
        created() {
            this.init()
            this.query()
        },
        methods: {
            init() {
                this.selectedInfo = {}
            },
            refresh() {
                this.query()
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
            queryPage() {
                let self = this
                var input = Object.assign({}, self.condition)
                input.currentPage = self.page.currentPage
                input.pageSize = self.page.pageSize
                self.$http
                    .post('/eops/device/get_record_page', input)
                    .then((res) => {
                        var pkgOut = res.data
                        self.retList = pkgOut.data
                        self.page.total = pkgOut.total
                        self.page.pageCount = pkgOut.pageCount
                        for (let index = 0; index < self.retList.length; index++) {
                            let element = self.retList[index]
                            element.createdTime = self.$moment(element.createdTime).format('YYYY-MM-DD HH:mm:ss')
                            element.updatedTime = self.$moment(element.updatedTime).format('YYYY-MM-DD HH:mm:ss')
                            element.recordType_str = getRecordTypeDesc(element.recordType)
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
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <el-dialog title="工单详情" :visible.sync="visible" :close-on-click-modal="false" :before-close="modalClose">
        <el-card class="list-card">
                <span>
                        <i class="el-icon-tickets"></i> 列表: </span>
            <hr class="split"/>
            <div class="card-context">
                <el-table :data="retList" border style="width: 100%" ref="retTable" height="400">
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
    </el-dialog>
</template>

<script>
    import {getRecordTypeDesc} from '../../../../enum/DvcEnum'

    export default {
        name: "OrderDetail",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            orderInfo: {}
        },
        data() {
            return {
                retList: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    pageCount: 0,
                    currentPage: 1
                }
            }
        },
        methods: {
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
                let input = self.orderInfo
                console.log(input)
                input.pageSize = self.page.pageSize
                input.total = self.page.total
                input.pageCount = self.page.pageCount
                input.currentPage = self.page.currentPage
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
            modalClose() {
                let afterOrderInfo = JSON.parse(JSON.stringify(this.orderInfo))
                this.$emit('afterClose', afterOrderInfo)
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-location"></i> 车辆管理</el-breadcrumb-item>
                <el-breadcrumb-item>车辆信息维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="editForm('ADD')" class="add-button mr10">增加</el-button>
            <el-input placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
        </div>
        <el-table :data="ORCARINFQRYZ" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="carNbr" label="编号" sortable width="150">
            </el-table-column>
            <el-table-column prop="carType" label="车辆类型" width="120">
            </el-table-column>
            <el-table-column prop="carLocation" label="位置" width="120">
            </el-table-column>
            <el-table-column prop="carState" label="状态">
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="editForm('UPDATE',scope.$index)">编辑</el-button>
                    <el-button size="small" type="danger" @click="closeOne(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :total="page.total" :page-count="page.pageCount" :current-page="page.currentPage" :page-sizes="[10, 50, 100]">
            </el-pagination>
        </div>
        <el-dialog title="增加车辆信息" :visible.sync="addFormVisible" :close-on-click-modal="closeOnclick">
            <el-form :model="ORCARINFEDTX">
                <el-form-item label="编号">
                    <el-input v-model="ORCARINFEDTX.carNbr" auto-complete="off" maxlength=60 :disabled="isUpdate"></el-input>
                </el-form-item>
                <el-form-item label="车辆类型">
                    <el-input v-model="ORCARINFEDTX.carType" auto-complete="off" maxlength=20></el-input>
                </el-form-item>
                <el-form-item label="位置">
                    <el-input v-model="ORCARINFEDTX.carLocation" auto-complete="off" maxlength=100></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="ORCARINFEDTX.carState" auto-complete="off" maxlength=100></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ORCARINFOX: {},
            ORCARINFQRYZ: [{
                carNbr: '1',
                carType: '5座小客车',
                carLocation: '古墩路',
                carState: '使用中'
            },
            {
                carNbr: '2',
                carType: '7座商务车',
                carLocation: '振华路',
                carState: '使用中'
            }],
            ORCARINFEDTX: {
                carNbr: '',
                carType: '',
                carLocation: '',
                carState: ''
            },
            ORCARINFDELX: {
                suiId: ''
            },
            addFormVisible: false,
            isUpdate: false,
            formType: '',
            index: 0,
            closeOnclick: false,
            page: {
                pageSize: 10,
                total: 0,
                pageCount: 0,
                currentPage: 1
            }
        }
    },
    created() {
        this.query();
    },
    methods: {
        queryPage() {
            let self = this
            var input = {
                ORCARINFQRYX: [self.ORCARINFQRYX],
                SYPAGEINFOY: [self.page]
            }
            self.$http
                .post('/opration/carQueryPage.json', input)
                .then((res) => {
                    // var pkgOut = JSON.parse(res.data)
                    var pkgOut = res.data
                    self.ORCARINFQRYZ = pkgOut.ORCARINFQRYZ
                    self.page = pkgOut.SYPAGEINFOY[0]
                })
                .catch((err) => {
                    console.log(err)
                    self.$message.error('查询出错了')
                })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        query() {
            this.page = {
                pageSize: 10,
                total: 0,
                pageCount: 0,
                currentPage: 1
            }
            this.queryPage();
        },
        editForm(formType, index) {
            let self = this
            self.formType = formType
            self.addFormVisible = true
            if (formType === 'ADD') {
                self.isUpdate = false
                self.ORCARINFEDTX = {
                    carNbr: '',
                    carType: '',
                    carLocation: '',
                    carState: ''
                }
            } else if (formType === 'UPDATE') {
                self.isUpdate = true
                self.index = index
                self.ORCARINFEDTX = self.ORCARINFQRYZ[index]
            }
        },
        edit() {
            let self = this
            var input = {
                ORCARINFEDTX: [self.ORCARINFEDTX]
            }
            let url = ''
            if (self.formType === 'ADD') {
                url = '/opration/carAdd.json'
            } else if (self.formType === 'UPDATE') {
                url = '/opration/carUpdate.json'
            }
            self.$http
                .post(url, input)
                .then((res) => {
                    var pkgOut = res.data
                    // var pkgOut = JSON.parse(res.data)
                    self.addFormVisible = false
                    self.query()
                    self.$message({
                        message: '编辑成功',
                        type: 'success'
                    })
                })
                .catch((err) => {
                    console.log(err)
                    self.$message.error('编辑出错了')
                })

        },
        closeOne(index) {
            let self = this
            self.ORCARINFDELX = self.ORCARINFQRYZ[index]
            var input = {
                ORCARINFDELX: [self.ORCARINFDELX]
            }
            self.$http
                .post('/opration/carClose.json', input)
                .then((res) => {
                    self.query()
                    self.$message({
                        message: '车辆[' + self.ORCARINFQRYZ[index].carNbr + ']被删除',
                        type: 'success'
                    })
                })
                .catch((err) => {
                    console.log(err)
                    self.$message.error('查询出错了')
                })
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.handle-select {
    width: 120px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
.add-button {
    position: fixed;
    right: 70px;
}
</style>

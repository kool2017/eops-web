<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-location"></i>维修中心</el-breadcrumb-item>
                <el-breadcrumb-item>维修人员信息维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="editForm('ADD')" class="add-button mr10">增加</el-button>
            <el-input placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
        </div>
        <el-table :data="ORCARINFQRYZ" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="repairNbr" label="编号" sortable width="80"></el-table-column>
            <el-table-column prop="repairName" label="姓名" width="120"></el-table-column>
            <el-table-column prop="repairSex" label="性别" width="196"></el-table-column>
            <el-table-column prop="repairYear" label="工龄" width="120"></el-table-column>
            <el-table-column prop="repairWhat" label="维修方向" width="320"></el-table-column>
            <el-table-column prop="repairTel" label="手机号" width="150"></el-table-column>
            <el-table-column prop="repairToNum" label="已分配维修单" width="150"></el-table-column>
            <el-table-column prop="repairGoodPer" label="好评度" width="180"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
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
        <el-dialog title="增加维修人员信息" :visible.sync="addFormVisible" :close-on-click-modal="closeOnclick">
            <el-form :model="ORCARINFEDTX" label-width="100px">
                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="姓名">
                    <el-input v-model="ORCARINFEDTX.carNbr"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="性别">
                <el-select v-model="ORCARINFEDTX.carNum">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
                </el-select>
                </el-form-item>
                </el-col>

                </el-row>

                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="维修方向">
                    <el-input v-model="ORCARINFEDTX.carFromTo"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="工作年限">
                    <el-input v-model="ORCARINFEDTX.carFromYear"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="手机号">
                    <el-input v-model="ORCARINFEDTX.carBook"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-form-item label="备注">
                    <el-input v-model="ORCARINFEDTX.carTxt" type="textarea" auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
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
                repairNbr: '1',
                repairName: '郑庆丰',
                repairSex: '男',
                repairYear: '3年',
                repairWhat: '暖气、水管',
                repairTel: '186-4038-3732',
                repairToNum: '2个',
                repairGoodPer: '99%'
            },
            {
                repairNbr: '2',
                repairName: '何荣',
                repairSex: '男',
                repairYear: '5年',
                repairWhat: '电梯',
                repairTel: '171-4575-7932',
                repairToNum: '0个',
                repairGoodPer: '100%'
            }],
            ORCARINFEDTX: {
                carNbr: '',
                carType: '',
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
                total: 2,
                pageCount: 1,
                currentPage: 1
            }
        }
    },
    created() {
        // this.query();
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
                        message: '用户[' + self.ORCARINFQRYZ[index].carNbr + ']被关闭',
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

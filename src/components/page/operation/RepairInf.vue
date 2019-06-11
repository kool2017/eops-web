<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-location"></i>维修中心</el-breadcrumb-item>
                <el-breadcrumb-item>维修单维护</el-breadcrumb-item>
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
            <el-table-column prop="repairName" label="报修人姓名" width="120"></el-table-column>
            <el-table-column prop="repairSex" label="电话" width="150"></el-table-column>
            <el-table-column prop="repairYear" label="地址" width="267"></el-table-column>
            <el-table-column prop="repairWhat" label="维修内容" width="350"></el-table-column>
            <el-table-column prop="repairMan" label="维修人" width="100"></el-table-column>
            <el-table-column prop="repairTel" label="联系电话" width="150"></el-table-column>
            <el-table-column prop="repairPer" label="进度" width="100"></el-table-column>
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
        <el-dialog title="维修单维护" :visible.sync="addFormVisible" :close-on-click-modal="closeOnclick">
            <el-form :model="ORCARINFEDTX" label-width="100px">
                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="报修编号">
                    <el-input v-model="ORCARINFEDTX.carNbr"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="紧急程度">
                <el-select v-model="ORCARINFEDTX.carNum">
                <el-option label="一般" value="male"></el-option>
                <el-option label="紧急" value="female"></el-option>
                </el-select>
                </el-form-item>
                </el-col>

                </el-row>

                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="联系方式">
                    <el-input v-model="ORCARINFEDTX.carFromTo"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="地址">
                    <el-input v-model="ORCARINFEDTX.carFromYear"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="40">
                <el-col :span="12">

                </el-col>
                </el-row>
                <el-form-item label="报修内容">
                    <el-input v-model="ORCARINFEDTX.carTxt" type="textarea" auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>

                <el-row :gutter="0">
                <el-col :span="30">
                <el-form-item label="维修人员">
                    <el-input v-model="ORCARINFEDTX.carWho" class="input-with-select">
                    <el-button slot="append" size=small  icon="el-icon-search">查询</el-button></el-input>

                </el-form-item>
                

                </el-col>
                </el-row>

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
                repairName: '刘亮',
                repairSex: '130-9482-6454',
                repairYear: '住院部骨科206室',
                repairWhat: '灯不亮',
                repairMan: '柳秦',
                repairTel: '156-2364-4575',
                repairPer: ''
            },
            {
                repairNbr: '2',
                repairName: '宋艳艳',
                repairSex: '181-3463-6856',
                repairYear: '挂号大厅',
                repairWhat: '墙边瓷砖脱落',
                repairMan: '陈思明',
                repairTel: '151-5467-0493',
                repairPer: ''
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

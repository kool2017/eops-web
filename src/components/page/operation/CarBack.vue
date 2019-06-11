<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-location"></i> 车辆管理</el-breadcrumb-item>
                <el-breadcrumb-item>收车</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="editForm('ADD')" class="add-button mr10">增加</el-button>
            <el-input placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
        </div>
        <el-table :data="ORCARINFQRYZ" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="carNbr" label="编号" sortable width="80"></el-table-column>
            <el-table-column prop="carType" label="车辆类型" width="120"></el-table-column>
            <el-table-column prop="carID" label="车牌号" width="120"></el-table-column>
            <el-table-column prop="carBackTime" label="收车时间" sortable width="150"></el-table-column>
            <el-table-column prop="carDriver" label="司机姓名" width="100"></el-table-column>
            <el-table-column prop="carDriverTel" label="司机电话" width="120"></el-table-column>
            <el-table-column prop="carBackMile" label="收车里程数" width="120"></el-table-column>
            <el-table-column prop="carOil" label="剩余油量" width="120"></el-table-column>
            <el-table-column prop="carOilMey" label="油费金额"></el-table-column>
            <el-table-column prop="carStsTxt" label="车况备注"></el-table-column>
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
        <el-dialog title="增加收车信息" :visible.sync="addFormVisible" :close-on-click-modal="closeOnclick">
            <el-form :model="ORCARINFEDTX" label-width="100px">
                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="预定编号">
                    <el-input v-model="ORCARINFEDTX.carNbr"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="车牌号">
                <el-input v-model="ORCARINFEDTX.carID"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                </el-row>

                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="出发地/目的地">
                    <el-input v-model="ORCARINFEDTX.carFromTo"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="收车时间">
                <el-date-picker v-model="ORCARINFEDTX.carStartTime" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions1"> </el-date-picker>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="司机姓名">
                    <el-input v-model="ORCARINFEDTX.carDriver"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="司机手机">
                <el-input v-model="ORCARINFEDTX.carDriverTel"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                </el-row>

                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="收车里程数">
                    <el-input v-model="ORCARINFEDTX.carMile"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="收车油量">
                <el-input v-model="ORCARINFEDTX.carOil"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                </el-row>

                <el-row :gutter="40">
                <el-col :span="12">
                <el-form-item label="油费金额">
                    <el-input v-model="ORCARINFEDTX.carBook"  auto-complete="off" maxlength=20 :disabled="isUpdate"></el-input>
                </el-form-item>
                </el-col>
                </el-row>

                <el-form-item label="车况异常">
                    <template slot-scope="scope">
                    <el-switch v-model="carAcc" @change = "carChange(scope.disabled)"></el-switch>
                    </template>
                </el-form-item>
                <el-form-item label="车况备注">
                    <el-input v-model="ORCARINFEDTX.carTxt" ID = 'txt' type="textarea" auto-complete="off" maxlength=20 :disabled=true></el-input>
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
                carID: '沪C97LD7',
                carBackTime: '2018/07/02 15:30',
                carDriver: '孙笑笑',
                carDriverTel: '186-4038-3732',
                carBackMile: '3908',
                carOil: '1/2',
                carOilMey: '500',
                carStsTxt: '良好'
            },
            {
                carNbr: '2',
                carType: '7座小客车',
                carID: '浙A58E56',
                carBackTime: '2018/05/02 15:30',
                carDriver: '李鹏程',
                carDriverTel: '187-4642-5315',
                carBackMile: '10377',
                carOil: '1/4',
                carOilMey: '297',
                carStsTxt: '已到保养里程数'
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
            carAcc: true,
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
        carChange() {
            var a = document.getElementById('txt');
            a.disabled = false;
            console.log(a.disabled);



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

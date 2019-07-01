<template>
    <el-dialog title="用户详情" :visible.sync="visible" :close-on-click-modal="true" :before-close="modalClose">
        <el-form :model="viewInfo" ref="viewForm" :label-position="labelPosition" label-width="120px">
            <el-card>
                    <span>
                        <i class="el-icon-view"></i> 用户信息:</span>
                <hr class="split"/>
                <div class="card-context">
                    <el-row :gutter="10">
                        <el-col :span="10">
                            <el-form-item label="用户号:">
                                <el-input v-model="viewInfo.userId" size="small" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="登录名:">
                                <el-input v-model="viewInfo.loginName" size="small" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="手机:">
                                <el-input v-model="viewInfo.phone" size="small" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱:">
                                <el-input v-model="viewInfo.email" size="small" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-form>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="modalClose">确 定
            </el-button>
        </div>
    </el-dialog>

</template>

<script>
    export default {
        name: "Detail",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            initInfo: {
                userId: '',
                loginName: '',
                phone: '',
                email: ''
            }
        },
        data() {
            return {
                viewInfo: {
                    userId: '',
                    loginName: '',
                    phone: '',
                    email: ''
                },
                labelPosition: 'left'
            }
        },
        methods: {

            modalClose() {
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>

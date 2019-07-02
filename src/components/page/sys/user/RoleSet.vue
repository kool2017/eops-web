<template>
    <el-dialog title="设置角色" :visible.sync="visible" :close-on-click-modal="false">
        <el-card>
            <el-transfer v-model="userRole" :data="allRole" :titles="['可赋予角色','已赋予角色']" :props="roleTransferProps">

            </el-transfer>
        </el-card>
        <div slot="footer">
            <el-button type="primary" size="small" icon="el-icon-check" @click="roleSubmit">确 定</el-button>
            <el-button size="small" icon="el-icon-close" @click="roleTransferVisible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "RoleSet",
        data(){
            return{

                userRole: [],
                allRole: [],
                roleTransferProps: {
                    key: 'roleCode',
                    label: 'name'
                }
            }
        }
    }
</script>

<style scoped>

</style>

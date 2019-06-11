<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-setting"></i> 设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>设备运行状态查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="schart">
            <div class="content-title">电机设备电流图(A)</div>
            <schart canvasId="x-electricity" width="800" height="300" :data="data1" type="line" :options="options1"></schart>
        </div>
        <div class="schart">
            <div class="content-title">变压设备电压图(V)</div>
            <schart canvasId="x-voltage" width="800" height="300" :data="data2" type="line" :options="options2"></schart>
        </div>
        <div class="schart">
            <div class="content-title">锅炉设备压力图(KPa)</div>
            <schart canvasId="x-pressure" width="800" height="300" :data="data3" type="line" :options="options3"></schart>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    components: {
        Schart
    },
    data: () => ({
        data1: [
            { name: '8:00:00', value: 1.1 },
            { name: '8:10:00', value: 1.05 },
            { name: '8:20:00', value: 1.2 },
            { name: '8:30:00', value: 1.1 },
            { name: '8:40:00', value: 1.3 },
            { name: '8:50:00', value: 1.11 },
            { name: '9:00:00', value: 1.1 },
            { name: '9:10:00', value: 1.02 },
            { name: '9:20:00', value: 1.09 },
            { name: '9:30:00', value: 1.19 },
            { name: '9:40:00', value: 1.18 },
            { name: '9:50:00', value: 1.1 }
        ],
        data2: [
            { name: '8:00:00', value: 220 },
            { name: '8:10:00', value: 221 },
            { name: '8:20:00', value: 219 },
            { name: '8:30:00', value: 220 },
            { name: '8:40:00', value: 220 },
            { name: '8:50:00', value: 220 },
            { name: '9:00:00', value: 220 },
            { name: '9:10:00', value: 220 },
            { name: '9:20:00', value: 220 },
            { name: '9:30:00', value: 220 },
            { name: '9:40:00', value: 0 },
            { name: '9:50:00', value: 220 }
        ],
        data3: [
            { name: '8:00:00', value: 1.1 },
            { name: '8:10:00', value: 1.05 },
            { name: '8:20:00', value: 1.2 },
            { name: '8:30:00', value: 1.1 },
            { name: '8:40:00', value: 1.3 },
            { name: '8:50:00', value: 1.11 },
            { name: '9:00:00', value: 1.1 },
            { name: '9:10:00', value: 1.02 },
            { name: '9:20:00', value: 1.09 },
            { name: '9:30:00', value: 1.19 },
            { name: '9:40:00', value: 1.18 },
            { name: '9:50:00', value: 1.1 }
        ],
        options1: {
            title: '电机设备电流图(A)',
            bgColor: '#009688',
            titleColor: '#ffffff',
            fillColor: '#e0f2f1',
            axisColor: '#ffffff',
            contentColor: '#999'
        },
        options2: {
            title: '变压设备电压图(V)',
            bgColor: '#009688',
            titleColor: '#ffffff',
            fillColor: '#e0f2f1',
            axisColor: '#ffffff',
            contentColor: '#999'
        },
        options3: {
            title: '锅炉设备压力图(KPa)',
            bgColor: '#009688',
            titleColor: '#ffffff',
            fillColor: '#e0f2f1',
            axisColor: '#ffffff',
            contentColor: '#999'
        }
    })
}
</script>

<style scoped>
.schart {
    width: 800px;
    display: inline-block;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>

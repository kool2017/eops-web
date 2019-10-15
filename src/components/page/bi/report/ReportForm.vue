<template>
    <div class="reportForm" style="overflow: auto">
        form:
        {{JSON.stringify(reportInfo)}}
        json:
        {{JSON.stringify(columns)}}
    </div>
</template>

<script>
    export default {
        name: "ReportForm",
        props: {
            reportInfo: {},
            columns: null
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>

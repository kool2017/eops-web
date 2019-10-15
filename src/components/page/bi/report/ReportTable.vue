<template>
    <div class="reportTable">
        table:
        {{JSON.stringify(reportInfo)}}
        json:
        {{JSON.stringify(columns)}}
    </div>
</template>

<script>
    export default {
        name: "ReportTable",
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

<template>
  <div class="about">
    <!-- <el-row :gutter='20'>
      <el-col :span='8'>
        <div id="bar-chart" class="chart">

        </div>
      </el-col>
      <el-col :span='8'>
        <div id="line-chart" class="chart">

        </div>
      </el-col>
      <el-col :span='8'>
        <div id="pie-chart" class="chart">

        </div>
      </el-col>
    </el-row> -->
    <el-row>
        <el-col :span="12">
          <div id="rose-chart" class="chart">

          </div>
        </el-col>
        <el-col :span="12">
          <div id="" class="chart">

          </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted(){
    this.drawChart1();
  },
  methods:{
    drawChart1(){
      let piechart = this.$echarts.init(document.getElementById('rose-chart'));
      let option = {
        title: {
            text: '南丁格尔玫瑰图',
            subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        toolbox: {
            show: true,
            feature: {
                //mark: {show: true},
                //dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            {
                name: '半径模式',
                type: 'pie',
                radius: [20, 100],
                center: ['25%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                label: {
                    show:true
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    {value: 40, name: 'rose 1'},
                    {value: 33, name: 'rose 2'},
                    {value: 82, name: 'rose 3'},
                    {value: 221, name: 'rose 4'},
                    {value: 220, name: 'rose 5'},
                    {value: 152, name: 'rose 6'},
                    {value: 122, name: 'rose 7'},
                    {value: 120, name: 'rose 8'}
                ]
            },
            {
                name: '面积模式',
                type: 'pie',
                radius: [20, 100],
                center: ['75%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 5
                },
                data: [
                    {value: 301, name: 'rose 1'},
                    {value: 282, name: 'rose 2'},
                    {value: 226, name: 'rose 3'},
                    {value: 224, name: 'rose 4'},
                    {value: 222, name: 'rose 5'},
                    {value: 220, name: 'rose 6'},
                    {value: 128, name: 'rose 7'},
                    {value: 216, name: 'rose 8'}
                ]
            }
        ]
      };
      piechart.setOption(option);
    }
  }
}
</script>
<style scoped>
  .chart {
    min-width: 400px;
    min-height: 400px;
  }

</style>
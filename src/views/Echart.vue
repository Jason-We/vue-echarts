<template>
  <div class="about">
    <div class="header">
      <el-button @click="refresh">刷新</el-button>
    </div>
    <el-row :gutter='20'>
      <el-col :span='6'>
        <div id="pie-chart" class="chart">

        </div>
      </el-col>
      <el-col :span='9'>
        <div id="line-chart" class="chart">

        </div>
      </el-col>
      <el-col :span='9'>
        <div id="bar-chart" class="chart">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        pieData: []
      }
    },
    mounted() {
      this.drawPieChart();
      this.drawLineChart();
      this.drawBarChart();
    },
    methods: {
      refresh() {
        this.drawPieChart();
        this.drawLineChart();

      },
      drawPieChart() {
        let _this = this;
        this.getPieData().then(function (res) {
          let piechart = _this.$echarts.init(document.getElementById('pie-chart'));
          let option = {
            title: {
              text: '订单总量分类统计',
              left: 'center'
            },

            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              top: "6%"
            },
            series: [
              {
                name: '订单分类总量',
                type: 'pie',
                radius: '55%',
                roseType: 'angle',
                data: res
              }
            ]
          };
          piechart.setOption(option);
        })
      },
      drawLineChart() {
        let _this = this;
        let linechart = _this.$echarts.init(document.getElementById('line-chart'));

        setTimeout(function () {

          let option = {
            title: {
              text: '近一周订单量分类统计',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              showContent: false
            },
            dataset: {
              source: [
                ['status', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                ['未绑定', 41, 30, 65, 53, 83, 98, 43],
                ['已绑定', 86, 92, 85, 83, 73, 55, 23],
                ['已交接', 24, 67, 79, 86, 65, 82, 23]
              ]
            },
            xAxis: { type: 'category' },
            yAxis: { gridIndex: 0 },
            grid: { top: '55%' },
            series: [
              { type: 'line', smooth: true, seriesLayoutBy: 'row' },
              { type: 'line', smooth: true, seriesLayoutBy: 'row' },
              { type: 'line', smooth: true, seriesLayoutBy: 'row' },
              {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                label: {
                  formatter: '{b}: {@星期一} ({d}%)'
                },
                encode: {
                  itemName: 'status',
                  value: '星期一',
                  tooltip: '星期一'
                }
              }
            ]
          };

          linechart.on('updateAxisPointer', function (event) {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
              var dimension = xAxisInfo.value + 1;
              linechart.setOption({
                series: {
                  id: 'pie',
                  label: {
                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                  },
                  encode: {
                    value: dimension,
                    tooltip: dimension
                  }
                }
              });
            }
          });

          linechart.setOption(option);

        });
      },
      drawBarChart() {
        let _this = this;
        let barchart = _this.$echarts.init(document.getElementById('bar-chart'));
        var option = {
          title: {
            text: '近一周订单量分类统计',
            left: 'center'
          },
          legend: {
            top: '10%',
            itemGap: 20,
            itemWidth: 40,
            itemHeight: 15,
            data: ['未绑定', '已绑定', '已交接']
          },
          tooltip: {},
          dataset: {
            // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
            // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
            source: [
              ['', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
              ['未绑定', 41, 30, 65, 53, 83, 98, 43],
              ['已绑定', 86, 92, 85, 83, 73, 55, 23],
              ['已交接', 24, 67, 79, 86, 65, 82, 23]
            ]
          },
          xAxis: { type: 'category' },
          yAxis: { gridIndex: 0 },
          grid: { top: '25%' },
          series: [
            { name: '未绑定', type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 7, label: { show: true, position: 'right' } },
            { name: '已绑定', type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 7, label: { show: true, position: 'right' } },
            { name: '已交接', type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 7, label: { show: true, position: 'right' } },
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        barchart.setOption(option);
      },
      getPieData() {
        let _this = this;
        return new Promise(function (resolve, reject) {
          axios.get('/statis/pie').then(function (res) {
            if (res.data.code === 200) {
              resolve(res.data.data);
            } else {
              _this.$message.error('请求饼图数据失败 ，异常代码： ' + res.data.code);
            }
          })
        })
      }

    }
  }
</script>


<style scoped>
  .chart {
    min-width: 400px;
    min-height: 500px;
  }

  .header {
    padding: 10px;
  }
</style>
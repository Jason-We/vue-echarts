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
      <el-col :span='12'>
        <div id="line-chart" class="chart">
          
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  
  data(){
    return{
      pieData:[]
    }
  },
  mounted(){
    this.drawPieChart();
    this.drawLineChart();
  },
  methods:{
    refresh(){
      this.drawPieChart();
      this.drawLineChart();
    },
    drawPieChart(){
      let _this = this;
      this.getPieData().then(function(res){
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
          legend:{
            top:"6%"
          },
          series : [
              {
                  name: '订单分类总量',
                  type: 'pie',
                  radius: '55%',
                  roseType: 'angle',
                  data:res
              }
          ]
        };
        piechart.setOption(option);
      })
    },
    drawLineChart(){
      let _this = this;
      let linechart =  _this.$echarts.init(document.getElementById('line-chart'));
      
      setTimeout(function () {

          let option = {
              title: {
                text: '订单总量一周分类统计',
                left: 'center'
              },
              tooltip: {
                  trigger: 'axis',
                  showContent: false
              },
              dataset: {
                  source: [
                      ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                      ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                      ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                  ]
              },
              xAxis: {type: 'category'},
              yAxis: {gridIndex: 0},
              grid: {top: '55%'},
              series: [
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                  {
                      type: 'pie',
                      id: 'pie',
                      radius: '30%',
                      center: ['50%', '25%'],
                      label: {
                          formatter: '{b}: {@2012} ({d}%)'
                      },
                      encode: {
                          itemName: 'product',
                          value: '2012',
                          tooltip: '2012'
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
    getPieData(){
      let _this = this;
      return new Promise(function(resolve,reject){
        axios.get('/statis/pie').then(function(res){
          if(res.data.code === 200){
              resolve(res.data.data);
          }else{
              _this.$message.error('请求饼图数据失败 ，异常代码： '+ res.data.code);
          }
        })
      })
    }

  }
}
</script>


<style scoped>
.chart{
  min-width: 400px;
  min-height:500px;
}
.header{
  padding: 10px;
}
</style>


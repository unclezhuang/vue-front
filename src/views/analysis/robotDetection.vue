<template>

  <el-row>
    <el-col :span="8">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="card-item">
            <!-- 左边第一行卡片 -->
            <div style="display: flex; align-items: center;">
              <img class="card-logo" src="@/assets/img/c01.png">
              <span class="card-text">机器账号总数</span>
            </div>
            <div style="display: flex;align-items: center;">
              <div style="display:flex;align-self:center;flex-direction:column;margin-left: 20px;margin-bottom: 40px;">
                <span style="margin-bottom: 10px;font-size: 18px;color: #7D7D7D;">当前机器人账号总数</span>
                <span style="margin-bottom: 30px;font-size: 32px;color: #2EB1FC;font-weight: bold;">{{ currentRobotCount.toLocaleString() }}</span>
                <span style="margin-bottom: 10px;font-size: 18px;color: #7D7D7D;">历史机器人账号总数</span>
                <span style="font-size: 22px;color: #2EB1FC;font-weight: bold;">{{ totalRobotCount.toLocaleString() }}</span>
              </div>
              <div style="width: 300px; height: 250px;margin-left: 20px">
                <div ref="robot_distribution" style="width: 100%;height: 100%;"></div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="card-item">
            <!-- 左边第二行卡片 -->
            <div style="display: flex; align-items: center;">
              <img class="card-logo" src="@/assets/img/c02.png">
              <span class="card-text">机器账号概况</span>
              <div style="width:100px;margin-left: auto;">
                <el-select v-model="selectedTimeRange" placeholder="请选择时间范围" @change="getTimeData">
                  <el-option label="近7天" value="7"></el-option>
                  <el-option label="近15天" value="15"></el-option>
                  <el-option label="近30天" value="30"></el-option>
                </el-select>
              </div>
            </div>
            <div style="height: 200px;">
              <div ref="robot_distribution2" style="width: 100%;height: 100%;"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="card-item">
            <!-- 左边第三行卡片 -->
            <div style="display: flex; align-items: center;">
              <img class="card-logo" src="@/assets/img/c03.png">
              <span class="card-text">平台总数统计</span>
            </div>
            <div style="height: 210px;">
              <div ref="robot_distribution3" style="width: 100%;height: 100%;"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="16">
      <el-card class="card-right">
        <!-- 右边半个页面卡片 -->
        <div style="display: flex; align-items: center;">
          <img class="card-logo" src="@/assets/img/c04.png">
          <span class="card-text" style="width: 150px">机器人账号列表</span>
        </div>
        <div>多条件搜索</div>
        <div>排序与操作</div>
        <div>卡片列表
          <AccountCard v-bind:account-data="accountData"/>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script setup>

import {ref, reactive, onMounted} from 'vue'
import * as echarts from 'echarts'
import AccountCard from "@/components/AccountCard";

const robot_distribution = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
const robot_distribution2 = ref()
const robot_distribution3 = ref()

onMounted(() => {
  robotDistribution()
  robotDistribution2()
  robotDistribution3()
})
let currentRobotCount = ref(132351)
let totalRobotCount = ref(1323510)
let robotDistributionData = reactive(
    [
      {value: 1048, name: '机器'},
      {value: 735, name: '正常'}
    ]
)
let selectedTimeRange = ref("7")


function robotDistribution() {
  var myChart1 = echarts.init(robot_distribution.value);
  // 指定图表的配置项和数据
  var option1 = {
    color: ['#2EB1FC', '#D9D9D9'], // 设置颜色为蓝色和灰色
    tooltip: {
      trigger: 'item',
      // formatter: '{b} : {c} ({d}%)' //  {b} 表示数据项的名称，{c} 表示数据项的值，{d} 表示数据项所占比例的百分比
    },
    legend: {
      orient: 'horizontal', // 图例的布局方式，支持水平布局（'horizontal'）和垂直布局（'vertical'）两种方式。
      top: 'top',
    },
    series: [
      {
        name: '机器账号分布图',
        type: 'pie',
        radius: '50%', // 内半径、外半径
        data: robotDistributionData,
        label: {
          // position: 'inside',
          formatter: '{d}%'
        },
        labelLine: {
          length: 5,
          length2: 10,
        }
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);
}

function robotDistribution2() {
  var myChart2 = echarts.init(robot_distribution2.value);
  // 指定图表的配置项和数据
  var option2 = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['twitter', 'facebook', 'weibo'],
      top: '6%'
    },
    grid: {
      left: '1%',
      right: '3%',
      bottom: '2%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'twitter',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'facebook',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'weibo',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart2.setOption(option2);
}

function robotDistribution3() {
  var myChart3 = echarts.init(robot_distribution3.value);
  // 指定图表的配置项和数据
  var option3 = {
    color: ['#91e5a4', '#D9D9D9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['human', 'bot'],
      top: '6%'
    },
    grid: {
      left: '2%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['twitter', 'facebook', 'weibo']
    },
    series: [
      {
        name: 'human',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [320, 302, 210]
      },
      {
        name: 'bot',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 90]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart3.setOption(option3);
}

let accountData = reactive({
  "id": "984626",
  "task_id": "自动采集_20230407114352",
  "created_at": "Tue Jun 15 06:45:09 +0000 2010",
  "default_profile": "0",
  "default_profile_image": "0",
  "description": "中華民國第15任總統 President of the Republic of China (Taiwan)",
  "favourites_count": "505",
  "followers_count": "2372024",
  "fast_followers_count": "0",
  "normal_followers_count": "2372024",
  "friends_count": "25",
  "user_id": "155814794",
  "location": "Taipei City",
  "profile_background_image_url": "https://pbs.twimg.com/profile_banners/155814794/1675651333",
  "profile_image_url": "https://pbs.twimg.com/profile_images/1616607829305208832/wqRoWiTB_normal.jpg",
  "screen_name": "iingwen",
  "name": "蔡英文 Tsai Ing-wen",
  "statuses_count": "4317",
  "verified": "1",
  "media_count": "2187",
  "listed_count": "6095",
  "is_translator": "0",
  "translator_type": "none",
  "protected": "0",
  "possibly_sensitive": "0",
  "is_blue_verified": "0",
  "extended_profile": "",
  "crawl_time": "7/4/2023 13:48:09",
  "update_time": "7/4/2023 13:48:08.672998"
})

</script>

<style lang="scss" scoped>
.card-item {
  height: 280px;
  margin-bottom: 5px;
  margin-right: 5px;
}

.card-right {
  height: 855px;
}

.card-logo {
  height: 38px;
}

.card-text {
  border-bottom: 2px solid black;
  border-color: #2EB1FC;
  padding-bottom: 5px;
  color: #2EB1FC;
  font-size: 18px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  letter-spacing: 1.5px;
  text-align: center;
  width: 120px;
  margin-left: 5px;
}
</style>


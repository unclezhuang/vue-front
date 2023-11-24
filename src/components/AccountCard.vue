<template>
  <el-card class="account-card">
    <div style="display:flex;">
      <img :src="accountData.profile_image_url" :onerror="handleAvatarError" alt="用户头像" style="height: 50px;border-radius: 50%"/>
      <div style="display:flex;flex-direction:column;margin-left: 10px;width: 165px;">
        <div class="account-text" style="font-size: 14px;margin-bottom: 5px;">{{ accountData.name }}</div>
        <div class="account-text">用户ID：{{ accountData.screen_name }}</div>
        <div class="account-text">位置：{{ accountData.location }}</div>
        <div class="account-text">创建时间：{{ accountData.created_at }}</div>
        <div class="account-text">采集时间：{{ accountData.crawl_time }}</div>
      </div>
    </div>
    <hr style='background-color:#cecece; height:1.2px; border:none;'>
    <div style="display:flex;justify-content: space-between;width: 90%;margin-left: 10px;">
      <div style="display: flex;align-items:center;">
        <img class="account-logo" src="@/assets/img/account01.png">
        <span class="account-text">{{ computeNum(accountData.friends_count) }}</span>
      </div>
      <div style="display: flex;align-items:center;">
        <img class="account-logo" src="@/assets/img/account02.png">
        <span class="account-text">{{ computeNum(accountData.followers_count) }}</span>
      </div>
      <div style="display: flex;align-items:center;">
        <img class="account-logo" src="@/assets/img/account03.png">
        <span class="account-text">{{ computeNum(accountData.statuses_count) }}</span>
      </div>
    </div>
  </el-card>

</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import {computed} from 'vue';

const props = defineProps({
  accountData: {
    id: String,
    created_at: String,
    favourites_count: String,
    followers_count: String,
    friends_count: String,
    user_id: String,
    location: String,
    profile_image_url: {
      type: String,
      default: '@/assets/img/avatar.jpg'
    },
    screen_name: String,
    name: String,
    statuses_count: String,
    crawl_time: String,
  }
})


const computeNum = computed(() => {
  return (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };
});


// console.log('1111111',accountData.profile_image_url)

function handleAvatarError(event) {
  // console.log("image load failed")
  // console.log(event)
  // event.target.src = "@/assets/img/avatar.jpg";
  // event.οnerrοr = null;
  let img = event.srcElement
  img.src = require('@/assets/img/avatar.jpg')
  img.onerror = null
}

</script>

<style lang="scss" scoped>
.account-card {
  width: 269px;
  height: 160px;
  border-color: #cecece;
}

.account-text {
  /*width: 165px;*/
  font-size: 11px;
  color: #848484;
  padding-bottom: 5px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.account-logo {
  height: 25px;
}

</style>
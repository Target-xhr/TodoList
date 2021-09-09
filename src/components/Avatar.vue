<template>
  <div class="avatar" :class="{ avatar__selected: !!selected }">
    <div class="avatar_face">
      <img src="../assets/公子头像.png" />
    </div>
    <h2 class="avatar_name">早上好, 徐浩榕</h2>
    <p class="avatar_tips">
      充分利用好自己的时间吧.<br />你有 {{ todayTasks.length }} 项未完成 的任务
    </p>
    <p class="avatar_date">今日 : {{ today | dateString }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      today: new Date(),
    };
  },
  computed: {
    ...mapState(["selected"]),
    ...mapGetters(["todayTasks"]),
  },
  filters: {
    dateString(val) {
      return val
        .toDateString()
        .toUpperCase()
        .replace(/(\s\d{4})$/, ", $1");
    },
  },
};
</script>

<style lang="less">
.avatar {
  display: flex;
  padding: 0 5vw;
  height: 35vh;
  justify-content: flex-end;
  flex-direction: column;
  transition: all 0.5s ease;
}
.avatar__selected {
  transform: translate3d(0, 20px, 0);
  opacity: 0;
}
.avatar_face {
  width: 80px;
  height: auto;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 1vw 1vh 1vw rgba(0, 0, 0, 0.4);

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.avatar_name {
  margin-top: 1vh;
  padding: 0 2vw;
  font-size: 7vw;
  letter-spacing: 0.5vw;
  font-weight: 300;
  color: white;
}
.avatar_tips {
  padding: 0 2vw;
  font-size: 5vw;
  font-weight: 300;
  opacity: 0.8;
}
.avatar_date {
  margin-bottom: 2vh;
  padding: 0 2vw;
  font-size: 5vw;
}
</style>

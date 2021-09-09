<template>
  <div class="app-bar">
    <span class="app-bar_l">
      <i :class="['fa', `fa-${left}`]"></i>
    </span>
    <h1>{{ title }}</h1>
    <span class="app-bar_r">
      <!-- 拼接fa fa-search, 注意用的是反单引号 -->
      <i :class="['fa', `fa-${right}`]"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    left: {
      type: String,
      default: 'chevron-left'
    },
    right: {
      type: String,
      default: 'ellipsis-v'
    }
  }
}
</script>

<style lang="less">
.app-bar {
  display: flex;
  align-items: center;
  height: 5vh;
  font-size: 2vh;
  z-index: 1;
  h1 {
    margin-top: 1.5vh;
    display: flex;
    justify-content: center;
    flex: 1;
    color: white;
  }
  span {
    padding: 0 5vw;
  }
}
</style>
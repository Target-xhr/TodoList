<template>
  <div class="todo" :class="{ todo_selected: selected }">
    <div class="todo_head" @click="handleClick">
      <div class="todo_icon" :style="{ color }">
        <i :class="['fa', `fa-${todo.icon}`]"></i>
      </div>
      <div class="todo_menu"><i class="fa fa-ellipsis-v"></i></div>
    </div>
    <div class="todo_body">
      <p class="todo_tips">{{ todo.tasks.length }} Tasks</p>
      <h3 class="todo_title">{{ todo.name }}</h3>
      <div class="todo_progress">
        <span class="todo_progress_line">
          <i :style="{ width: progress, backgroundImage: progressColor }"></i>
        </span>
        <span class="todo_progress_num"> {{ progress }}</span>
      </div>
      <div class="todo_tasks">
        <h4 class="todo_subtitle" v-if="todayTasks.length">Today</h4>
        <ul>
          <li v-for="task in todayTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
        </ul>
        <h4 class="todo_subtitle" v-if="tomorrowTasks.length">Tomorrow</h4>
        <ul>
          <li v-for="task in tomorrowTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
        </ul>
        <h4 class="todo_subtitle" v-if="outdatedTasks.length">Outdated</h4>
        <ul>
          <li v-for="task in outdatedTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { today, tomorrow } from "../shared";
import task from "./Task.vue";
export default {
  name: "",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
  },
  computed: {
    color() {
      return this.todo.colors[0];
    },
    progress() {
      const totalCount = this.todo.tasks.filter((t) => !t.deleted).length;
      const doneCount = this.todo.tasks.filter(
        (t) => !t.deleted && t.done
      ).length;
      return `${Math.round((doneCount / totalCount) * 100)}%`;
    },
    progressColor() {
      const colorBottom = `${this.todo.colors[0]} 30%`;
      const colorTop = `${this.todo.colors[1]}`;
      return `-webkit-linear-gradient(left bottom, ${colorBottom}, ${colorTop})`;
    },
    todayTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date >= today && task.date < tomorrow;
      });
    },
    tomorrowTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date >= tomorrow;
      });
    },
    outdatedTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date < today;
      });
    },
  },
  components: {
    task,
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      const appRect = document.querySelector("#app").getBoundingClientRect();
      const elRect = this.$el.getBoundingClientRect();
      const todo = this.todo;
      const rect = {};

      rect.top = elRect.top - appRect.top;
      rect.left = elRect.left - appRect.left;
      rect.width = elRect.width;
      rect.height = elRect.height;
      rect.appWidth = appRect.width;
      rect.appHeight = appRect.height;

      this.$emit("select", { rect, todo });
    },
  },
};
</script>

<style lang="less" scoped>
.todo {
  flex: 1;
  margin: 5vh 5vw;
  overflow: hidden;
  box-shadow: 0 5vh 5vh rgba(0, 0, 0, 0.3);
  color: #666;
  transition: all 0.5s ease;
}
.todo_selected {
  visibility: hidden;
}
.todo_head {
  display: flex;
  padding: 5vw;
  height: 5vh;
  justify-content: flex-start;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
.todo_body {
  padding: 0 2vw;
  transform: translate3d(0, 5vh, 0);
  will-change: transform;
}
.todo_icon {
  display: flex;
  width: 50px;
  height: 50px;
  border: 3px solid #eee;
  border-radius: 100%;
  //这两句把图标放到了圆中心
  justify-content: center;
  align-items: center;
  font-size: 3vh;
}
.todo_menu {
  color: #eee;
}
.todo_tips {
    margin-top: 10vh;
  padding-left: 3vw;
  opacity: 0.6;
  font-size: 5vw;
  font-weight: 600;
}
.todo_title {
  padding-left: 3vw;
  margin-top: 5vh;
  font-size: 6vw;
}
.todo_progress {
  padding-left: 3vw;
  display: flex;
  align-items: center;
  margin-top: 1vh;
}
.todo_progress_line {
  margin-right: 10px;
  flex: 1;
  height: 8px;
  background-color: #eee;

  i {
    display: block;
    height: 100%;
    transition: all 0.5s ease;
  }
}
.todo_progress_num {
  font-size: 4vw;
}
.todo_tasks {
  opacity: 0;
  transform: scale3d(1, 0, 1);
}
.todo_subtitle {
  margin-top: 32px;
  margin-bottom: 8px;
  color: #999;
}
</style>
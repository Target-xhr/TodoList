<template>
  <transition name="fade">
    <div class="task" v-if="!task.deleted">
      <input type="checkbox" />
      <input :id="id" type="checkbox" v-model="task.done" />
      <label :for="id">{{ task.title }}</label>
      <transition name="fade">
        <span
          class="task_delete"
          v-show="task.done"
          @click="deleteTask({ task })"
        >
          <i class="fa fa-trash"></i>
        </span>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";
let GID = 1;
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: `task-${GID++}`,
    };
  },
  methods: {
    ...mapMutations(["deleteTask"]),
  },
};
</script>

<style lang="less">
.task {
  display: flex;
  padding: 1vh 0;
  border-bottom: 1px solid #eee;
  font-size: 2vh;
}
.task input {
  display: none;
}
.task label {
  flex: 1;
  line-height: 1.5vh;
}
.task label:before,
.task label:after {
  content: "";
  display: inline-block;
  margin-right: 1.5vw;
  margin-top: 0.3vh;
  width: 2vh;
  height: 2vh;
  vertical-align: top;
}
.task label:before {
  border: 1vh solid #ccc;
  border-radius: 100%;
  background-color: white;
}
.task label:after {
  content: "\f00c";
  position: relative;
  display: none;
  z-index: 10;
  margin-right: -5vw;
  border-radius: 100%;
  font: normal normal normal 2vh/1 FontAwesome;
  color: rgb(24, 84, 214);
  background-color: #ccc;
  float: left;
}
.task input:checked + label:after {
  display: inline-block;
}
.task_delete {
  padding: 0 1vw;
  color: rgb(22, 21, 21);
  font-size: 1.5vh;
}
.fade-leave-to,
.fade-enter {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
</style>
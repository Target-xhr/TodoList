<template>
  <div class="todo-list">
    <ul :style="{ width: `${todos.length * 100}%` }">
      <li
        v-for="todo in todos"
        :class="choose"
        :key="todo.name"
        :style="{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }"
      >
        <!-- todo来自li的单个tudo -->
        <todo
          :todo="todo"
          :selected="selected && selected.todo === todo"
          @select="selectTodo"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Todo from "./Todo.vue";
export default {
  name: "",

  data() {
    return {
      lis: null,
    };
  },

  mounted() {
    
    let touch = {};
    this.$el.addEventListener("touchstart", (evt) => {
      touch.startX = evt.touches[0].clientX;
      touch.endX = 0;
    });
    this.$el.addEventListener("touchmove", (evt) => {
      touch.endX = evt.touches[0].clientX;
    });
    this.$el.addEventListener("touchend", () => {
      if (!touch.endX || Math.abs(touch.endX - touch.startX) < 10) {
        return;
      }
      if (touch.endX < touch.startX) {
        this.nextTodo();
        let last_class = this.classes.pop()
        this.classes.unshift(last_class)
        console.log(this.classes)
      } else {
        this.prevTodo();
        let first_class = this.classes.shift()
        this.classes.push(first_class)
        console.log(this.classes)
      }
    });
  },
  components: {
    Todo,
  },
  computed: {
    ...mapState(["todos", "currentIndex", "selected"]),
  },
  data() {
    return {
      classes:['Personal', 'Work', 'Home']
    };
  },
  methods: {
    ...mapMutations(["selectTodo", "nextTodo", "prevTodo"]),
    choose(){
      return this.classes
    },
  },
 
};
</script>

<style lang="less" scoped>
.todo-list {
  padding-top: 0 32px;
  height: 60vh;
  transition: all 0.5s ease;

  > ul,
  > ul > li {
    display: flex;
    height: 100%;
  }
  > ul > li {
    flex: 1;
    transition: transform 0.5s ease;
  }
  .todo {
    border-radius: 8px;
    background-color: white;
  }
}
.todo-list_selected {
  //X轴放大1.25倍
  transform: scaleX(1.25);
}
</style>
import Vue from 'vue'
import Vuex from 'vuex'
import { tomorrow } from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: 1,
    todos: [
      {
        index: 1,
        icon: 'user',
        name: 'Personal',
        tasks: [
          {
            id: 1,
            title: '原神-大号每日体力',
            date: new Date(),
            done: true,
            deleted: false
          },
          {
            id: 2,
            title: '锻炼',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id:3,
            title: '聚餐唱K',
            date: new Date(),
            done: false,
            deleted: false

          }

        ],
        colors: ['#ff6262', '#ffa947']
      },
      {
        index:2,
        icon: 'suitcase',
        name: 'Work',
        tasks: [
          {
            id: 3,
            title: 'Design Sprint',
            date: new Date(),
            done: true,
            deleted: false
          },
          {
            id: 4,
            title: 'Icon Set Design for Mobile App',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 5,
            title: 'HTML/CSS Study',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 6,
            title: 'Weekly Report',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 7,
            title: 'Design Meeting',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            title: 'Quick Prototyping',
            date: new Date('2019-09-16'),
            done: false,
            deleted: false
          },
          {
            id: 8,
            title: 'UX Conference',
            date: new Date('2019-09-16'),
            done: false,
            deleted: false
          }
        ],
        colors: ['#5b9df9', '#47bfff']
      },
      {
        index:3,
        icon: 'home',
        name: 'Home',
        tasks: [
          {
            id: 1,
            title: 'House Keeping',
            date: new Date(),
            done: true,
            deleted: false
          },
          {
            id: 2,
            title: '买酱油',
            date: new Date(),
            done: false,
            deleted: false
          }
        ],
        colors: ['#2c7d59', '#3ba776']
      }
    ],

    selected: null,
    unselect: null,
    editing: null
  },
  getters: {
    currentTodo(state) {
      return state.todos[state.currentIndex]
    },
    todayTasks(state) {
      const tasks = []
      state.todos.forEach(todo => {
        todo.tasks.forEach(task => {
          if (task.date <= tomorrow && !task.done && !task.deleted) {
            tasks.push(task)
          }
        })
      })
      return tasks
    }
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：
  // 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
  // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
  mutations: {
    selectTodo(state, selected) {
      state.unselect = null
      state.selected = selected
    },
    unselectTodo(state) {
      state.unselect = state.selected
      state.selected = null
    },
    nextTodo(state) {
      if (state.currentIndex < state.todos.length - 1) {
        state.currentIndex++
      }
      else{
        state.currentIndex = 0
      }
    },
    prevTodo(state) {
      if (state.currentIndex > 0) {
        state.currentIndex--
      }
      else{
        state.currentIndex = 2
      }
    },
    deleteTask(_, { task }) {
      task.deleted = true
    },
    toggleEditing(state) {
      if (state.editing && state.editing.text) {
        state.selected.todo.tasks.unshift({
          title: state.editing.text,
          date: new Date(),
          done: false,
          deleted: false
        })
      }
      state.editing = state.editing ? null : { text: '' }
    }
  },
  actions: {}
})

Vue.component('tasks', {
    template: `
        <section class="todoapp">
            <header class="header">
                <h1>Tasks</h1>
                <input type="text" 
                    class="new-todo"
                    v-on:keyup.enter="add"
                    v-model="newTask"
                    placeholder="What do you want to do today?"
                >
            </header>
            <section>
                <ul class="todo-list">
                    <li class="todo" 
                        is="task" 
                        v-for="task in tasks" 
                        :task="task"
                    ></li>
                </ul>
            </section>
            <footer class="footer" v-show="tasks.length">
                <span class="todo-count">Complete: {{ completed }} | Incompleted: {{ incompleted }}</span>
            </footer>
        </section>
    `,
    data: function() {
        return {
            newTask: "",
            tasks: [
                { title: "Meet with the QA team", completed: true },
                { title: "Fix connection", completed: false },
                { title: "Pay mobile phone bill", completed: true }
            ]
        }
    },
    methods: {
        add() {
            if (this.newTask.length <= 1) return alert('Task cannot be empty');

            this.tasks.push({
                title: this.newTask,
                completed: false
            });

            this.newTask = "";
        }        
    },
    computed: {
        incompleted() {
            return this.tasks.filter((task) => {
                return ! task.completed;
            }).length;
        },
        completed() {
            return this.tasks.filter((task) => {
                return task.completed;
            }).length;
        }
    }
});

Vue.component('task', {
    props: ['task'],
    template: `
        <li :class="classes">
            <div class="view">
                <input type="checkbox" class="toggle" v-model="task.completed" />
                <label v-text="task.title" @dblclick="edit()"></label>
                <button class="destroy" @click="remove()"></button>
            </div>
            <input class="edit" 
                type="text" 
                v-model="task.title" 
                @keyup.enter="doneEdit()"
                @blur="doneEdit()"
                @keyup.esc="cancelEdit()"
            />
        </li>
    `,
    data: function() {
        return { 
            editing: false,
            cacheBeforeEdit: ''
        }
    },
    methods: {
        remove() {
            let tasks = this.$parent.tasks;
            tasks.splice(tasks.indexOf(this.task), 1);
        },
        edit() {
            this.cacheBeforeEdit = this.task.title;
            this.editing = true;
        },
        cancelEdit() {
            this.editing = false;
            this.task.title = this.cacheBeforeEdit;
        },
        doneEdit() {
            if (! this.task.title) {
                this.remove
            }
            this.editing = false;
        }
    },
    computed: {
        classes() {
            return {completed: this.task.completed, editing: this.editing};
        }
    }
})

const app = new Vue({
    el: '#app'    
})
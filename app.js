Vue.component('tasks', {
    template: `
        <div>
            <h1>Lista de tareas</h1>
            <h4 v-if="completed">Tareas completas: {{ completed }}</h4>
            <h4 v-if="incompleted">Tareas incompletas: {{ incompleted }}</h4>
            <ul>
                <li is="task" v-for="task in tasks" :task="task"></li>
                <li class="form-inline">
                    <div class="row g-3">
                        <div class="col-auto">
                            <input type="text" 
                                class="form-control"
                                v-on:keyup.enter="add"
                                v-model="newTask"
                            >
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `,
    data: function() {
        return {
            newTask: "",
            tasks: [
                { title: "Programar con los daneses", completed: true },
                { title: "Ver app de los milicos", completed: false },
                { "title": "Pagar expensas", completed: true }
            ]
        }
    },
    methods: {
        add() {
            if (this.newTask.length <= 1) return alert('La tarea no puede estar vacia');

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
        <li>
            <span v-text="task.title"></span>
            <i @click="complete()" :class="classes"></i>
        </li>
    `,
    methods: {
        complete() {
            this.task.completed = ! this.task.completed;
        }
    },
    computed: {
        classes() {
            return ['fa', this.task.completed ? 'fa-check-square-o' : 'fa-square-o'];
        }
    }
})

const app = new Vue({
    el: '#app'    
})
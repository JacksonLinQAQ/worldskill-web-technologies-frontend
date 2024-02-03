import Todo from './todo.js'

export default class Project {
    constructor (name, id = Math.random().toString(36).slice(2, 7)) {
        this.id = id
        this.name = name;
        this.todos = []
    }
    add_todo (content, created_date = Date(), edited_date = Date(), id = Math.random().toString(36).slice(2, 7)) {
        this.todos.push(new Todo(content, created_date, edited_date, id))
    }
    get_todo (id) {
        this.todos.forEach((todo) => {
            if (todo.id == id) {
                return todo
            }
        })
    }
    remove_todo (id) {
        let todo = this.get_todo(id)
        let index = this.todos.indexOf(todo)
        this.todos.splice(index, 1)
    }
    to_JSON () {
        let json = {
            id: this.id,
            name: this.name,
            todos: []
        }
        this.todos.forEach((todo) => {
            json.todos.push(todo.to_JSON())
        })
        return json
    }
}
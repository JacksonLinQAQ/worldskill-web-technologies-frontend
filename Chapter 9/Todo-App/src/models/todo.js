export default class Todo {
    constructor (content, created_date = Date(), edited_date = Date(), id = Math.random().toString(36).slice(2, 7)) {
        this.id = id
        this.content = content
        this.created_date = created_date
        this.edited_date = edited_date
        this.done = false
    }
    edit_todo (content) {
        this.content = content
    }
    done_todo () {
        this.done = true
    }
    to_JSON () {
        return {
            id: this.id,
            content: this.content,
            created_date: this.created_date,
            edited_date: this.edited_date,
            done: this.done
        }
    }
}
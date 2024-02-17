<script setup>
    import { ref, watch } from 'vue';
    import Project from '../models/project.js';
    import { useRoute } from 'vue-router';

    const form_data = {
        content: null
    }

    const route = useRoute()

    let projects = ref([])
    let current_project = ref(null)

    const load_projects = () => {
        let json = JSON.parse(localStorage.getItem('projects'))
        if (json) {
            json.forEach(project => {
                let index = projects.value.push(new Project(project.name, project.id)) - 1
                project.todos.forEach((todo) => {
                    projects.value[index].add_todo(todo.content, todo.created_date, todo.edited_date, todo.id)
                })
            })
        }

        projects.value.forEach((p) => {
            if (p.id == route.params.id) {
                current_project.value = p
            }
        })
    }

    const add_todo = () => {
        console.log(form_data.content)
        current_project.value.add_todo(form_data.content)
        form_data.content = null;
    }

    load_projects()

    watch(current_project, () => {
        let json = []
        projects.value.forEach(project => {
            json.push(project.to_JSON())
        });
        localStorage.setItem('projects', JSON.stringify(json))
    }, {deep: true})

    watch(route, () => {
        load_projects()
    })
</script>

<template>
    <div class="flex flex-col p-2">
        <h1 v-if="!current_project">Project not found</h1>
        <h1 class="text-bold text-[25px]" v-if="current_project">{{ current_project.name }}</h1>
        <div v-if="current_project" class="flex flex-col">
            <span v-for="todo in current_project.todos">
                - {{ todo.content }}
            </span>
        </div>
        <form v-if="current_project" @submit.prevent="add_todo" class="flex gap-2">
            <input type="text" v-model="form_data.content" placeholder="New Todo Content" class="rounded-full p-1 px-2">
            <input type="submit" value="Add" class="rounded-full p-1 px-4 bg-white">
        </form>
    </div>
</template>
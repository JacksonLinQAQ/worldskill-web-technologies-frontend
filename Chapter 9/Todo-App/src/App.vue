<script setup>
    import { ref, watch } from 'vue'
    import Project from './models/project.js'
    import { RouterLink, RouterView } from 'vue-router';
    const form_data = {
        name: null
    }
    const projects = ref([])

    watch(projects.value, () => {
        let json = []
        projects.value.forEach(project => {
            json.push(project.to_JSON())
        });
        localStorage.setItem('projects', JSON.stringify(json))
    })

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
    }

    const add_project = () => {
        projects.value.push(new Project(form_data.name))
        form_data.name = null;
    }

    load_projects()
</script>

<template>
    <div class="flex h-screen">
        <div class="block strink-0 w-[300px] bg-red-100">
            <span class="block w-full text-center p-2 font-bold">Todo App</span>
            <span class="block p-2">&rArr; Projects:</span>
            <ul class="">
                <li class="p-2" v-for="project in projects">
                    <RouterLink :to="`./${project.id}`">&rarr; {{ project.name }}</RouterLink>
                </li>
            </ul>
            <form @submit.prevent="add_project" class="flex gap-2">
                <input type="text" v-model="form_data.name" placeholder="New Project Name" class="rounded-full p-1 px-2">
                <input type="submit" value="Add" class="rounded-full p-1 px-4 bg-white">
            </form>
        </div>
        <RouterView class="grow bg-blue-100"/>
    </div>
</template>
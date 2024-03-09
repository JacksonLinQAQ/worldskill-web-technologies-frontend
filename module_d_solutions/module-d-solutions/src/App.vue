<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

let user_auth = useAuthStore()

console.log(user_auth.onLogin())
console.log(user_auth.status)

</script>

<template>
  <nav>
    <h1>WorldSkills: Games</h1>
    <div class="login" v-if="!user_auth.status">
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/signup">Signup</RouterLink>
    </div>
    <div class="loggedin" v-if="user_auth.status">
      <span>{{ user_auth.user }}</span>
      <button @click="user_auth.onLogout">Logout</button>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .1);
  }

  nav > div
  {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  nav > div.login > a
  {
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;
    text-decoration: none;
    color: black;
    border-radius: 8px;
    transition: 0.1s ease-in;
  }

  nav > div.loggedin > button {
    height: 36px;
    padding: 6px;
    font-size: 15px;
    padding-left: 10px;
    padding-right: 10px;
    text-decoration: none;
    color: rgb(255, 255, 255);
    border-radius: 8px;
    transition: 0.1s ease-in;
    border: none;
  }

  nav > div.login > a:hover {
    background-color: #eee;
  }

  nav > div.login > a:nth-child(2),
  nav > div.loggedin > button
  {
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #53c8f7;
    color: #fff;
    font-weight: 600;
  }

  nav > div.login > a:nth-child(2):hover,
  nav > div.loggedin > button:hover
  {
    background-color: #a8def3;
    cursor: pointer;
  }
</style>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useGamesStore } from '@/stores/games';

let user_auth = useAuthStore()
let games = useGamesStore()

games.getGames()
</script>

<template>
  <div>
    <table width="100%">
      <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Description</th>
        <th>Popularity</th>
        <th>Upload Date</th>
      </tr>
      <tr v-for="(game, idx) in games.games_list.content">
        <td>{{ idx + 1 }}</td>
        <td>
          <img v-if="game.thumbnail" width="30" height="30" :src="'http://localhost:8000/module_c_solution/game/' + game.slug + '/' + String(game.thumbnail).split('/').at(-1)">
        </td>
        <td>{{ game.title }}</td>
        <td>{{ game.author }}</td>
        <td>{{ game.description }}</td>
        <td>{{ game.scoreCount }}</td>
        <td>{{ game.uploadTimestamp.slice(0, 10) }} {{ game.uploadTimestamp.slice(11, 19) }}</td>
      </tr> 
    </table>
  </div>
  
</template>

<style scoped>
  div {
    margin: 5px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .1);
    background-image: linear-gradient(to bottom, #53c8f7 5.2%, #53c9f723 5.2%);
  }

  table {
    width: 100%;
    justify-content: center;
    gap: 20px;
  }

  table > tr {
    gap: 20px;
  }

  table > tr:nth-child(1) {
    color: white;
  }

  table > tr > td {
    text-align: center;
    padding: 5px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f5f3f3;
  }

  table > tr > td:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }

  table > tr > th {
    font-weight: 500;
    border-bottom: 1px solid #d4d4d4;
    padding: 5px;
  }

  table > tr > th:nth-child(1),
  table > tr > th:nth-child(2),
  table > tr > td:nth-child(1),
  table > tr > td:nth-child(2) {
    width: 40px;
  }
</style>
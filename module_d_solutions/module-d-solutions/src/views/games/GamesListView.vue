<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useGamesStore } from '@/stores/games';

let games = useGamesStore()

games.getGames()

const setSelectedSort = (s_by = null, s_dir = null) => {
  if (s_by) {
    games.sort_rule.sortBy = s_by
    games.getGames()
    document.querySelector(`button[s-by='${s_by}']`).setAttribute('s-selected')
    document.querySelectorAll(`button[s-selected]`).forEach((e) => {
      e.removeAttribute('s-selected')
    })
  }
  if (s_dir){
    games.sort_rule.sortDir = s_dir
    games.getGames()
    document.querySelector(`button[s-dir='${s_dir}']`).setAttribute('s-selected')
    document.querySelectorAll(`button[s-selected]`).forEach((e) => {
      e.removeAttribute('s-selected')
    })
  }
}
</script>

<template>
  <div class="main">
    <div class="headline">
      <h1>{{ games.games_count }} Games available</h1>
      <div class="sort">
        <div class="sort-by">
          <button s-by="popular" @click="() => {games.sort_rule.sortBy = 'popular'; games.getGames()}">Popularity</button>
          <button s-by="uploaddate" @click="() => {games.sort_rule.sortBy = 'uploaddate'; games.getGames()}">Recently Updated</button>
          <button s-by="title" @click="() => {games.sort_rule.sortBy = 'title'; games.getGames()}">Alphabetically</button>
        </div>
        <div class="sort-dir">
          <button s-dir="asc" @click="() => {games.sort_rule.sortDir = 'asc'; games.getGames()}">ASC</button>
          <button s-dir="desc" @click="() => {games.sort_rule.sortDir = 'desc'; games.getGames()}">DESC</button>
        </div>
      </div>
    </div>
    <div class="game" v-for="(game, idx) in games.games_list">
      <div class="title">
        <span class="game-title">{{ game.title }} <span class="game-author">by {{ game.author }}</span></span>
        <span># Score Submitted: {{ game.scoreCount }}</span>
      </div>
      <div class="content">
        <img v-if="game.thumbnail" width="200" height="200" :src="'http://localhost:8000/module_c_solution/game/' + game.slug + '/' + String(game.thumbnail).split('/').at(-1)">
        <img v-else width="200" height="200">
        <span>{{ game.description }}</span>
      </div>
    </div> 
  </div>
</template>

<style scoped>
  div.main {
    display: flex;
    flex-direction: column;
    margin: 5px;
    margin-left: 200px;
    margin-right: 200px;
    padding: 5px;
    background-color: rgba(52, 179, 252, 0.253);
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .1);
    gap: 5px;
  }

  div.main > div.headline > div.sort {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  div.main > div.headline {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    align-items: center;
  }

  div.main > div.headline > div.sort > div.sort-by,
  div.main > div.headline > div.sort > div.sort-dir
  {
    display: flex;
    border-radius: 10px;
    background-color: white;
    padding: 5px;
    gap: 5px;
  }

  div.main > div.headline > div.sort > div.sort-by > button,
  div.main > div.headline > div.sort > div.sort-dir > button
  {
    transition: 0.2s ease-in-out;
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    border: none;
  }

  div.main > div.headline > div.sort > div.sort-by button[s-selected],
  div.main > div.headline > div.sort > div.sort-dir button[s-selected]
  {
    background-color: #8fd8f5;
    color: white;
  }
  
  div.main > div.headline > div.sort > div.sort-by > button:hover,
  div.main > div.headline > div.sort > div.sort-dir > button:hover
  {
    border-radius: 10px;
    background-color: #53c8f7;
    color: white;
    cursor: pointer;
    padding: 10px;
    border: none;
  }

  div.main > div.game {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .1);
  }

  div.main > div.game > div.title > span.game-title {
    font-size: 20px;
    font-weight: 500;
  }

  div.main > div.game > div.title > span.game-title > span.game-author {
    font-size: 14px;
    margin-left: 10px;
  }

  div.main > div.game > div.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.main > div.game > div.content {
    display: flex;
    align-items: start;
    gap: 20px;
  }
</style>
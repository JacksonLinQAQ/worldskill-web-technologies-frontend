import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

export const useGamesStore = defineStore('games', {
    state: () => ({
        response: {},
        sort_rule: {
            sortBy: null,
            sortDir: null
        },
        games_count: 0,
        games_list: []
    }),
    actions: {
        async getGames() {
            let fetch_url
            if (this.sort_rule.sortBy && this.sort_rule.sortDir) {
                fetch_url = `http://localhost:8000/module_c_solution/api/v1/games?sortBy=${this.sort_rule.sortBy}&sortDir=${this.sort_rule.sortDir}`
            } else {
                fetch_url = "http://localhost:8000/module_c_solution/api/v1/games"
            }

            let response = await fetch(fetch_url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })

            this.response = await response.json()
            this.games_list = this.response.content
            this.games_count = this.games_list.length
        }
    }
})
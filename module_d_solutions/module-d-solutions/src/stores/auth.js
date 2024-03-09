import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
      status: false,
      user: null,
      token: null,
      login_form: {
        username: null,
        password: null
      }
  }),
  actions: { 
    async onLogin () {
      let token = localStorage.getItem("auth-token")
      let user = localStorage.getItem("auth-user")
      if ((!token) && this.login_form.username && this.login_form.password) {
        let response = await fetch("http://localhost:8000/module_c_solution/api/v1/auth/signin", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(this.login_form)
        })
        response = await response.json()
    
        if (response.status === 'success') {
          localStorage.setItem("auth-token", response.token)
          localStorage.setItem("auth-user", this.login_form.username)
          this.status = true
          this.user = this.login_form.username
          this.token = response.token
        } else {
          this.status = false
          this.user = null
          this.token = null
        }

        this.login_form.password = null
      } else if (token) {
        this.status = true

        let response = await fetch(`http://localhost:8000/module_c_solution/api/v1/users/${user}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        })
    
        if (response.status == 200) {
          this.status = true
          this.user = user
          this.token = token
        } else {
          this.status = false
          this.user = null
          this.token = null
        }
      }
    
      if (this.status) {
        router.push({
          path: '/'
        })
      }
    },
    onLogout() {
      localStorage.removeItem("auth-token")
      localStorage.removeItem("auth-user")
      this.status = false
      this.user = null
      this.token = null
    }
  }
})
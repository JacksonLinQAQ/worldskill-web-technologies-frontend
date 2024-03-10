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
        password: null,
        confirm_password: null
      },
      alert_msgs: []
  }),
  actions: {
    async onLogin (useLoginForm = null) {
      this.alert_msgs = []
      let token = localStorage.getItem("auth-token")
      let user = localStorage.getItem("auth-user")
      if ((!token) && useLoginForm) {
        if (!this.login_form.username) {
          this.alert_msgs.push('Username is required.')
        }
        if (!this.login_form.password) {
          this.alert_msgs.push('Password is required.')
        }
        if (JSON.stringify(this.alert_msgs) != '[]') {
          return
        }
        
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
          this.alert_msgs.push(response.message)
          this.status = false
          this.user = null
          this.token = null
        }

        this.login_form.password = null
        this.login_form.confirm_password = null

        if (this.status) {
          router.replace('/')
        }
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
    },
    async onSignup() {
      this.alert_msgs = []
      if (!this.login_form.username) {
        this.alert_msgs.push('Username is required.')
      }
      if (!this.login_form.password) {
        this.alert_msgs.push('Password is required.')
      }
      if (!this.login_form.confirm_password) {
        this.alert_msgs.push('Confirm Password is required.')
      }
      if (this.login_form.password != this.login_form.confirm_password) {
        this.alert_msgs.push('Confirm Password not match with Password.')
      }
      if (JSON.stringify(this.alert_msgs) != '[]') {
        return
      }

      let response = await fetch("http://localhost:8000/module_c_solution/api/v1/auth/signup", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.login_form)
      })
      response = await response.json()

      if (response.status == 'success') {
        localStorage.setItem("auth-token", response.token)
        localStorage.setItem("auth-user", this.login_form.username)
        this.status = true
        this.user = this.login_form.username
        this.token = response.token
      } else {
        Object.keys(response.violations).forEach((key) => {
          this.alert_msgs.push(`${String(key).charAt(0).toUpperCase()}${key.slice(1)} is ${String(response.violations[key].message).toLowerCase()}.`)
        })
        this.status = false
        this.user = null
        this.token = null
      }

      this.login_form.password = null
      this.login_form.confirm_password = null

      if (this.status) {
        router.replace('/')
      }
    },
    onLogout() {
      this.alert_msgs = []
      localStorage.removeItem("auth-token")
      localStorage.removeItem("auth-user")
      this.status = false
      this.user = null
      this.token = null
    }
  }
})
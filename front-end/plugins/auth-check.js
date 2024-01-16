// plugins/auth-check.js
import { useUserStore } from "~/stores"
import { jwtDecode } from "jwt-decode"

export default ({ app }) => {
  const userStore = useUserStore()

  if (userStore.userToken) {
    const decoded = jwtDecode(userStore.userToken)
    userStore.setUser(decoded.user_id)
  }
}

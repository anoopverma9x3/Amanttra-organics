import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  // ✅ Send OTP
  const sendOtp = async (phone) => {
    try {
      console.log("Calling send OTP API...")

      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      })

      return res.ok
    } catch (err) {
      console.log(err)
      return false
    }
  }

  // ✅ Verify OTP (FIXED)
  const verifyOtp = async (phone, otp) => {
    try {
      console.log("Calling verify OTP API...")

      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone, otp })
      })

      const data = await res.json()

      if (data.success) {
        const userData = { phone }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))

        return true
      }

      return false
    } catch (err) {
      console.log(err)
      return false
    }
  }

  // ✅ Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, sendOtp, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
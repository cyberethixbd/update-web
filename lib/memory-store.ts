// Simple in-memory data store to replace MongoDB

// Type definitions
export interface User {
  id: string
  name: string
  email: string
  password: string
  image?: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  userId: string
  userEmail: string
  method: string
  mobileNumber: string
  transactionId: string
  amount: number
  orderId: string | null
  status: "pending" | "verified" | "rejected"
  createdAt: Date
  verifiedAt: Date | null
  verifiedBy: string | null
  adminNotes?: string
}

export interface PaymentLog {
  id: string
  paymentId: string
  action: string
  userId: string
  timestamp: Date
  details: Record<string, any>
}

// In-memory storage
class MemoryStore {
  private users: User[] = []
  private payments: Payment[] = []
  private paymentLogs: PaymentLog[] = []
  private initialized = false

  constructor() {
    // Load data from localStorage in client-side
    if (typeof window !== "undefined") {
      this.loadFromStorage()
    } else {
      // Initialize with sample data in server-side
      this.initializeWithSampleData()
    }
  }

  private loadFromStorage() {
    try {
      const usersData = localStorage.getItem("users")
      const paymentsData = localStorage.getItem("payments")
      const paymentLogsData = localStorage.getItem("paymentLogs")

      if (usersData) this.users = JSON.parse(usersData)
      if (paymentsData) this.payments = JSON.parse(paymentsData)
      if (paymentLogsData) this.paymentLogs = JSON.parse(paymentLogsData)

      this.initialized = true
    } catch (error) {
      console.error("Failed to load data from storage:", error)
      this.initializeWithSampleData()
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("users", JSON.stringify(this.users))
        localStorage.setItem("payments", JSON.stringify(this.payments))
        localStorage.setItem("paymentLogs", JSON.stringify(this.paymentLogs))
      } catch (error) {
        console.error("Failed to save data to storage:", error)
      }
    }
  }

  private initializeWithSampleData() {
    if (this.initialized) return

    // Add admin user
    this.users.push({
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Add regular user
    this.users.push({
      id: "2",
      name: "Test User",
      email: "user@example.com",
      password: "password123",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    this.initialized = true
  }

  // User methods
  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    return user || null
  }

  async findUserById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id)
    return user || null
  }

  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const newUser = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(newUser)
    this.saveToStorage()
    return newUser
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id)
    if (index === -1) return null

    this.users[index] = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date(),
    }

    this.saveToStorage()
    return this.users[index]
  }

  // Payment methods
  async findPaymentByTransactionId(transactionId: string): Promise<Payment | null> {
    const payment = this.payments.find((p) => p.transactionId === transactionId)
    return payment || null
  }

  async createPayment(paymentData: Omit<Payment, "id" | "createdAt">): Promise<Payment> {
    const newPayment = {
      ...paymentData,
      id: `payment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date(),
    }

    this.payments.push(newPayment)
    this.saveToStorage()
    return newPayment
  }

  async updatePayment(id: string, paymentData: Partial<Payment>): Promise<Payment | null> {
    const index = this.payments.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.payments[index] = {
      ...this.payments[index],
      ...paymentData,
    }

    this.saveToStorage()
    return this.payments[index]
  }

  async getPaymentsByStatus(status: string, skip = 0, limit = 10): Promise<{ payments: Payment[]; total: number }> {
    const filteredPayments = this.payments.filter((p) => p.status === status)
    const paginatedPayments = filteredPayments.slice(skip, skip + limit)

    return {
      payments: paginatedPayments,
      total: filteredPayments.length,
    }
  }

  async findPaymentById(id: string): Promise<Payment | null> {
    const payment = this.payments.find((p) => p.id === id)
    return payment || null
  }

  // Payment logs
  async createPaymentLog(logData: Omit<PaymentLog, "id">): Promise<PaymentLog> {
    const newLog = {
      ...logData,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    }

    this.paymentLogs.push(newLog)
    this.saveToStorage()
    return newLog
  }
}

// Singleton instance
const store = new MemoryStore()
export default store

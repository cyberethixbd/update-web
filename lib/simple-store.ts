// Simple data store without any external dependencies

export interface User {
  id: string
  name: string
  email: string
  password: string
  image?: string
  role: "user" | "admin"
  createdAt: string
  updatedAt: string
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
  createdAt: string
  verifiedAt: string | null
  verifiedBy: string | null
  adminNotes?: string
}

export interface PaymentLog {
  id: string
  paymentId: string
  action: string
  userId: string
  timestamp: string
  details: Record<string, any>
}

// Simple in-memory storage
class SimpleStore {
  private users: User[] = []
  private payments: Payment[] = []
  private paymentLogs: PaymentLog[] = []

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    // Initialize with sample data
    this.users = [
      {
        id: "admin-1",
        name: "Admin User",
        email: "admin@cyberethixbd.com",
        password: "admin123",
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "user-1",
        name: "Test User",
        email: "user@example.com",
        password: "password123",
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  // User methods
  findUserByEmail(email: string): User | null {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  }

  findUserById(id: string): User | null {
    return this.users.find((u) => u.id === id) || null
  }

  createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.users.push(newUser)
    return newUser
  }

  updateUser(id: string, userData: Partial<User>): User | null {
    const index = this.users.findIndex((u) => u.id === id)
    if (index === -1) return null

    this.users[index] = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date().toISOString(),
    }

    return this.users[index]
  }

  // Payment methods
  findPaymentByTransactionId(transactionId: string): Payment | null {
    return this.payments.find((p) => p.transactionId === transactionId) || null
  }

  createPayment(paymentData: Omit<Payment, "id" | "createdAt">): Payment {
    const newPayment: Payment = {
      ...paymentData,
      id: `payment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    }

    this.payments.push(newPayment)
    return newPayment
  }

  updatePayment(id: string, paymentData: Partial<Payment>): Payment | null {
    const index = this.payments.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.payments[index] = {
      ...this.payments[index],
      ...paymentData,
    }

    return this.payments[index]
  }

  getPaymentsByStatus(status: string, skip = 0, limit = 10): { payments: Payment[]; total: number } {
    const filteredPayments = this.payments.filter((p) => p.status === status)
    const paginatedPayments = filteredPayments.slice(skip, skip + limit)

    return {
      payments: paginatedPayments,
      total: filteredPayments.length,
    }
  }

  findPaymentById(id: string): Payment | null {
    return this.payments.find((p) => p.id === id) || null
  }

  // Payment logs
  createPaymentLog(logData: Omit<PaymentLog, "id">): PaymentLog {
    const newLog: PaymentLog = {
      ...logData,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    }

    this.paymentLogs.push(newLog)
    return newLog
  }
}

// Export singleton instance
export const dataStore = new SimpleStore()

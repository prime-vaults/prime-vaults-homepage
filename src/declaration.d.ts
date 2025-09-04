// src/declaration.d.ts
declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.jpeg' {
  const value: string
  export default value
}

declare module '*.gif' {
  const value: string
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}

declare module '*.lottie' {
  const value: string
  export default value
}
interface Window {
  jiko: {
    message: (params: {
      msg: string
      type?: 'success' | 'error' | 'warning' | 'information'
      onClick?: () => void
    }) => void
    storage: {
      setUser: (user: any) => void
    }
    verifyTx: (txHash: Hex) => void
    lottie: () => void
  }
}

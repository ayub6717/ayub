import React from "react"
import { AuthProvider } from "./src/context/AuthContext"
import { DataProvider } from "./src/context/DataContext"

export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    <DataProvider>
      {element}
    </DataProvider>
  </AuthProvider>
)

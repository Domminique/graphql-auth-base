import Navigation from "@/navigation"
import theme from "@/utils/theme"
import { ThemeProvider } from "@shopify/restyle"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { AppState } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { SWRConfig } from "swr"
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar translucent />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

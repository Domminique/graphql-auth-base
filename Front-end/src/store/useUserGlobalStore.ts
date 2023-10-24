import { IAuthenticatedUser } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
// import * as api from '../lib/api'
// import {v4 as uuid} from 'uuid'
// import {getErrorMessage} from '../lib/utils'

interface IUserGlobalStore {
  user: IAuthenticatedUser | null
  updateUser: (user: IAuthenticatedUser | null) => void
  logout: (user: IAuthenticatedUser | null) => void
}

const useUserGlobalStore = create<IUserGlobalStore>()(
  persist(
    (set, get) => ({
      user: null,
      updateUser: (user) => {
        set({
          user,
        })
      },
      logout:() =>{
        set(() => ({ user: null }));
        localStorage.removeItem("blossom-application-user-store")
        // to remove data from localstorage
      }
      
    }),
    {
      name: "blossom-application-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
// const useStore = create(set => ({
//   lists: [],
//   muted: false,
//   restarted: false,
//   loading: false,
//   error: null,
//   actions: {
//     setMute: muted => set(() => ({muted})),
//     setError: error => set(() => ({error})),
//     addList: async query => {
//       set(() => ({
//         loading: true
//       }))

//       const result = await api.getListAndTip(query)

//       if (result.error || result.items.length === 0) {
//         set(() => ({
//           loading: false,
//           error: getErrorMessage(result.error || {code: 404})
//         }))
//         return
//       }

//       result.id = uuid()
//       set(({lists}) => ({
//         tip: result.tip,
//         lists: [...lists, result],
//         loading: false
//       }))
//       return {
//         ...result
//       }
//     },
//     replaceList: async (listId, query) => {
//       const result = await api.getListAndTip(query)
//       if (result.error || result.items.length === 0) {
//         set(() => ({
//           loading: false,
//           error: getErrorMessage(result.error || {code: 404})
//         }))
//         return
//       }

//       const newList = {
//         title: query,
//         id: uuid(),
//         items: result.items,
//         tip: result.tip
//       }

//       set(({lists}) => ({
//         tip: result.tip,
//         lists: lists.map(list => (list.id === listId ? newList : list))
//       }))

//       return true
//     },
//     restart: () => {
//       set(({restarted}) => ({
//         lists: [],
//         tip: null,
//         restarted: !restarted,
//         inputValue: '',
//         error: null
//       }))
//     },
//     getTip: (title, items) => api.getTip(title, items)
//   }
// }))

// export const useActions = () => useStore(({actions}) => actions)
// export const useLists = () => useStore(({lists}) => lists)
// export const useRestarted = () => useStore(({restarted}) => restarted)
// export const useIsloading = () => useStore(({loading}) => loading)
// export const useIsError = () => useStore(({error}) => error)

export default useUserGlobalStore

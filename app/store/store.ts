import { configureStore } from '@reduxjs/toolkit'
import bottomNavigation  from '../../features/utilitySlice/bottomSlice';
const store = configureStore({
  reducer: {
    bottomNav : bottomNavigation 
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import diaryReducer from "../features/diary/diarySlice";

const rootReducer = combineReducers({
    auth: authReducer,
    diary: diaryReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
  

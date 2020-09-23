import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import http from "../../services/api";
import {Entry} from "../../interface";

interface EntryState {
    entries : Entry[];
    loading: boolean;
}

export const getEntries = createAsyncThunk(
    'entries/all',
    async (id?: string) => {
      const response = await http.get('/api/entries/'+id);
      return response
    }
)

export const updateEntry = createAsyncThunk(
    'entry/update',
    async (data: {title: string; content: string; id?: string}) => {
        const {id, ...formdata} = data;
        const response = await http.put('/api/entry/update/'+id, formdata);
        return response
    }
)

export const addEntry = createAsyncThunk(
    'add/entry',
    async (data: { diaryId?: string; title: string; content: string; }) => {
      const response = await http.post('/api/entry/store', data);
      console.log(response);
      return response
    }
)

const entrySlice = createSlice({
    name: "entry",
    initialState: {
        entries : [],
        loading: false
    } as EntryState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getEntries.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        })
        .addCase(getEntries.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload){
                return {
                    ...state,
                    entries : action.payload.entries,
                    loading : false
                }
            }
            else{
                return {
                    ...state,
                    loading : false
                }
            }
        })
        .addCase(addEntry.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        })
        .addCase(addEntry.fulfilled, (state, action: PayloadAction<any>) => {
            state.entries.push(action.payload.entry);
            state.loading = false;
        })
        .addCase(updateEntry.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        })
        .addCase(updateEntry.fulfilled, (state, action: PayloadAction<any>) => {
            const entryIndex = state.entries.findIndex(entry => entry.id === action.payload.id);
            state.entries[entryIndex] = action.payload;
            state.loading = false;
        })
    }
})

export default entrySlice.reducer;
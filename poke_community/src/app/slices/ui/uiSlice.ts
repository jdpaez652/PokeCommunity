import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface uiSlice {
    logIn: {
        username:string,
        password:string,
    },
    user: {
        username: string,
        email: string,
        avatar: string,
        isAuthenticated: boolean,
    },
    isHoveringProfileIcon: boolean,
    isHoveringPokemon: boolean,
    showPassword: boolean,
    isSynchronizing: boolean,
    showModal: boolean,
}

const initialState: uiSlice = {
    logIn: {
        username: '',
        password: '',
    },
    user: {
        username: '',
        email: '',
        avatar: '',
        isAuthenticated: false,
    },
    isHoveringProfileIcon: false,
    isHoveringPokemon: false,
    showPassword: false,
    isSynchronizing: false,
    showModal: false,
}

export const getUserSession = createAsyncThunk('ui/getUserSession', () => {
    const userSession = localStorage.getItem('userSession');

    if(userSession){
        const userSessionParsed = JSON.parse(userSession);
        return userSessionParsed;
    }
})

export const uiSlice = createSlice({
    name: 'ui',
    initialState,    
    reducers: {
        setProfileAvatar: (state, action: PayloadAction<string>) => {
            state.user.avatar = action.payload;
        },
        setLoginUsername: (state, action: PayloadAction<string>) => {
            state.logIn.username = action.payload;
        },
        setLoginPassword: (state, action: PayloadAction<string>) => {
            state.logIn.password = action.payload;
        },
        setUser: (state, action: PayloadAction<{
            username: string,
            email: string,
            avatar: string
            isAuthenticated: boolean,
        }>) => {
            state.user = action.payload;
            localStorage.removeItem('userSession');
        },
        setIsHoveringProfileIcon: (state) => {
            state.isHoveringProfileIcon = !state.isHoveringProfileIcon;
        },
        setIsHoveringPokemon: (state, action) => {
            state.isHoveringPokemon = action.payload;
        },
        setIsSynchronizing: (state) => {
            state.isSynchronizing = !state.isSynchronizing;
        },
        setShowPassword: (state) => {
            state.showPassword = !state.showPassword;
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(getUserSession.fulfilled, (state, action) => {
            if(action.payload)
                state.user = action.payload;
        })
    }
})

export const {setProfileAvatar, setUser, setIsHoveringProfileIcon, setIsHoveringPokemon, setShowPassword, setLoginUsername, setLoginPassword, setIsSynchronizing, setShowModal} = uiSlice.actions;
export default uiSlice.reducer;
const state = {
    sidebar:{
        opened:false,
    }
}

const mutations = {
    TOGGLE_SIDEBAR:(state)=>{
        state.sidebar.opened = !state.sidebar.opened
    }
}

const actions = {
    toggleSideBar({ commit }) {
        console.log(1);
        commit('TOGGLE_SIDEBAR')
    }
}

const getters = {
    sidebar: state => state.sidebar,
}

export default{
	state,
    mutations,
    actions,
    getters
}

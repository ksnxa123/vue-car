const state = {
    selfLocation:true
}

const getters = {

}

const mutations = {
    SELF_LOCATION(state){
        state.selfLocation = !state.selfLocation;
    }
}

const actions = {

}

const modules = {

}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
    modules
}
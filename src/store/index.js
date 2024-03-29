import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFiles = require.context('./modules',false,/\.js$/)

const modules = modulesFiles.keys().reduce((modules,modulePath)=>{
	const moduleName = modulePath.replace(/\.\/(.*)\.\w+$/,'$1')
	const module = modulesFiles(modulePath)
	modules[moduleName] = module.default
	return modules
},{})
const store = new Vuex.Store({
	modules
})
// console.log(store)
export default store

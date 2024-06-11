import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTrxStore = defineStore('transaction', () => {
	const isStored = ref(false)

	function authenticatedTrx(){
		isStored.value = true
	}

	return { isStored, authenticatedTrx}
},
{
	persist: {
		storage: sessionStorage
	}
}
)
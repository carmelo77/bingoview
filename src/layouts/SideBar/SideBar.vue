<template>
	<v-navigation-drawer
		color="blue-darken-4"
		dark
		permanent 
		app 
		v-model="drawer"
		:clipped="false"
		v-if="loggedIn"
	>
		<v-list density="compact">
			<v-list-item
				prepend-avatar="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
				:title="getUser.email"
				:subtitle="getUser.role == 1 ? 'Usuario Cliente' : getUser.role == 3 ? 'Usuario verificador' : 'Usuario Admin'"
			></v-list-item>

			<!-- <v-divider></v-divider> -->

			<v-list nav>
				<v-list-item 
					prepend-icon="mdi-home" 
					title="Home" 
					:to="{name: 'Home'}"
					v-if="isAdmin || isNormal || isEmployee"
				>
				</v-list-item>
				<v-list-item 
					prepend-icon="mdi-table" 
					title="Tablas de bingo" 
					:to="{ name: 'BingoTables' }"
					v-if="isAdmin"
				>
				</v-list-item>
				<v-list-item 
					prepend-icon="mdi-home" 
					title="Cargar tablas" 
					:to="{name: 'UploadExcel'}"
					v-if="isAdmin"
				>
				</v-list-item>
				<v-list-item 
					prepend-icon="mdi-table" 
					title="Juegos de bingo" 
					:to="{ name: 'GamesBingo' }"
					v-if="isAdmin || isEmployee"
				>
				</v-list-item>
				<v-list-item 
					prepend-icon="mdi-table" 
					title="Juegos de bingo" 
					:to="{ name: 'GamesBingoNormal' }"
					v-if="isNormal"
				>
				</v-list-item>
				<v-list-item 
					prepend-icon="mdi-table" 
					title="Tipos cartones ganadores" 
					:to="{ name: 'TypeCardsWinners' }"
					v-if="isAdmin"
				>
				</v-list-item>
				<v-list-item 
					prepend-icon="mdi-account" 
					title="Usuarios" 
					:to="{ name: 'Users' }"
					v-if="isAdmin"
				>
				</v-list-item>
				<v-list-item 
					prepend-icon="mdi-account-supervisor-circle" 
					title="Tablas de bingo" 
					:to="{name: 'BingoCardEmployee'}"
					v-if="isEmployee"
				>
				</v-list-item>
			</v-list>
		</v-list>
	</v-navigation-drawer>
</template>
<script lang="ts">

import { defineComponent, toRef } from "vue";


	export default defineComponent({
		name: 'SidebarVue',
		props: {
			drawer: {
				type: Boolean,
				required: true,
				default: true,
			},
			loggedIn: {
				type: Object,
				required: true,
				default: null
			},
			isAdmin: {
				type: Boolean,
				required: true,
				default: false,
			},
			isNormal: {
				type: Boolean,
				required: true,
				default: false,
			},
			isEmployee: {
				type: Boolean,
				required: true,
				default: false,
			},
			getUser: {
				type: Object,
				required: true,
				default: {},
			}
		},
		setup(props) {
			const drawer = toRef(props, 'drawer');

			return {
				drawer: drawer,
			}
		}
	});

</script>
<style scoped>
    
</style>
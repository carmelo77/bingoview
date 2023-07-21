<template>
  <v-app-bar 
		app 
		:elevation="4"
		:elevate-on-scroll="true"
		:clipped-left="true"
		color="blue-darken-4"
	>
		<v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
		<v-toolbar-title>
			<img src="@/assets/logo.jpg" class="logo-banner" alt="">
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn 
			icon
			@click.prevent="logoutSession"
			v-if="loggedIn"
		>
			<v-icon>mdi-logout</v-icon>
		</v-btn>
	</v-app-bar>
</template>
<script lang="ts">
import { defineComponent, toRef } from "vue";
 
	export default defineComponent({
		name: 'AppbarVue',
		props: {
			nameApp: {
				type: String,
				required: true,
			},
			logoutSession: {
				type: Function,
				required: true
			},
			loggedIn: {
				type: Object,
				required: true,
				default: null
			}
		},
		
		setup(props, { emit }) {
			const nameApp = toRef(props, "nameApp");

		 	const toggleDrawer = () => {
				emit("toggle-drawer");
			}

			return {
				toggleDrawer,
				nameApp,
			}
		}
	});
</script>
<style scoped >
    .logo-banner {
		width: 5em;
		border-radius: 0.5em;
		margin-top: .5em;
	}
</style>
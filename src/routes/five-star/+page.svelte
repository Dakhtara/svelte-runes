<script lang="ts">
    	import FiveStar from '$lib/FiveStar/FiveStar.svelte';


	let note: number = $state(0);

	let doubled = $derived(note * 2);
	$effect(() => {
		console.log(note);
	});
</script>


<FiveStar bind:note  />
Note : {note}
<span>Note doublée : {doubled}</span>
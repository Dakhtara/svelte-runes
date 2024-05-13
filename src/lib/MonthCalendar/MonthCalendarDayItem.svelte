<script lang="ts">
	import { cn } from '$lib/utils';
	const {
		day,
		selected,
		onclick,
		class: className
	}: {
		day: number;
		selected: boolean;
		onclick?: () => void;
		class?: string;
	} = $props();
</script>

<button
	class={cn(
		'rounded-full size-8 flex justify-self-center justify-center items-center hover:bg-blue-300 text-center',
		{ 'bg-blue-500 text-white': selected },
		className
	)}
	{onclick}
>
	{day}
</button>

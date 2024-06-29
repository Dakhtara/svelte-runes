<script lang="ts">
	import { cn } from '$lib/utils';
	import { Star } from 'lucide-svelte';

	let {
		note = $bindable(null),
		starClassName = null,
		className = null,
		disabled = false,
		noteChange
	}: {
		note: null | number;
		starClassName?: string | null;
		className?: string | null;
		disabled?: boolean;
        noteChange?: (note: number) => void;
	} = $props();
	function setNote(newNote: number) {
		if (disabled) {
			return;
		}
		noteChange?.(newNote);
		note = newNote;
	}

	let starClass = cn('size-12 stroke-yellow-900 cursor-pointer', starClassName);
</script>

<div class={cn('flex gap-2 my-6 w-full', className)}>
	{#each [1, 2, 3, 4, 5] as star}
		<button type="button" onclick={() => setNote(star)}>
			<Star
				class={cn(starClass, {
					'stroke-yellow-500 fill-yellow-500': note && note >= star
				})}
			/>
		</button>
	{/each}
</div>

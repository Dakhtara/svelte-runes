<script lang="ts">
	import { browser } from '$app/environment';
	import MonthCalendar from '$lib/MonthCalendar/MonthCalendar.svelte';
	import { addDays, format } from 'date-fns';
	import { cn } from '$lib/utils';
	let counter = $state(0);

	let width = $state(0);
	let height = $state(0);

	$effect(() => {
		if (browser) {
			width = window.innerWidth;
			height = window.innerHeight;
		}
	});

	let date = $state(new Date('2024-03-27'));
	let tomorrow = $derived(addDays(date, 1));

	function romanize(num: number) {
		if (isNaN(num)) return NaN;
		let digits = String(+num).split(''),
			key = [
				'',
				'C',
				'CC',
				'CCC',
				'CD',
				'D',
				'DC',
				'DCC',
				'DCCC',
				'CM',
				'',
				'X',
				'XX',
				'XXX',
				'XL',
				'L',
				'LX',
				'LXX',
				'LXXX',
				'XC',
				'',
				'I',
				'II',
				'III',
				'IV',
				'V',
				'VI',
				'VII',
				'VIII',
				'IX'
			],
			roman = '',
			i = 3;
		while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
		return Array(+digits.join('') + 1).join('M') + roman;
	}

</script>

<svelte:window
	onresize={() => {
		width = window.innerWidth;
		height = window.innerHeight;
	}}
/>
<div class="container mx-auto">

	<p>Le compteur est à {counter}</p>
	<p>La taille de la fenêtre est de {width}x{height}</p>
	<button
		class="border p-2 rounded-lg bg-blue-200 border-blue-200"
		onclick={() => (date = new Date())}>Aujourd'hui</button
	>
	<div class="max-w-4xl mx-auto mb-12">
		<MonthCalendar bind:date />

		<p>La date selectionnée est {format(date, 'dd/MM/yyyy')}</p>
		<p>Demain c'est <button onclick={() => date = addDays(date, 1)}>{format(tomorrow, 'dd/MM/yyyy')}</button></p>
	</div>
    
	<div class="max-w-4xl mx-auto">
		<MonthCalendar bind:date>
			{#snippet itemChildren({ onclick, day, selected, isSameMonth })}
				<button
					{onclick}
					class={cn(
						'py-2 text-center hover:bg-teal-200 rounded-full',
						{ 'bg-teal-500 hover:text-black text-white': selected },
						{ 'text-gray-300': !isSameMonth }
					)}
				>
					{romanize(day)}
				</button>
			{/snippet}
		</MonthCalendar>
	</div>
</div>

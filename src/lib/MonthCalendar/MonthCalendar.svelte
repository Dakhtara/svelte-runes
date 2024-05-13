<script lang="ts">
	import MonthCalendarDayItem from './MonthCalendarDayItem.svelte';
	import type { Snippet } from 'svelte';
	import {
		addMonths,
		endOfWeek,
		format,
		isSameDay,
		isSameMonth,
		lastDayOfMonth,
		startOfMonth,
		startOfWeek,
		subMonths
	} from 'date-fns';
	import { cn } from '$lib/utils';

	let {
		date = $bindable(new Date()),
		previousMonthChildren,
		nextMonthChildren,
		itemChildren
	}: {
		date?: Date;
		previousMonthChildren?: Snippet;
		nextMonthChildren?: Snippet;
		itemChildren?: Snippet<[{onclick: () => void; day: number; selected: boolean, isSameMonth: boolean }]>;
	} = $props();

	let allDatesByWeek = $derived.by(() => {
		let allDates = [];
		let dateW = new Date(date);
		let firstDay = startOfMonth(dateW);
		let lastDay = lastDayOfMonth(dateW);
		if (startOfWeek(firstDay) !== firstDay) {
			firstDay = startOfWeek(firstDay);
		}

		if (endOfWeek(lastDay) !== lastDay) {
			lastDay = endOfWeek(lastDay);
		}

		while (firstDay <= lastDay) {
			allDates.push(new Date(firstDay));
			firstDay.setDate(firstDay.getDate() + 1);
		}

		return allDates;
	});

	let weekDays = $derived.by(() => {
		let firstDay = startOfWeek(date);
		let lastDay = endOfWeek(date);
		const weekDays = [];
		while (firstDay <= lastDay) {
			weekDays.push(format(firstDay, 'EEEEE'));
			firstDay.setDate(firstDay.getDate() + 1);
		}

		return weekDays;
	});

	function previousMonth() {
		date = subMonths(date, 1);
	}
	function nextMonth() {
		date = addMonths(date, 1);
	}
</script>

<div class="rounded-lg border px-4 py-3">
	<div class="flex items-center justify-between py-3 px-2">
		<button class="group" onclick={previousMonth}>
			{#if previousMonthChildren}
				{@render previousMonthChildren()}
			{:else}
				<div class="group-hover:bg-blue-200 rounded-full size-8 flex items-center justify-center">
					<span>&lt;</span>
				</div>
			{/if}
		</button>
		<span>{format(date, 'MMM yyyy')}</span>
		<button class="group" onclick={nextMonth}>
			{#if nextMonthChildren}
				{@render nextMonthChildren()}
			{:else}
				<div class="group-hover:bg-blue-200 rounded-full size-8 flex items-center justify-center">
					<span>&gt;</span>
				</div>
			{/if}
		</button>
	</div>

	<div>
		<ul class="grid items-center gap-x-2 justify-center grid-cols-7">
			{#each weekDays as weekDay}
				<li class="text-center">{weekDay}</li>
			{/each}
		</ul>
	</div>
	<div>
		<div class="grid items-center justify-center gap-x-2 gap-y-2 grid-cols-7">
			{#each allDatesByWeek as dateW}
				{#if itemChildren}
                    {@render itemChildren({onclick: () => {date = dateW}, day: dateW.getDate(), selected: isSameDay(dateW, date), isSameMonth: isSameMonth(date, dateW)})}
                {:else}
					<MonthCalendarDayItem
						class={cn({ 'text-gray-300 hover:bg-gray-200': !isSameMonth(date, dateW) })}
						onclick={() => (date = dateW)}
						day={dateW.getDate()}
						selected={isSameDay(dateW, date)}
					/>
				{/if}
			{/each}
		</div>
	</div>
</div>

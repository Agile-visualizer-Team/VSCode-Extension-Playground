<script>
	import { onMount } from 'svelte';

	export let content = 'Scimmia nera con un cappello di paglia e un bastone in mano ';
	let isTooltipVisible = false;
	let isLoaded = false;
	const showTooltip = () => {
		isTooltipVisible = !isTooltipVisible;
	};

	onMount(() => {
		isLoaded = true;
	});
</script>

<div id="tooltip-comp">
	{#if isLoaded}
		<div class="tooltip {isTooltipVisible ? 'visible' : ''}">
			{content}
		</div>
	{/if}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<svg
		id="svg-icon"
		on:click={() => showTooltip()}
		xmlns="http://www.w3.org/2000/svg"
		height="48"
		width="48"
		><path
			d="M24.2 35.65q.8 0 1.35-.55t.55-1.35q0-.8-.55-1.35t-1.35-.55q-.8 0-1.35.55t-.55 1.35q0 .8.55 1.35t1.35.55Zm-1.75-7.3h2.95q0-1.3.325-2.375T27.75 23.5q1.55-1.3 2.2-2.55.65-1.25.65-2.75 0-2.65-1.725-4.25t-4.575-1.6q-2.45 0-4.325 1.225T17.25 16.95l2.65 1q.55-1.4 1.65-2.175 1.1-.775 2.6-.775 1.7 0 2.75.925t1.05 2.375q0 1.1-.65 2.075-.65.975-1.9 2.025-1.5 1.3-2.225 2.575-.725 1.275-.725 3.375ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
		/></svg
	>
</div>

<style>
	.tooltip {
		visibility: hidden;
		width: 200px;
		text-align: left;
		border-radius: 6px;

		position: absolute;
		z-index: 1;
		padding: 2px;
		margin-left: -50vw;
		bottom: -100%;

		opacity: 0;
		transition: opacity 0.3s;
		background-color: var(--vscode-textBlockQuote-background);
		color: var(----vscode-foreground);
	}

	.visible {
		visibility: visible;
		opacity: 1;
	}
	#tooltip-comp {
		position: relative;
	}

	#svg-icon {
		transform: scale(0.5);
		fill: var(--vscode-icon-foreground);
	}
</style>

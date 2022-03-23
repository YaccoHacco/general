<script>
	import moment from 'moment'
	$: messages = []

	let inputValue = ''

	let onSubmit = () => {
		messages = [...messages, {from: 'Joe Layne', message: inputValue, date: new Date()}]
		inputValue = ''
	}

	let inputField

	$: if (inputField) {
		setTimeout(() => {
			inputField.focus()
		}, 100)
	}

</script>

<div class="flex flex-col flex-auto bg-[#35393E] p-3">
	<div class="flex flex-col gap-2 flex-auto overflow-y-auto">
		{#each messages as message}
			<div class="flex flex-col p-3 rounded">
				<div class="flex items-center gap-2">
					<div class="text-orange-600 text-sm">{message.from}</div>
					<div class="text-gray-400 text-xs">{moment(message.date).fromNow()}</div>
				</div>
				<div class="text-gray-200 text-sm">{message.message}</div>
			</div>
		{/each}
	</div>
	<div class="flex w-full">
		<form class="w-full" on:submit|preventDefault={onSubmit}>
			<div class="flex bg-dark-50 rounded w-full p-1">
				<input type='text' name='message' bind:this={inputField} bind:value={inputValue} class="border-none bg-transparent ring-0 w-full" />
				<input type='submit' value='Send' class="hidden" />
			</div>
		</form>
	</div>
</div>
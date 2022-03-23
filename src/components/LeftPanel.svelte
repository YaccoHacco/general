<style>
	.circleAvatar {
		border-radius: 128px;
		@apply flex transition transition-all duration-150 items-center justify-center w-12 h-12 bg-dark-200 cursor-pointer;
	}

	.left-nav > div:hover > .circleAvatar {
		border-radius: 15px;
		@apply bg-green-600;
	}
</style>


<div class="left-nav flex flex-col gap-2 w-18 bg-[#1F2224] items-stretch pt-12 cursor-pointer">
	<div class="flex items-center group">
		<div class="bg-white w-3 h-1/5 rounded-full ml-[-8px] mr-2 group-hover:h-1/2 transition transition-all duration-150"></div>
		<div class="circleAvatar">a</div>
	</div>
	<div class="flex items-center group">
		<div class="bg-white w-3 h-1/5 rounded-full ml-[-8px] mr-2 group-hover:h-1/2 transition transition-all duration-150"></div>
		<div class="circleAvatar">b</div>
	</div>
	<div class="flex items-center group">
		<div class="bg-white w-3 h-1/5 rounded-full ml-[-8px] mr-2 group-hover:h-1/2 transition transition-all duration-150"></div>
		<div class="circleAvatar">c</div>
	</div>
	<div class="flex items-center group">
		<div class="bg-white w-3 h-1/5 rounded-full ml-[-8px] mr-2 group-hover:h-1/2 transition transition-all duration-150"></div>
		<div class="circleAvatar">d</div>
	</div>
	<div class="flex items-center group">
		<div class="bg-white w-3 h-1/5 rounded-full ml-[-8px] mr-2 group-hover:h-1/2 transition transition-all duration-150"></div>
		<div class="circleAvatar">e</div>
	</div>
</div>
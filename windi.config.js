module.exports = {
	attributify: true,
	extract: {
    	include: [
			'src/**/*.{svelte}',
			'src/**/*.css'
		],
		exclude: [
			'node_modules/**/*',
			'.git/**/*',
		],
  	},
	plugins: [
		require('windicss/plugin/typography'),
		require('windicss/plugin/forms'),
		require('@windicss/animations')({
			settings: {
			  animatedSpeed: 1000,
			  heartBeatSpeed: 1000,
			  hingeSpeed: 2000,
			  bounceInSpeed: 750,
			  bounceOutSpeed: 750,
			  animationDelaySpeed: 1000,
			},
		}),
	],
}
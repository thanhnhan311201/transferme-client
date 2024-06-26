/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
	theme: {
		extend: {
			backgroundImage: {
        home: "url('/src/images/background.png')",
      },
			colors: {
				"main-bg": "#f7f9fc",
        "modal-user": "#f3f6fc",
        "3c4043": "#3c4043",
        "5f6368": "#5f6368",
        e0e9f8: "#e0e9f8",
        e1e5ea: "#e1e5ea",
        "46ab5e": "#46ab5e",
        edf2fc: "#edf2fc",
        "1f1f1f": "#1f1f1f",
        "0000008a": "#0000008a",
        e5e7eb: "#e5e7eb",
        c2e7ff: "#c2e7ff",
        d7f4f3: "#d7f4f3",
        "primary-color": "#1565c0",
        "primary-color--tint-1": "#e8f0f9",
        "primary-color--tint-6": "#73a3d9",
        "primary-color--tint-8": "#4484cd",
        "primary-color--tint-5": "#8ab2e0",
        "primary-color--tint-4": "#a1c1e6",
        "primary-color--tint-3": "#b9d1ec",
        "primary-color--tint-2": "#d0e0f2",
        "primary-color--shade": "#135bad",
        333: "#333",
        555: "#555",
        777: "#777",
        "4caf50": "#4caf50",
        eef2f3: "#eef2f3",
        e5ede8: "#e5ede8",
        fdfdfd: "fdfdfd",
        fafafa: "#fafafa",

				// ------------------------------ NEW UI-------------------------------
				// for theme config
				// 'main-bg': "rgba(var(--main-bg))",
				// 'content-bg': "rgba(var(--content-bg))",
				// 'main-text-color': "rgba(var(--main-text-color))",
				// 'border-color': "rgba(var(--border-color))",
				// 'overlay-color': "var(--overlay)",

				// for modal
				// 'modal': "rgba(var(--modal))",
				// 'modal__close-btn-fill-color': 'rgba(var(--modal__close-btn-fill-color))',
				// 'modal__close-btn-fill-hover-color': 'rgba(var(--modal__close-btn-fill-hover-color))',
				// 'modal__close-btn-bg-color': 'var(--modal__close-btn-bg-color)',

				/* for setting dialog */
				// 'setting-dialog__btn-color': 'rgba(var(--setting-dialog__btn-color))',
				// 'setting-dialog__btn-hover-color': 'rgba(var(--setting-dialog__btn-hover-color))',
				// 'setting-dialog__btn-text-hover-color': 'rgba(var(--setting-dialog__btn-text-hover-color))',
				// 'setting-dialog__appearance__btn-text-color': 'var(--setting-dialog__appearance__btn-text-color)',
				// 'setting-dialog__appearance__btn-text-selected-color': 'rgba(var(--setting-dialog__appearance__btn-text-selected-color))',
				// 'setting-dialog__input-bg-color': 'rgba(var(--setting-dialog__input-bg-color))',

				// for search dialog				
				// 'search-dialog__btn-hover-color': 'var(--search-dialog__btn-hover-color)',

				// general config
				// 'primary-color': 'rgba(20 23 24)',
				// 'secondary-color': 'rgba(35, 38, 39)',
				// 'white': "rgba(254, 254, 254)",
				// 'white--1': "rgba(232, 236, 239)",
				// 'grey': "rgba(108, 114, 117)",
				// 'accent-color-1': 'rgba(216 76 16)',
				// 'accent-color-2': 'rgba(0, 132, 255)',

				// 'primary-btn-color': "rgba(2, 121, 232)",
				// 'border-btn-color-selected': 'rgba(0, 132, 255)',
			},
			gridTemplateColumns: {
				'3-for-transferLayout': '250px auto 300px',
				'3-for-mainLayout': '30rem auto 24rem',
				'2-for-header': '250px auto',
				'2-for-home': '1fr 2fr',
			},
			gridTemplateRows: {
				'2-for-transferLayout': 'auto 1fr',
			},
			boxShadow: {
				'user-nav':
					'0 4px 8px 3px rgba(0, 0, 0, .15), 0 1px 3px rgba(0, 0, 0, .3)',
				btn: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
			},
			width: {
				'1/2': '50%',
				'85/100': '85%',
				'65/100': '65%',
				'50rem': '50rem',
				88: '22rem',
			},
			height: { 88: '22rem' },
			maxWidth: {
				'1/2': '50%',
				'3/4': '75%',
				25: '25rem',
			},
		},
	},
	plugins: [require('daisyui')],
};

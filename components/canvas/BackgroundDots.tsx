'use client'

export const BackgroundDots = ({ darkMode }: { darkMode: boolean }) => {
	return (
		<>
			<style>{`
                .diamond-grid-wrapper {
                    --bg-color: ${darkMode ? '#0b0d10' : '#f7f8fa'};
                    /* Трохи виразніша прозорість, щоб тонкі лінії не губилися */
                    --line-opacity: ${darkMode ? '0.6' : '0.45'};
                    --grid-size: 130px;
                    background-color: var(--bg-color);
                }

                .diamond-grid-wrapper::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    opacity: var(--line-opacity);

                    /* Точний колір градієнта як на підкресленні слова (бірюза -> блакитний -> синій) */
                    background: linear-gradient(
                        135deg, 
                        #00d29d 0%, 
                        #00a8ff 50%, 
                        #3b82f6 80%,
                        #00d29d 100%
                    );
                    background-size: 200% 200%;
                    animation: gradientShimmer 12s ease infinite;

                    /* Ювелірна товщина ліній (0.7) та маленькі мікрокрапки (r=1.5) */
                    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100' fill='none' stroke='black' stroke-width='0.7'%3E%3Cpath d='M 50 0 L 100 50 L 50 100 L 0 50 Z' /%3E%3Ccircle cx='50' cy='0' r='1.5' fill='black' /%3E%3Ccircle cx='100' cy='50' r='1.5' fill='black' /%3E%3Ccircle cx='50' cy='100' r='1.5' fill='black' /%3E%3Ccircle cx='0' cy='50' r='1.5' fill='black' /%3E%3C/svg%3E");
                    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100' fill='none' stroke='black' stroke-width='0.7'%3E%3Cpath d='M 50 0 L 100 50 L 50 100 L 0 50 Z' /%3E%3Ccircle cx='50' cy='0' r='1.5' fill='black' /%3E%3Ccircle cx='100' cy='50' r='1.5' fill='black' /%3E%3Ccircle cx='50' cy='100' r='1.5' fill='black' /%3E%3Ccircle cx='0' cy='50' r='1.5' fill='black' /%3E%3C/svg%3E");
                    
                    -webkit-mask-size: var(--grid-size) var(--grid-size);
                    mask-size: var(--grid-size) var(--grid-size);
                    -webkit-mask-repeat: repeat;
                    mask-repeat: repeat;
                }

                @keyframes gradientShimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Для ПК та планшетів — розмір ромба 220px */
                @media (min-width: 768px) {
                    .diamond-grid-wrapper {
                        --grid-size: 220px;
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .diamond-grid-wrapper::before {
                        animation: none;
                    }
                }
            `}</style>

			<div className='diamond-grid-wrapper fixed inset-0 pointer-events-none z-0 transition-colors duration-500' />
		</>
	)
}

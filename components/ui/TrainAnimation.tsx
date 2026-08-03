'use client'

import Image from 'next/image'

export const TrainAnimation = () => {
	return (
		<div
			className='relative w-full overflow-hidden h-[60px] sm:h-[80px] md:h-[115px] pointer-events-none select-none'
			style={{
				maskImage:
					'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
				WebkitMaskImage:
					'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
			}}
		>
			<style
				dangerouslySetInnerHTML={{
					__html: `
				@keyframes train-drive {
					0% { transform: translateX(-100%); }
					100% { transform: translateX(100vw); }
				}
				
				@keyframes train-bob {
					0%, 100% { transform: translateY(0px) rotate(0deg); }
					25% { transform: translateY(-1.5px) rotate(0.5deg); }
					50% { transform: translateY(0px) rotate(0deg); }
					75% { transform: translateY(1.5px) rotate(-0.5deg); }
				}
				
				.animate-train-drive {
					animation: train-drive 10s linear infinite;
				}
				
				.animate-train-bob {
					animation: train-bob 0.8s infinite linear;
				}
			`,
				}}
			/>

			{/* ТУТ ВИПРАВЛЕНО: легкий від'ємний відступ для правильного зчеплення */}
			<div className='absolute top-0 left-0 flex items-end -space-x-[4px] sm:-space-x-[8px] md:-space-x-[12px] h-full w-max animate-train-drive'>
				{/* ВАГОНИ */}
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className='relative w-[70px] sm:w-[85px] md:w-[120px] h-[50px] sm:h-[65px] md:h-[95px] flex-shrink-0 animate-train-bob'
						style={{
							animationDelay: `${(4 - i) * 0.12}s`,
							zIndex: i,
						}}
					>
						<Image
							src='/projects/uz-ticket-hunter/carriage.png'
							alt={`Вагон ${4 - i}`}
							fill
							className='object-contain'
						/>
					</div>
				))}

				{/* ЛОКОМОТИВ */}
				<div
					className='relative w-[80px] sm:w-[100px] md:w-[140px] h-[60px] sm:h-[80px] md:h-[115px] flex-shrink-0 animate-train-bob'
					style={{
						animationDelay: '0s',
						zIndex: 10,
					}}
				>
					<Image
						src='/projects/uz-ticket-hunter/train.png'
						alt='Локомотив'
						fill
						className='object-contain'
						priority
					/>
				</div>
			</div>
		</div>
	)
}

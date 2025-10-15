export const Header = () => {
	return (
		<div className={'flex flex-row flex-wrap w-full justify-between gap-2 pb-4 md:pb-2'}>
			<span className={'w-full md:w-3/5 tracking-tight md:tracking-normal'}>
				<h1 className={'font-mono text-3xl font-bold text-foreground'}>PERFORMANCE ANALYTICS</h1>
				<p className={'mt-1 text-sm text-muted-foreground'}>
					Track key performance metrics, identify weaknesses, improve faster
				</p>
			</span>
		</div>
	)
}

import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

export const Header = () => {
	return (
		<div className={'flex flex-row flex-wrap w-full justify-between px-4 md:px-8 gap-2'}>
			<span className={'w-full md:w-3/5 tracking-tight md:tracking-normal'}>
				<h1 className={'font-mono text-3xl font-bold text-foreground'}>PERFORMANCE ANALYTICS</h1>
				<p className={'mt-1 text-sm text-muted-foreground'}>
					Track player statistics across the last 10 matches
				</p>
			</span>
			<div className={'w-full md:w-1/5 py-4 md:py-0'}>
				<div className={'h-full flex flex-row gap-4 items-center md:justify-center'}>
					<Input type={'number'} defaultValue={10} max={10} min={0} className={'md:max-w-[100px] rounded'} />
					<Label className={'text-sm text-muted-foreground'}>Matches</Label>
				</div>
			</div>
		</div>
	)
}

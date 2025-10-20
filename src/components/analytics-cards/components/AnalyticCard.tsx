import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface StatCardProps {
	title: string
	average: number
	highest: { value: number; color: string }
	lowest: { value: number; color: string }
	variance: number
	icon: React.ReactNode
	unit?: string
	onClick: () => void
}

export const AnalyticCard = ({ title, average, highest, lowest, variance, icon, unit, onClick }: StatCardProps) => {
	return (
		<Card className={'flex flex-row p-4 items-center justify-around md:justify-between'}>
			<div className={'flex-1 flex flex-col gap-1'}>
				<h6 className={'font-mono text-muted-foreground tracking-tight text-sm h-fit my-1 md:my-2 text-nowrap'}>
					{title}
				</h6>
				<p className={'font-bold text-foreground tracking-wide text-3xl'}>
					{new Intl.NumberFormat('en-US', {
						maximumFractionDigits: 2
					}).format(average)}
					&nbsp;
					<span className={'text-primary text-xs'}>&plusmn;{variance.toFixed(1)}%</span>
				</p>
				<div className={'text-xs flex flex-col pt-1'}>
					<p className={'text-muted-foreground'}>
						highest: &nbsp;
						<span className={'text-primary'}>
							{new Intl.NumberFormat('en-US', {
								maximumFractionDigits: 2
							}).format(highest.value)}{' '}
							{unit}
						</span>
					</p>
					<p className={'text-muted-foreground'}>
						lowest: &nbsp;
						<span className={'text-primary'}>
							{new Intl.NumberFormat('en-US', {
								maximumFractionDigits: 2
							}).format(lowest.value)}{' '}
							{unit}
						</span>
					</p>
				</div>
			</div>
			<div className={'h-full flex flex-col gap-2 md:gap-4 justify-center items-center'}>
				{icon}
				<Button
					className={'h-fit w-fit p-1 text-xs rounded hover:cursor-pointer'}
					size={'icon'}
					variant={'outline'}
					onClick={onClick}
				>
					Rankings
				</Button>
			</div>
		</Card>
	)
}

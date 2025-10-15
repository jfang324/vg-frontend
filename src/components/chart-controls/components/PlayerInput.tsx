'use client'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Spinner } from '@components/ui/spinner'
import { ModeKey, MODES } from '@constants/modes'
import { PlatformKey, PLATFORMS } from '@constants/platforms'
import { RegionKey, REGIONS } from '@constants/regions'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface PlayerInputProps {
	isLoading: boolean
	onSubmit: (nameTag: string, region: string, platform: string, mode: string, limit: number) => void
}

export const PlayerInput = ({ isLoading, onSubmit }: PlayerInputProps) => {
	const [name, setName] = useState<string>()
	const [tag, setTag] = useState<string>()
	const [limit, setLimit] = useState(10)
	const [region, setRegion] = useState<RegionKey>('na')
	const [mode, setMode] = useState<ModeKey>('competitive')
	const [platform, setPlatform] = useState<PlatformKey>('pc')

	const handleSubmit = () => {
		if (!name || !tag || !region || !mode || !platform || !limit) {
			toast('Please fill out all fields')
			return
		}

		onSubmit(`${name}#${tag}`, region, mode, platform, limit)
	}

	return (
		<Card className={`w-full md:w-1/2 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
			<CardHeader className={'flex flex-row flex-wrap w-full justify-between gap-2'}>
				<span className={'w-full md:w-3/5 tracking-tight md:tracking-normal'}>
					<h1 className={'font-mono text-2xl font-bold text-foreground'}>ADD PLAYER</h1>
					<p className={'mt-1 text-sm text-muted-foreground'}>
						Enter a players details to add them to the data visualizations
					</p>
				</span>
			</CardHeader>
			<CardContent className={'w-full flex flex-col gap-4'}>
				<div className={'w-full flex flex-col md:flex-row gap-4 md:gap-8'}>
					<div
						className={
							'w-full md:w-1/3 flex flex-row md:flex-col gap-4 md:gap-2 justify-between md:justify-around'
						}
					>
						<Label className={'text-sm text-muted-foreground text-nowrap my-auto'}>Player Name</Label>
						<Input
							placeholder={'Enter Player Name i.e. SEN TenZ'}
							onChange={(e) => setName(e.target.value)}
							className={'w-full max-w-[200px] md:max-w-full rounded'}
						/>
					</div>
					<div
						className={
							'w-full md:w-1/3 flex flex-row md:flex-col gap-4 md:gap-2 justify-between md:justify-around'
						}
					>
						<Label className={'text-sm text-muted-foreground my-auto'}>Tag</Label>
						<Input
							placeholder={'Tag i.e.81619'}
							onChange={(e) => setTag(e.target.value)}
							className={'w-full max-w-[200px] md:max-w-full rounded'}
						/>
					</div>
					<div
						className={
							'w-full md:w-1/3 flex flex-row md:flex-col gap-2 md:gap-4 justify-between md:justify-around'
						}
					>
						<Label className={'text-sm text-muted-foreground my-auto'}>Limit</Label>
						<Input
							type={'number'}
							onChange={(e) => setLimit(Number(e.target.value))}
							defaultValue={10}
							max={10}
							min={1}
							className={'w-full max-w-[200px] md:max-w-full rounded'}
						/>
					</div>
				</div>
				<div className={'w-full flex flex-col md:flex-row gap-4 md:gap-8'}>
					<div
						className={
							'w-full md:w-1/3 flex flex-row md:flex-col gap-2 md:gap-4 justify-between md:justify-around'
						}
					>
						<Label className={'text-sm text-muted-foreground my-auto'}>Region</Label>
						<Select value={region} onValueChange={(value) => setRegion(value as RegionKey)}>
							<SelectTrigger className="w-full border-primary/50 bg-primary/10 font-mono text-sm text-primary hover:cursor-pointer max-w-[200px] md:max-w-full">
								<SelectValue placeholder={'Select a region'} />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(REGIONS).map((region) => (
									<SelectItem value={region} key={region}>
										{REGIONS[region as RegionKey].fullTitle}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div
						className={
							'w-full md:w-1/3 flex flex-row md:flex-col gap-2 md:gap-4 justify-between md:justify-around'
						}
					>
						<Label className={'text-sm text-muted-foreground my-auto'}>Mode</Label>
						<Select value={mode} onValueChange={(value) => setMode(value as ModeKey)}>
							<SelectTrigger className="w-full border-primary/50 bg-primary/10 font-mono text-sm text-primary hover:cursor-pointer max-w-[200px] md:max-w-full">
								<SelectValue placeholder={'Select a mode'} />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(MODES).map((mode) => (
									<SelectItem value={mode} key={mode}>
										{MODES[mode as ModeKey].fullTitle}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className={'w-full md:w-1/3 flex flex-row md:flex-col gap-2 md:gap-4 justify-between'}>
						<Label className={'text-sm text-muted-foreground my-auto'}>Platform</Label>
						<Select value={platform} onValueChange={(value) => setPlatform(value as PlatformKey)}>
							<SelectTrigger className="w-full border-primary/50 bg-primary/10 font-mono text-sm text-primary hover:cursor-pointer max-w-[200px] md:max-w-full">
								<SelectValue placeholder={'Select a platform'} />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(PLATFORMS).map((platform) => (
									<SelectItem value={platform} key={platform}>
										{PLATFORMS[platform as PlatformKey].fullTitle}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
			<CardFooter className={'flex flex-row justify-between gap-2'}>
				<Button onClick={handleSubmit} disabled={isLoading} className={'w-full hover:cursor-pointer'}>
					{isLoading ? <Spinner className={'h-5 w-5'} /> : <Plus className={'h-5 w-5'} />}
					Add Player
				</Button>
			</CardFooter>
		</Card>
	)
}

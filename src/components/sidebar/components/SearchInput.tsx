'use client'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { InputGroup } from '@components/ui/input-group'
import { Label } from '@components/ui/label'
import { Search } from 'lucide-react'
import { RefObject, useState } from 'react'
import { toast } from 'sonner'
import { RegionKey, REGIONS } from '../../../constants/regions'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface SearchInputProps {
	label: string
	visible?: boolean
	placeholder?: string
	searchRef?: RefObject<HTMLInputElement | null>
	onSearch: (region: string, value: string) => void
	onValidation?: (value: string) => boolean
}

export const SearchInput = ({
	label,
	visible = true,
	placeholder = 'Search',
	searchRef,
	onSearch,
	onValidation = () => true
}: SearchInputProps) => {
	const [value, setValue] = useState('')
	const [region, setRegion] = useState<RegionKey>('na')

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!value || !onValidation(value)) {
			toast('Please enter a valid value')
			return
		}

		return onSearch(region, value)
	}

	return (
		<form onSubmit={(e) => handleSearch(e)} className={visible ? '' : 'hidden'}>
			<div className={'flex flex-col gap-2'}>
				<Label className={'px-1'}>{label}</Label>

				<div className={'flex flex-row gap-2'}>
					<InputGroup>
						<Button
							variant={'outline'}
							size={'icon'}
							type={'submit'}
							className={'hover:cursor-pointer rounded'}
						>
							<Search className={'h-5 w-5'} />
						</Button>

						<Input placeholder={placeholder} onChange={(e) => setValue(e.target.value)} ref={searchRef} />

						<Select value={region} onValueChange={(value) => setRegion(value as RegionKey)}>
							<SelectTrigger className="w-fit border-primary/50 bg-primary/10 font-mono text-sm text-primary hover:cursor-pointer">
								<SelectValue placeholder={'Select a region'} />
							</SelectTrigger>
							<SelectContent align="start">
								{Object.keys(REGIONS).map((region) => (
									<SelectItem value={region} key={region}>
										{REGIONS[region as RegionKey].abbreviation}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</InputGroup>
				</div>
			</div>
		</form>
	)
}

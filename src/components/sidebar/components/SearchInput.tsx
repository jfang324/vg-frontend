'use client'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Search } from 'lucide-react'
import { RefObject, useState } from 'react'
import { toast } from 'sonner'

interface SearchInputProps {
	label: string
	visible?: boolean
	placeholder?: string
	searchRef?: RefObject<HTMLInputElement | null>
	onSearch: (value: string) => void
	onValidation?: (value: string) => boolean
}

export const SearchInput = ({
	label,
	visible = true,
	placeholder = 'Search',
	searchRef,
	onSearch,
	onValidation = (value: string) => true
}: SearchInputProps) => {
	const [value, setValue] = useState('')

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const input = value.trim()

		if (!input || !onValidation(input)) {
			toast('Please enter a valid value')
			return
		}

		return onSearch(input)
	}

	return (
		<form onSubmit={(e) => handleSearch(e)} className={visible ? '' : 'hidden'}>
			<div className={'flex flex-col gap-2'}>
				<Label className={'px-1'}>{label}</Label>

				<div className={'flex flex-row gap-2'}>
					<Input placeholder={placeholder} onChange={(e) => setValue(e.target.value)} ref={searchRef} />

					<Button
						variant={'outline'}
						size={'icon'}
						type={'submit'}
						className={'hover:cursor-pointer rounded'}
					>
						<Search className={'h-5 w-5'} />
					</Button>
				</div>
			</div>
		</form>
	)
}

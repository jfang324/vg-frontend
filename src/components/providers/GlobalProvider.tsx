import { SidebarProvider } from '@components/ui/sidebar'
import { Toaster } from '@components/ui/sonner'

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider defaultOpen={false}>
			{children}
			<Toaster />
		</SidebarProvider>
	)
}

import { SidebarProvider } from '@components/ui/sidebar'
import { Toaster } from '@components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider defaultOpen={false}>
			{children}
			<Toaster />
			<Analytics />
			<SpeedInsights />
		</SidebarProvider>
	)
}

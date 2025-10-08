import { SidebarProvider } from '@components/ui/sidebar'

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	return <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
}

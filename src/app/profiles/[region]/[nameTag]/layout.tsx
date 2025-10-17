import { ProfileProvider } from '@components/providers/ProfileProvider'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	return <ProfileProvider>{children}</ProfileProvider>
}

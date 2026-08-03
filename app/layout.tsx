import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/app/globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Software Engineer | Портфоліо',
	description:
		'Розробка програмного забезпечення, автоматизація процесів та створення інструментів. Python, JavaScript, Django, Next.js.',
	keywords: ['Python', 'Django', 'Next.js', 'розробник', 'портфоліо'],
	openGraph: {
		title: 'Software Engineer | Портфоліо',
		description: 'Розробка ПЗ, автоматизація процесів, Python, JavaScript.',
		type: 'website',
		locale: 'uk_UA',
	},
	icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}


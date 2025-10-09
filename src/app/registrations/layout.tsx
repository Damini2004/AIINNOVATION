import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registration & Login',
  description: 'Create an account to join the AI Innovation Society or log in to access your member benefits.',
};

export default function RegistrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

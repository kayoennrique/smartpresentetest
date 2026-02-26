import { redirect } from 'next/navigation';

type Props = {
  searchParams?: { token?: string | string[] };
};

export default function ResetPasswordEntry({ searchParams }: Props) {
  const tokenValue = searchParams?.token;
  const token = Array.isArray(tokenValue) ? (tokenValue[0] ?? '') : (tokenValue ?? '');

  if (token) redirect(`/recover-password?token=${encodeURIComponent(token)}`);
  redirect('/recover-password');
}

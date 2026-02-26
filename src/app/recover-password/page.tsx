import ResetPasswordForm from '@/components/GeneralComponents/ResetPassword/ResetPasswordForm';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: { token?: string | string[] };
};

export default function RecoverPasswordPage({ searchParams }: PageProps) {
  const tokenValue = searchParams?.token;
  const token = Array.isArray(tokenValue) ? (tokenValue[0] ?? '') : (tokenValue ?? '');

  return <ResetPasswordForm token={token} />;
}

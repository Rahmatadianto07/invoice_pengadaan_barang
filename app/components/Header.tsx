interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h1 className="text-3xl font-bold text-slate-800">{title}</h1>

      {subtitle && <p className="text-slate-500 mt-2">{subtitle}</p>}
    </div>
  );
}

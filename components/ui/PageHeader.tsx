interface PageHeaderProps {
  title: string;
  intro?: string;
}

export function PageHeader({ title, intro }: Readonly<PageHeaderProps>) {
  return (
    <header className="mb-16 md:mb-24">
      <h1 className="page-heading">{title}</h1>
      {intro ? <p className="page-intro mb-0">{intro}</p> : null}
    </header>
  );
}

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata = {
  title: 'Uses',
  description: 'Tools, software, and hardware I use day to day.',
};

const categories = [
  {
    title: 'Development',
    items: [
      'Editor: VS Code / Cursor',
      'Terminal: Warp / iTerm2',
      'Node.js & TypeScript',
      'Git & GitHub',
    ],
  },
  {
    title: 'Design',
    items: ['Figma', 'Tailwind CSS', 'Phosphor Icons'],
  },
  {
    title: 'Productivity',
    items: ['Notion', 'Linear', 'Raycast'],
  },
];

export default function UsesPage() {
  return (
    <Container className="hero-grid-bg w-full">
      <div className="section-padding">
        <PageHeader
          title="uses"
          intro="Tools, software, and hardware I use for development and productivity."
        />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {categories.map((category) => (
            <section key={category.title}>
              <h2 className="mb-4 text-lg font-semibold lowercase text-foreground">
                {category.title}
              </h2>
              <ul className="space-y-2 text-muted">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}

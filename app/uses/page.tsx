import { Container } from '@/components/ui/Container';

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
    items: ['Figma', 'Tailwind CSS', 'Lucide Icons'],
  },
  {
    title: 'Productivity',
    items: ['Notion', 'Linear', 'Raycast'],
  },
];

export default function UsesPage() {
  return (
    <Container>
      <div className="py-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Uses
        </h1>
        <p className="mb-12 text-neutral-600 dark:text-neutral-400">
          A list of tools, software, and hardware I use for development and productivity.
        </p>
        <div className="space-y-8">
          {categories.map((category) => (
            <section key={category.title}>
              <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {category.title}
              </h2>
              <ul className="list-inside list-disc space-y-2 text-neutral-600 dark:text-neutral-400">
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

import { Fragment } from 'react';
import { SectionRule } from '@/components/ui/SectionRule';

const experiences = [
  {
    period: 'April 2025 - Present',
    company: 'Scorched Ice Inc',
    title: 'Full Stack Developer',
    description:
      'Architected serverless AWS stack (Lambda, API Gateway, DynamoDB) sustaining 99.9% uptime with under 200ms P95 latency.',
  },
  {
    period: 'March 2023 - March 2024',
    company: 'Pelmorex Corp',
    title: 'Full Stack Developer',
    description:
      'Owned full-stack CTV DSP platform integrations, driving over CAD 1M in annual revenue.',
  },
  {
    period: 'January 2022 - March 2023',
    company: 'Ant Analytica',
    title: 'Software Engineer',
    description:
      'Re-architected Node.js backend with pub/sub, boosting throughput fivefold and enabling horizontal scale.',
  },
  {
    period: 'April 2021 - January 2022',
    company: 'Intelligent Innovations',
    title: 'Backend Software Engineer',
    description:
      'Implemented high-throughput webhooks in Node.js, doubling data throughput and application responsiveness.',
  },
  {
    period: 'November 2020 - April 2021',
    company: 'Edukoya',
    title: 'Backend Software Engineer',
    description:
      'Built Node.js/TypeScript microservices with Docker and RabbitMQ, reducing downtime by 80% and improving scalability for reliable distributed systems.',
  },
  {
    period: 'May 2020 - October 2020',
    company: 'Cotta & Cush',
    title: 'Software Engineer',
    description:
      'Built multiple mobile-first React features optimized across four display breakpoints.',
  },
];

export function WorkExperienceSection() {
  return (
    <section className="section-breakout section-padding">
      <div className="section-inner flex flex-col gap-8">
        <SectionRule label=".experience" />

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
          {experiences.map(({ period, company, title, description }) => (
            <Fragment key={company}>
              <div className="py-2 md:py-0">
                <span className="text-sm font-semibold text-foreground md:text-base lg:text-lg">
                  {period}
                </span>
              </div>

              <div className="flex flex-col py-2 md:items-center md:py-0 md:text-center">
                <span className="text-base font-bold text-foreground md:text-lg lg:text-xl">
                  {company}
                </span>
                <span className="mt-0.5 text-sm text-muted">{title}</span>
              </div>

              <div className="border-b border-line pb-4 pt-2 last:border-b-0 md:border-0 md:py-0 md:text-right md:last:border-b-0">
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {description}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

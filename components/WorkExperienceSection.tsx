import { Fragment } from 'react';

const experiences = [
  {
    period: 'April 2025 – January 2026',
    company: 'Scorched Ice Inc',
    title: 'Full Stack Developer',
    description:
      'Architected serverless AWS stack (Lambda, API Gateway, DynamoDB) sustaining 99.9% uptime with under 200ms P95 latency.',
  },
  {
    period: 'March 2023 – March 2024',
    company: 'Pelmorex Corp',
    title: 'Full Stack Developer',
    description:
      'Owned full-stack CTV DSP platform integrations, driving over CAD 250K in annual revenue.',
  },
  {
    period: 'January 2022 – March 2023',
    company: 'Ant Analytica',
    title: 'Software Engineer',
    description:
      'Re-architected Node.js backend with pub/sub, boosting throughput fivefold and enabling horizontal scale.',
  },
  {
    period: 'April 2021 – January 2022',
    company: 'Intelligent Innovations',
    title: 'Backend Software Engineer',
    description:
      'Implemented high-throughput webhooks in Node.js, doubling data throughput and application responsiveness.',
  },
  {
    period: 'November 2020 – April 2021',
    company: 'Edukoya',
    title: 'Backend Software Engineer',
    description:
      'Built Node.js/TypeScript microservices with Docker and RabbitMQ, reducing downtime by 80% and improving scalability for reliable distributed systems.',
  },
  {
    period: 'May 2020 – October 2020',
    company: 'Cotta & Cush',
    title: 'Software Engineer',
    description:
      'Built multiple mobile-first React features optimized across four display breakpoints.',
  },
];

export function WorkExperienceSection() {
  return (
    <section className="section-breakout">
      <div className="section-inner section-padding">
        <div className="mb-8 flex items-center gap-4 md:mb-12">
          <span className="text-sm font-mono lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
            .experience
          </span>
          <span className="h-px max-w-full flex-1 bg-neutral-400 dark:bg-neutral-600" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-6 border-neutral-300 dark:border-white/10 sm:gap-8 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
          {experiences.map(({ period, company, title, description }) => (
            <Fragment key={company}>
              {/* Column 1: Time period - left aligned */}
              <div className="py-2 md:py-0">
                <span className="text-sm font-semibold text-neutral-900 dark:text-white md:text-base lg:text-lg">
                  {period}
                </span>
              </div>

              {/* Column 2: Company + title - centered */}
              <div className="flex flex-col py-2 md:items-center md:py-0 md:text-center">
                <span className="text-base font-bold text-neutral-900 dark:text-white md:text-lg lg:text-xl">
                  {company}
                </span>
                <span className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">{title}</span>
              </div>

              {/* Column 3: Description - right aligned */}
              <div className="border-b border-neutral-200 pb-4 pt-2 last:border-b-0 dark:border-white/10 md:border-0 md:py-0 md:text-right md:last:border-b-0">
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-base">
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

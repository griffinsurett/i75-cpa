// src/components/accessibility/controls/Section.tsx

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-heading mb-4 pb-2 border-b-2 border-primary">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

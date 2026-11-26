import type { LegalSection } from "../lib/legalContent";

type LegalDocumentProps = {
  sections: LegalSection[];
  compact?: boolean;
};

export default function LegalDocument({
  sections,
  compact = false,
}: LegalDocumentProps) {
  return (
    <div className={compact ? "space-y-5" : "space-y-10"}>
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <h2
            className={
              compact
                ? "mb-2 text-base font-bold text-[#446685]"
                : "mb-3 text-xl font-bold leading-tight text-[#446685] sm:text-2xl"
            }
          >
            {index + 1}. {section.title}
          </h2>

          <div
            className={`space-y-3 text-[#3F4E5E] ${
              compact ? "text-sm leading-relaxed" : "text-[15px] leading-7"
            }`}
          >
            {section.blocks.map((block, blockIndex) => {
              if (block.type === "h") {
                return (
                  <h3
                    key={blockIndex}
                    className="pt-1 font-semibold text-[#183B56]"
                  >
                    {block.text}
                  </h3>
                );
              }

              if (block.type === "ul") {
                return (
                  <ul
                    key={blockIndex}
                    className="list-disc space-y-1.5 pl-5 marker:text-[#47a8e4]"
                  >
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }

              return <p key={blockIndex}>{block.text}</p>;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

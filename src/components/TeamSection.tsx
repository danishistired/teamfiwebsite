import { teamMembers } from "@/data/teamMembers";
import ChromaGrid, { ChromaItem } from "./ChromaGrid";

const borderColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
const gradients = [
  "linear-gradient(145deg, #3B82F6, #000)",
  "linear-gradient(180deg, #10B981, #000)",
  "linear-gradient(165deg, #F59E0B, #000)",
  "linear-gradient(195deg, #EF4444, #000)",
  "linear-gradient(225deg, #8B5CF6, #000)",
];

const TeamSection = () => {
  const chromaItems: ChromaItem[] = teamMembers.map((member, index) => ({
    image: member.image || `https://i.pravatar.cc/300?img=${index + 1}`,
    title: member.name,
    subtitle: member.role,
    handle: `@${member.id}`,
    borderColor: borderColors[index % borderColors.length],
    gradient: gradients[index % gradients.length],
    url: `/member/${member.id}`,
  }));

  return (
    <section id="team" className="snap-section flex items-center py-24">
      <div className="container">
        <h2 className="text-2xl mb-12">our team</h2>
        
        <div style={{ minHeight: '600px', position: 'relative' }}>
          <ChromaGrid 
            items={chromaItems}
            radius={300}
            columns={5}
            rows={1}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

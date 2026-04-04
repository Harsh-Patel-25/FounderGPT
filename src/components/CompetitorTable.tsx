import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CompetitorInsight } from "@/types";

interface CompetitorTableProps {
  competitors: CompetitorInsight[];
}

const CompetitorTable = ({ competitors }: CompetitorTableProps) => (
  <section className="py-12">
    <div className="container max-w-5xl">
      <div className="glass rounded-xl p-6">
        <h2 className="font-heading text-2xl font-bold mb-6">Competitor Landscape</h2>
        <Table>
          <TableHeader>
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="text-primary font-semibold">Competitor</TableHead>
              <TableHead className="text-primary font-semibold">Strength</TableHead>
              <TableHead className="text-primary font-semibold">Weakness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitors.map((c) => (
              <TableRow key={c.name} className="border-border/30 hover:bg-secondary/40 transition-colors">
                <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                <TableCell className="text-muted-foreground">{c.strengths.join(", ")}</TableCell>
                <TableCell className="text-muted-foreground">{c.weaknesses.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </section>
);

export default CompetitorTable;

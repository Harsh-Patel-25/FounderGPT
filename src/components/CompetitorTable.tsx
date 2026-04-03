import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const competitors = [
  { name: "MyFitnessPal", strength: "Large user base (200M+)", weakness: "Limited AI features" },
  { name: "Fitbod", strength: "Smart workout plans", weakness: "Expensive subscription" },
  { name: "Peloton", strength: "Strong brand & community", weakness: "Hardware dependency" },
  { name: "Apple Fitness+", strength: "Ecosystem integration", weakness: "No personalized coaching" },
];

const CompetitorTable = () => (
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
                <TableCell className="text-muted-foreground">{c.strength}</TableCell>
                <TableCell className="text-muted-foreground">{c.weakness}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </section>
);

export default CompetitorTable;

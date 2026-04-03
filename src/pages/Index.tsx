import Navbar from "@/components/Navbar";
import IdeaInput from "@/components/IdeaInput";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <IdeaInput />
      <Dashboard />
      <footer className="border-t border-border/40 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 FounderGPT. Built for founders, by AI.
        </div>
      </footer>
    </div>
  );
};

export default Index;

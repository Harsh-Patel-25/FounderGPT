import { ExternalLink, BookOpen, Calendar, Users, Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ResearchData } from "@/types";

interface ResearchPanelProps {
  data: ResearchData;
}

const getSourceColor = (source: string) => {
  switch (source.toLowerCase()) {
    case 'semantic scholar':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'arxiv':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'google scholar':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ResearchPanel = ({ data }: ResearchPanelProps) => {
  const { papers = [], analysis } = data;
  const summary = analysis?.research_summary || "No research summary is available.";
  const trends = analysis?.trends || [];
  const improvements = analysis?.improvements || [];
  const advancedIdea = analysis?.advanced_idea || "No advanced idea available.";

  return (
    <div className="space-y-8">
      {/* Research Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Research Intelligence Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Research Summary</h4>
            <p className="text-muted-foreground">{analysis.research_summary}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Key Trends</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {analysis.trends.map((trend, index) => (
                <li key={index}>{trend}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Suggested Improvements</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {analysis.improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Enhanced Idea</h4>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-foreground">{analysis.advanced_idea}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Papers */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Supporting Research Papers ({papers.length})</h3>
        <div className="grid gap-4">
          {papers.map((paper, index) => (
            <Card key={paper.id || index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-base leading-tight mb-2">
                      {paper.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={getSourceColor(paper.source)}>
                        {paper.source}
                      </Badge>
                      {paper.year && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {paper.year}
                        </div>
                      )}
                      {paper.citationCount > 0 && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Quote className="h-3 w-3" />
                          {paper.citationCount} citations
                        </div>
                      )}
                    </div>
                  </div>
                  {paper.url ? (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="shrink-0"
                    >
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </a>
                    </Button>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                {paper.authors && paper.authors.length > 0 && (
                  <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {paper.authors.slice(0, 3).join(", ")}
                    {paper.authors.length > 3 && ` +${paper.authors.length - 3} more`}
                  </div>
                )}
                {paper.abstract && (
                  <p className="text-sm text-muted-foreground overflow-hidden"
                     style={{
                       display: '-webkit-box',
                       WebkitLineClamp: 3,
                       WebkitBoxOrient: 'vertical' as const,
                       lineHeight: '1.4em',
                       maxHeight: '4.2em'
                     }}>
                    {paper.abstract}
                  </p>
                )}
                {paper.venue && paper.venue !== paper.source && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Published in: {paper.venue}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchPanel;
import { motion } from 'framer-motion';
import { Github, GitCommit, GitFork, Star, Code2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface GitHubData {
  username: string;
  repos: number;
  commits: number;
  stars: number;
  languages: string[];
  contributions: number;
}

const mockData: GitHubData = {
  username: 'developer',
  repos: 47,
  commits: 1243,
  stars: 892,
  languages: ['TypeScript', 'JavaScript', 'Rust', 'Solidity', 'Python'],
  contributions: 2156,
};

export function GitHubStats() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!username) return;
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setData({ ...mockData, username });
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-secondary">
          <Github className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">GitHub Verification</h3>
          <p className="text-sm text-muted-foreground">Link your GitHub activity as skill proof</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-secondary/50 border-border/50"
        />
        <Button onClick={handleVerify} disabled={loading || !username} variant="fire">
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </div>

      {data && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <span className="text-green-500 font-medium">@{data.username} verified</span>
            <Activity className="w-4 h-4 text-green-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-secondary/50 text-center">
              <GitFork className="w-4 h-4 mx-auto mb-1 text-fire-orange" />
              <p className="text-lg font-bold">{data.repos}</p>
              <p className="text-xs text-muted-foreground">Repos</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 text-center">
              <GitCommit className="w-4 h-4 mx-auto mb-1 text-fire-amber" />
              <p className="text-lg font-bold">{data.commits.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Commits</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 text-center">
              <Star className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
              <p className="text-lg font-bold">{data.stars}</p>
              <p className="text-xs text-muted-foreground">Stars</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 text-center">
              <Code2 className="w-4 h-4 mx-auto mb-1 text-accent" />
              <p className="text-lg font-bold">{data.contributions.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Contributions</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Top Languages</p>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((lang) => (
                <span 
                  key={lang} 
                  className="px-3 py-1 text-xs rounded-full bg-fire-orange/10 text-fire-orange border border-fire-orange/20"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

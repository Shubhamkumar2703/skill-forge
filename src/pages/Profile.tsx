import { motion } from 'framer-motion';
import { 
  Share2, Copy, Check, ExternalLink, Github, 
  MapPin, Calendar, Award, Shield, GitBranch,
  Star, Code2
} from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CredentialCard } from '@/components/CredentialCard';
import { useWallet } from '@/hooks/useWallet';

const mockProfile = {
  username: 'alexdev.eth',
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f12345',
  avatar: null,
  bio: 'Full-stack developer specializing in Web3, DeFi, and smart contract development. Building the decentralized future.',
  location: 'San Francisco, CA',
  joinedDate: 'October 2023',
  github: {
    username: 'alexdev',
    repos: 47,
    commits: 1243,
    stars: 892,
    contributions: 2156,
  },
  credentials: [
    {
      title: 'Full Stack Developer',
      issuer: 'Web3 Academy',
      issuedDate: 'Jan 15, 2024',
      skills: ['React', 'Node.js', 'Solidity', 'TypeScript'],
      ipfsHash: 'QmYwAP...x3F2',
      verified: true,
    },
    {
      title: 'Smart Contract Auditor',
      issuer: 'Blockchain Institute',
      issuedDate: 'Dec 3, 2023',
      skills: ['Solidity', 'Security', 'Auditing'],
      ipfsHash: 'QmRtY7...k9P1',
      verified: true,
    },
  ],
  skills: [
    { name: 'Solidity', level: 95 },
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'Node.js', level: 85 },
    { name: 'Rust', level: 70 },
  ],
};

export default function Profile() {
  const { isConnected, address, formatAddress } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        {/* Hero/Banner */}
        <div className="relative h-48 bg-gradient-to-r from-fire-red via-fire-orange to-fire-amber">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative -mt-16 mb-8"
          >
            <div className="glass-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-fire-orange to-fire-amber flex items-center justify-center text-4xl font-bold text-primary-foreground -mt-16 md:-mt-20 border-4 border-background">
                  A
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{mockProfile.username}</h1>
                      <p className="text-sm text-muted-foreground font-mono">
                        {formatAddress(mockProfile.address)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="fire-outline" size="sm" onClick={handleCopyLink} className="gap-2">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy Link'}
                      </Button>
                      <Button variant="fire" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <p className="mt-4 text-muted-foreground max-w-2xl">
                    {mockProfile.bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {mockProfile.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {mockProfile.joinedDate}
                    </span>
                    <a 
                      href={`https://github.com/${mockProfile.github.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-fire-orange hover:underline"
                    >
                      <Github className="w-4 h-4" />
                      @{mockProfile.github.username}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            {[
              { icon: Shield, label: 'Credentials', value: mockProfile.credentials.length },
              { icon: GitBranch, label: 'Repositories', value: mockProfile.github.repos },
              { icon: Code2, label: 'Commits', value: mockProfile.github.commits.toLocaleString() },
              { icon: Star, label: 'Stars', value: mockProfile.github.stars },
              { icon: Award, label: 'Contributions', value: mockProfile.github.contributions.toLocaleString() },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-4 text-center">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-fire-orange" />
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Credentials */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-fire-orange" />
                Verified Credentials
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {mockProfile.credentials.map((credential, index) => (
                  <CredentialCard key={index} {...credential} delay={index * 0.1} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-fire-orange" />
                  Top Skills
                </h3>
                <div className="space-y-4">
                  {mockProfile.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full fire-gradient-bg rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* GitHub Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub Verified
                </h3>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm mb-4">
                  <Check className="w-4 h-4" />
                  Activity verified on-chain
                </div>
                <a 
                  href={`https://github.com/${mockProfile.github.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" className="w-full gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View GitHub Profile
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Award, Shield, GitBranch, Wallet, Plus, FileCheck, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { StatsCard } from '@/components/StatsCard';
import { CredentialCard } from '@/components/CredentialCard';
import { GitHubStats } from '@/components/GitHubStats';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';

const mockCredentials = [
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
  {
    title: 'DeFi Developer',
    issuer: 'DeFi Labs',
    issuedDate: 'Nov 20, 2023',
    skills: ['DeFi', 'AMM', 'Yield Farming'],
    ipfsHash: 'QmLnW8...m4R7',
    verified: true,
  },
];

export default function Dashboard() {
  const { isConnected, address, formatAddress } = useWallet();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your credentials and skill verifications
            </p>
          </motion.div>

          {/* Wallet Connection Warning */}
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 mb-8 border-fire-orange/30"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-fire-orange/10">
                  <AlertCircle className="w-5 h-5 text-fire-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your MetaMask wallet to access your credentials and issue new certificates.
                  </p>
                  <Button variant="fire" size="sm">
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              icon={Shield} 
              label="Total Credentials" 
              value={3} 
              change="+1 this month"
              delay={0}
            />
            <StatsCard 
              icon={Award} 
              label="Skills Verified" 
              value={12} 
              delay={0.1}
            />
            <StatsCard 
              icon={GitBranch} 
              label="GitHub Repos Linked" 
              value={47} 
              delay={0.2}
            />
            <StatsCard 
              icon={FileCheck} 
              label="Verification Requests" 
              value={28} 
              change="+5 today"
              delay={0.3}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Credentials Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Credentials</h2>
                <Button variant="fire" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Issue New
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {mockCredentials.map((credential, index) => (
                  <CredentialCard
                    key={index}
                    {...credential}
                    delay={index * 0.1}
                  />
                ))}
                
                {/* Add New Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 flex flex-col items-center justify-center min-h-[280px] border-dashed border-2 border-border/50 hover:border-fire-orange/30 transition-colors cursor-pointer group"
                >
                  <div className="p-4 rounded-full bg-secondary/50 mb-4 group-hover:bg-fire-orange/10 transition-colors">
                    <Plus className="w-6 h-6 text-muted-foreground group-hover:text-fire-orange transition-colors" />
                  </div>
                  <p className="text-muted-foreground text-sm">Issue New Credential</p>
                </motion.div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <GitHubStats />
              
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full justify-start gap-2">
                    <Shield className="w-4 h-4" />
                    Verify a Credential
                  </Button>
                  <Button variant="secondary" className="w-full justify-start gap-2">
                    <Award className="w-4 h-4" />
                    View Public Profile
                  </Button>
                  <Button variant="secondary" className="w-full justify-start gap-2">
                    <FileCheck className="w-4 h-4" />
                    Export Credentials
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

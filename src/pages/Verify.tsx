import { motion } from 'framer-motion';
import { Search, Shield, CheckCircle2, XCircle, ExternalLink, User, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface VerificationResult {
  valid: boolean;
  credential: {
    title: string;
    issuer: string;
    recipient: string;
    issuedDate: string;
    skills: string[];
    ipfsHash: string;
    txHash: string;
  };
}

const mockResult: VerificationResult = {
  valid: true,
  credential: {
    title: 'Full Stack Developer',
    issuer: 'Web3 Academy',
    recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f12345',
    issuedDate: 'January 15, 2024',
    skills: ['React', 'Node.js', 'Solidity', 'TypeScript', 'PostgreSQL'],
    ipfsHash: 'QmYwAPJzv5CZsnAzt8auVZRn23sCXX3Fa9jf88UgMbPr3F',
    txHash: '0x8f7d...3e2a',
  },
};

export default function Verify() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResult(mockResult);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-fire-orange/10 mb-6">
              <Shield className="w-8 h-8 text-fire-orange" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Verify Credentials</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Enter a wallet address or credential ID to verify on-chain credentials 
              and view linked proof.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter wallet address (0x...) or credential ID"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 h-12 bg-secondary/50 border-border/50 text-base"
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                />
              </div>
              <Button 
                variant="fire" 
                size="lg" 
                onClick={handleVerify}
                disabled={loading || !query}
                className="px-8"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Example: 0x742d35Cc6634C0532925a3b844Bc9e7595f12345
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-12 text-center"
            >
              <div className="w-16 h-16 border-4 border-fire-orange/30 border-t-fire-orange rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Querying blockchain...</p>
            </motion.div>
          )}

          {/* Result */}
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Verification Status */}
              <div className={`glass-card p-6 border-2 ${
                result.valid ? 'border-green-500/50' : 'border-red-500/50'
              }`}>
                <div className="flex items-center gap-4">
                  {result.valid ? (
                    <div className="p-3 rounded-full bg-green-500/10">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  ) : (
                    <div className="p-3 rounded-full bg-red-500/10">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {result.valid ? 'Credential Verified' : 'Verification Failed'}
                    </h2>
                    <p className="text-muted-foreground">
                      {result.valid 
                        ? 'This credential is valid and recorded on the Polygon blockchain.'
                        : 'This credential could not be verified.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Credential Details */}
              {result.valid && (
                <>
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-fire-orange" />
                      Credential Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Title</p>
                        <p className="font-semibold text-lg">{result.credential.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Issuer</p>
                        <p className="font-semibold">{result.credential.issuer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <User className="w-3 h-3" /> Recipient
                        </p>
                        <p className="font-mono text-sm truncate">{result.credential.recipient}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Issue Date
                        </p>
                        <p className="font-medium">{result.credential.issuedDate}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm text-muted-foreground mb-2">Verified Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {result.credential.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-fire-orange/10 text-fire-orange border-fire-orange/20">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* On-Chain Data */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-4">On-Chain Proof</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">IPFS Hash</p>
                          <p className="font-mono text-sm truncate max-w-[200px] md:max-w-none">
                            {result.credential.ipfsHash}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ExternalLink className="w-3 h-3" />
                          View
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                          <p className="font-mono text-sm">{result.credential.txHash}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Polygonscan
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Shield, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CredentialCardProps {
  title: string;
  issuer: string;
  issuedDate: string;
  skills: string[];
  ipfsHash: string;
  verified: boolean;
  delay?: number;
}

export function CredentialCard({ 
  title, 
  issuer, 
  issuedDate, 
  skills, 
  ipfsHash, 
  verified,
  delay = 0 
}: CredentialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card-glow p-6 group hover:border-fire-orange/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-fire-orange/20 to-fire-amber/20 border border-fire-orange/20">
          <Shield className="w-6 h-6 text-fire-orange" />
        </div>
        {verified && (
          <div className="flex items-center gap-1 text-green-500 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">Issued by {issuer}</p>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <Calendar className="w-3 h-3" />
        <span>{issuedDate}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <Badge 
            key={skill} 
            variant="secondary" 
            className="bg-secondary/50 text-xs"
          >
            {skill}
          </Badge>
        ))}
      </div>

      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono truncate max-w-[150px]">
            {ipfsHash}
          </span>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <ExternalLink className="w-3 h-3" />
            View on IPFS
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

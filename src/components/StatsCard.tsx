import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  delay?: number;
}

export function StatsCard({ icon: Icon, label, value, change, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-5 hover:border-fire-orange/30 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg bg-fire-orange/10">
          <Icon className="w-5 h-5 text-fire-orange" />
        </div>
        {change && (
          <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

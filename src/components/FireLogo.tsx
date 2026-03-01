import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface FireLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function FireLogo({ size = 'md', showText = true }: FireLogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg' },
    md: { icon: 'w-8 h-8', text: 'text-2xl' },
    lg: { icon: 'w-12 h-12', text: 'text-4xl' },
  };

  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="relative"
        animate={{ 
          filter: ['drop-shadow(0 0 8px hsl(25 95% 53% / 0.5))', 'drop-shadow(0 0 16px hsl(25 95% 53% / 0.8))', 'drop-shadow(0 0 8px hsl(25 95% 53% / 0.5))']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame className={`${sizes[size].icon} text-fire-orange`} />
      </motion.div>
      {showText && (
        <span className={`${sizes[size].text} font-bold fire-gradient-text`}>
          SkillForge
        </span>
      )}
    </motion.div>
  );
}

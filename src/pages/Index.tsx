import { motion } from 'framer-motion';
import { ArrowRight, Shield, Github, Globe, Zap, Lock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FireLogo } from '@/components/FireLogo';
import { WalletButton } from '@/components/WalletButton';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Shield,
    title: 'On-Chain Credentials',
    description: 'Issue and verify blockchain-based certificates on Polygon for immutable proof of skills.',
  },
  {
    icon: Github,
    title: 'GitHub Proof',
    description: 'Link your GitHub activity as verifiable evidence of your development experience.',
  },
  {
    icon: Globe,
    title: 'Public Verification',
    description: 'Anyone can verify credentials without trusting a centralized authority.',
  },
  {
    icon: Lock,
    title: 'IPFS Storage',
    description: 'Proof metadata stored on decentralized storage for permanent accessibility.',
  },
];

const stats = [
  { value: '10K+', label: 'Verified Developers' },
  { value: '50K+', label: 'Credentials Issued' },
  { value: '99.9%', label: 'Uptime' },
  { value: '0', label: 'Centralized Points of Failure' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fire-orange/20 rounded-full blur-[128px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fire-amber/10 rounded-full blur-[128px] animate-glow-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Navbar */}
        <header className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <FireLogo size="sm" />
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link to="/verify" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Verify
                </Link>
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
              </nav>
              <WalletButton />
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire-orange/10 border border-fire-orange/20 text-fire-orange text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Powered by Polygon & IPFS
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Verify <span className="fire-gradient-text">Real Skills</span>,
                <br />Not Just Certificates
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              >
                SkillForge combines on-chain credentials with real GitHub activity to create 
                trustless, verifiable proof of developer skills.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to="/dashboard">
                  <Button variant="fire" size="xl" className="gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/verify">
                  <Button variant="fire-outline" size="xl">
                    Verify a Developer
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold fire-gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for the <span className="fire-gradient-text">Decentralized</span> Future
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trustless verification that puts developers in control of their credentials
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-fire-orange/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-fire-orange/10 w-fit mb-4 group-hover:bg-fire-orange/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-fire-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It <span className="fire-gradient-text">Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Connect Wallet', desc: 'Sign in with MetaMask to create your decentralized identity' },
              { step: '02', title: 'Link GitHub', desc: 'Verify your development activity and contributions' },
              { step: '03', title: 'Issue Credentials', desc: 'Get on-chain certificates backed by real proof' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="text-7xl font-bold text-fire-orange/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fire-orange/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-glow p-12 md:p-16 text-center max-w-3xl mx-auto"
          >
            <CheckCircle2 className="w-12 h-12 text-fire-orange mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Prove Your Skills?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers with verifiable, on-chain credentials.
            </p>
            <Link to="/dashboard">
              <Button variant="fire" size="xl" className="gap-2">
                Launch App
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <FireLogo size="sm" />
            <p className="text-sm text-muted-foreground">
              © 2024 SkillForge. Built on Polygon.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

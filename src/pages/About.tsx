import { Heart, Mail, Phone, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-10 max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold">About the Developer</h1>
          <p className="text-muted-foreground">
            Built with passion by <span className="font-semibold text-foreground">Timtiml</span> (Anotida Manguwe)
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              This application was developed by <span className="font-medium text-foreground">Anotida Manguwe</span>, a student with a strong passion for technology, software development, and building practical solutions that solve real-world problems.
            </p>
            <p>
              The purpose of this project is to help students—both local and international—manage their finances more effectively through a simple, intuitive, and accessible budgeting tool.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Mission</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To empower students with simple and effective digital tools that improve financial awareness, encourage smart spending habits, and promote better money management. 🎓
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="font-heading text-lg font-semibold">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX', 'Data Handling', 'Local Storage'].map((skill) => (
                <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold">Contact</h2>
            <div className="space-y-3">
              <a href="mailto:anotida30manguwe12@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                anotida30manguwe12@gmail.com
              </a>
              <a href="tel:+260768648291" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                +260 768 648 291
              </a>
              <a href="https://timtiml-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-4 w-4" />
                timtiml-website.vercel.app
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Developed with <Heart className="inline h-3 w-3 text-destructive" /> and dedication by Timtiml.
        </p>
      </main>
    </div>
  );
};

export default About;

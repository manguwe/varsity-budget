import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-6 mt-8">
      <div className="container text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Developed with <Heart className="inline h-3.5 w-3.5 text-destructive" /> by{' '}
          <Link to="/about" className="font-medium text-foreground hover:text-primary transition-colors">
            Timtiml
          </Link>{' '}
          (Anotida Manguwe)
        </p>
        <p className="text-xs text-muted-foreground">
          Empowering students with smart financial tools 🎓
        </p>
        <p className="text-xs text-muted-foreground">
          <Link to="/about" className="hover:text-primary transition-colors">
            About the Developer
          </Link>
        </p>
      </div>
    </footer>
  );
}

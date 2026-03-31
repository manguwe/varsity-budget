import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-6 mt-8">
      <div className="container text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Developed with <Heart className="inline h-3.5 w-3.5 text-destructive" /> by{' '}
          <a
            href="https://timtiml-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            Timtiml
          </a>{' '}
          (Anotida Manguwe)
        </p>
        <p className="text-xs text-muted-foreground">
          Empowering students with smart financial tools 🎓
        </p>
        <p className="text-xs text-muted-foreground">
          <a href="mailto:anotida30manguwe12@gmail.com" className="hover:text-primary transition-colors">
            anotida30manguwe12@gmail.com
          </a>
          {' · '}
          <a href="tel:+260768648291" className="hover:text-primary transition-colors">
            +260 768 648 291
          </a>
        </p>
      </div>
    </footer>
  );
}

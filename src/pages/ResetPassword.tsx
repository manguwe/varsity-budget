import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Wallet, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (!hash.includes('type=recovery')) {
      // If no recovery token, redirect to login
      navigate('/auth');
    }
  }, [navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Password updated!', description: 'You can now log in with your new password.' });
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
              <Wallet className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-bold">Reset Password</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Set New Password</CardTitle>
            </CardHeader>
            <form onSubmit={handleReset}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Password
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
      <footer className="border-t border-border/50 py-4">
        <p className="text-center text-xs text-muted-foreground">
          Developed with <Heart className="inline h-3 w-3 text-destructive" /> by Anotida Manguwe
        </p>
      </footer>
    </div>
  );
};

export default ResetPassword;

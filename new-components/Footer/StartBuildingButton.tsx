'use client';

import { useGTM } from '@/hooks/use-gtm';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useOpenAuthForm } from '@/new-components/AuthForm/AuthFormContext';
import { getOpenBrainParam } from '@/lib/utils/brain';

export function StartBuildingButton() {
  const { trackButton } = useGTM();
  const openAuthForm = useOpenAuthForm();

  return (
    <Button
      variant="landing-primary"
      onClick={() => {
        trackButton('Get Started', 'footer', 'auth-form', '');
        openAuthForm({ openapp: getOpenBrainParam() });
      }}
    >
      <span>Start Building for Free</span>
      <ArrowRight size={16} className="ml-1" />
    </Button>
  );
}

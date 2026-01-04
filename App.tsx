
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, WorkoutSession } from './types';
import Login from './views/Login';
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import WorkoutSessionView from './views/WorkoutSessionView';
import RestTimerView from './views/RestTimerView';
import Summary from './views/Summary';
import Progress from './views/Progress';
import AICoach from './views/AICoach';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LOGIN);
  const [user, setUser] = useState<UserProfile>({
    name: 'David',
    goal: 'Hypertrophy',
    experience: 'Intermediate',
    environment: 'Commercial Gym',
    streak: 5,
    weight: 78.5,
    bodyFat: 15.2
  });

  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);

  const navigateTo = (newView: AppView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    switch (view) {
      case AppView.LOGIN:
        return <Login onLogin={() => navigateTo(AppView.DASHBOARD)} onRegister={() => navigateTo(AppView.ONBOARDING)} />;
      case AppView.ONBOARDING:
        return <Onboarding onComplete={(profile) => { setUser(profile); navigateTo(AppView.DASHBOARD); }} />;
      case AppView.DASHBOARD:
        return <Dashboard user={user} onStartWorkout={(session) => { setActiveSession(session); navigateTo(AppView.WORKOUT_SESSION); }} onNavigate={navigateTo} />;
      case AppView.WORKOUT_SESSION:
        return <WorkoutSessionView session={activeSession!} onFinish={() => navigateTo(AppView.SUMMARY)} onRest={() => navigateTo(AppView.REST_TIMER)} onNavigate={navigateTo} />;
      case AppView.REST_TIMER:
        return <RestTimerView onSkip={() => navigateTo(AppView.WORKOUT_SESSION)} onFinish={() => navigateTo(AppView.WORKOUT_SESSION)} />;
      case AppView.SUMMARY:
        return <Summary onDone={() => navigateTo(AppView.DASHBOARD)} />;
      case AppView.PROGRESS:
        return <Progress onNavigate={navigateTo} />;
      case AppView.AI_COACH:
        return <AICoach onNavigate={navigateTo} />;
      default:
        return <Login onLogin={() => navigateTo(AppView.DASHBOARD)} onRegister={() => navigateTo(AppView.ONBOARDING)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-background-dark overflow-x-hidden">
      {renderView()}
      
      {/* Floating Chat Trigger (Fixed across some views) */}
      {view !== AppView.LOGIN && view !== AppView.ONBOARDING && view !== AppView.REST_TIMER && (
        <button 
          onClick={() => navigateTo(AppView.AI_COACH)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-background-dark rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center border-4 border-background-dark/50"
        >
          <span className="material-symbols-outlined text-3xl">psychology</span>
        </button>
      )}
    </div>
  );
};

export default App;

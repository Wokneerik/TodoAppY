import Navigation from './src/navigation/Navigation';
import {AuthProvider} from './src/providers/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

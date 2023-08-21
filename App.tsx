import Navigation from './src/navigation/Navigation';
import {AuthProvider} from './src/providers/AuthProvider';
import {DataProvider} from './src/providers/DataProvider';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Navigation />
      </DataProvider>
    </AuthProvider>
  );
}

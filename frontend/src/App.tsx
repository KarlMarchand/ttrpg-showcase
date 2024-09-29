import Showcase from "./components/Showcase";
import { SettingsProvider } from "./contexts/settingsContext/SettingsContext";

function App() {
  
  return (
    <SettingsProvider>
      <Showcase />
    </SettingsProvider>
  );
}

export default App;

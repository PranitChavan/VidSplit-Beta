import Navbar from './components/navbar';
import Main from './components/main';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;

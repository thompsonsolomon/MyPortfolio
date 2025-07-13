import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import WakaHeatmap from "./components/wakatimeStat";
import { AuthProvider } from "./components/contexts/AuthContext";


const App = () => {
  return (
    <BrowserRouter>
   <AuthProvider>

      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <WakaHeatmap />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
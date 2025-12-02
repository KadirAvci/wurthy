import "./App.css"
import MainPanel from "./components/features/MainPanel/MainPanel";
import { ThemeProvider } from "./components/features/ThemeProvider/ThemeProvider";
import { useAppSelector } from "@/store/hook";
import Dashboard from "@/pages/dashboard";

function App() {
  const activePage = useAppSelector((state) => state.router.activePage)

  const routing = () => {
    if (activePage === "dashboard") return <Dashboard />

    //_____  Outils
    if (activePage === "settings") return <Dashboard />
    if (activePage === "hack-gpt") return <Dashboard />
    if (activePage === "excel-transformer") return <Dashboard />
    if (activePage === "arborescence-categories") return <Dashboard />

    //_____  Avis vérifiés
    if (activePage === "avis-verifies") return <Dashboard />

    //_____  Cadeau
    if (activePage === "cadeaux") return <Dashboard />

    //_____  Client
    if (activePage === "client-page") return <Dashboard />

    //_____  Produits
    if (activePage === "produits") return <Dashboard />

    //_____  Page
    if (activePage === "pages") return <Dashboard />

    //_____  Jeux
    if (activePage === "games") return <Dashboard />

    //_____  Astuces
    if (activePage === "outils-ia") return <Dashboard />
    if (activePage === "astuces-pc") return <Dashboard />
    if (activePage === "astuces-navigateur") return <Dashboard />
    if (activePage === "astuces") return <Dashboard />

    //_____  Team
    if (activePage === "membres") return <Dashboard />
    if (activePage === "personalities") return <Dashboard />
    if (activePage === "wall-of-fame") return <Dashboard />
    if (activePage === "starter-pack") return <Dashboard />
    if (activePage === "process") return <Dashboard />
    if (activePage === "who") return <Dashboard />

    //_____  Projets Eshop
    if (activePage === "projets-eshop") return <Dashboard />

    //_____  Docs
    if (activePage === "docs") return <Dashboard />

    //_____  Page actuelle
    if (activePage === "page-courant") return <Dashboard />

    return <Dashboard />

  }

  return (
    <ThemeProvider>
      <MainPanel>
        {routing()}
      </MainPanel>
    </ThemeProvider>
  )
}

export default App
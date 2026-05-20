import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import ListaRestaurantes from './components/ListaRestaurantes';
import { useAuth } from './hooks/useAuth';
import { useRestaurantes } from './hooks/useRestaurantes';

function Panel({ onLogout }) {
  const { restaurantes, busqueda, setBusqueda, cargando, metricas, refrescar } =
    useRestaurantes();

  return (
    <div className="h-full flex flex-col">
      <Header onLogout={onLogout} />
      <StatsBar metricas={metricas} />
      <ListaRestaurantes
        restaurantes={restaurantes}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        cargando={cargando}
        onRefrescar={refrescar}
      />
    </div>
  );
}

export default function App() {
  const { autenticado, verificando, error, login, logout } = useAuth();

  if (!autenticado) {
    return (
      <LoginScreen onLogin={login} verificando={verificando} error={error} />
    );
  }

  return <Panel onLogout={logout} />;
}

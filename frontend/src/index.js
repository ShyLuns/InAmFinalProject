export { default as App, ThemeContext } from './App';
export { AuthContextProvider, UserAuth } from './context/authContext';
export {  } from './main';
export { Home } from './pages/home';
export { Admin } from './pages/Admin';
export { Kardex } from './pages/Kardex';
export { Reportes } from './pages/Reportes';
export { Motatomic } from './pages/Motatomic';
export { Configurar } from './pages/Configurar';
export { MyRoutes } from './routers/routes';
export { supabase } from './supabase/supabase.config';
export { DataModulosConfiguracion, DesplegableUser, LinksArray, SecondarylinksArray, TemasData, TipoDocData, TipouserData } from './utils/dataEstatica';
export * from './components';
export * from './components/organismos/sidebar/Sidebar'
export * from './components/organismos/sidebar/SidebarCard'
export * from './components/organismos/ToggleTema'
export * from './components/organismos/MenuHambur'
export * from './styles'

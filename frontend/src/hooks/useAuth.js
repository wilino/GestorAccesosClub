import { useContext } from 'react';
import { AuthContext } from '../contextos/AuthContext';

const useAuth = () => useContext(AuthContext);

export { useAuth }; // Mejor práctica: Exportación con nombre
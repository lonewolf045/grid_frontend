import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NavigationWrapper = ({ children, setNavigate }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate, setNavigate]);
  
  return children;
};

export default NavigationWrapper;
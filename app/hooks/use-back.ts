import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function useBack(fallback: string) {
 const navigate = useNavigate();
 const location = useLocation();

  return useCallback(() => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  }, [location, fallback]);
}
/**
 * Dummy authentication for MVP
 * Uses localStorage to persist user ID
 */

export function getCurrentUser(): { id: string; name: string } {
  if (typeof window === 'undefined') {
    return { id: 'user-1', name: 'Demo User' };
  }
  
  const userId = localStorage.getItem('userId') || 'user-1';
  const userName = localStorage.getItem('userName') || 'Demo User';
  
  localStorage.setItem('userId', userId);
  localStorage.setItem('userName', userName);
  
  return { id: userId, name: userName };
}

export function setUser(id: string, name: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userId', id);
  localStorage.setItem('userName', name);
}

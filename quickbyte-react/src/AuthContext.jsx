import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "quickbyte_users_v1";
const CURRENT_USER_KEY = "quickbyte_current_user_v1";

function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function loadCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(CURRENT_USER_KEY);
  } else {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadUsers());
  const [currentUser, setCurrentUser] = useState(() => loadCurrentUser());

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    saveCurrentUser(currentUser);
  }, [currentUser]);

  const register = (payload) => {
    const { name, email, password } = payload;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    const existing = users.find(
      (u) =>
        u.email.toLowerCase() === trimmedEmail ||
        u.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (existing) {
      return { ok: false, error: "An account with this name or email already exists." };
    }

    const newUser = { name: trimmedName, email: trimmedEmail, password };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({ name: trimmedName, email: trimmedEmail });
    return { ok: true, user: newUser };
  };

  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
    );
    if (!user) {
      return { ok: false, error: "Invalid email or password." };
    }
    setCurrentUser({ name: user.name, email: user.email });
    return { ok: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isLoggedIn: Boolean(currentUser),
      register,
      login,
      logout,
    }),
    [users, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}



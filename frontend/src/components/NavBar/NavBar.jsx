// src/components/NavBar.jsx
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import './NavBar.css';

const NavBar = () => {
  // Left side: App title
  const start = (
    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'black' }}>
      Meeting Summary Generator
    </div>
  );

  // Right side: About button and Profile icon button
  const end = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button label="About" />
      <Button icon="pi pi-user" rounded aria-label="User" />
    </div>
  );

  return <Menubar className="nav-bar" start={start} end={end} />;
};

export default NavBar;

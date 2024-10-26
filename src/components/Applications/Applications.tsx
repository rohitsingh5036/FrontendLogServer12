import { useState } from 'react';
import { Group, Burger, Container, Button } from '@mantine/core';
import ApplicationsTable from './ApplicationsTable';
import ApplicationsGrid from './ApplicationsGrid';
import classes from '../Dashboard/DashboardNavbar/DashboardNavbar.module.css';
import { useDisclosure } from '@mantine/hooks';

export function Applications() {
  const [opened, { toggle }] = useDisclosure(false);
  const [view, setView] = useState<'table' | 'grid'>('table'); // State to control which component is shown

  return (
    <div>
      <Container className={classes.mainSection} size="md">
        <Group justify="center">
          <img
            src="https://message-attachments.s3.amazonaws.com/2856927dfe56406a91bbdfaa086d74c9.png"
            className="h-14"
            alt=""
          />
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Group>
        {/* Buttons to toggle views */}
        <Group style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop:'2rem' }}>
          <div>
            <Button
              variant={view === 'table' ? 'filled' : 'outline'}
              onClick={() => setView('table')}
              color='#191430'
            >
              Show Table View
            </Button>
          </div>
          <div>
            <Button
              variant={view === 'grid' ? 'filled' : 'outline'}
              onClick={() => setView('grid')}
              color='#191430'
            >
              Show Grid View
            </Button>
          </div>
        </Group>

      </Container>

      {/* Conditionally render the ApplicationsTable or ApplicationsGrid based on the state */}
      {view === 'table' ? <ApplicationsTable /> : <ApplicationsGrid />}
    </div>
  );
}

export default Applications;


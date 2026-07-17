import React from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import { puckConfig } from '../admin-puck-config';

// Initial data for the editor
const initialData = {
  content: [],
  root: {},
};

export default function PuckEditor() {
  const save = (data) => {
    console.log('Saved data:', data);
  };

  return (
    <div className="h-screen w-full">
      <Puck config={puckConfig} data={initialData} onPublish={save} />
    </div>
  );
}

import React from 'react';

interface InnerConProps {
  children: React.ReactNode;
}

const InnerCon = ({ children }: InnerConProps) => (
  <section className="max-w-default m-auto">{children}</section>
);

export default InnerCon;

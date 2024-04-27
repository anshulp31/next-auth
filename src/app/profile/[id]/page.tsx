'use client'
import React from 'react'

const page = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="border-white text-3xl p-3 bg-green-600">{params.id}</h1>
    </div>
  );
};

export default page
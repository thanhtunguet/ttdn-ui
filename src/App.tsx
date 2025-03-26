// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import CompanyList from './components/Companies/CompanyList';
import CompanyDetail from './components/Companies/CompanyDetail';
import ProvinceList from './components/Provinces/ProvinceList';
import CrawlerControls from './components/Crawler/CrawlerControls';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/companies" replace />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/:id" element={<CompanyDetail />} />
          <Route path="provinces" element={<ProvinceList />} />
          <Route path="crawler" element={<CrawlerControls />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
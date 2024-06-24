"use client"
import React, { useState } from "react";
import { IconType } from 'react-icons';
import { 
    FaBuilding, 
    FaMoneyBillWave, 
    FaPaw, 
    FaTruck, 
    FaBoxOpen, 
    FaChair, 
    FaPaintBrush 
  } from 'react-icons/fa';
import Link from 'next/link';

interface ServiceItem {
    icon: string | IconType;
    title: string;
    count: number | string | null;
    route: string;
    color: string;
  }

interface ServiceListWrapperProps {
  services: ServiceItem[];
}

const iconMap: { [key: string]: IconType } = {
    'FaBuilding': FaBuilding,
    'FaMoneyBillWave': FaMoneyBillWave,
    'FaPaw': FaPaw,
    'FaTruck': FaTruck,
    'FaBoxOpen': FaBoxOpen,
    'FaChair': FaChair,
    'FaPaintBrush': FaPaintBrush,
  };

export const ServiceListWrapper: React.FC<ServiceListWrapperProps> = ({ services }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
}

const ServiceCard: React.FC<ServiceItem> = ({ icon, title, count, route, color }) => {
    const Icon = typeof icon === 'string' ? iconMap[icon] : icon;
  
    const renderCount = () => {
      if (count === null) return null;
      if (typeof count === 'string' && count.startsWith('~')) {
        return `Approx. ${count.slice(1)}`;
      }
      return count;
    };
  
    return (
      <Link href={route} className="block">
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
            </div>
            {renderCount() && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                {renderCount()}
              </span>
            )}
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">Click to view details</p>
          </div>
        </div>
      </Link>
    );
  };
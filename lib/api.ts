'use server'
import axios from "axios"
import { apiUrl } from "./store"

import { revalidatePath } from 'next/cache';
interface AssetPayload {
    name: string;
    owner: string;
    location: string;
    code: string;
    description: string;
    value: string;
    type: string;
    condition: string;
    status: string;
  }

interface Asset {
  id: number;
  name: string;
  owner: string;
  location: string;
  code: string;
  type: string;
  description: string;
  value: string;
  condition: string;
  status: string;
  // Add other fields as needed
}

export async function getCasesByStatus(status: string) {

  try {
    const response = await fetch(`${apiUrl}/assets?status=${encodeURIComponent(status)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authorization headers here
      },
      cache: 'no-store', // This ensures we always get fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const assets: Asset[] = await response.json();

    // Revalidate the cases page to reflect the new data
    revalidatePath('/ams/cases');

    return { success: true, data: assets };
  } catch (error) {
    console.error('Error fetching cases:', error);
    return { success: false, message: 'Failed to fetch cases. Please try again.' };
  }
}

export async function addAsset(formData: FormData) {

  // Extract data from FormData
  const payload: AssetPayload = {
    name: formData.get('name') as string,
    owner: formData.get('owner') as string,
    location: formData.get('location') as string,
    code: formData.get('code') as string,
    description: formData.get('description') as string,
    value: formData.get('value') as string,
    type: formData.get('type') as string,
    condition: formData.get('condition') as string,
    status: formData.get('status') as string,
  };

  try {
    const response = await fetch(`${apiUrl}/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Revalidate the assets page to reflect the new data
    revalidatePath('/ams/assets');

    return { success: true, message: result.message };
  } catch (error) {
    console.error('Error adding asset:', error);
    return { success: false, message: 'Failed to add asset. Please try again.' };
  }
}

interface AssetUpdatePayload {
  name?: string;
  owner?: string;
  location?: string;
  type?: string;
  description?: string;
  value?: string;
  condition?: string;
  status?: string;
  // Add other fields as necessary
}

export async function updateCaseById(code: string, updateData: AssetUpdatePayload): Promise<{ message: string; code: string }> {
  try {
    const response = await fetch(`${apiUrl}/assets/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if required
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating case:', error);
    throw error;
  }
}
export async function deleteCaseById(code: string): Promise<{ message: string; code: string }> {
  try {
    const response = await fetch(`${apiUrl}/assets/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if required
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting case:', error);
    throw error;
  }
}

export async function getCaseById(id: string) {

  try {
    const response = await fetch(`${apiUrl}/assets/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authorization headers here
      },
      cache: 'no-store', // This ensures we always get fresh data
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const asset = await response.json()

    // Revalidate the case details page
    revalidatePath(`/ams/cases/${id}`)

    return asset
  } catch (error) {
    console.error('Error fetching case details:', error)
    return null
  }
}
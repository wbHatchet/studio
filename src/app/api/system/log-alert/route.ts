
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * @fileOverview System Alert API.
 * Receives logs from industrial workers and scripts.
 */

export async function POST(request: Request) {
  try {
    const { firestore } = initializeFirebase();
    const data = await request.json();
    
    const { userId, ...alertPayload } = data;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const systemPayload = {
      ...alertPayload,
      apiKey: 'INDUSTRIAL_SYSTEM_KEY_2026',
      timestamp: serverTimestamp(),
    };

    // Standardized user path
    const runsRef = collection(firestore, 'users', userId, 'agentRuns');
    await addDoc(runsRef, systemPayload);

    return NextResponse.json({ success: true, message: 'Alert committed to Ledger.' });
  } catch (err: any) {
    console.error('System Log Failure:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

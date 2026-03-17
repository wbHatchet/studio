
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * @fileOverview System Alert API (Industrial "Cloud Function" equivalent).
 * Receives logs from shell scripts and background workers.
 */

export async function POST(request: Request) {
  try {
    const { firestore } = initializeFirebase();
    const data = await request.json();
    
    // Payload expected: { userId, agentId, taskId?, success, error, message }
    const { userId, ...alertPayload } = data;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Add required system key for Firestore rules bypass
    const systemPayload = {
      ...alertPayload,
      apiKey: 'INDUSTRIAL_SYSTEM_KEY_2026',
      timestamp: serverTimestamp(),
    };

    const runsRef = collection(firestore, 'userProfiles', userId, 'agentRuns');
    await addDoc(runsRef, systemPayload);

    return NextResponse.json({ success: true, message: 'Alert committed to Correction Ledger.' });
  } catch (err: any) {
    console.error('System Log Failure:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

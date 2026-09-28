"use client";

import { useCallback, useRef, useState } from "react";
import { submitBooking } from "@/app/actions/booking";
import type { BookingFields } from "@/lib/booking/validate";

const NETWORK_ERROR = "We couldn't submit your request. Please call (571) 459-8155.";

const newAttemptId = () => crypto.randomUUID();

export function useBookingSubmit() {
  const [attemptId, setAttemptId] = useState(newAttemptId);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const inFlight = useRef(false);

  const submit = useCallback(
    async (fields: BookingFields): Promise<boolean> => {
      if (inFlight.current) return false;
      inFlight.current = true;
      setPending(true);
      setError(null);
      try {
        const result = await submitBooking({ ...fields, attemptId });
        if (result.ok) {
          setReference(result.reference);
          return true;
        }
        setError(result.error);
        return false;
      } catch {
        setError(NETWORK_ERROR);
        return false;
      } finally {
        inFlight.current = false;
        setPending(false);
      }
    },
    [attemptId],
  );

  const reset = useCallback(() => {
    setAttemptId(newAttemptId());
    setReference(null);
    setError(null);
  }, []);

  return { submit, pending, error, reference, reset } as const;
}

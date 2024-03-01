'use client'

import { useEffect } from "react";
import clickTracking from "@/utils/clickTracking";

export default function AnalyticsLoader() {
  useEffect(() => {
    clickTracking.trackClicks('a, button, input[type=submit]')
  }, [])

  return null
}
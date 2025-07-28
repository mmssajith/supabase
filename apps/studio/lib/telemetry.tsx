import { PageTelemetry, posthogClient, useUser, useParams } from 'common'
import GroupsTelemetry from 'components/ui/GroupsTelemetry'
import { API_URL, IS_PLATFORM } from 'lib/constants'
import { useConsentToast } from 'ui-patterns/consent'
import { useEffect } from 'react'

export function Telemetry() {
  // Although this is "technically" breaking the rules of hooks
  // IS_PLATFORM never changes within a session, so this won't cause any issues
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { hasAcceptedConsent } = IS_PLATFORM ? useConsentToast() : { hasAcceptedConsent: true }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = IS_PLATFORM ? useUser() : null

  // Initialize PostHog client when telemetry is enabled
  useEffect(() => {
    if (IS_PLATFORM) {
      posthogClient.init()
    }
  }, [])

  // Identify user in PostHog when they're logged in
  useEffect(() => {
    if (IS_PLATFORM && hasAcceptedConsent && user?.id && typeof window !== 'undefined') {
      // Use same user ID as backend to unify events
      posthogClient.identify(user.id)
    }
  }, [hasAcceptedConsent, user?.id])

  return (
    <>
      <PageTelemetry
        API_URL={API_URL}
        hasAcceptedConsent={hasAcceptedConsent}
        enabled={IS_PLATFORM}
      />
      {/* <GroupsTelemetry hasAcceptedConsent={hasAcceptedConsent} /> */}
    </>
  )
}

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const defaultNotifications = [
  { message: 'Maintenance request approved for Printer 7.', when: '2 hours ago' },
  { message: 'Booking confirmed for Meeting Room 1.', when: 'Yesterday' },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(defaultNotifications)

  useEffect(() => {
    if (!supabase) return

    let mounted = true

    async function loadNotifications() {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })

      if (!mounted) return

      if (!error && data?.length) {
        setNotifications(
          data.map((item) => ({
            message: item.message ?? item.title ?? 'Activity event',
            when: item.when ?? item.timestamp ? new Date(item.timestamp || item.created_at).toLocaleDateString() : 'Recently',
          })),
        )
      }

      if (error && !['PGRST116', '42P01'].includes(error.code)) {
        console.warn('Unable to load notifications:', error.message)
      }
    }

    loadNotifications()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Notifications</p>
          <h1 className="text-2xl font-semibold text-on-surface">Activity log</h1>
        </div>
      </div>
      <div className="space-y-4">
        {notifications.map((item, index) => (
          <div key={`${item.message}-${index}`} className="rounded-3xl bg-surface p-4">
            <p className="text-sm text-on-surface">{item.message}</p>
            <p className="text-xs text-on-surface-variant mt-2">{item.when}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

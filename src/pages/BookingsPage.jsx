import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const statusOptions = ['Confirmed', 'Pending', 'Cancelled']

const defaultBookings = [
  { resource: 'Meeting Room 2', bookedBy: 'Emma Reed', start: 'Today 11:00', end: 'Today 12:00', status: 'Confirmed' },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(defaultBookings)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [resource, setResource] = useState('')
  const [bookedBy, setBookedBy] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [status, setStatus] = useState(statusOptions[0])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return

    let mounted = true

    async function loadBookings() {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('start_time', { ascending: true })

      if (!mounted) return

      if (!error && data?.length) {
        setBookings(
          data.map((item) => ({
            resource: item.resource ?? item.room ?? 'Resource',
            bookedBy: item.user_name ?? item.booked_by ?? item.booker ?? 'Unknown',
            start: item.start_time ? new Date(item.start_time).toLocaleString() : item.start ?? 'TBD',
            end: item.end_time ? new Date(item.end_time).toLocaleString() : item.end ?? 'TBD',
            status: item.status ?? item.state ?? 'Confirmed',
          })),
        )
      }

      if (error && !['PGRST116', '42P01'].includes(error.code)) {
        console.warn('Unable to load bookings:', error.message)
      }
    }

    loadBookings()

    return () => {
      mounted = false
    }
  }, [])

  async function handleCreateBooking(event) {
    event.preventDefault()
    setError('')

    const newBooking = {
      resource,
      booked_by: bookedBy,
      start_time: startTime ? new Date(startTime).toISOString() : null,
      end_time: endTime ? new Date(endTime).toISOString() : null,
      status,
    }

    if (supabase) {
      const { data, error: insertError } = await supabase
        .from('bookings')
        .insert(newBooking)
        .select('*')
        .single()

      if (insertError) {
        console.error('Unable to save booking:', insertError.message)
        setError('Unable to save booking right now. Please try again.')
        return
      }

      setBookings((current) => [
        {
          resource: data.resource ?? data.room ?? resource,
          bookedBy: data.user_name ?? data.booked_by ?? data.booker ?? bookedBy,
          start: data.start_time ? new Date(data.start_time).toLocaleString() : 'TBD',
          end: data.end_time ? new Date(data.end_time).toLocaleString() : 'TBD',
          status: data.status ?? status,
        },
        ...current,
      ])
    } else {
      setBookings((current) => [
        {
          resource,
          bookedBy,
          start: startTime ? new Date(startTime).toLocaleString() : 'TBD',
          end: endTime ? new Date(endTime).toLocaleString() : 'TBD',
          status,
        },
        ...current,
      ])
    }

    setResource('')
    setBookedBy('')
    setStartTime('')
    setEndTime('')
    setStatus(statusOptions[0])
    setShowBookingForm(false)
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-gray">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant">Bookings</p>
          <h1 className="text-2xl font-semibold text-on-surface">Resource reservations</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowBookingForm((value) => !value)}
          className="rounded-xl bg-primary px-4 py-3 text-white font-semibold hover:bg-primary-container transition"
        >
          {showBookingForm ? 'Hide form' : 'New booking'}
        </button>
      </div>

      {showBookingForm && (
        <form className="space-y-4 rounded-3xl bg-surface-container-lowest p-6 border border-border-gray mb-6" onSubmit={handleCreateBooking}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Resource</label>
              <input
                value={resource}
                onChange={(e) => setResource(e.target.value)}
                required
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-2">Booked by</label>
              <input
                value={bookedBy}
                onChange={(e) => setBookedBy(e.target.value)}
                required
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Start time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-2">End time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-label-md text-on-surface mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-border-gray bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowBookingForm(false)}
              className="rounded-xl border border-border-gray px-5 py-3 text-body-md text-on-surface hover:bg-surface transition"
            >
              Cancel
            </button>
            <button className="rounded-xl bg-secondary px-5 py-3 text-white font-semibold hover:bg-secondary/90 transition" type="submit">
              Create booking
            </button>
          </div>
          {error && <div className="text-sm text-status-error">{error}</div>}
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm uppercase tracking-[0.22em] text-on-surface-variant border-b border-border-gray">
              <th className="py-4">Resource</th>
              <th className="py-4">Booked by</th>
              <th className="py-4">Start</th>
              <th className="py-4">End</th>
              <th className="py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {bookings.map((booking, index) => (
              <tr key={`${booking.resource}-${index}`} className="hover:bg-surface transition">
                <td className="py-4">{booking.resource}</td>
                <td className="py-4">{booking.bookedBy}</td>
                <td className="py-4">{booking.start}</td>
                <td className="py-4">{booking.end}</td>
                <td className="py-4">
                  <span className="inline-flex rounded-full bg-secondary-container/15 px-3 py-1 text-secondary text-sm font-medium">{booking.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

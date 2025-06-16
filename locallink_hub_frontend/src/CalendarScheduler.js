import React from "react";

/*
  PUBLIC_INTERFACE
  CalendarScheduler
  A minimalist, pure-React scheduling/calendar modal for booking & managing exchanges/meetings.
  Props:
    - open: bool (show/hide)
    - onClose: function
    - onBookSlot: function(datetimeObj) called on booking
    - events: [{ title, datetime, type, participant }]  // Array of scheduled events
    - user: string (for identifying bookings)
*/
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9am-5pm
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABEL = date => `${WEEK_DAYS[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}`;

function pad(n) { return n < 10 ? `0${n}` : n; }

function range(n, fn) {
  return Array.from({ length: n }, (_, i) => fn(i));
}

// Simple: 7 days start today, fixed work hours (customizable)
function getWeekDays(startDate) {
  const base = new Date(startDate);
  return range(7, i => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });
}

// Returns YYYY-MM-DD string from Date
function ymd(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function timeStr(hour) {
  if (hour === 12) return "12pm";
  if (hour === 0) return "12am";
  if (hour > 12) return `${hour - 12}pm`;
  return `${hour}am`;
}

// Returns true if [date, hour] is same as event's datetime
function slotMatches(ev, date, hour) {
  const ed = new Date(ev.datetime);
  return ymd(ed) === ymd(date) && ed.getHours() === hour;
}

const slotStyles = {
  base: {
    cursor: "pointer",
    border: "1.2px solid #dedfe4",
    borderRadius: 6,
    padding: "5px 7px",
    background: "#fff",
    color: "#314950",
    fontSize: 13,
    margin: 2,
    minWidth: 54,
    minHeight: 28,
    boxShadow: "0 .5px 3.5px rgba(88,110,125,.07)",
    transition: "background 0.18s, border 0.14s"
  },
  available: {
    background: "#f8fafc",
    borderColor: "#baffba",
    color: "#3d703d",
    fontWeight: 600
  },
  booked: {
    background: "#eaeaea",
    borderColor: "#ca4040",
    color: "#ca4040",
    textDecoration: "line-through",
    opacity: 0.5
  },
  myBooking: {
    background: "#2563eb",
    color: "#fff",
    borderColor: "#2563eb"
  },
  hover: {
    outline: "2.3px solid #63d4a7",
    background: "#e7faee"
  }
};

export default function CalendarScheduler({ open, onClose, onBookSlot, events = [], user = "" }) {
  const [baseDate, setBaseDate] = React.useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [hoverSlot, setHoverSlot] = React.useState(null); // {date, hour}
  const [bookingInProgress, setBookingInProgress] = React.useState(false);

  const weekDays = getWeekDays(baseDate);

  function handlePrev() {
    const prev = new Date(baseDate);
    prev.setDate(prev.getDate() - 7);
    setBaseDate(prev);
  }
  function handleNext() {
    const next = new Date(baseDate);
    next.setDate(next.getDate() + 7);
    setBaseDate(next);
  }
  function handleBook(date, hour) {
    if (bookingInProgress) return;
    setBookingInProgress(true);
    const dt = new Date(date);
    dt.setHours(hour, 0, 0, 0);
    // Prevent duplicates
    if (events.some(ev => slotMatches(ev, date, hour))) {
      setBookingInProgress(false);
      return;
    }
    Promise.resolve(
      onBookSlot
        ? onBookSlot({ date: dt, title: "Meeting/Exchange Booking" })
        : null
    ).finally(() => setBookingInProgress(false));
  }
  function isBooked(date, hour) {
    return events.some(ev => slotMatches(ev, date, hour));
  }
  function myBooked(date, hour) {
    return events.some(ev => slotMatches(ev, date, hour) && ev.participant === user);
  }
  function getEventTitle(date, hour) {
    const ev = events.find(ev => slotMatches(ev, date, hour));
    return ev ? (ev.title ? ev.title : (ev.participant || "Booked")) : "";
  }

  if (!open) return null;
  return (
    <div className="overlay-backdrop" tabIndex={-1} aria-modal="true" role="dialog" style={{ zIndex: 12000 }}>
      <div className="overlay-content" style={{ maxWidth: 600, borderLeft: "5px solid #2563eb", borderRadius: 19 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
          <div style={{ color: "#2563eb", fontWeight: 800, fontSize: 18, letterSpacing: 0.5 }}>
            Book/Manage Exchange or Meeting
          </div>
          <button className="overlay-close" onClick={onClose} aria-label="Close calendar" style={{ fontSize: 26 }}>
            ×
          </button>
        </div>
        <div style={{
          fontSize: 15, marginBottom: 10, color: "#506174"
        }}>
          Select an available slot to request a booking for your exchange or meeting.
          <br />
          <span style={{ color: "#63d4a7", fontSize: 13 }}>
            Bookings are visible to all participants; you can cancel your bookings by clicking again.
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 9 }}>
          <button
            aria-label="Previous week"
            style={{
              ...slotStyles.base,
              background: "#eee",
              color: "#314950",
              padding: "3.5px 8px",
              minWidth: 36,
              fontWeight: 600
            }}
            onClick={handlePrev}
          >{"<"}</button>
          <b style={{ fontSize: 16, color: "#222e36", letterSpacing: 0.7 }}>
            Week of {baseDate.getMonth() + 1}/{baseDate.getDate()}/{baseDate.getFullYear()}
          </b>
          <button
            aria-label="Next week"
            style={{
              ...slotStyles.base,
              background: "#eee",
              color: "#314950",
              padding: "3.5px 8px",
              minWidth: 36,
              fontWeight: 600
            }}
            onClick={handleNext}
          >{">"}</button>
        </div>
        <div style={{
          overflowX: "auto",
          margin: "9px 0 2px 0",
          borderRadius: 10,
          boxShadow: "0 2px 10px rgba(62,77,115,.06)"
        }}>
          <table style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: 410,
            background: "#fcfcfd",
            borderRadius: 8
          }}>
            <thead>
              <tr>
                <th style={{
                  background: "#f0f4fa",
                  color: "#222e36",
                  padding: "4px 8px",
                  fontWeight: 600,
                  textAlign: "center",
                  borderRadius: "9px 9px 0 0"
                }}>Time</th>
                {weekDays.map((d, i) => (
                  <th key={i} style={{
                    background: "#f0f6fa",
                    color: "#2563eb",
                    fontSize: 14,
                    textAlign: "center",
                    fontWeight: 600,
                    padding: "4px 8px"
                  }}>{DAY_LABEL(d)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map(hour => (
                <tr key={hour}>
                  <td style={{
                    color: "#888",
                    fontWeight: 600,
                    background: "#f6f7fb",
                    padding: "2px 8px",
                    textAlign: "center"
                  }}>{timeStr(hour)}</td>
                  {weekDays.map((d, idx) => {
                    const booked = isBooked(d, hour);
                    const mine = myBooked(d, hour);
                    const hover = hoverSlot && hoverSlot.day === idx && hoverSlot.hour === hour;
                    return (
                      <td key={idx} style={{ textAlign: "center", padding: 0 }}>
                        <button
                          disabled={booked && !mine}
                          aria-label={booked ? (mine ? "Your booking" : "Booked") : "Book slot"}
                          style={{
                            ...slotStyles.base,
                            ...(booked ? slotStyles.booked : slotStyles.available),
                            ...(mine ? slotStyles.myBooking : {}),
                            ...(hover ? slotStyles.hover : {})
                          }}
                          onClick={() => !booked || mine ? handleBook(d, hour) : undefined}
                          onMouseEnter={() => setHoverSlot({ day: idx, hour })}
                          onMouseLeave={() => setHoverSlot(null)}
                          title={getEventTitle(d, hour)}
                        >
                          {booked
                            ? (mine ? "Yours" : "—")
                            : "Book"}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Events List */}
        {events.length > 0 && (
          <div style={{
            marginTop: 15,
            background: "#f8fafc",
            borderRadius: 10,
            padding: "6px 12px",
            fontSize: 14,
            color: "#314950",
            maxHeight: 100,
            overflowY: "auto"
          }}>
            <b>Scheduled Exchanges/Meetings this week:</b>
            <ul style={{margin: "2px 0 0 18px"}}>
              {events
                .filter(ev => {
                  const evd = new Date(ev.datetime);
                  return evd >= weekDays[0] && evd <= weekDays[6];
                })
                .map((ev, i) => (
                  <li key={i}>
                    {ev.title || "Meeting"}: <span style={{ color: "#2563eb" }}>{ev.participant}</span>
                    {" "}
                    {evdlabel(ev.datetime)}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper to get readable datetime label
function evdlabel(dtstr) {
  const d = new Date(dtstr);
  return `[${WEEK_DAYS[d.getDay()]} ${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:00]`;
}

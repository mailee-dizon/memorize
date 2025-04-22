import React from 'react'

export const dynamic = "force-dynamic";

export default function CreateCard() {
  return (
    <div>
      <div className="flip-card">
        <div className="flip-card-create">
          <div className="flip-card-front">
            <h1>front</h1>
            <input placeholder="front"/>
          </div>
        </div>
      </div>
      <div className="flip-card">
        <div className="flip-card-create">
          <div className="flip-card-front">
            <h1>back</h1>
            <input placeholder="back"/>
          </div>
        </div>
      </div>
    </div>
  )
}

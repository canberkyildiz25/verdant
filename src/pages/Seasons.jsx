import SeasonBand from '../components/SeasonBand'
import { MONTHS } from '../data/products'

const CURRENT_MONTH = new Date().getMonth() + 1

export default function Seasons() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <p className="measure text-radish-500 mb-3">THE CALENDAR</p>
        <h1 className="font-display text-5xl md:text-6xl text-soil-800 mb-5">
          What’s in season
        </h1>
        <p className="text-lg text-soil-600/80 max-w-xl leading-relaxed">
          It is {MONTHS[CURRENT_MONTH - 1]}. Below is every crop we grow and the months
          it is actually in the ground — not the months a supermarket can source it from
          somewhere else.
        </p>
      </div>

      <SeasonBand />
    </>
  )
}

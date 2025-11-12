import { Search } from 'lucide-react'

import { shortenString } from '@/helpers/utils'
import TROPHY from '@/static/images/prime-point/trop.svg'

const RANK_COLORS = ['#346600', '#284F00', '#1C3700']

export default function BurnLeaderboard() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 p-4 md:p-6">
        <div className="flex flex-row gap-2 items-center">
          <img src={TROPHY} alt="leaderboard" />
          <div className="flex flex-col">
            <p className="text-lg md:text-2xl font-medium uppercase">
              Top 100 Leaderboard
            </p>
            <span className="text-secondary">
              Time: <b className="text-primary">10 Nov - 16 Nov</b>
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <label className="w-full input bg-base-300 !outline-none pr-1.5">
            <input type="text" placeholder="0" />
            <Search className="text-secondary" />
          </label>
          <select className="select bg-base-300 !outline-none">
            <option disabled selected>
              Pick a color
            </option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>
        </div>
      </div>
      <div className="border-t border-base-100">
        <table className="table">
          <thead>
            <tr className="bg-base-300">
              <th className="w-1/12 text-center">#</th>
              <th className="w-3/12">Address</th>
              <th className="w-3/12">Total Burned 🔥</th>
              <th className="w-3/12">Total Burned Point</th>
              <th className="w-2/12">
                Reward <b>(P.P)</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {new Array(10).fill('').map((_, idx) => {
              return (
                <tr
                  style={{
                    background: RANK_COLORS[idx],
                  }}
                  key={idx}
                >
                  <td>
                    <div className="flex flex-row justify-center items-center gap-2">
                      <span>{idx + 1}</span>
                    </div>
                  </td>
                  <td className="font-medium">
                    <div className="flex flex-row justify-end md:justify-between items-center">
                      {shortenString('0x6Fbed7a40x6Fbed7a4')}
                    </div>
                  </td>
                  <td className="font-medium">
                    <div className="flex flex-row justify-end md:justify-between items-center">
                      {100000} P.P
                    </div>
                  </td>
                  <td className="font-medium">
                    <div className="flex flex-row justify-end md:justify-between items-center">
                      {100000} P.P
                    </div>
                  </td>
                  <td className="font-medium">
                    <div className="flex flex-row justify-end md:justify-between items-center">
                      {400}
                    </div>
                  </td>
                </tr>
              )
            })}
            <tr className="sticky top-0 bg-[#A0D06F] text-black">
              <td>
                <div className="flex flex-row justify-center items-center gap-2">
                  <span>{100}+</span>
                </div>
              </td>
              <td className="font-medium">
                <div className="flex flex-row justify-end md:justify-between items-center">
                  {shortenString('0x6Fbed7a40x6Fbed7a4')}
                </div>
              </td>
              <td className="font-medium">
                <div className="flex flex-row justify-end md:justify-between items-center">
                  {100000} P.P
                </div>
              </td>
              <td className="font-medium">
                <div className="flex flex-row justify-end md:justify-between items-center">
                  {100000} P.P
                </div>
              </td>
              <td className="font-medium">
                <div className="flex flex-row justify-end md:justify-between items-center">
                  {1}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

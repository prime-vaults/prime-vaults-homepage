import eth from '@/static/images/check-points/eth.png'
import core from '@/static/images/check-points/core.png'
import arb from '@/static/images/check-points/arb.png'
import bnb from '@/static/images/check-points/bnb.png'

const mock = [
  { img: eth, name: 'Ethereum', percent: 60 },
  { img: arb, name: 'Arbitrum', percent: 30 },
  { img: core, name: 'Core', percent: 10 },
  { img: bnb, name: 'Binance', percent: 10 },
]
export default function Checking() {
  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      <p>Checking your address</p>
      <div className="bg-repeating bg-repeating-body h-48 border border-primary flex flex-row justify-center items-center">
        {/* step1 */}
        {/* <p className="text-2xl">0x56b...7CC85d</p> */}
        {/* step2 */}
        <div className="flex flex-row w-full justify-between px-6 items-center">
          {mock.map((i) => (
            <div className="flex flex-col gap-2 items-center" key={i.name}>
              <img src={i.img} className="w-14 h-14" />
              <p>{i.name}</p>
              <p className=" text-primary">{i.percent}%</p>
            </div>
          ))}
          <div className="flex flex-col gap-2 items-center">
            <p>Others</p>
            <p className=" text-primary">10%</p>
          </div>
        </div>
        {/* step3 */}
        {/* 
        <div className="flex flex-col gap-8 items-center h-full p-5">
          <p>
            <span className="text-secondary">Total portfolio:</span> $25.000
          </p>
          <div className="fle flex-col h-full items-center justify-center">
            <p className="text-primary text-5xl font-bold">
              **** <span className="text-white">P.P</span>
            </p>
          </div>
        </div> */}
      </div>
      <p className="mt-8 text-secondary">Please hold. Just a moment</p>
    </div>
  )
}

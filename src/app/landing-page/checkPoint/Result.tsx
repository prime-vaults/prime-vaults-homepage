import Button from '@/components/UI/Button'
import ShieldIcon from './ShieldIcon'
import ActiveWhale from '@/static/images/check-points/active-whale.png'

export default function Result() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border border-[#B3BFA6] rounded-lg grid grid-cols-2 gap-4">
        <div className="flex flex-col ">
          <div
            style={{
              background:
                'linear-gradient(270deg, rgba(17, 21, 12, 0.00) 38.92%, #4D6138 100%)',
            }}
            className=" flex flex-row items-center w-full gap-2 p-5 rounded-t-lg"
          >
            <p className="text-[#B3BFA6] text-xs flex-1">Your tier </p>
            <p className="uppercase badge-text">new saver</p>
            <ShieldIcon />
          </div>
          <div
            style={{
              background:
                'radial-gradient(77.73% 112.66% at 0% 71.02%, rgba(173, 205, 139, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(264deg, rgba(29, 36, 35, 0.20) 54.62%, rgba(23, 33, 16, 0.20) 100.72%)',
            }}
            className="p-4 h-full flex flex-col gap-4"
          >
            <p className="text-[#B3BFA6] text-xs ">Your Prime Points </p>
            <div className="flex flex-1 flex-row items-center justify-center">
              <p className="text-primary font-bold text-5xl">
                6677 <span className="text-white">P.P</span>
              </p>
            </div>
            <p className="text-[#B3BFA6] text-xs">
              These points can be redeemed for real rewards <br /> in the Prime
              Vaults Closed-Beta.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <img src={ActiveWhale} />
        </div>
      </div>
      <div className="col-span-full flex flex-row gap-2 items-center w-full mt-4">
        <Button className="btn btn-ghost text-primary">Close</Button>
        <div className="flex-1" />
        <Button className="btn btn-ghost text-primary">Play Yield Game</Button>

        <Button className="btn btn-primary ">Join Closed-Beta</Button>
      </div>
    </div>
  )
}
